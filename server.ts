import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory persistent store for Rescue Requests & Shelters
interface RescueRequest {
  id: string;
  referenceNumber: string;
  fullName: string;
  isAnonymous: boolean;
  phoneNumber: string;
  hasConsent: boolean;
  location: {
    address: string;
    landmark?: string;
    lat?: number;
    lng?: number;
  };
  totalPeople: number;
  childrenCount: number;
  elderlyCount: number;
  mobilityAssistanceNeeded: boolean;
  emergencyType: 'trapped_water' | 'medical_emergency' | 'stranded_family' | 'evacuation_assist' | 'food_water_shortage' | 'other';
  urgencyLevel: 'critical' | 'high' | 'medium';
  description: string;
  status: 'Submitted' | 'Received by Response Team' | 'Assistance Dispatched' | 'Rescue Team On-Site' | 'Evacuated / Resolved';
  statusNotes?: string;
  createdAt: string;
  updatedAt: string;
  isSimulation: boolean;
}

// Initial demo database for simulated rescue requests
const rescueRequests: RescueRequest[] = [
  {
    id: 'req-001',
    referenceNumber: 'DS-48219-ASSAM',
    fullName: 'Rajesh & Family',
    isAnonymous: false,
    phoneNumber: '+91 98765 43210',
    hasConsent: true,
    location: {
      address: 'Near Old River Bridge, Ward 4, Silchar',
      landmark: 'Opposite State Water Tank',
      lat: 24.8333,
      lng: 92.7789,
    },
    totalPeople: 4,
    childrenCount: 1,
    elderlyCount: 1,
    mobilityAssistanceNeeded: true,
    emergencyType: 'trapped_water',
    urgencyLevel: 'high',
    description: 'Ground floor submerged under 3.5 ft water. Family safe on rooftop terrace, need boat evacuation.',
    status: 'Assistance Dispatched',
    statusNotes: 'NDRF Boat Unit 3 dispatched from Silchar Ghat.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    isSimulation: true,
  },
  {
    id: 'req-002',
    referenceNumber: 'DS-92144-PATNA',
    fullName: 'Sunita Devi',
    isAnonymous: false,
    phoneNumber: '+91 94312 88761',
    hasConsent: true,
    location: {
      address: 'Danapur Cantonment Area, Patna',
      landmark: 'Near Railway Crossing',
      lat: 25.6186,
      lng: 85.0444,
    },
    totalPeople: 3,
    childrenCount: 2,
    elderlyCount: 0,
    mobilityAssistanceNeeded: false,
    emergencyType: 'stranded_family',
    urgencyLevel: 'medium',
    description: 'Surrounded by knee-deep water. Electricity cut off. Need drinking water and evacuation.',
    status: 'Received by Response Team',
    statusNotes: 'Assigned to District Relief Team 2.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    isSimulation: true,
  }
];

