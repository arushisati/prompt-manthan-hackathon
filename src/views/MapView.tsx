import React from 'react';
import { InteractiveMap } from '../components/InteractiveMap';
import { Shield, AlertTriangle, Info, MapPin } from 'lucide-react';

interface MapViewProps {
  onNavigateToShelters?: (shelterId?: string) => void;
  onNavigateToRescue?: () => void;
}

export const MapView: React.FC<MapViewProps> = ({ onNavigateToShelters, onNavigateToRescue }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#303843]/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#DCEAF7] text-[#2A4D69] text-xs font-semibold mb-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Live Interactive Safety Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#303843]">
            Flood Catchment &amp; Safe Shelter Map
          </h1>
          <p className="text-xs sm:text-sm text-[#303843]/70 mt-1 max-w-2xl">
            View verified safe shelters, official relief camps, medical trauma hospitals, and active waterlogging hazard zones. Request directions only along secured evacuation corridors.
          </p>
        </div>

        {/* SOS Shortcut */}
        <div className="flex items-center gap-3">
          {onNavigateToRescue && (
            <button
              onClick={onNavigateToRescue}
              className="px-4 py-2 rounded-xl bg-[#F5DDD2] text-[#8C2C1D] border border-[#F0BCAB] font-bold text-xs hover:bg-[#ECCBC0] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#C84A31]" />
              <span>Stranded? Request Rescue</span>
            </button>
          )}
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-xl p-3.5 flex items-start gap-3 text-xs text-[#303843]/80">
        <Info className="w-4 h-4 text-[#2A4D69] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold text-[#303843]">Reliability &amp; Safety Disclaimer:</span>
          <p className="text-[#303843]/70">
            Locations shown are marked with <strong>DEMO DATA</strong> for interface testing and training. Never attempt crossing water higher than knee level or traversing submerged bridges. In life-threatening emergencies, dial <strong>112</strong> immediately.
          </p>
        </div>
      </div>

      {/* Interactive Map Component */}
      <div className="h-[680px]">
        <InteractiveMap />
      </div>
    </div>
  );
};
