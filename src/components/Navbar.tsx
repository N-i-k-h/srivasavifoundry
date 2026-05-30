import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onRequestQuote: () => void;
  currentPage: 'home' | 'products' | 'infrastructure' | 'about' | 'certifications' | 'contact' | 'admin';
  setCurrentPage: (page: 'home' | 'products' | 'infrastructure' | 'about' | 'certifications' | 'contact' | 'admin') => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  setActiveSection, 
  onRequestQuote,
  currentPage,
  setCurrentPage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const now = Date.now();
    
    if (now - lastClickTime > 3000) {
      setLogoClicks(1);
      setLastClickTime(now);
      handleNavClick(e, 'home');
      return;
    }

    const newCount = logoClicks + 1;
    setLastClickTime(now);
    setLogoClicks(newCount);

    if (newCount >= 10) {
      setLogoClicks(0);
      setCurrentPage('admin');
      setActiveSection('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleNavClick(e, 'home');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about-us', label: 'About us' },
    { id: 'products', label: 'Products' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (id === 'products') {
      setCurrentPage('products');
      setActiveSection('products');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'infrastructure') {
      setCurrentPage('infrastructure');
      setActiveSection('infrastructure');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'about-us') {
      setCurrentPage('about');
      setActiveSection('about-us');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'certifications') {
      setCurrentPage('certifications');
      setActiveSection('certifications');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'contact') {
      setCurrentPage('contact');
      setActiveSection('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentPage !== 'home') {
        setCurrentPage('home');
      }
      setActiveSection(id);
      
      // Delay slightly to allow React to mount the Home page sections if we were on a subpage
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, currentPage !== 'home' ? 100 : 0);
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-glass-border bg-white shadow-sm py-4`}
    >
      <nav className="flex justify-between items-center w-full px-margin-desktop max-w-container-max mx-auto">
        {/* Brand Name */}
        <div 
          onClick={handleLogoClick} 
          className="flex items-center gap-3 cursor-pointer select-none text-[#0A2A54]"
        >
          <svg viewBox="0 0 100 100" className="h-8 w-8 flex-shrink-0">
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" fill="none" />
            <path d="M 12 32 H 38 L 50 78 L 62 32 H 88" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="26" y="56" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" fontWeight="bold" textAnchor="middle" fill="currentColor">S</text>
            <text x="74" y="56" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" fontWeight="bold" textAnchor="middle" fill="currentColor">F</text>
          </svg>
          <span className="text-xl sm:text-[22px] font-bold tracking-tight font-headline-md">Sri Vasavi Foundry</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`transition-colors duration-300 font-body-md text-body-md ${
                activeSection === item.id 
                  ? 'text-secondary font-bold border-b-2 border-secondary' 
                  : 'text-on-surface hover:text-secondary'
              }`}
            >
              {item.label}
            </a>
          ))}
          <button 
            onClick={onRequestQuote}
            className="bg-tertiary text-white px-6 py-2.5 rounded-brand hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] active:scale-95 transition-all font-body-md font-bold"
          >
            Request Quote
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-md border border-[#747878]/20 text-on-surface hover:bg-black/5"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden fixed top-[72px] left-0 w-full bg-white border-t border-glass-border shadow-lg transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
        }`}
      >
        <div className="p-6 flex flex-col gap-5">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`py-2 text-sm font-medium border-b border-gray-100 ${
                activeSection === item.id 
                  ? 'text-secondary font-bold border-b-2 border-secondary' 
                  : 'text-on-surface hover:text-secondary'
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              onRequestQuote();
            }}
            className="w-full mt-3 bg-tertiary text-white py-3 rounded-brand font-bold shadow-sm"
          >
            Request Quote
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
