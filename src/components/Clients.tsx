import React from 'react';

interface Testimonial {
  logo: React.ReactNode;
  company: string;
  quote: string;
}

const Clients: React.FC<{ clients?: any[] }> = ({ clients }) => {
  const defaultTestimonials: Testimonial[] = [
    {
      logo: (
        <svg viewBox="0 0 160 50" className="h-14 w-auto">
          <g transform="translate(10, 5)">
            <path d="M 0 35 L 8 5 L 20 5 L 12 35 Z" fill="#009A44" />
            <path d="M 12 35 L 20 5 L 22 5 L 14 35 Z" fill="#005A3C" opacity="0.2" />
            <text x="28" y="24" fontFamily="Poppins, sans-serif" fontWeight="900" fontSize="16" fill="#1C1B1B" letterSpacing="-0.5">SCHWING</text>
            <text x="28" y="38" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="15" fill="#1C1B1B" letterSpacing="-0.5">Stetter</text>
          </g>
        </svg>
      ),
      company: "Schwing Stetter",
      quote: "Sri Vasavi Foundry's precision-cast components have elevated our mixer manufacturing standards. Their material strength and dimensional accuracy are consistently outstanding."
    },
    {
      logo: (
        <svg viewBox="0 0 160 50" className="h-11 w-auto">
          <g transform="translate(5, 5)">
            <text x="5" y="26" fontFamily="Poppins, sans-serif" fontWeight="bold" fontStyle="italic" fontSize="22" fill="#2E2A74" letterSpacing="0.5">PROMAN</text>
            <text x="5" y="39" fontFamily="Inter, sans-serif" fontSize="7" fill="#7A7A7A" fontWeight="bold" letterSpacing="0.1">CRUSHING SOLUTIONS BY PROFESSIONALS</text>
          </g>
        </svg>
      ),
      company: "PROMAN",
      quote: "The high-chrome cavity wear plates and cones supplied by Sri Vasavi have significantly extended the service life of our heavy industrial crushers."
    },
    {
      logo: (
        <svg viewBox="0 0 160 50" className="h-14 w-auto">
          <g transform="translate(10, 5)">
            <text x="5" y="35" fontFamily="Poppins, sans-serif" fontWeight="900" fontSize="26" fill="#0F4C81" letterSpacing="-1">JSW</text>
            <path d="M 60 22 C 75 12, 95 12, 105 18 C 90 22, 75 20, 60 22 Z" fill="#E31B23" />
            <path d="M 62 29 C 75 22, 92 22, 100 27 C 88 30, 75 29, 62 29 Z" fill="#E31B23" opacity="0.8" />
          </g>
        </svg>
      ),
      company: "JSW Steel",
      quote: "Excellent chemical stability and microstructural consistency. Their custom wear castings successfully endure severe abrasion in our mill zones."
    },
    {
      logo: (
        <svg viewBox="0 0 160 50" className="h-16 w-auto">
          <g transform="translate(15, 5)">
            <path d="M 10 38 L 22 5 L 34 38 L 28 38 L 22 20 L 16 38 Z" fill="#1E2A54" />
            <path d="M 28 14 H 55 C 58 14, 60 16, 62 20 H 26 Z" fill="#1E2A54" />
            <path d="M 24 22 H 58 C 60 22, 62 24, 63 27 H 22 Z" fill="#1E2A54" />
            <path d="M 20 30 H 60 L 59 34 H 18 Z" fill="#1E2A54" />
          </g>
        </svg>
      ),
      company: "AF",
      quote: "Reliable production scheduling and premium metallurgy. Their castings for our infrastructure projects have set a benchmark in durability."
    },
    {
      logo: (
        <svg viewBox="0 0 160 50" className="h-14 w-auto">
          <g transform="translate(10, 5)">
            <path d="M 12 5 L 5 25 H 14 L 8 40 L 22 18 H 13 Z" fill="#FF6B00" />
            <text x="28" y="26" fontFamily="Poppins, sans-serif" fontWeight="900" fontSize="18" fill="#1C1B1B" letterSpacing="1">BELVIK</text>
            <text x="28" y="37" fontFamily="Inter, sans-serif" fontSize="6.5" fill="#7A7A7A" fontWeight="bold" letterSpacing="0.2">HALLMARK OF PERFORMANCE</text>
          </g>
        </svg>
      ),
      company: "Belvik",
      quote: "Exceptional surface finishes and strict tolerance controls. Vasavi's pre-pour spectrometer checking ensures zero-defect batches."
    },
    {
      logo: (
        <svg viewBox="0 0 160 50" className="h-14 w-auto">
          <g transform="translate(10, 5)">
            <text x="5" y="26" fontFamily="Poppins, sans-serif" fontWeight="800" fontSize="24" fill="#0A2A54" letterSpacing="-0.5">DiSA</text>
            <text x="5" y="38" fontFamily="Inter, sans-serif" fontSize="7" fill="#7A7A7A" fontWeight="bold" letterSpacing="0.2">A NORICAN TECHNOLOGY</text>
          </g>
        </svg>
      ),
      company: "DISA",
      quote: "Sri Vasavi Foundry matches deep metallurgical knowledge with prompt service. Their wear components offer superior wear life profiles."
    }
  ];

  const items = clients && clients.length > 0
    ? clients.map(c => {
        const textAbbr = c.logoUrl.toUpperCase();
        let logoNode = null;
        
        if (c.logoUrl.startsWith('http') || c.logoUrl.startsWith('/')) {
          logoNode = <img src={c.logoUrl} className="max-h-full max-w-full object-contain" alt={c.company} />;
        } else {
          const matched = defaultTestimonials.find(t => t.company.toUpperCase() === textAbbr);
          if (matched) {
            logoNode = matched.logo;
          } else {
            logoNode = <span className="text-xl font-black text-secondary tracking-widest">{c.logoUrl}</span>;
          }
        }
        
        return {
          logo: logoNode,
          company: c.company,
          quote: c.quote
        };
      })
    : defaultTestimonials;

  return (
    <section className="py-16 bg-[#f4f2f1] relative border-b border-outline-variant/10 overflow-hidden" id="clients">
      {/* Light Concrete/Paper Texture effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline-md text-headline-md uppercase text-on-surface tracking-wide">Our Clients</h2>
          {/* Diagonal hash gradient divider line from screenshot */}
          <div className="w-80 h-[4px] mx-auto mt-4 bg-[repeating-linear-gradient(45deg,#f97316,#f97316_4px,transparent_4px,transparent_8px)]"></div>
        </div>

        {/* Infinite Horizontal Marquee Container */}
        <div className="relative w-full overflow-hidden select-none">
          {/* Gradient Masks for seamless edge fading */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f4f2f1] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f4f2f1] to-transparent z-20 pointer-events-none"></div>

          {/* Marquee Track */}
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-8 py-6">
            {/* Duplicated Testimonial List for Continuous Loop */}
            {[...items, ...items].map((test, idx) => (
              <div 
                key={idx}
                className="w-[420px] flex-shrink-0 bg-white rounded-brand p-8 border border-outline-variant/20 shadow-md hover:shadow-xl hover:border-secondary/30 transition-all flex flex-col items-center text-center justify-between"
              >
                {/* Logo Container */}
                <div className="w-full flex justify-center items-center h-24 mb-6 bg-surface-mist rounded-xl border border-outline-variant/10 p-4">
                  {test.logo}
                </div>

                {/* Quote Content */}
                <div className="relative w-full flex-grow flex items-center justify-center min-h-[96px]">
                  <span className="material-symbols-outlined text-secondary/5 text-[64px] absolute top-0 left-0 font-light select-none pointer-events-none">
                    format_quote
                  </span>
                  <p className="text-on-surface-variant font-body-md text-sm leading-relaxed italic relative z-10 px-4">
                    "{test.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Clients;

