import React from 'react';

interface FooterProps {
  onNavClick: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavClick(id);
  };

  return (
    <footer className="bg-inverse-surface dark:bg-inverse-surface w-full py-section-gap border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop max-w-container-max mx-auto">
        
        {/* Col 1: Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-surface-container-lowest">
            <svg viewBox="0 0 100 100" className="h-8 w-8 flex-shrink-0 text-white">
              <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" fill="none" />
              <path d="M 12 32 H 38 L 50 78 L 62 32 H 88" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <text x="26" y="56" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" fontWeight="bold" textAnchor="middle" fill="currentColor">S</text>
              <text x="74" y="56" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" fontWeight="bold" textAnchor="middle" fill="currentColor">F</text>
            </svg>
            <span className="text-xl font-bold uppercase tracking-wider font-headline-md">Sri Vasavi Foundry</span>
          </div>
          <p className="text-surface-variant font-body-md text-body-md leading-relaxed text-gray-400">
            Leading manufacturer of high-quality iron castings for India's industrial backbone since 1997.
          </p>
          <div className="flex gap-4">
            <a 
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-secondary-fixed transition-all" 
              href="#about-us"
              onClick={(e) => handleLinkClick(e, 'about-us')}
              aria-label="Public info"
            >
              <span className="material-symbols-outlined text-[20px]">public</span>
            </a>
            <a 
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-secondary-fixed transition-all" 
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              aria-label="Corporate group"
            >
              <span className="material-symbols-outlined text-[20px]">group</span>
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-lg uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-3 font-body-md text-body-md flex flex-col">
            <li>
              <a 
                className="text-surface-variant text-gray-400 hover:text-secondary-fixed transition-all" 
                href="#about-us"
                onClick={(e) => handleLinkClick(e, 'about-us')}
              >
                About us
              </a>
            </li>
            <li>
              <a 
                className="text-surface-variant text-gray-400 hover:text-secondary-fixed transition-all" 
                href="#products"
                onClick={(e) => handleLinkClick(e, 'products')}
              >
                Products
              </a>
            </li>
            <li>
              <a 
                className="text-surface-variant text-gray-400 hover:text-secondary-fixed transition-all" 
                href="#infrastructure"
                onClick={(e) => handleLinkClick(e, 'infrastructure')}
              >
                Infrastructure
              </a>
            </li>
            <li>
              <a 
                className="text-surface-variant text-gray-400 hover:text-secondary-fixed transition-all" 
                href="#certifications"
                onClick={(e) => handleLinkClick(e, 'certifications')}
              >
                Certification
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Policies */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-lg uppercase tracking-wider">Policies</h4>
          <ul className="space-y-3 font-body-md text-body-md flex flex-col">
            <li><a className="text-surface-variant text-gray-400 hover:text-secondary-fixed transition-all" href="#">Privacy Policy</a></li>
            <li><a className="text-surface-variant text-gray-400 hover:text-secondary-fixed transition-all" href="#">Terms of Service</a></li>
            <li>
              <a 
                className="text-surface-variant text-gray-400 hover:text-secondary-fixed transition-all" 
                href="#certifications"
                onClick={(e) => handleLinkClick(e, 'certifications')}
              >
                ISO Certifications
              </a>
            </li>
            <li><a className="text-surface-variant text-gray-400 hover:text-secondary-fixed transition-all" href="#">Careers</a></li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-lg uppercase tracking-wider font-headline-md">Newsletter</h4>
          <p className="text-surface-variant text-sm text-gray-400 leading-relaxed">Stay updated with our latest industrial developments.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex">
            <input 
              required
              className="bg-white/10 border-0 border-b border-surface-variant text-white px-4 py-2 flex-grow focus:ring-0 focus:border-secondary text-sm focus:outline-none" 
              placeholder="Email address" 
              type="email"
            />
            <button 
              type="submit"
              className="bg-secondary px-4 py-2 text-white hover:bg-secondary-container transition-all flex items-center justify-center cursor-pointer"
              aria-label="Subscribe"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-20 pt-10 border-t border-white/5 text-center px-margin-desktop max-w-container-max mx-auto">
        <p className="text-surface-variant font-body-md text-body-md text-gray-500">© {currentYear} Sri Vasavi Foundry Pvt Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
