import React, { useState } from 'react';
import { Shield, Menu, X, PhoneCall, AlertTriangle } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'map', label: 'Live Map' },
    { id: 'shelters', label: 'Find Shelter' },
    { id: 'rescue', label: 'Request Rescue' },
    { id: 'safety', label: 'Safety Guide' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'assistant', label: 'AI Assistant' },
    { id: 'about', label: 'About' }
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#303843]/10">
      {/* Top Emergency Lifeline Banner */}
      <div className="bg-[#F5DDD2] px-4 py-1.5 border-b border-[#303843]/8 text-xs text-[#303843] flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-[#C84A31] shrink-0" />
            <span className="font-semibold text-[#303843]">Life-Threatening Emergency?</span>
            <span className="hidden sm:inline text-[#303843]/80">Dial national all-in-one emergency service immediately:</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:112"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-bold text-xs bg-[#C84A31] text-white hover:bg-[#B33C24] transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Call 112</span>
            </a>
            <span className="text-xs text-[#303843]/70 hidden md:inline">24/7 National Emergency</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar: Strictly 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-[#DCEAF7] flex items-center justify-center border border-[#303843]/10 group-hover:bg-[#C8E1F9] transition-colors">
            <Shield className="w-5 h-5 text-[#2A4D69]" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-[#303843] whitespace-nowrap">
            DisasterShield AI
          </span>
        </button>

        {/* Zone 2: Nav Links (Clean typography, whitespace-nowrap) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#303843]/80">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-[#303843] font-semibold'
                    : 'text-[#303843]/70 hover:text-[#303843]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2A4D69] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (Rescue SOS trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('rescue')}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#F5DDD2] text-[#8C2C1D] border border-[#F0BCAB] hover:bg-[#ECCBC0] transition-colors shadow-xs whitespace-nowrap flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#C84A31]" />
            <span>SOS Rescue Request</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#303843] hover:bg-[#DCEAF7]/50 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] border-b border-[#303843]/10 px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentTab === item.id
                  ? 'bg-[#DCEAF7] text-[#303843] font-semibold'
                  : 'text-[#303843]/80 hover:bg-[#DCEAF7]/40'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#303843]/10 flex flex-col gap-2">
            <a
              href="tel:112"
              className="w-full py-2.5 px-4 text-center text-sm font-bold text-white bg-[#C84A31] rounded-lg flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Emergency 112 (Toll-Free)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
