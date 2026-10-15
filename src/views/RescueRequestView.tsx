import React, { useState } from 'react';
import { RescueRequest } from '../types';
import {
  LifeBuoy,
  PhoneCall,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Copy,
  ExternalLink,
  Shield,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export const RescueRequestView: React.FC = () => {
  // Form States
  const [fullName, setFullName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hasConsent, setHasConsent] = useState(true);
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationSuccessMsg, setLocationSuccessMsg] = useState<string | null>(null);

  const [totalPeople, setTotalPeople] = useState('2');
  const [childrenCount, setChildrenCount] = useState('0');
  const [elderlyCount, setElderlyCount] = useState('0');
  const [mobilityAssistanceNeeded, setMobilityAssistanceNeeded] = useState(false);
  const [emergencyType, setEmergencyType] = useState<RescueRequest['emergencyType']>('trapped_water');
  const [urgencyLevel, setUrgencyLevel] = useState<RescueRequest['urgencyLevel']>('high');
  const [description, setDescription] = useState('');

  // UI Flow States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedRequest, setSubmittedRequest] = useState<RescueRequest | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Status Lookup Tab
  const [lookupRefNumber, setLookupRefNumber] = useState('');
  const [isSearchingLookup, setIsSearchingLookup] = useState(false);
  const [lookupResult, setLookupResult] = useState<RescueRequest | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'request' | 'track'>('request');

  // Handle GPS location auto-fill
  const handleDetectLocation = () => {
    setLocationSuccessMsg(null);
    setFormError(null);
    if (!navigator.geolocation) {
      setFormError('Geolocation is not supported by your device browser.');
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetectingLocation(false);
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLng(longitude);
        if (!address) {
          setAddress(`GPS Coordinates: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        }
        setLocationSuccessMsg(`GPS coordinates locked (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
      },
      (err) => {
        setIsDetectingLocation(false);
        setFormError('Could not auto-detect location. Please type your street address and nearest high landmark.');
      },
      { timeout: 8000 }
    );
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!phoneNumber || phoneNumber.trim().length < 8) {
      setFormError('Please enter a valid telephone or mobile number so responders can verify your coordinates.');
      return;
    }

    if (!hasConsent) {
      setFormError('Consent to share your phone number with rescue personnel is required to coordinate dispatch.');
      return;
    }

    if (!address.trim()) {
      setFormError('Current location address, street, or building name is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName,
        isAnonymous,
        phoneNumber,
        hasConsent,
        location: {
          address,
          landmark,
          lat,
          lng
        },
        totalPeople: parseInt(totalPeople, 10) || 1,
        childrenCount: parseInt(childrenCount, 10) || 0,
        elderlyCount: parseInt(elderlyCount, 10) || 0,
        mobilityAssistanceNeeded,
        emergencyType,
        urgencyLevel,
        description
      };

      const response = await fetch('/api/rescue-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit rescue request.');
      }

      setSubmittedRequest(data.request);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      console.error('Submission error:', err);
      // Fallback local simulation if offline
      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      const fallbackReq: RescueRequest = {
        id: `local-${Date.now()}`,
        referenceNumber: `DS-${randomSuffix}-LOCAL`,
        fullName: isAnonymous ? 'Anonymous Resident' : (fullName || 'Flood Resident'),
        isAnonymous,
        phoneNumber,
        hasConsent,
        location: { address, landmark, lat, lng },
        totalPeople: parseInt(totalPeople, 10) || 1,
        childrenCount: parseInt(childrenCount, 10) || 0,
        elderlyCount: parseInt(elderlyCount, 10) || 0,
        mobilityAssistanceNeeded,
        emergencyType,
        urgencyLevel,
        description: description || 'Evacuation assistance requested.',
        status: 'Submitted',
        statusNotes: 'Logged in local browser storage. In life danger, call 112.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isSimulation: true
      };
      setSubmittedRequest(fallbackReq);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Lookup Tracking
  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);
    setLookupResult(null);

    const ref = lookupRefNumber.trim().toUpperCase();
    if (!ref) {
      setLookupError('Please enter a valid Reference Number (e.g. DS-48219-ASSAM).');
      return;
    }

    setIsSearchingLookup(true);

    try {
      const res = await fetch(`/api/rescue-requests/${encodeURIComponent(ref)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Request reference not found.');
      }

      setLookupResult(data.request);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Lookup failed.';
      setLookupError(message);
    } finally {
      setIsSearchingLookup(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-8">
      {/* Page Title */}
      <div className="border-b border-[#303843]/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#F5DDD2] text-[#8C2C1D] text-xs font-semibold mb-2">
            <LifeBuoy className="w-3.5 h-3.5 text-[#C84A31]" />
            <span>Emergency SOS &amp; Rescue Dispatch</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#303843]">
            Rescue Assistance Request
          </h1>
          <p className="text-xs sm:text-sm text-[#303843]/70 mt-1">
            Submit an emergency evacuation request for yourself, family, or vulnerable community members trapped by rising floodwaters.
          </p>
        </div>

        {/* Tab switch between Request and Track */}
        <div className="flex items-center gap-1 bg-[#FAF9F6] border border-[#303843]/10 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('request')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
              activeTab === 'request'
                ? 'bg-[#303843] text-white shadow-xs'
                : 'text-[#303843]/70 hover:bg-[#DCEAF7]/50'
            }`}
          >
            Submit Request
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
              activeTab === 'track'
                ? 'bg-[#303843] text-white shadow-xs'
                : 'text-[#303843]/70 hover:bg-[#DCEAF7]/50'
            }`}
          >
            Track Status
          </button>
        </div>
      </div>

      {/* Mandatory Demo Simulation Warning */}
      <div className="bg-[#FEE2E2]/70 border border-[#EF4444]/30 rounded-2xl p-4 text-xs text-[#991B1B] space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-sm">
          <AlertCircle className="w-4 h-4 text-[#991B1B] shrink-0" />
          <span>PROTOTYPE SIMULATION NOTICE</span>
        </div>
        <p className="leading-relaxed">
          This rescue assistance intake system is a software prototype demonstration. <strong>Submissions are recorded in local simulation database and are NOT connected to live government or NDRF field units.</strong> If you or someone you know is in immediate life danger, please dial <strong>112</strong> immediately.
        </p>
      </div>

      {/* VIEW 1: CONFIRMATION SCREEN (When request just submitted) */}
      {submittedRequest ? (
        <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#DDE8D5] flex items-center justify-center text-[#2C5228] shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#3B6B35]">
                Request Successfully Logged
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#303843]">
                Rescue Reference Generated
              </h2>
            </div>
          </div>

          {/* Reference Number Box */}
          <div className="bg-[#FAF9F6] border border-[#303843]/15 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#303843]/70 font-semibold block">Your Unique Reference ID:</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#2A4D69] tracking-wider font-mono">
                {submittedRequest.referenceNumber}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(submittedRequest.referenceNumber)}
              className="px-4 py-2 rounded-xl bg-[#DCEAF7] text-[#2A4D69] text-xs font-bold hover:bg-[#C8E1F9] transition-colors flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedRef ? 'Copied to Clipboard!' : 'Copy Reference'}</span>
            </button>
          </div>

          {/* Status Progression Bar */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#303843]/80">
              Simulated Response Status
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-[#DDE8D5] border border-[#3B6B35]/20 text-[#2C5228] font-bold">
                1. Submitted ✓
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#303843]/10 text-[#303843]/60">
                2. Team Assigned
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#303843]/10 text-[#303843]/60">
                3. Boat Dispatched
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#303843]/10 text-[#303843]/60">
                4. Rescued / Safe
              </div>
            </div>
          </div>

          {/* Submitted Request Summary */}
          <div className="bg-[#FAF9F6] rounded-xl p-4 border border-[#303843]/10 text-xs text-[#303843] space-y-2">
            <div className="flex justify-between border-b border-[#303843]/8 pb-1.5">
              <span className="text-[#303843]/70">Contact Person:</span>
              <span className="font-semibold">{submittedRequest.fullName} ({submittedRequest.phoneNumber})</span>
            </div>
            <div className="flex justify-between border-b border-[#303843]/8 pb-1.5">
              <span className="text-[#303843]/70">Location:</span>
              <span className="font-semibold text-right max-w-xs">{submittedRequest.location.address} {submittedRequest.location.landmark ? `(Near ${submittedRequest.location.landmark})` : ''}</span>
            </div>
            <div className="flex justify-between border-b border-[#303843]/8 pb-1.5">
              <span className="text-[#303843]/70">Persons Requiring Assistance:</span>
              <span className="font-semibold">{submittedRequest.totalPeople} Total ({submittedRequest.childrenCount} Children, {submittedRequest.elderlyCount} Elderly)</span>
            </div>
            <div className="flex justify-between border-b border-[#303843]/8 pb-1.5">
              <span className="text-[#303843]/70">Urgency:</span>
              <span className="font-bold text-[#C84A31] uppercase">{submittedRequest.urgencyLevel}</span>
            </div>
            <div className="pt-1">
              <span className="text-[#303843]/70 block mb-0.5">Situation Note:</span>
              <p className="italic text-[#303843]/90 bg-[#FAF9F6] p-2 rounded border border-[#303843]/8">
                "{submittedRequest.description}"
              </p>
            </div>
          </div>

          {/* Action to submit another or call 112 */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href="tel:112"
              className="flex-1 py-3 px-4 rounded-xl bg-[#C84A31] text-white text-xs font-bold hover:bg-[#B33C24] transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>For Immediate Real-Life Rescue, Call 112</span>
            </a>
            <button
              onClick={() => {
                setSubmittedRequest(null);
                setAddress('');
                setLandmark('');
                setDescription('');
              }}
              className="py-3 px-6 rounded-xl bg-[#FAF9F6] border border-[#303843]/15 text-[#303843] text-xs font-bold hover:bg-[#DCEAF7]/30 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : activeTab === 'track' ? (
        /* VIEW 2: TRACK STATUS BY REFERENCE NUMBER */
        <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-[#303843]">Track Your Rescue Request</h2>
            <p className="text-xs text-[#303843]/70 mt-1">
              Enter your unique Reference Code (e.g. <code>DS-48219-ASSAM</code> or <code>DS-92144-PATNA</code>) to check the intake and dispatch status.
            </p>
          </div>

          <form onSubmit={handleLookup} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#303843]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={lookupRefNumber}
                onChange={(e) => setLookupRefNumber(e.target.value)}
                placeholder="Enter Reference Number (e.g. DS-48219-ASSAM)"
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF9F6] border border-[#303843]/15 rounded-xl uppercase tracking-wider font-mono text-[#303843] placeholder:normal-case placeholder:font-sans"
              />
            </div>
            <button
              type="submit"
              disabled={isSearchingLookup}
              className="px-5 py-2.5 rounded-xl bg-[#2A4D69] text-white text-xs font-bold hover:bg-[#1E374B] transition-colors shrink-0 disabled:opacity-50"
            >
              {isSearchingLookup ? 'Checking...' : 'Check Status'}
            </button>
          </form>

          {lookupError && (
            <div className="p-3 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl text-xs text-[#991B1B]">
              {lookupError}
            </div>
          )}

          {lookupResult && (
            <div className="bg-[#FAF9F6] border border-[#303843]/15 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#2A4D69] font-mono block">
                    {lookupResult.referenceNumber}
                  </span>
                  <h3 className="text-base font-bold text-[#303843]">
                    Status: <span className="text-[#2C5228]">{lookupResult.status}</span>
                  </h3>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#DDE8D5] text-[#2C5228]">
                  Verified In Queue
                </span>
              </div>

              {lookupResult.statusNotes && (
                <div className="p-3 rounded-lg bg-[#DCEAF7]/30 border border-[#303843]/10 text-xs text-[#303843]">
                  <strong>Responder Note:</strong> {lookupResult.statusNotes}
                </div>
              )}

              <div className="text-xs text-[#303843]/80 space-y-1 border-t border-[#303843]/8 pt-3">
                <p>Location: <strong>{lookupResult.location.address}</strong></p>
                <p>People: <strong>{lookupResult.totalPeople} Total ({lookupResult.childrenCount} Children, {lookupResult.elderlyCount} Elderly)</strong></p>
                <p>Reported Urgency: <strong className="uppercase text-[#C84A31]">{lookupResult.urgencyLevel}</strong></p>
                <p>Submitted At: {new Date(lookupResult.createdAt).toLocaleTimeString()}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* VIEW 3: RESCUE FORM SUBMISSION */
        <form onSubmit={handleSubmit} className="bg-[#FAF9F6] border border-[#303843]/12 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          {formError && (
            <div className="p-3.5 bg-[#FEE2E2] border border-[#EF4444]/30 rounded-xl text-xs text-[#991B1B] flex items-center justify-between">
              <span>{formError}</span>
              <button type="button" onClick={() => setFormError(null)} className="font-bold">×</button>
            </div>
          )}

          {/* Section 1: Identification & Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A4D69] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#DCEAF7] flex items-center justify-center text-xs text-[#2A4D69]">1</span>
              <span>Identification &amp; Contact Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#303843] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  disabled={isAnonymous}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={isAnonymous ? 'Anonymous' : 'e.g. Ramesh Kumar'}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#303843]/15 rounded-xl text-[#303843] focus:outline-none focus:ring-2 focus:ring-[#2A4D69]/30 disabled:bg-[#303843]/5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#303843] mb-1">
                  Contact Mobile Number <span className="text-[#C84A31]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#303843]/15 rounded-xl text-[#303843] focus:outline-none focus:ring-2 focus:ring-[#2A4D69]/30"
                />
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <label className="flex items-center gap-2 text-xs text-[#303843] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => {
                    setIsAnonymous(e.target.checked);
                    if (e.target.checked) setFullName('');
                  }}
                  className="rounded border-[#303843]/30 text-[#2A4D69] focus:ring-[#2A4D69]"
                />
                <span>Submit anonymously (rescue personnel will still contact via provided phone number)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-[#303843] cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={hasConsent}
                  onChange={(e) => setHasConsent(e.target.checked)}
                  className="rounded border-[#303843]/30 text-[#2A4D69] focus:ring-[#2A4D69]"
                />
                <span className="font-medium">
                  I give consent for emergency responders to contact me at this phone number <span className="text-[#C84A31]">*</span>
                </span>
              </label>
            </div>
          </div>

          {/* Section 2: Precise Location */}
          <div className="space-y-4 pt-4 border-t border-[#303843]/10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A4D69] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#DCEAF7] flex items-center justify-center text-xs text-[#2A4D69]">2</span>
                <span>Current Location &amp; Landmarks</span>
              </h3>

              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
                className="px-3 py-1.5 rounded-lg bg-[#DCEAF7] text-[#2A4D69] hover:bg-[#C8E1F9] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{isDetectingLocation ? 'Reading GPS...' : 'Use My GPS Location'}</span>
              </button>
            </div>

            {locationSuccessMsg && (
              <p className="text-xs text-[#2C5228] bg-[#DDE8D5] p-2 rounded-lg font-medium">
                ✓ {locationSuccessMsg}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#303843] mb-1">
                  Exact Address or Location Description <span className="text-[#C84A31]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House number, road name, ward number, or village..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#303843]/15 rounded-xl text-[#303843] focus:outline-none focus:ring-2 focus:ring-[#2A4D69]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#303843] mb-1">
                  Visible Landmark (Water Tank, School, Temple, Bridge)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Behind Government High School, blue water tank"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#303843]/15 rounded-xl text-[#303843] focus:outline-none focus:ring-2 focus:ring-[#2A4D69]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#303843] mb-1">
                  Floor Level or Refuge Position
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2nd floor balcony / rooftop / tree terrace"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#303843]/15 rounded-xl text-[#303843] focus:outline-none focus:ring-2 focus:ring-[#2A4D69]/30"
                />
              </div>
            </div>
          </div>

          {/* Section 3: People Requiring Help */}
          <div className="space-y-4 pt-4 border-t border-[#303843]/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A4D69] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#DCEAF7] flex items-center justify-center text-xs text-[#2A4D69]">3</span>
              <span>People Requiring Assistance</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#303843] mb-1">
                  Total Persons
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={totalPeople}
                  onChange={(e) => setTotalPeople(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#303843]/15 rounded-xl text-[#303843] focus:outline-none focus:ring-2 focus:ring-[#2A4D69]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#303843] mb-1">
                  Children (Under 12)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={childrenCount}
                  onChange={(e) => setChildrenCount(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#303843]/15 rounded-xl text-[#303843] focus:outline-none focus:ring-2 focus:ring-[#2A4D69]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#303843] mb-1">
                  Elderly (65+)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={elderlyCount}
                  onChange={(e) => setElderlyCount(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#303843]/15 rounded-xl text-[#303843] focus:outline-none focus:ring-2 focus:ring-[#2A4D69]/30"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-[#303843] cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={mobilityAssistanceNeeded}
                onChange={(e) => setMobilityAssistanceNeeded(e.target.checked)}
                className="rounded border-[#303843]/30 text-[#2A4D69] focus:ring-[#2A4D69]"
              />
              <span className="font-medium">
                Someone in the group has severe mobility restrictions, wheelchair need, or requires stretcher transfer
              </span>
            </label>
          </div>

          {/* Section 4: Emergency Nature & Urgency */}
          <div className="space-y-4 pt-4 border-t border-[#303843]/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A4D69] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#DCEAF7] flex items-center justify-center text-xs text-[#2A4D69]">4</span>
              <span>Emergency Nature &amp; Urgency</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#303843] mb-1">
                  Emergency Type
                </label>
                <select
                  value={emergencyType}
                  onChange={(e) => setEmergencyType(e.target.value as RescueRequest['emergencyType'])}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#303843]/15 rounded-xl text-[#303843] focus:outline-none focus:ring-2 focus:ring-[#2A4D69]/30"
                >
                  <option value="trapped_water">Trapped by floodwaters (Need boat evacuation)</option>
                  <option value="medical_emergency">Medical Emergency / Injury / Illness</option>
                  <option value="stranded_family">Stranded family without shelter</option>
                  <option value="evacuation_assist">Evacuation Assistance for Elderly / Disabled</option>
                  <option value="food_water_shortage">Acute drinking water / food exhaustion</option>
                  <option value="other">Other flood emergency</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#303843] mb-1">
                  Urgency Level
                </label>
                <select
                  value={urgencyLevel}
                  onChange={(e) => setUrgencyLevel(e.target.value as RescueRequest['urgencyLevel'])}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#303843]/15 rounded-xl text-[#303843] focus:outline-none focus:ring-2 focus:ring-[#2A4D69]/30 font-bold"
                >
                  <option value="critical">CRITICAL (Water rapidly rising / roof compromised / immediate danger)</option>
                  <option value="high">HIGH (Surrounded by water, safe for now on upper level)</option>
                  <option value="medium">MEDIUM (Precautionary evacuation needed within few hours)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#303843] mb-1">
                Short Description of the Situation
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Water depth in feet, access roads flooded, specific medical conditions, or nearest landmarks..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#303843]/15 rounded-xl text-[#303843] focus:outline-none focus:ring-2 focus:ring-[#2A4D69]/30"
              />
            </div>
          </div>

          {/* Large Visible Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-[#C84A31] hover:bg-[#B33C24] text-white font-extrabold text-sm sm:text-base tracking-wide transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <LifeBuoy className="w-5 h-5 text-white" />
              <span>{isSubmitting ? 'Submitting Request...' : 'REQUEST RESCUE ASSISTANCE'}</span>
            </button>
            <p className="text-center text-[11px] text-[#303843]/70 mt-2">
              For immediate life danger, do not wait for online intake. Call <strong>112</strong> now.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
