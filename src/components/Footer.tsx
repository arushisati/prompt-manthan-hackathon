import React from 'react';
import { Shield, PhoneCall, AlertCircle, ExternalLink } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#FAF9F6] border-t border-[#303843]/10 mt-16 pt-12 pb-8 text-[#303843]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Important Emergency Callout Strip */}
        <div className="bg-[#E8E1F4]/60 border border-[#303843]/10 rounded-xl p-5 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#E8E1F4] text-[#4A3B69] shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#303843]">Life-Threatening Emergency Protocol</h4>
              <p className="text-xs text-[#303843]/80 mt-0.5 max-w-2xl">
                DisasterShield AI is an emergency assistance and shelter-locating platform. In active flood surges or when lives are at risk, call <strong>112 (National Emergency Helpline)</strong> or <strong>1070 (State Disaster Management)</strong> directly from your phone.
              </p>
            </div>
          </div>
          <a
            href="tel:112"
            className="shrink-0 px-4 py-2 bg-[#C84A31] text-white rounded-lg text-xs font-bold hover:bg-[#B33C24] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 112 Directly</span>
          </a>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#DCEAF7] flex items-center justify-center border border-[#303843]/10">
                <Shield className="w-4 h-4 text-[#2A4D69]" />
              </div>
              <span className="font-bold text-base tracking-tight text-[#303843]">DisasterShield AI</span>
            </div>
            <p className="text-xs text-[#303843]/70 leading-relaxed">
              Find Safety. Get Help. Save Lives. Empowering citizens and emergency rescue teams with shelter coordinates, offline safety checklists, and AI-assisted disaster response.
            </p>
            <div className="pt-1">
              <span className="text-[11px] font-semibold text-[#2A4D69] bg-[#DCEAF7] px-2 py-1 rounded">
                Prototype &amp; Demonstration System
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-[#303843] uppercase tracking-wider">Navigation</h5>
            <ul className="space-y-1.5 text-xs text-[#303843]/80">
              <li>
                <button onClick={() => onSelectTab('home')} className="hover:text-[#303843] transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('map')} className="hover:text-[#303843] transition-colors">
                  Interactive Live Map
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('shelters')} className="hover:text-[#303843] transition-colors">
                  Find Safe Shelter Directory
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('rescue')} className="hover:text-[#303843] transition-colors">
                  Request Emergency Rescue
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('safety')} className="hover:text-[#303843] transition-colors">
                  Flood Preparedness Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Critical Helplines */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-[#303843] uppercase tracking-wider">Official Helplines (India)</h5>
            <ul className="space-y-1.5 text-xs text-[#303843]/80 font-mono">
              <li>
                <a href="tel:112" className="hover:underline flex items-center justify-between">
                  <span>National All-in-One:</span>
                  <span className="font-bold text-[#C84A31]">112</span>
                </a>
              </li>
              <li>
                <a href="tel:01124363260" className="hover:underline flex items-center justify-between">
                  <span>NDRF Control Room:</span>
                  <span className="font-semibold">011-24363260</span>
                </a>
              </li>
              <li>
                <a href="tel:1070" className="hover:underline flex items-center justify-between">
                  <span>State Disaster Mgmt (SDMA):</span>
                  <span className="font-semibold">1070</span>
                </a>
              </li>
              <li>
                <a href="tel:1077" className="hover:underline flex items-center justify-between">
                  <span>District Disaster (DDMA):</span>
                  <span className="font-semibold">1077</span>
                </a>
              </li>
              <li>
                <a href="tel:108" className="hover:underline flex items-center justify-between">
                  <span>Ambulance &amp; Trauma:</span>
                  <span className="font-semibold">108</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Data Disclosure & Privacy */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-[#303843] uppercase tracking-wider">Public Disclaimer</h5>
            <p className="text-[11px] text-[#303843]/70 leading-relaxed">
              Shelters, flood boundaries, and requests marked as <strong>DEMO DATA</strong> are simulated for system evaluation and training. Location access is strictly optional and only queried upon explicit user consent.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectTab('about')}
                className="text-xs text-[#2A4D69] hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>Read Verification &amp; Architecture Details</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Hairline Divider & Bottom Copyright */}
        <div className="pt-6 border-t border-[#303843]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#303843]/60 gap-4">
          <p>© {new Date().getFullYear()} DisasterShield AI. Community Flood Assistance &amp; Preparedness.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Non-Commercial Disaster Initiative</span>
            <span>·</span>
            <span>WCAG AA Accessible</span>
            <span>·</span>
            <button onClick={() => onSelectTab('about')} className="hover:text-[#303843] underline">
              About Platform
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
