import React from 'react';
import {
  Shield,
  MapPin,
  LifeBuoy,
  PhoneCall,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  Radio,
  FileText,
  Clock,
  Compass
} from 'lucide-react';
import { InteractiveMap } from '../components/InteractiveMap';
import { Shelter } from '../types';

interface HomeViewProps {
  onNavigate: (tab: string, shelterId?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline and Call-to-Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#DCEAF7] border border-[#303843]/10 text-xs font-semibold text-[#2A4D69]">
                <Shield className="w-3.5 h-3.5" />
                <span>Flood Emergency &amp; Rescue Assistance Platform</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#303843] leading-[1.15] text-balance">
                When Floods Rise, <br className="hidden sm:inline" />
                <span className="text-[#2A4D69]">Find Your Way to Safety.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#303843]/80 leading-relaxed max-w-2xl">
                DisasterShield AI connects flood-affected families and individuals with nearby high-ground safe shelters, verified emergency response helplines, rescue request tracking, and actionable AI preparedness guidance.
              </p>

              {/* Two Prominent Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('shelters')}
                  className="px-6 py-3.5 rounded-xl bg-[#2A4D69] text-white font-bold text-sm hover:bg-[#1E374B] transition-colors shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Find Safe Shelter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('rescue')}
                  className="px-6 py-3.5 rounded-xl bg-[#F5DDD2] text-[#8C2C1D] border border-[#F0BCAB] font-bold text-sm hover:bg-[#ECCBC0] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LifeBuoy className="w-4 h-4 text-[#C84A31]" />
                  <span>Request Emergency Help</span>
                </button>
              </div>

              {/* Key Trust & Accessibility Markers */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#303843]/70">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3B6B35]" />
                  <span>Verified Shelter Locations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3B6B35]" />
                  <span>Offline Survival Guidance</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3B6B35]" />
                  <span>National 112 Integration</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#303843]/12 shadow-md aspect-16/10 bg-[#DCEAF7]/30">
                <img
                  src="/src/assets/images/hero_flood_rescue_1792073108024.jpg"
                  alt="Humanitarian emergency flood rescue operation guiding residents safely across floodwater"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <p className="text-white text-xs font-medium drop-shadow-sm">
                    Humanitarian Rescue Operations · Rapid Field Evacuation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Quick-Dial Lifeline Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-2xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5DDD2] flex items-center justify-center text-[#C84A31] shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#C84A31] uppercase tracking-wider block">Immediate Danger?</span>
              <span className="text-sm font-bold text-[#303843]">Direct Emergency Lines</span>
            </div>
          </div>

          {/* 112 */}
          <a
            href="tel:112"
            className="flex items-center justify-between p-3 rounded-xl bg-[#FEE2E2]/60 border border-[#EF4444]/20 hover:bg-[#FEE2E2] transition-colors text-xs"
          >
            <div>
              <span className="font-bold text-[#991B1B] text-sm block">112</span>
              <span className="text-[#303843]/70 text-[11px]">All-in-One Helpline</span>
            </div>
            <PhoneCall className="w-4 h-4 text-[#991B1B]" />
          </a>

          {/* NDRF */}
          <a
            href="tel:01124363260"
            className="flex items-center justify-between p-3 rounded-xl bg-[#DCEAF7]/60 border border-[#2A4D69]/15 hover:bg-[#DCEAF7] transition-colors text-xs"
          >
            <div>
              <span className="font-bold text-[#2A4D69] text-xs block">011-24363260</span>
              <span className="text-[#303843]/70 text-[11px]">NDRF Flood Rescue HQ</span>
            </div>
            <PhoneCall className="w-4 h-4 text-[#2A4D69]" />
          </a>

          {/* State Disaster Mgmt */}
          <a
            href="tel:1070"
            className="flex items-center justify-between p-3 rounded-xl bg-[#DDE8D5]/60 border border-[#3B6B35]/20 hover:bg-[#DDE8D5] transition-colors text-xs"
          >
            <div>
              <span className="font-bold text-[#2C5228] text-sm block">1070</span>
              <span className="text-[#303843]/70 text-[11px]">State Disaster Control (Toll-Free)</span>
            </div>
            <PhoneCall className="w-4 h-4 text-[#2C5228]" />
          </a>
        </div>
      </section>

      {/* Map Preview & Tracker Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-[#2A4D69] tracking-wider uppercase">Live Safety Map</span>
            <h2 className="text-2xl font-bold text-[#303843] tracking-tight">
              Interactive Flood Zone &amp; Shelter Locator
            </h2>
            <p className="text-xs text-[#303843]/75 mt-0.5">
              Locate elevated safe shelters, relief camps, emergency trauma hospitals, and verified road hazard markers.
            </p>
          </div>
          <button
            onClick={() => onNavigate('map')}
            className="text-xs font-bold text-[#2A4D69] hover:underline flex items-center gap-1 shrink-0 self-start sm:self-auto"
          >
            <span>Open Fullscreen Map View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Embedded Interactive Map */}
        <InteractiveMap onSelectShelter={(shelter) => onNavigate('shelters', shelter.id)} />
      </section>

      {/* Four Core Pillars / Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#2A4D69] tracking-wider uppercase">Platform Capabilities</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#303843]">
            Comprehensive Flood Emergency Assistance
          </h2>
          <p className="text-xs sm:text-sm text-[#303843]/75">
            Designed for high accessibility under intermittent network connectivity and stressful emergency conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Shelter Finder */}
          <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-2xl p-5 hover:border-[#2A4D69]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#DCEAF7] flex items-center justify-center text-[#2A4D69]">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#303843]">Safe Shelter Finder</h3>
              <p className="text-xs text-[#303843]/75 leading-relaxed">
                Filter by medical support, clean water, pet admittance, wheelchair ramps, and real-time bed capacity.
              </p>
            </div>
            <button
              onClick={() => onNavigate('shelters')}
              className="mt-4 pt-3 border-t border-[#303843]/8 text-xs font-bold text-[#2A4D69] hover:underline flex items-center gap-1"
            >
              <span>Explore Directory</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 2: SOS Request System */}
          <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-2xl p-5 hover:border-[#C84A31]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5DDD2] flex items-center justify-center text-[#C84A31]">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#303843]">Rescue Assistance SOS</h3>
              <p className="text-xs text-[#303843]/75 leading-relaxed">
                Log stranded person counts, children/elderly medical needs, and track response status with a unique reference number.
              </p>
            </div>
            <button
              onClick={() => onNavigate('rescue')}
              className="mt-4 pt-3 border-t border-[#303843]/8 text-xs font-bold text-[#C84A31] hover:underline flex items-center gap-1"
            >
              <span>Submit Rescue SOS</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 3: AI Safety Assistant */}
          <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-2xl p-5 hover:border-[#5A3D80]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8E1F4] flex items-center justify-center text-[#5A3D80]">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#303843]">AI Safety Assistant</h3>
              <p className="text-xs text-[#303843]/75 leading-relaxed">
                Powered by Gemini. Get calm, instant guidance on kit checklists, water purification, and rooftop signaling.
              </p>
            </div>
            <button
              onClick={() => onNavigate('assistant')}
              className="mt-4 pt-3 border-t border-[#303843]/8 text-xs font-bold text-[#5A3D80] hover:underline flex items-center gap-1"
            >
              <span>Ask AI Assistant</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 4: Official Contacts */}
          <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-2xl p-5 hover:border-[#3B6B35]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#DDE8D5] flex items-center justify-center text-[#3B6B35]">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#303843]">Emergency Helplines</h3>
              <p className="text-xs text-[#303843]/75 leading-relaxed">
                Verified click-to-call numbers for India 112, NDRF HQ, SDMA State desks, and district ambulance dispatchers.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contacts')}
              className="mt-4 pt-3 border-t border-[#303843]/8 text-xs font-bold text-[#3B6B35] hover:underline flex items-center gap-1"
            >
              <span>View Helplines</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Visual Bento & Preparedness Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual 1: Community Safe Shelter Image */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#303843]/10 shadow-sm aspect-4/3 bg-[#FAF9F6]">
                <img
                  src="/src/assets/images/shelter_safehouse_1792073107664.jpg"
                  alt="Organized community flood evacuation safehouse interior with clean cots and first aid supplies"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[#303843]/70">
                <span>Verified Evacuation Camps</span>
                <span>·</span>
                <span>Clean Water &amp; Medical First Aid</span>
                <span>·</span>
                <span>24/7 Security</span>
              </div>
            </div>

            {/* Visual 2: Emergency Kit & Checklist Callout */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-[#3B6B35] bg-[#DDE8D5] px-2.5 py-1 rounded">
                Preparedness Saves Lives
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#303843] tracking-tight">
                Pack Your 72-Hour Survival Kit Before Waters Rise
              </h3>

              <p className="text-sm text-[#303843]/80 leading-relaxed">
                When flood warnings are announced, immediate self-reliance for 72 hours is crucial while search-and-rescue teams mobilize across severed roads.
              </p>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs text-[#303843]">
                  <CheckCircle2 className="w-4 h-4 text-[#3B6B35] shrink-0 mt-0.5" />
                  <span><strong>3 Liters of Water / Person / Day:</strong> Keep sealed bottles in higher floor storage.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#303843]">
                  <CheckCircle2 className="w-4 h-4 text-[#3B6B35] shrink-0 mt-0.5" />
                  <span><strong>Waterproof Document Pouch:</strong> Store Aadhaar, medical prescriptions, and insurance papers.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#303843]">
                  <CheckCircle2 className="w-4 h-4 text-[#3B6B35] shrink-0 mt-0.5" />
                  <span><strong>Signaling Whistle &amp; Torch:</strong> Whistles travel twice as far as voices over rushing waters.</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => onNavigate('safety')}
                  className="px-5 py-2.5 rounded-xl bg-[#303843] text-white font-bold text-xs hover:bg-[#1E252D] transition-colors flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Open Interactive 72-Hour Checklist</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
