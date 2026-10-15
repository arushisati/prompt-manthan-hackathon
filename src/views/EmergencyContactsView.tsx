import React from 'react';
import { EMERGENCY_CONTACTS } from '../data/mockData';
import {
  PhoneCall,
  Shield,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ExternalLink,
  Info
} from 'lucide-react';

export const EmergencyContactsView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-10">
      {/* Header */}
      <div className="border-b border-[#303843]/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#F5DDD2] text-[#8C2C1D] text-xs font-semibold mb-2">
            <PhoneCall className="w-3.5 h-3.5 text-[#C84A31]" />
            <span>Official Emergency Helplines (India)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#303843]">
            Emergency Helpline Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#303843]/70 mt-1 max-w-2xl">
            Verified, direct telephone contact numbers for search-and-rescue forces, disaster control rooms, ambulance dispatch, and police.
          </p>
        </div>
      </div>

      {/* Prominent Hero Card for 112 */}
      <div className="bg-[#FAF9F6] border-2 border-[#C84A31]/30 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5DDD2]/40 rounded-full blur-2xl -mr-10 -mt-10" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-[#C84A31] text-white text-xs font-extrabold uppercase tracking-wider">
                Primary All-in-One Helpline
              </span>
              <span className="text-xs text-[#303843]/70 font-semibold">Toll-Free Across India</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#303843] tracking-tight">
              Dial 112 for All Life-Threatening Emergencies
            </h2>

            <p className="text-xs sm:text-sm text-[#303843]/80 leading-relaxed max-w-xl">
              112 is the National Emergency Response Support System (ERSS) unifying Police, Fire, Ambulance, and State Disaster Rescue under a single dispatch control room. Works even with weak cellular coverage or without balance.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#303843]/70">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3B6B35]" /> 24/7 Multi-lingual Dispatchers
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3B6B35]" /> GPS Location Triangulation
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3B6B35]" /> Free from Any Mobile or Landline
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col justify-center items-stretch md:items-end">
            <a
              href="tel:112"
              className="py-4 px-8 rounded-2xl bg-[#C84A31] hover:bg-[#B33C24] text-white font-extrabold text-lg sm:text-xl text-center shadow-md transition-all flex items-center justify-center gap-3"
            >
              <PhoneCall className="w-6 h-6 animate-pulse" />
              <span>Click to Call 112</span>
            </a>
            <span className="text-center text-[11px] text-[#303843]/70 mt-2">
              Direct connection to nearest ERSS emergency console
            </span>
          </div>
        </div>
      </div>

      {/* Structured Helplines Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A4D69] flex items-center gap-2">
          <span>Official Disaster Response &amp; Specialized Lines</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EMERGENCY_CONTACTS.map((contact) => (
            <div
              key={contact.id}
              className="bg-[#FAF9F6] border border-[#303843]/12 rounded-2xl p-5 hover:border-[#2A4D69]/30 transition-all flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#DCEAF7] text-[#2A4D69]">
                    {contact.badge}
                  </span>
                  <span className="text-[10px] text-[#303843]/60 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{contact.availableHours}</span>
                  </span>
                </div>

                <h4 className="font-bold text-base text-[#303843] leading-snug">
                  {contact.title}
                </h4>

                <p className="text-xs text-[#303843]/70 mt-1 leading-relaxed">
                  {contact.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#303843]/8">
                <a
                  href={`tel:${contact.number.replace(/[^0-9+]/g, '')}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FAF9F6] border border-[#303843]/15 text-[#303843] font-bold text-xs hover:bg-[#DCEAF7]/40 transition-colors flex items-center justify-between group"
                >
                  <span className="font-mono text-sm text-[#2A4D69] group-hover:underline">
                    {contact.number}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#2A4D69] font-semibold">
                    <span>Call Now</span>
                    <PhoneCall className="w-3.5 h-3.5" />
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What to Tell Dispatcher Guide */}
      <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-[#303843] flex items-center gap-2">
          <Info className="w-5 h-5 text-[#2A4D69]" />
          <span>What to Tell the 112 / NDRF Dispatcher During a Flood Emergency</span>
        </h3>
        <p className="text-xs text-[#303843]/75">
          Emergency phone lines during major floods experience heavy call volume. Keep your answers brief, calm, and structured:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#DCEAF7]/40 border border-[#303843]/8 space-y-1">
            <span className="text-[11px] font-bold text-[#2A4D69] uppercase">1. Location &amp; Landmark</span>
            <p className="text-xs text-[#303843]/80">
              State your city/village, colony/ward, road name, and visible high landmarks (e.g. water tower, school, bridge).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#DDE8D5]/40 border border-[#303843]/8 space-y-1">
            <span className="text-[11px] font-bold text-[#3B6B35] uppercase">2. Water Level &amp; Speed</span>
            <p className="text-xs text-[#303843]/80">
              State current water depth (e.g. knee-deep, waist-deep, ceiling) and whether water is rapidly rising or static.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#E8E1F4]/40 border border-[#303843]/8 space-y-1">
            <span className="text-[11px] font-bold text-[#5A3D80] uppercase">3. Number of People</span>
            <p className="text-xs text-[#303843]/80">
              Specify exact count of adults, infants/children, pregnant women, and elderly who require boat transport.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F5DDD2]/40 border border-[#303843]/8 space-y-1">
            <span className="text-[11px] font-bold text-[#8C2C1D] uppercase">4. Immediate Medical Needs</span>
            <p className="text-xs text-[#303843]/80">
              Report acute injuries, snakebites, insulin/oxygen needs, or hypothermia so medics bring appropriate antidotes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