// Verified & Demo Shelter Database (clearly tagged)
const shelters = [
  {
    id: 'sh-01',
    name: 'Government Model Higher Secondary School Relief Camp',
    type: 'Official Relief Camp',
    address: 'High School Road, Central Ridge Zone',
    city: 'Silchar',
    state: 'Assam',
    lat: 24.8250,
    lng: 92.7950,
    contactNumber: '+91 3842 245671',
    capacity: 450,
    currentOccupancy: 285,
    status: 'Open & Operational',
    isVerified: true,
    isDemoData: true,
    lastVerified: '15 mins ago',
    elevationMeters: 42,
    wheelchairAccessible: true,
    facilities: [
      'Clean Drinking Water',
      'First Aid & Tetanus Vaccines',
      'Dry Food Rations',
      'Solar Power Phone Charging',
      'Baby Care & Milk Supplies',
      'Sanitary Facilities'
    ]
  },
  {
    id: 'sh-02',
    name: 'District Community Hall & Indoor Sports Complex',
    type: 'Safe Shelter',
    address: 'Station Road, North Hill Sector',
    city: 'Silchar',
    state: 'Assam',
    lat: 24.8450,
    lng: 92.8100,
    contactNumber: '+91 3842 247890',
    capacity: 600,
    currentOccupancy: 410,
    status: 'Open & Operational',
    isVerified: true,
    isDemoData: true,
    lastVerified: '30 mins ago',
    elevationMeters: 48,
    wheelchairAccessible: true,
    facilities: [
      'Emergency Medical Doctor On-site',
      'Separate Dorms for Women & Children',
      'Purified RO Water',
      'Hot Meals Kitchen',
      'Pet Designated Area'
    ]
  },
  {
    id: 'sh-03',
    name: 'Civil District Hospital & Emergency Trauma Centre',
    type: 'Hospital & Medical Centre',
    address: 'Hospital Link Road, Medical Enclave',
    city: 'Silchar',
    state: 'Assam',
    lat: 24.8180,
    lng: 92.7820,
    contactNumber: '+91 3842 233333',
    capacity: 250,
    currentOccupancy: 215,
    status: 'Operational - Emergency Only',
    isVerified: true,
    isDemoData: true,
    lastVerified: '8 mins ago',
    elevationMeters: 51,
    wheelchairAccessible: true,
    facilities: [
      '24/7 ICU & Trauma Care',
      'Emergency Snakebite Antivenom',
      'Surgical Care',
      'Blood Bank',
      'Ambulance Station'
    ]
  },
  {
    id: 'sh-04',
    name: 'St. Xavier Community Mission Centre',
    type: 'Safe Shelter',
    address: 'Convent Road, Elevated Sector 3',
    city: 'Silchar',
    state: 'Assam',
    lat: 24.8520,
    lng: 92.7680,
    contactNumber: '+91 3842 251122',
    capacity: 300,
    currentOccupancy: 120,
    status: 'Open & Operational',
    isVerified: true,
    isDemoData: true,
    lastVerified: '45 mins ago',
    elevationMeters: 55,
    wheelchairAccessible: false,
    facilities: [
      'Clean Water & Hydration Kits',
      'Thermal Blankets',
      'Dry Food Packets',
      'Charging Docks'
    ]
  },
  {
    id: 'sh-05',
    name: 'Town Hall & NDRF Stage-1 Relief Base',
    type: 'Emergency Response Centre',
    address: 'Administrative Boulevard, Civic Center',
    city: 'Silchar',
    state: 'Assam',
    lat: 24.8360,
    lng: 92.7880,
    contactNumber: '+91 112',
    capacity: 350,
    currentOccupancy: 190,
    status: 'Open & Operational',
    isVerified: true,
    isDemoData: true,
    lastVerified: '12 mins ago',
    elevationMeters: 46,
    wheelchairAccessible: true,
    facilities: [
      'NDRF Quick Reaction Team Base',
      'Satellite Phone Communication',
      'Rubber Dinghies & Life Vests',
      'Emergency Water Purification',
      'First Aid Response'
    ]
  }
];

// Disaster Alerts Sample Data
const alerts = [
  {
    id: 'alt-01',
    severity: 'High Warning',
    title: 'River Barak Water Level Exceeds Danger Mark (+1.45m)',
    affectedArea: 'Cachar, Karimganj & Hailakandi Low-Lying Catchments',
    source: 'Central Water Commission (CWC) & SDMA Assam',
    publishedAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    isVerified: true,
    summary: 'Water level continues to register a steady rise due to catchment rainfall. Residents in unprotected low-lying pockets advised to move promptly to designated municipal shelters.',
    actionRequired: 'Move essential documents and medicine to upper floors. Do not attempt crossing submerging culverts.'
  },
  {
    id: 'alt-02',
    severity: 'Moderate Advisory',
    title: 'Flash Flood Watch & Heavy Inundation Alert',
    affectedArea: 'North Bank Tributaries & Urban Lowland Sectors',
    source: 'India Meteorological Department (IMD)',
    publishedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    isVerified: true,
    summary: 'Continuous monsoon rainfall forecast for the next 24 to 36 hours. Power substations in low-lying zones may experience precautionary power cuts.',
    actionRequired: 'Charge battery packs and radios. Keep clean drinking water stored in airtight vessels.'
  }
];

// Initialize Gemini client on the server side
let aiClient: GoogleGenAI | null = null;
const geminiApiKey = process.env.GEMINI_API_KEY;

