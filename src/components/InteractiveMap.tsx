import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Shelter, FloodAlert, UserLocation } from '../types';
import { INITIAL_SHELTERS, FLOOD_HAZARDS } from '../data/mockData';
import {
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  AlertTriangle,
  HeartPulse,
  Tent,
  Flame,
  CheckCircle2,
  X,
  Search,
  ExternalLink,
  Info
} from 'lucide-react';

interface InteractiveMapProps {
  initialSelectedShelterId?: string | null;
  onSelectShelter?: (shelter: Shelter) => void;
}

// Haversine formula to compute distance in km
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  initialSelectedShelterId,
  onSelectShelter
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [shelters, setShelters] = useState<Shelter[]>(INITIAL_SHELTERS);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Default center in Silchar, Assam (flood-prone Barak Valley reference zone)
    const map = L.map(mapContainerRef.current, {
      center: [24.8333, 92.7789],
      zoom: 13,
      zoomControl: false,
    });

    // Add zoom control to top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // OpenStreetMap standard tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = layerGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Set initial selected shelter if provided
  useEffect(() => {
    if (initialSelectedShelterId) {
      const match = shelters.find(s => s.id === initialSelectedShelterId);
      if (match) {
        setSelectedShelter(match);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([match.lat, match.lng], 15, { animate: true });
        }
      }
    }
  }, [initialSelectedShelterId, shelters]);

  // Recalculate distances if user location changes
  useEffect(() => {
    if (userLocation) {
      setShelters(prev =>
        prev.map(s => ({
          ...s,
          distanceKm: calculateDistanceKm(userLocation.lat, userLocation.lng, s.lat, s.lng)
        }))
      );
    }
  }, [userLocation]);

  // Render markers whenever shelters, filters, or search changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    // Filter shelters
    const filteredShelters = shelters.filter(shelter => {
      const matchesSearch =
        shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shelter.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shelter.city.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeCategory === 'all') return true;
      if (activeCategory === 'shelter') return shelter.type === 'Safe Shelter';
      if (activeCategory === 'camp') return shelter.type === 'Official Relief Camp';
      if (activeCategory === 'hospital') return shelter.type === 'Hospital & Medical Centre';
      if (activeCategory === 'response') return shelter.type === 'Emergency Response Centre';
      return true;
    });

    // Add Shelter Markers
    filteredShelters.forEach(shelter => {
      let bgColor = '#DCEAF7';
      let borderColor = '#2A4D69';
      let iconHtml = '🏠';

      if (shelter.type === 'Hospital & Medical Centre') {
        bgColor = '#F5DDD2';
        borderColor = '#C84A31';
        iconHtml = '🏥';
      } else if (shelter.type === 'Official Relief Camp') {
        bgColor = '#DDE8D5';
        borderColor = '#3B6B35';
        iconHtml = '⛺';
      } else if (shelter.type === 'Emergency Response Centre') {
        bgColor = '#E8E1F4';
        borderColor = '#5A3D80';
        iconHtml = '🛡️';
      }

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background-color: ${bgColor};
            border: 2px solid ${borderColor};
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            cursor: pointer;
            transition: transform 0.2s ease;
          " class="hover:scale-110">
            ${iconHtml}
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      const marker = L.marker([shelter.lat, shelter.lng], { icon: customIcon });

      marker.on('click', () => {
        setSelectedShelter(shelter);
        if (onSelectShelter) onSelectShelter(shelter);
        map.panTo([shelter.lat, shelter.lng]);
      });

      marker.bindTooltip(
        `<strong>${shelter.name}</strong><br/><span style="font-size:11px;color:#555;">${shelter.type} · Cap: ${shelter.capacity}</span>`,
        { direction: 'top', offset: [0, -18] }
      );

      markersLayer.addLayer(marker);
    });

    // Add Hazard Markers (if 'all' or 'hazard')
    if (activeCategory === 'all' || activeCategory === 'hazard') {
      FLOOD_HAZARDS.forEach(hazard => {
        const hazardIcon = L.divIcon({
          className: 'custom-hazard-marker',
          html: `
            <div style="
              background-color: #FEF3C7;
              border: 2px solid #D97706;
              width: 34px;
              height: 34px;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              box-shadow: 0 4px 8px rgba(0,0,0,0.12);
              cursor: pointer;
            ">
              ⚠️
            </div>
          `,
          iconSize: [34, 34],
          iconAnchor: [17, 17]
        });

        const hazardMarker = L.marker([hazard.lat, hazard.lng], { icon: hazardIcon });
        hazardMarker.bindPopup(`
          <div style="padding: 4px; font-family: sans-serif;">
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
              <span style="background: #FEE2E2; color: #991B1B; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px;">HAZARD ZONE</span>
              <span style="font-size: 10px; color: #6B7280;">DEMO DATA</span>
            </div>
            <strong style="color: #303843; font-size: 13px;">${hazard.name}</strong>
            <p style="font-size: 11px; color: #4B5563; margin-top: 4px; line-height: 1.4;">${hazard.description}</p>
            <div style="margin-top: 6px; font-size: 10px; color: #B45309; font-weight: bold;">DO NOT ENTER INUNDATED ZONE</div>
          </div>
        `);
        markersLayer.addLayer(hazardMarker);
      });
    }

  }, [shelters, activeCategory, searchQuery, onSelectShelter]);

  // Handle Geolocation with browser permissions
  const handleLocateUser = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your current browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude, accuracy } = position.coords;
        const newLoc = { lat: latitude, lng: longitude, accuracy };
        setUserLocation(newLoc);

        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 14, { animate: true });

          // Add or move user marker
          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng([latitude, longitude]);
          } else {
            const userIcon = L.divIcon({
              className: 'user-pin',
              html: `
                <div style="
                  background-color: #2563EB;
                  border: 3px solid #FFFFFF;
                  width: 22px;
                  height: 22px;
                  border-radius: 50%;
                  box-shadow: 0 0 0 5px rgba(37, 99, 235, 0.3), 0 4px 8px rgba(0,0,0,0.25);
                "></div>
              `,
              iconSize: [22, 22],
              iconAnchor: [11, 11]
            });

            const marker = L.marker([latitude, longitude], { icon: userIcon })
              .addTo(mapInstanceRef.current)
              .bindTooltip('<strong>Your Detected Location</strong>', { permanent: false, direction: 'top' });

            userMarkerRef.current = marker;
          }
        }
      },
      (error) => {
        setIsLocating(false);
        console.warn('Geolocation permission error:', error);
        let msg = 'Could not access location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was denied. You can manually enter an address or click a shelter.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location info unavailable. Defaulting to monitored flood region.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        setLocationError(msg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  return (
    <div className="relative w-full h-[640px] rounded-2xl overflow-hidden border border-[#303843]/12 shadow-sm bg-[#FAF9F6] flex flex-col md:flex-row">
      {/* Top Demo Disclosure Bar */}
      <div className="absolute top-3 left-3 right-3 md:right-auto md:max-w-md z-20 bg-[#FAF9F6]/95 backdrop-blur-md border border-[#303843]/10 px-3.5 py-2 rounded-xl shadow-xs text-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#2A4D69] bg-[#DCEAF7] px-2 py-0.5 rounded text-[11px]">
            DEMO DATA
          </span>
          <span className="text-[#303843]/80 text-[11px]">
            Barak Valley &amp; Flood Catchment Monitored Zone
          </span>
        </div>
        <button
          onClick={handleLocateUser}
          disabled={isLocating}
          className="px-2.5 py-1 rounded-md bg-[#2A4D69] text-white hover:bg-[#1E374B] text-[11px] font-semibold flex items-center gap-1 shrink-0 transition-colors"
          title="Share location to view nearest safe shelters"
        >
          <Navigation className="w-3 h-3" />
          <span>{isLocating ? 'Locating...' : 'Locate Me'}</span>
        </button>
      </div>

      {/* Main Map Canvas */}
      <div className="relative flex-1 h-full min-h-[350px]">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Floating Category Filter Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex flex-wrap gap-1.5 justify-center md:justify-start">
          <div className="pointer-events-auto bg-[#FAF9F6]/95 backdrop-blur-md p-1.5 rounded-xl border border-[#303843]/10 shadow-sm flex flex-wrap gap-1 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                activeCategory === 'all' ? 'bg-[#303843] text-white' : 'text-[#303843]/70 hover:bg-[#DCEAF7]/50'
              }`}
            >
              All Markers
            </button>
            <button
              onClick={() => setActiveCategory('shelter')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                activeCategory === 'shelter' ? 'bg-[#DCEAF7] text-[#2A4D69] font-semibold' : 'text-[#303843]/70 hover:bg-[#DCEAF7]/50'
              }`}
            >
              Safe Shelters (2)
            </button>
            <button
              onClick={() => setActiveCategory('camp')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                activeCategory === 'camp' ? 'bg-[#DDE8D5] text-[#3B6B35] font-semibold' : 'text-[#303843]/70 hover:bg-[#DDE8D5]/50'
              }`}
            >
              Relief Camps (2)
            </button>
            <button
              onClick={() => setActiveCategory('hospital')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                activeCategory === 'hospital' ? 'bg-[#F5DDD2] text-[#8C2C1D] font-semibold' : 'text-[#303843]/70 hover:bg-[#F5DDD2]/50'
              }`}
            >
              Hospitals (1)
            </button>
            <button
              onClick={() => setActiveCategory('hazard')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                activeCategory === 'hazard' ? 'bg-[#FEF3C7] text-[#92400E] font-semibold' : 'text-[#303843]/70 hover:bg-[#FEF3C7]/50'
              }`}
            >
              Hazards (2)
            </button>
          </div>
        </div>

        {/* Location Error Toast */}
        {locationError && (
          <div className="absolute top-16 left-3 right-3 md:left-4 md:right-auto md:max-w-sm z-30 bg-[#FEE2E2] border border-[#EF4444]/30 text-[#991B1B] text-xs px-3.5 py-2.5 rounded-xl shadow-md flex items-center justify-between gap-2">
            <span>{locationError}</span>
            <button onClick={() => setLocationError(null)} className="font-bold text-sm">×</button>
          </div>
        )}
      </div>

      {/* Shelter Details Sidebar / Drawer */}
      <div className="w-full md:w-96 bg-[#FAF9F6] border-t md:border-t-0 md:border-l border-[#303843]/10 p-5 overflow-y-auto flex flex-col justify-between shrink-0 max-h-[380px] md:max-h-full">
        {selectedShelter ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#2A4D69]">
                  {selectedShelter.type}
                </span>
                <h3 className="text-base font-bold text-[#303843] leading-snug mt-0.5">
                  {selectedShelter.name}
                </h3>
                <p className="text-xs text-[#303843]/70 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2A4D69] shrink-0" />
                  <span>{selectedShelter.address}, {selectedShelter.city}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedShelter(null)}
                className="p-1.5 rounded-lg text-[#303843]/60 hover:text-[#303843] hover:bg-[#303843]/5"
                aria-label="Close shelter details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Occupancy and Elevation Metric */}
            <div className="bg-[#DCEAF7]/40 rounded-xl p-3 border border-[#303843]/8 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#303843]/80">Occupancy &amp; Capacity:</span>
                <span className="font-semibold text-[#303843]">
                  {selectedShelter.currentOccupancy} / {selectedShelter.capacity} people
                </span>
              </div>
              <div className="w-full bg-[#FAF9F6] rounded-full h-2 overflow-hidden border border-[#303843]/10">
                <div
                  className="bg-[#2A4D69] h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, Math.round((selectedShelter.currentOccupancy / selectedShelter.capacity) * 100))}%`
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#303843]/70 pt-0.5">
                <span>Elevation: {selectedShelter.elevationMeters}m (Safe above river flood stage)</span>
                {selectedShelter.distanceKm !== undefined && (
                  <span className="font-semibold text-[#2A4D69]">
                    {selectedShelter.distanceKm} km away
                  </span>
                )}
              </div>
            </div>

            {/* Verified Facilities */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#303843]/80 mb-2">
                Available Verified Facilities
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedShelter.facilities.map((fac, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#303843]/12 text-[#303843]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#3B6B35]" />
                    <span>{fac}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Accessibility and Last Verified */}
            <div className="pt-2 border-t border-[#303843]/8 text-xs text-[#303843]/70 space-y-1">
              <div className="flex justify-between">
                <span>Wheelchair Accessible:</span>
                <span className="font-medium text-[#303843]">
                  {selectedShelter.wheelchairAccessible ? 'Yes (Ramp & Ground Floor Cots)' : 'Assistance Needed'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last Status Verification:</span>
                <span className="font-medium text-[#303843]">{selectedShelter.lastVerified}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${selectedShelter.contactNumber.replace(/\s+/g, '')}`}
                className="w-full py-2.5 px-4 rounded-xl bg-[#DDE8D5] text-[#2C5228] font-bold text-xs hover:bg-[#CCDDC4] transition-colors flex items-center justify-center gap-2 border border-[#303843]/10"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Shelter Contact ({selectedShelter.contactNumber})</span>
              </a>

              <button
                onClick={() => setShowDirectionsModal(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#2A4D69] text-white font-bold text-xs hover:bg-[#1E374B] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>View Safe Evacuation Directions</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center text-center p-4 space-y-3 text-[#303843]/70">
            <div className="w-12 h-12 rounded-full bg-[#DCEAF7] flex items-center justify-center text-[#2A4D69]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#303843]">Select a Location on the Map</h4>
              <p className="text-xs text-[#303843]/70 mt-1 max-w-xs">
                Click on any shelter, hospital, or relief camp icon on the map to view real-time occupancy, contact numbers, and amenities.
              </p>
            </div>
            <div className="pt-2 text-left w-full border-t border-[#303843]/10 space-y-1.5 text-xs">
              <span className="font-bold text-[#303843] block">Map Legend:</span>
              <div className="flex items-center gap-2 text-[11px]">
                <span>🏠 Safe Shelter (Elevated municipal hall)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span>⛺ Official Relief Camp (NDRF / SDMA)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span>🏥 Trauma Centre / Hospital</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span>⚠️ Submerged Road / Hazard Zone</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Safe Directions Guidance Modal */}
      {showDirectionsModal && selectedShelter && (
        <div className="fixed inset-0 z-50 bg-[#303843]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#303843]/15 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#303843]/10">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#C84A31]" />
                <h3 className="text-base font-bold text-[#303843]">Safe Evacuation Route Guidance</h3>
              </div>
              <button
                onClick={() => setShowDirectionsModal(false)}
                className="text-[#303843]/60 hover:text-[#303843]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Critical Non-Negotiable Flood Warning */}
            <div className="bg-[#FEE2E2] border border-[#EF4444]/30 rounded-xl p-3.5 text-xs text-[#991B1B] space-y-1.5">
              <p className="font-bold">CRITICAL FLOOD ROUTE NOTICE:</p>
              <p>
                Standard commercial GPS routing does NOT detect real-time submerged roads, washed-out culverts, or high-voltage fallen wires. Never drive or walk through standing or moving floodwater.
              </p>
            </div>

            <div className="text-xs text-[#303843]/80 space-y-2">
              <p>
                Target Destination: <strong>{selectedShelter.name}</strong> ({selectedShelter.address})
              </p>
              <p className="font-semibold text-[#303843]">Follow these life-saving rules:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Follow the marked evacuation corridors designated by local police and NDRF rescue officers.</li>
                <li>Stay on elevated arterial ridge roads; avoid underpasses and riverbank embankments.</li>
                <li>Wear a life jacket or carry an inflated tyre tube if available.</li>
                <li>If moving by foot, use a wooden stick to test the ground depth and solidity before each step.</li>
              </ul>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowDirectionsModal(false)}
                className="px-4 py-2 rounded-lg bg-[#303843] text-white text-xs font-semibold hover:bg-[#1E252D]"
              >
                I Understand &amp; Will Follow Official Guides
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
