import React, { useState } from 'react';
import { Shelter } from '../types';
import { INITIAL_SHELTERS } from '../data/mockData';
import {
  MapPin,
  Search,
  Phone,
  CheckCircle2,
  Navigation,
  ArrowRight,
  Shield,
  Layers,
  HeartPulse,
  Tent,
  AlertTriangle,
  X
} from 'lucide-react';

interface ShelterFinderViewProps {
  onViewOnMap: (shelterId: string) => void;
}

export const ShelterFinderView: React.FC<ShelterFinderViewProps> = ({ onViewOnMap }) => {
  const [shelters, setShelters] = useState<Shelter[]>(INITIAL_SHELTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'accessible' | 'medical' | 'high_capacity' | 'relief_camp'>('all');
  const [directionsModalShelter, setDirectionsModalShelter] = useState<Shelter | null>(null);

  // Filter logic
  const filteredShelters = shelters.filter((shelter) => {
    const matchesSearch =
      shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelter.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelter.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelter.facilities.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'accessible') return shelter.wheelchairAccessible;
    if (activeFilter === 'medical') return shelter.type === 'Hospital & Medical Centre' || shelter.facilities.some(f => f.toLowerCase().includes('medical') || f.toLowerCase().includes('doctor'));
    if (activeFilter === 'high_capacity') return shelter.capacity >= 400;
    if (activeFilter === 'relief_camp') return shelter.type === 'Official Relief Camp';

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#303843]/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#DCEAF7] text-[#2A4D69] text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Verified Safe Shelters Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#303843]">
            Find Safe Shelter &amp; Evacuation Camps
          </h1>
          <p className="text-xs sm:text-sm text-[#303843]/70 mt-1 max-w-2xl">
            Locate high-elevation community shelters, official government relief camps, and emergency trauma facilities with verified occupancy, power charging, and clean water availability.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#DDE8D5] text-[#2C5228]">
            {filteredShelters.length} Shelters Listed
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#DCEAF7] text-[#2A4D69]">
            DEMO DATA
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#303843]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by shelter name, address, landmark, or city..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF9F6] border border-[#303843]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A4D69]/30 text-[#303843] placeholder-[#303843]/40"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF9F6] border border-[#303843]/10 rounded-xl text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#2A4D69] text-white shadow-xs'
                : 'text-[#303843]/70 hover:bg-[#DCEAF7]/50'
            }`}
          >
            All Shelters
          </button>
          <button
            onClick={() => setActiveFilter('relief_camp')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeFilter === 'relief_camp'
                ? 'bg-[#DDE8D5] text-[#2C5228] font-bold shadow-xs'
                : 'text-[#303843]/70 hover:bg-[#DDE8D5]/50'
            }`}
          >
            Official Camps
          </button>
          <button
            onClick={() => setActiveFilter('medical')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeFilter === 'medical'
                ? 'bg-[#F5DDD2] text-[#8C2C1D] font-bold shadow-xs'
                : 'text-[#303843]/70 hover:bg-[#F5DDD2]/50'
            }`}
          >
            Medical / Doctors
          </button>
          <button
            onClick={() => setActiveFilter('accessible')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeFilter === 'accessible'
                ? 'bg-[#E8E1F4] text-[#4A3B69] font-bold shadow-xs'
                : 'text-[#303843]/70 hover:bg-[#E8E1F4]/50'
            }`}
          >
            Wheelchair Accessible
          </button>
          <button
            onClick={() => setActiveFilter('high_capacity')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeFilter === 'high_capacity'
                ? 'bg-[#DCEAF7] text-[#2A4D69] font-bold shadow-xs'
                : 'text-[#303843]/70 hover:bg-[#DCEAF7]/50'
            }`}
          >
            Capacity &ge; 400
          </button>
        </div>
      </div>

      {/* Shelters Grid */}
      {filteredShelters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShelters.map((shelter) => {
            const occupancyPct = Math.round((shelter.currentOccupancy / shelter.capacity) * 100);
            const isNearlyFull = occupancyPct >= 85;

            return (
              <div
                key={shelter.id}
                className="bg-[#FAF9F6] border border-[#303843]/12 rounded-2xl p-5 hover:border-[#2A4D69]/30 transition-all flex flex-col justify-between space-y-4 shadow-xs"
              >
                {/* Header: Type and Status */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#2A4D69]">
                      {shelter.type}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#303843]/10 text-[#303843]/70">
                      {shelter.lastVerified}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#303843] leading-snug">
                    {shelter.name}
                  </h3>

                  <p className="text-xs text-[#303843]/70 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#2A4D69] shrink-0" />
                    <span>{shelter.address}, {shelter.city}</span>
                  </p>
                </div>

                {/* Capacity Meter */}
                <div className="bg-[#DCEAF7]/30 rounded-xl p-3 border border-[#303843]/6 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#303843]/80">Capacity:</span>
                    <span className="font-bold text-[#303843]">
                      {shelter.currentOccupancy} / {shelter.capacity} ({occupancyPct}% full)
                    </span>
                  </div>
                  <div className="w-full bg-[#FAF9F6] rounded-full h-2 overflow-hidden border border-[#303843]/10">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isNearlyFull ? 'bg-[#C84A31]' : 'bg-[#2A4D69]'
                      }`}
                      style={{ width: `${Math.min(100, occupancyPct)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#303843]/70 pt-0.5">
                    <span>Elevation: {shelter.elevationMeters}m</span>
                    <span>{shelter.wheelchairAccessible ? 'Wheelchair Ready' : 'Standard Access'}</span>
                  </div>
                </div>

                {/* Facilities Badges */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#303843]/70 block">
                    Verified Facilities
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {shelter.facilities.slice(0, 4).map((facility, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#303843]/10 text-[#303843]"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#3B6B35]" />
                        <span>{facility}</span>
                      </span>
                    ))}
                    {shelter.facilities.length > 4 && (
                      <span className="text-[10px] text-[#303843]/60 px-1.5 py-0.5">
                        +{shelter.facilities.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#303843]/8 space-y-2">
                  <a
                    href={`tel:${shelter.contactNumber.replace(/\s+/g, '')}`}
                    className="w-full py-2 px-3 rounded-lg bg-[#DDE8D5] text-[#2C5228] font-bold text-xs hover:bg-[#CCDDC4] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call: {shelter.contactNumber}</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onViewOnMap(shelter.id)}
                      className="py-2 px-3 rounded-lg bg-[#DCEAF7] text-[#2A4D69] font-bold text-xs hover:bg-[#C8E1F9] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>View on Map</span>
                    </button>

                    <button
                      onClick={() => setDirectionsModalShelter(shelter)}
                      className="py-2 px-3 rounded-lg bg-[#2A4D69] text-white font-bold text-xs hover:bg-[#1E374B] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#FAF9F6] border border-[#303843]/10 rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
          <p className="text-sm font-semibold text-[#303843]">No shelters found matching your search</p>
          <p className="text-xs text-[#303843]/70">
            Try adjusting your search terms or selecting 'All Shelters' in the filter tabs above.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
            className="px-4 py-2 rounded-lg bg-[#2A4D69] text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Safe Directions Guidance Modal */}
      {directionsModalShelter && (
        <div className="fixed inset-0 z-50 bg-[#303843]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#303843]/15 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#303843]/10">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#C84A31]" />
                <h3 className="text-base font-bold text-[#303843]">Emergency Evacuation Route Notice</h3>
              </div>
              <button
                onClick={() => setDirectionsModalShelter(null)}
                className="text-[#303843]/60 hover:text-[#303843]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#FEE2E2] border border-[#EF4444]/30 rounded-xl p-3.5 text-xs text-[#991B1B] space-y-1">
              <p className="font-bold">LIFE SAFETY WARNING:</p>
              <p>
                Standard road navigation may route through inundated culverts or washed-away roadways. Never drive or walk through flood waters. Turn Around, Don't Drown.
              </p>
            </div>

            <div className="text-xs text-[#303843]/80 space-y-2">
              <p>
                Shelter: <strong>{directionsModalShelter.name}</strong>
              </p>
              <p>
                Address: {directionsModalShelter.address}, {directionsModalShelter.city}
              </p>
              <p>
                Phone: <strong>{directionsModalShelter.contactNumber}</strong>
              </p>
              <p className="font-semibold text-[#303843]">Recommended Evacuation Procedure:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Follow official evacuation signages posted by State Police &amp; NDRF.</li>
                <li>Stay on high ground and arterial hill ridge roads.</li>
                <li>Call <strong>112</strong> if road access is cut off and an evacuation boat is required.</li>
              </ul>
            </div>

            <div className="pt-2 flex justify-between items-center gap-2">
              <button
                onClick={() => {
                  const s = directionsModalShelter;
                  setDirectionsModalShelter(null);
                  onViewOnMap(s.id);
                }}
                className="px-4 py-2 rounded-lg bg-[#DCEAF7] text-[#2A4D69] text-xs font-bold hover:bg-[#C8E1F9]"
              >
                Locate On Map
              </button>
              <button
                onClick={() => setDirectionsModalShelter(null)}
                className="px-4 py-2 rounded-lg bg-[#303843] text-white text-xs font-semibold hover:bg-[#1E252D]"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