if (geminiApiKey) {
  aiClient = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// REST API Endpoints

// 1. Health & Server Info
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'operational',
    service: 'DisasterShield AI Server',
    hasAiConfigured: Boolean(geminiApiKey),
    time: new Date().toISOString()
  });
});

// 2. Shelters Directory
app.get('/api/shelters', (_req: Request, res: Response) => {
  res.json({
    shelters,
    total: shelters.length,
    disclaimer: 'DEMO PROTOTYPE DATA: Shelter listings and occupancy numbers are simulated for demonstration. For real-time emergency shelter assignments, consult District Administration / 112.'
  });
});

// 3. Flood Alerts
app.get('/api/alerts', (_req: Request, res: Response) => {
  res.json({
    alerts,
    disclaimer: 'SAMPLE MONITORING BULLETIN: For official legal notices and evacuations, verify directly with National Disaster Management Authority (NDMA) or state authorities.'
  });
});

// 4. Rescue Assistance Requests: Submit
app.post('/api/rescue-requests', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      isAnonymous,
      phoneNumber,
      hasConsent,
      location,
      totalPeople,
      childrenCount,
      elderlyCount,
      mobilityAssistanceNeeded,
      emergencyType,
      urgencyLevel,
      description
    } = req.body;

    if (!phoneNumber || phoneNumber.trim().length < 8) {
      res.status(400).json({ error: 'Valid phone number is required for rescue responders to verify and coordinate.' });
      return;
    }

    if (!location || !location.address) {
      res.status(400).json({ error: 'Location or address description is mandatory so rescue teams can locate you.' });
      return;
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const regionCode = location.address.toUpperCase().includes('PATNA') ? 'PATNA' : 'ZONE';
    const referenceNumber = `DS-${randomSuffix}-${regionCode}`;

    const newRequest: RescueRequest = {
      id: `req-${Date.now()}`,
      referenceNumber,
      fullName: isAnonymous ? 'Anonymous Resident' : (fullName || 'Flood Resident'),
      isAnonymous: Boolean(isAnonymous),
      phoneNumber,
      hasConsent: Boolean(hasConsent),
      location: {
        address: location.address,
        landmark: location.landmark || '',
        lat: location.lat,
        lng: location.lng,
      },
      totalPeople: Number(totalPeople) || 1,
      childrenCount: Number(childrenCount) || 0,
      elderlyCount: Number(elderlyCount) || 0,
      mobilityAssistanceNeeded: Boolean(mobilityAssistanceNeeded),
      emergencyType: emergencyType || 'trapped_water',
      urgencyLevel: urgencyLevel || 'high',
      description: description || 'Immediate evacuation / assistance requested.',
      status: 'Submitted',
      statusNotes: 'Request registered in platform intake queue. In life danger, call 112.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isSimulation: true,
    };

    rescueRequests.unshift(newRequest);

    res.status(201).json({
      success: true,
      request: newRequest,
      message: 'Rescue request submitted successfully.',
      disclaimer: 'PROTOTYPE SIMULATION NOTICE: This request is logged in local demonstration storage. It has NOT been dispatched to live government emergency units. In an active emergency, please dial 112 directly.'
    });
  } catch (err: unknown) {
    console.error('Error creating rescue request:', err);
    res.status(500).json({ error: 'Failed to process rescue request.' });
  }
});

// 5. Rescue Assistance Requests: Lookup by Reference Number
app.get('/api/rescue-requests/:refId', (req: Request, res: Response) => {
  const refId = req.params.refId.trim().toUpperCase();
  const request = rescueRequests.find(r => r.referenceNumber.toUpperCase() === refId || r.id === req.params.refId);

  if (!request) {
    res.status(404).json({ error: `No rescue request found for reference "${refId}". Please verify the reference code.` });
    return;
  }

  res.json({
    request,
    disclaimer: 'SIMULATED TRACKING: This status is maintained in demo application storage.'
  });
});

// 6. Rescue Assistance Requests: List recent (for tracking dashboard)
app.get('/api/rescue-requests', (_req: Request, res: Response) => {
  res.json({
    requests: rescueRequests.slice(0, 15),
    total: rescueRequests.length,
    disclaimer: 'DEMO LOGS: Simulated rescue intake queue.'
  });
});

