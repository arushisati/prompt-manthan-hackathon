import React, { useState } from 'react';
import { INITIAL_ALERTS, SURVIVAL_KIT_ITEMS } from '../data/mockData';
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Clock,
  ArrowRight,
  Zap,
  Car,
  Droplet,
  Home,
  Info
} from 'lucide-react';

export const SafetyGuideView: React.FC = () => {
  const [alerts] = useState(INITIAL_ALERTS);
  const [checkedKitItems, setCheckedKitItems] = useState<Record<string, boolean>>({
    k1: true,
    k4: true,
    k6: true,
    k9: true
  });

  const toggleCheck = (id: string) => {
    setCheckedKitItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalItems = SURVIVAL_KIT_ITEMS.length;
  const completedCount = Object.values(checkedKitItems).filter(Boolean).length;
  const completionPct = Math.round((completedCount / totalItems) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-12">
      {/* Header */}
      <div className="border-b border-[#303843]/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#DDE8D5] text-[#2C5228] text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5 text-[#3B6B35]" />
            <span>Disaster Alerts &amp; Preparedness Protocol</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#303843]">
            Flood Safety &amp; Emergency Guide
          </h1>
          <p className="text-xs sm:text-sm text-[#303843]/70 mt-1 max-w-2xl">
            Official hydrologic warning bulletins, structured action checklists for before, during, and after a flood, and an interactive 72-hour survival kit builder.
          </p>
        </div>
      </div>

      {/* 1. Official Flood Warnings / Alert Monitor */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#C84A31]" />
            <h2 className="text-lg font-bold text-[#303843]">Official Flood Bulletins &amp; Warnings</h2>
          </div>
          <span className="text-[11px] font-semibold text-[#2A4D69] bg-[#DCEAF7] px-2.5 py-0.5 rounded">
            SAMPLE BULLETIN · DEMO SOURCE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl border transition-all ${
                alert.severity === 'High Warning'
                  ? 'bg-[#FEE2E2]/30 border-[#EF4444]/25'
                  : 'bg-[#FEF3C7]/30 border-[#F59E0B]/25'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
                    alert.severity === 'High Warning'
                      ? 'bg-[#C84A31] text-white'
                      : 'bg-[#D97706] text-white'
                  }`}
                >
                  {alert.severity}
                </span>
                <span className="text-[11px] text-[#303843]/60 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{alert.publishedAt}</span>
                </span>
              </div>

              <h3 className="font-bold text-sm text-[#303843] leading-snug">
                {alert.title}
              </h3>

              <p className="text-xs text-[#303843]/75 mt-1">
                Affected Area: <strong>{alert.affectedArea}</strong>
              </p>

              <p className="text-xs text-[#303843]/80 mt-2 leading-relaxed bg-[#FAF9F6]/80 p-2.5 rounded-xl border border-[#303843]/8">
                {alert.summary}
              </p>

              <div className="mt-3 pt-2 border-t border-[#303843]/8 text-[11px] text-[#303843]/90 flex items-center gap-1.5 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-[#C84A31] shrink-0" />
                <span>Action: {alert.actionRequired}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Interactive 72-Hour Survival Kit Builder */}
      <section className="bg-[#FAF9F6] border border-[#303843]/12 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Asset & Progress */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-[#303843]/10 shadow-sm aspect-4/3 bg-[#FAF9F6]">
              <img
                src="/src/assets/images/emergency_kit_prep_1792073108908.jpg"
                alt="Neatly arranged 72-hour emergency flood survival preparedness kit on a wooden surface"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Checklist Progress Bar */}
            <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#303843]/10 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#303843]">Kit Readiness Meter</span>
                <span className="font-mono font-bold text-[#2A4D69]">
                  {completedCount} / {totalItems} Packed ({completionPct}%)
                </span>
              </div>
              <div className="w-full bg-[#303843]/10 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-[#3B6B35] h-full rounded-full transition-all"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
              <p className="text-[11px] text-[#303843]/70">
                Pack these items into a waterproof duffle or floatable container stored on the highest accessible level of your home.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Checkbox List */}
          <div className="lg:col-span-7 space-y-3">
            <div>
              <span className="text-xs font-bold text-[#2A4D69] uppercase tracking-wider">
                Self-Reliance Checklist
              </span>
              <h3 className="text-xl font-bold text-[#303843]">
                72-Hour Flood Survival Grab-and-Go Bag
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {SURVIVAL_KIT_ITEMS.map((item) => {
                const isChecked = Boolean(checkedKitItems[item.id]);

                return (
                  <label
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-[#DDE8D5]/50 border-[#3B6B35]/30 text-[#303843]'
                        : 'bg-[#FAF9F6] border-[#303843]/12 text-[#303843]/80 hover:bg-[#DCEAF7]/30'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 rounded border-[#303843]/30 text-[#3B6B35] focus:ring-[#3B6B35]"
                    />
                    <div className="leading-snug">
                      <span className={isChecked ? 'line-through text-[#303843]/60' : 'font-medium'}>
                        {item.label}
                      </span>
                      {item.essential && (
                        <span className="block text-[10px] text-[#C84A31] font-bold mt-0.5">
                          Critical Essential
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Phased Flood Action Protocols (Before / During / After) */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#303843]">
          Step-by-Step Flood Action Protocols
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phase 1: Before */}
          <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#DCEAF7] flex items-center justify-center text-[#2A4D69] font-bold text-xs">
                01
              </div>
              <h3 className="font-bold text-base text-[#303843]">Before the Flood</h3>
            </div>
            <ul className="space-y-2 text-xs text-[#303843]/80 list-disc pl-4 leading-relaxed">
              <li>Keep battery-powered radio tuned to local IMD / District Disaster cell.</li>
              <li>Charge power banks, mobile phones, and backup torches fully.</li>
              <li>Move valuables, Aadhaar cards, and medicines to upper floor or high shelves.</li>
              <li>Clear floor-level drains and verify safe elevation of emergency shelter location.</li>
              <li>Stock non-perishable rations and at least 3 days of clean water.</li>
            </ul>
          </div>

          {/* Phase 2: During */}
          <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#F5DDD2] flex items-center justify-center text-[#C84A31] font-bold text-xs">
                02
              </div>
              <h3 className="font-bold text-base text-[#303843]">During the Flood</h3>
            </div>
            <ul className="space-y-2 text-xs text-[#303843]/80 list-disc pl-4 leading-relaxed">
              <li><strong>Turn off main power breaker &amp; LPG cylinders</strong> before water enters.</li>
              <li>Move people and pets to upper floors or rooftops immediately.</li>
              <li><strong>Never walk or drive into moving water:</strong> 6 inches knocks an adult down.</li>
              <li>Stay out of closed attics without rooftop access; you could get trapped by rising water.</li>
              <li>Signal rescue teams using bright cloths, whistles, or flashlights at night.</li>
            </ul>
          </div>

          {/* Phase 3: After */}
          <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#DDE8D5] flex items-center justify-center text-[#3B6B35] font-bold text-xs">
                03
              </div>
              <h3 className="font-bold text-base text-[#303843]">After the Flood</h3>
            </div>
            <ul className="space-y-2 text-xs text-[#303843]/80 list-disc pl-4 leading-relaxed">
              <li>Wait for official clearance before returning to submerged properties.</li>
              <li><strong>Do not switch on electricity</strong> until certified dry by an electrician.</li>
              <li>Boil tap or well water for at least 1 minute before drinking or cooking.</li>
              <li>Beware of displaced snakes, scorpions, and pests in receded mud and debris.</li>
              <li>Discard all food items that made contact with floodwaters.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Critical Warning: Turn Around Don't Drown */}
      <section className="bg-[#FEE2E2]/50 border border-[#EF4444]/25 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <Car className="w-6 h-6 text-[#991B1B]" />
          <h3 className="text-lg font-bold text-[#991B1B]">
            Vehicle Flood Safety: Turn Around, Don't Drown
          </h3>
        </div>

        <p className="text-xs text-[#303843]/80 leading-relaxed max-w-3xl">
          More than 50% of all flood-related fatalities occur in vehicles when drivers attempt to navigate submerged roads. Water obscures collapsed bridges, missing manhole covers, and underwater sinkholes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#303843]/10 text-xs">
            <span className="font-bold text-[#303843] block">6 Inches (15 cm)</span>
            <p className="text-[#303843]/70 text-[11px] mt-0.5">
              Reaches the bottom of passenger cars, causing stalling and loss of braking control.
            </p>
          </div>

          <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#303843]/10 text-xs">
            <span className="font-bold text-[#303843] block">12 Inches (30 cm)</span>
            <p className="text-[#303843]/70 text-[11px] mt-0.5">
              Floats most passenger cars, light SUVs, and hatchbacks, sweeping them into rivers.
            </p>
          </div>

          <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#303843]/10 text-xs">
            <span className="font-bold text-[#303843] block">24 Inches (60 cm)</span>
            <p className="text-[#303843]/70 text-[11px] mt-0.5">
              Sweeps away heavy pickup trucks, ambulances, and rescue vehicles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
