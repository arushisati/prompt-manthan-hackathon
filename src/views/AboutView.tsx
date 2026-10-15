import React from 'react';
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Server,
  Layers,
  Globe,
  ExternalLink,
  PhoneCall
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-10">
      {/* Page Title */}
      <div className="border-b border-[#303843]/10 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#DCEAF7] text-[#2A4D69] text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>About DisasterShield AI</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#303843]">
          Empowering Communities in Flood Emergencies
        </h1>
        <p className="text-xs sm:text-sm text-[#303843]/70">
          Find Safety. Get Help. Save Lives.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-[#303843]">Our Mission</h2>
        <p className="text-xs sm:text-sm text-[#303843]/80 leading-relaxed">
          DisasterShield AI was conceptualized to solve the critical information gap during severe flood catastrophes. In rapidly submerging urban and rural river catchments, citizens struggle with fragmented phone lines, low digital literacy, and uncertainty about which municipal shelters have dry cots, medical doctors, and clean drinking water.
        </p>
        <p className="text-xs sm:text-sm text-[#303843]/80 leading-relaxed">
          The platform brings together interactive geographic tracking, emergency shelter directory listings, a streamlined rescue SOS intake system, and AI-powered preparedness advice in a calming, accessible pastel interface.
        </p>
      </div>

      {/* Mandatory Demo Data & Simulation Disclosures */}
      <div className="bg-[#FEE2E2]/60 border border-[#EF4444]/30 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-[#991B1B] font-bold text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>Transparent Disclosure: Prototype &amp; Demo System</span>
        </div>
        <p className="text-xs text-[#991B1B] leading-relaxed">
          In strict accordance with disaster management safety standards, DisasterShield AI maintains clear transparency regarding its current operating mode:
        </p>
        <ul className="text-xs text-[#991B1B]/90 space-y-1.5 list-disc pl-5 leading-relaxed">
          <li>
            <strong>Sample Shelter Data:</strong> The shelters, bed capacities, and flood hazard boundaries presented in the Barak Valley (Silchar, Assam) and Patna (Bihar) demo zones are illustrative sample data for design verification and training.
          </li>
          <li>
            <strong>Rescue Request Simulation:</strong> The SOS intake form records rescue requests in the platform's local database and generates reference numbers for workflow testing. It has <strong>NOT</strong> been dispatched to live NDRF or Police units.
          </li>
          <li>
            <strong>Emergency Helpline 112:</strong> If you or anyone you know is in active life-threatening peril, you must immediately dial <strong>112</strong> on your phone.
          </li>
        </ul>
      </div>

      {/* Privacy & Ethical Data Governance */}
      <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#2A4D69]" />
          <h2 className="text-lg font-bold text-[#303843]">Privacy &amp; Data Ethics</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#303843]/80">
          <div className="p-4 rounded-xl bg-[#DCEAF7]/30 border border-[#303843]/8 space-y-1">
            <span className="font-bold text-[#2A4D69] block">Permission-First Geolocation</span>
            <p>
              Your browser GPS location is never requested without your explicit tap on the "Locate Me" button. You can use the map and directory entirely anonymously with manual address entry.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#DDE8D5]/30 border border-[#303843]/8 space-y-1">
            <span className="font-bold text-[#3B6B35] block">Zero Ad-Tech &amp; Tracking</span>
            <p>
              No advertising pixels, third-party analytics trackers, or social tracking cookies are present on this site to guarantee maximum bandwidth efficiency in weak cellular environments.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Architecture */}
      <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-[#2A4D69]" />
          <h2 className="text-lg font-bold text-[#303843]">Technology Stack</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
          <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#303843]/10">
            <span className="font-bold text-[#303843] block">Frontend</span>
            <span className="text-[11px] text-[#303843]/70">React 19 + TypeScript</span>
          </div>
          <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#303843]/10">
            <span className="font-bold text-[#303843] block">Styling</span>
            <span className="text-[11px] text-[#303843]/70">Tailwind CSS (Pastel Palette)</span>
          </div>
          <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#303843]/10">
            <span className="font-bold text-[#303843] block">Mapping</span>
            <span className="text-[11px] text-[#303843]/70">Leaflet + OpenStreetMap</span>
          </div>
          <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#303843]/10">
            <span className="font-bold text-[#303843] block">AI Engine</span>
            <span className="text-[11px] text-[#303843]/70">Gemini 3.8 Flash SDK</span>
          </div>
        </div>
      </div>

      {/* Public Deployment & Vercel Instructions */}
      <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#2A4D69]" />
          <h2 className="text-lg font-bold text-[#303843]">Public Deployment &amp; Hosting Guide</h2>
        </div>
        <p className="text-xs text-[#303843]/80 leading-relaxed">
          DisasterShield AI is engineered for production deployment on modern cloud platforms such as Vercel, Google Cloud Run, or Node.js containers:
        </p>

        <div className="space-y-3 text-xs text-[#303843]/80">
          <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#303843]/10 space-y-1">
            <span className="font-bold text-[#303843] block">Deploying to Vercel:</span>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Push this repository to GitHub.</li>
              <li>In Vercel Dashboard, click <strong>Add New Project</strong> and import the repository.</li>
              <li>Framework Preset: <strong>Vite</strong>. Build Command: <code>npm run build</code>. Output Directory: <code>dist</code>.</li>
              <li>Add Environment Variable: <code>GEMINI_API_KEY</code> from your Google AI Studio secret keys.</li>
              <li>Click <strong>Deploy</strong>. Vercel provisions your production HTTPS URL (e.g. <code>https://disaster-shield-ai.vercel.app</code>).</li>
            </ol>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#303843]/10 space-y-1">
            <span className="font-bold text-[#303843] block">Current Live Preview URL:</span>
            <p className="text-[11px] text-[#2A4D69] font-mono">
              The application is active and publicly served in the current AI Studio development and preview environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