// 7. Update status (simulation tool for demonstrations)
app.patch('/api/rescue-requests/:refId/status', (req: Request, res: Response) => {
  const refId = req.params.refId.trim().toUpperCase();
  const request = rescueRequests.find(r => r.referenceNumber.toUpperCase() === refId || r.id === req.params.refId);

  if (!request) {
    res.status(404).json({ error: 'Request not found' });
    return;
  }

  const { status, statusNotes } = req.body;
  if (status) {
    request.status = status;
    request.updatedAt = new Date().toISOString();
  }
  if (statusNotes) {
    request.statusNotes = statusNotes;
  }

  res.json({ success: true, request });
});

// 8. AI Emergency Assistant
app.post('/api/assistant/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message text is required.' });
      return;
    }

    const systemInstruction = `You are DisasterShield AI, an emergency flood preparedness and safety assistant.
Your mission is to provide clear, calm, practical, and life-saving guidance for individuals affected by floods or heavy inundations.

CRITICAL SAFETY PROTOCOLS:
1. ALWAYS prioritize human safety: If someone is trapped, injured, or surrounded by rapidly rising water, FIRST urge them to move to the highest accessible level (rooftop/upper floor) and DIAL 112 (National Emergency Number in India) immediately.
2. NEVER advise walking or driving through moving floodwaters. Reiterate: "Six inches of swiftly moving water can knock an adult off their feet; 12-24 inches can carry away a car. Turn Around, Don't Drown."
3. Distinguish clearly between general preparedness advice and official emergency alerts. State that local authorities (NDRF, SDMA, District Administration, Police) hold official evacuation orders.
4. Keep answers concise, highly legible, structured with bullet points and bold action verbs. Avoid overly technical jargon, conversational fluff, or long rambling paragraphs.
5. Topics you assist with:
   - What to pack in a 72-hour emergency flood grab-and-go kit.
   - Water purification methods during floods (boiling, chlorination, safe storage).
   - Electrical and gas safety: Turning off main circuit breakers before water touches outlets; avoiding downed power lines by at least 10 meters / 30 feet.
   - What to do while awaiting a rescue boat (wear bright clothes, carry a whistle or flashlight, secure identification documents in waterproof bags, signal safely).
   - Post-flood safety: Sanitizing contaminated surfaces, avoiding mold, reporting structural cracks.

Format responses with clean Markdown formatting (bold keywords, concise bullet points).`;

    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config: {
            systemInstruction,
            temperature: 0.3,
            topP: 0.9,
          },
        });

        const reply = response.text || 'Stay safe. For immediate life-saving rescue, please dial 112 immediately.';
        res.json({
          reply,
          model: 'gemini-3.8-flash',
          isLiveAi: true,
          disclaimer: 'AI Safety Guidance: For official evacuation orders, always follow local disaster management (NDRF/SDMA).'
        });
        return;
      } catch (geminiError: unknown) {
        console.error('Gemini API call failed, providing rule-based safety fallback:', geminiError);
        // Fall back gracefully to structured emergency safety rulebook
      }
    }

    // High quality offline / fallback rule-based response if AI key is missing or errored
    const fallbackReply = generateFallbackSafetyGuidance(message);
    res.json({
      reply: fallbackReply,
      model: 'DisasterShield Safety Engine (Standard Mode)',
      isLiveAi: false,
      disclaimer: 'Pre-verified flood safety guidelines. In life-threatening danger, call 112.'
    });

  } catch (error: unknown) {
    console.error('Error handling assistant chat:', error);
    res.status(500).json({
      error: 'Emergency assistant encountered an error. Please contact emergency services at 112.'
    });
  }
});

