import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { MapView } from './views/MapView';
import { ShelterFinderView } from './views/ShelterFinderView';
import { RescueRequestView } from './views/RescueRequestView';
import { EmergencyContactsView } from './views/EmergencyContactsView';
import { AiAssistantView } from './views/AiAssistantView';
import { SafetyGuideView } from './views/SafetyGuideView';
import { AboutView } from './views/AboutView';
import { LifeBuoy, PhoneCall } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedShelterForMap, setSelectedShelterForMap] = useState<string | null>(null);

  const handleNavigate = (tab: string, shelterId?: string) => {
    if (shelterId) {
      setSelectedShelterForMap(shelterId);
      setCurrentTab('map');
    } else {
      setCurrentTab(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewShelterOnMap = (shelterId: string) => {
    setSelectedShelterForMap(shelterId);
    setCurrentTab('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#303843] flex flex-col font-sans selection:bg-[#DCEAF7] selection:text-[#303843]">
      {/* Top Navigation */}
      <Navbar currentTab={currentTab} onSelectTab={handleNavigate} />

      {/* Main View Container */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView onNavigate={handleNavigate} />
        )}
        {currentTab === 'map' && (
          <MapView
            onNavigateToShelters={(id) => handleNavigate('shelters', id)}
            onNavigateToRescue={() => handleNavigate('rescue')}
          />
        )}
        {currentTab === 'shelters' && (
          <ShelterFinderView onViewOnMap={handleViewShelterOnMap} />
        )}
        {currentTab === 'rescue' && (
          <RescueRequestView />
        )}
        {currentTab === 'contacts' && (
          <EmergencyContactsView />
        )}
        {currentTab === 'assistant' && (
          <AiAssistantView />
        )}
        {currentTab === 'safety' && (
          <SafetyGuideView />
        )}
        {currentTab === 'about' && (
          <AboutView />
        )}
      </main>

      {/* Quick Floating Emergency SOS Button on mobile/tablet */}
      <div className="fixed bottom-4 right-4 z-40 sm:hidden">
        <button
          onClick={() => handleNavigate('rescue')}
          className="px-4 py-3 rounded-full bg-[#C84A31] text-white font-bold text-xs shadow-lg hover:bg-[#B33C24] transition-all flex items-center gap-2"
          aria-label="Quick SOS Rescue Request"
        >
          <LifeBuoy className="w-4 h-4 animate-spin [animation-duration:8s]" />
          <span>SOS Help</span>
        </button>
      </div>

      {/* Quiet Footer with verified helplines & disclaimers */}
      <Footer onSelectTab={handleNavigate} />
    </div>
  );
}