function generateFallbackSafetyGuidance(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('kit') || q.includes('pack') || q.includes('survival') || q.includes('essential')) {
    return `### 🎒 Recommended 72-Hour Flood Survival Kit

1. **Drinking Water:** At least 3 liters of clean drinking water per person per day in sealed containers.
2. **Non-Perishable Food:** Ready-to-eat dry rations, energy bars, dry fruits, and canned food (include a manual can opener).
3. **Medical & First Aid:** Essential prescription medicines (min. 7-day supply), bandages, antiseptic ointment, ORS packets, and water purification tablets.
4. **Lighting & Communication:**
   - High-intensity LED flashlight with extra sealed batteries.
   - Battery-powered or hand-crank AM/FM emergency radio.
   - Fully charged power bank in a double zip-lock bag.
5. **Emergency Whistle:** A whistle carries farther than a voice and conserves your energy when signalling rescue boats.
6. **Waterproof Document Pouch:** Aadhaar/National ID, insurance papers, deeds, family photos, and emergency cash.
7. **Sanitation:** Hand sanitizer, moist wipes, heavy-duty trash bags, and feminine hygiene items.`;
  }

  if (q.includes('entering') || q.includes('rising') || q.includes('home') || q.includes('trapped') || q.includes('roof')) {
    return `### 🚨 Immediate Actions: If Floodwater Is Entering Your Home

1. **Cut Utilities Immediately:** Turn off your home's main electrical breaker switch and main gas valve before water levels reach outlets. **Never touch switches while standing in water.**
2. **Move to Higher Ground:** Head to an upper floor or rooftop. **Do not climb into a closed attic** without an external roof escape hatch, as you could become trapped.
3. **Signal for Help:**
   - Hang a brightly colored cloth or bedsheet from your roof/balcony.
   - Blow your emergency whistle in three sharp bursts (universal distress signal).
   - At night, flash a torch in pulses toward rescue crews or open sky.
4. **Call Emergency 112:** If life is in danger, call **112** (India National Emergency) or your local Disaster Authority immediately with your exact location and landmark.
5. **Do NOT Wade into Moving Water:** Avoid entering moving water on foot. Six inches of water can sweep you away.`;
  }

  if (q.includes('water') && (q.includes('drink') || q.includes('purif') || q.includes('boil') || q.includes('clean'))) {
    return `### 💧 Safe Drinking Water During Flood Emergencies

Floodwaters frequently contaminate municipal water pipelines and wells with sewage, chemicals, and debris.

1. **Boil Vigorous Rolling Boil:** Bring water to a full rolling boil for at least **1 full minute** (3 minutes at higher altitudes). Let cool naturally.
2. **Disinfection Tablets (Halazone/Chlorine):** If boiling is impossible, use standard chlorine or sodium dichloroisocyanurate water purification tablets following package instructions (typically 1 tablet per 20 liters; wait 30 minutes before drinking).
3. **Household Bleach (Emergency Method):** If only unscented 5-6% liquid household bleach is available, add 2 drops per 1 liter of clear water, shake well, and allow to stand for 30 minutes. It should have a faint chlorine smell.
4. **Never Consume:** Water with chemical films, floating oil, or murky color without preliminary filtration through clean multi-folded cotton cloth.`;
  }

  if (q.includes('car') || q.includes('drive') || q.includes('vehicle') || q.includes('road')) {
    return `### 🚗 Flood Driving Safety: Turn Around, Don't Drown

- **6 Inches of Water:** Reaches the bottom of most passenger cars, causing loss of control and potential stalling.
- **12 Inches of Water:** Can float small cars and light SUVs.
- **24 Inches of Water:** Sweeps away virtually all vehicles, including heavy pickup trucks and rescue SUVs.
- **Hidden Hazards:** Roads and bridges may be washed out beneath the water surface, creating invisible sinkholes.
- **If Trapped in Vehicle:** If water is rising around your vehicle, unbuckle immediately, unlock doors, roll down windows, and escape to the car roof if you cannot reach dry ground safely.`;
  }

  return `### 🛡️ Flood Safety Guidance & Immediate Protocols

- **Emergency Helpline:** Dial **112** (India National Emergency) or **1070** (State Disaster Management) for live rescue deployment.
- **Stay Informed:** Follow alerts from official local authorities and IMD on battery-powered radios.
- **Avoid Submerged Wires:** Stay at least 10 meters (33 feet) away from fallen power poles and submerged wires. Treat all downed wires as live.
- **Keep Dry & Warm:** Prevent hypothermia by staying out of standing water and wrapping in dry blankets.
- **Watch for Wildlife:** Rising waters displace snakes, rodents, and insects into residential structures. Use a stick to inspect dry areas before stepping.`;
}

// Full-stack Vite integration
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DisasterShield AI server running at http://localhost:${PORT}`);
  });
}

startServer();
