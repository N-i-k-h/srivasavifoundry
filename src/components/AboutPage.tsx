import React from 'react';
import patternImg from '../assets/pattern_stage.jpg';
import fettlingImg from '../assets/fettling_stage.jpg';
import empOpsImg from '../assets/employee_operations.png';
import empQualImg from '../assets/employee_quality.png';
import empMetImg from '../assets/employee_metallurgist.png';

interface AboutPageProps {
  onRequestQuote: () => void;
  onNavigateHome: (sectionId: string) => void;
  ceo?: { quote: string; imageUrl: string };
  employees?: { name: string; role: string; imageUrl: string }[];
}

const AboutPage: React.FC<AboutPageProps> = ({ onRequestQuote, onNavigateHome, ceo, employees }) => {
  const staticEmployees = [
    {
      name: "Rajesh Kumar",
      role: "Foundry Operations Manager",
      phone: "+91 98450 56825",
      img: empOpsImg
    },
    {
      name: "Murali Krishna",
      role: "Head of Quality Control",
      phone: "+91 94481 43242",
      img: empQualImg
    },
    {
      name: "Anand Rao",
      role: "Senior Casting Engineer",
      phone: "+91 98450 56825",
      img: empMetImg
    }
  ];

  const displayEmployees = employees && employees.length > 0
    ? employees.map((e, index) => ({
        name: e.name,
        role: e.role,
        img: e.imageUrl,
        phone: index === 1 ? "+91 94481 43242" : "+91 98450 56825"
      }))
    : staticEmployees;

  return (
    <div className="pt-20">
      {/* Section 1: Hero Editorial */}
      <section 
        className="relative py-16 md:py-28 px-margin-desktop bg-cover bg-center overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(252, 248, 248, 0.98) 35%, rgba(252, 248, 248, 0.85) 60%, rgba(252, 248, 248, 0.2) 100%), url(${patternImg})` 
        }}
      >
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container/20 text-secondary font-label-caps text-xs uppercase tracking-widest font-bold">Est. 1997</span>
              <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-on-surface font-bold uppercase">
                Mastery in the art of <br/>
                <span className="text-secondary">Manufacturing.</span>
              </h1>
            </div>
            <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed">
              Sri Vasavi Foundry stands at the intersection of traditional casting heritage and high-tech precision engineering. Proficient in product development with a commitment to flawless outcomes.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => onNavigateHome('infrastructure')}
                className="bg-inverse-surface text-inverse-on-surface px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all flex items-center gap-3 group cursor-pointer text-xs uppercase tracking-wider font-bold"
              >
                Explore Infrastructure
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <a 
                href="mailto:info@vasavifoundry.in"
                className="border-2 border-outline/25 bg-white/40 px-8 py-4 rounded-full font-bold hover:bg-surface-container transition-all flex items-center justify-center cursor-pointer text-xs uppercase tracking-wider font-bold text-on-surface"
              >
                Download Portfolio
              </a>
            </div>
          </div>
        </div>
        {/* Subtle caption bottom right */}
        <div className="absolute bottom-4 right-8 text-on-surface-variant/70 font-label-caps text-[9px] uppercase tracking-wider font-bold hidden md:block">
          Factory Pattern Stage | Bhadravathi
        </div>
      </section>

      {/* Section 2: Heritage Grid */}
      <section className="hidden md:block py-14 px-margin-desktop max-w-container-max mx-auto border-t border-outline-variant/30">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 space-y-6">
            <h2 className="font-headline-md text-2xl md:text-3xl text-on-surface font-bold uppercase leading-tight">25 Years of <br/>Undefeated Success</h2>
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
              Located in Bhadravathi, the historic 'Steel Town', we carry forward a legacy of industrial precision from a modest beginning to a 400-ton per annum capacity.
            </p>
          </div>
          
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface-container p-8 rounded-[24px] space-y-3">
              <span className="text-secondary font-display-lg text-4xl font-bold block">25+</span>
              <p className="font-label-caps text-[10px] text-on-surface-variant uppercase font-bold leading-relaxed">Years of expertise in High-Chrome castings</p>
            </div>
            <div className="bg-secondary text-white p-8 rounded-[24px] space-y-3 shadow-md">
              <span className="font-display-lg text-4xl font-bold block">400</span>
              <p className="font-label-caps text-[10px] text-white/80 uppercase font-bold leading-relaxed">Tons per annum manufacturing capacity</p>
            </div>
            <div className="bg-surface-container p-8 rounded-[24px] space-y-3">
              <span className="text-secondary font-display-lg text-4xl font-bold block">ISO</span>
              <p className="font-label-caps text-[10px] text-on-surface-variant uppercase font-bold leading-relaxed">9001:2015 certified quality systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: CEO Premium Perspective */}
      <section className="bg-inverse-surface py-14 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-molten-orange/5 blur-[150px] -z-0"></div>
        <div className="px-margin-desktop max-w-container-max mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative aspect-[4/5] max-w-md w-full mx-auto">
              <div className="absolute inset-0 border-2 border-molten-orange/30 translate-x-4 translate-y-4 rounded-3xl"></div>
              <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl bg-[#1c1b1b]">
                <img 
                  alt="Suresh M, CEO" 
                  className="w-full h-full object-cover filter brightness-90 grayscale hover:grayscale-0 transition-all duration-1000" 
                  src={ceo?.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuD_oLDTH9kK5pZm9gil780JuQSDRlVS8SNgyUAuJ_v4kdesPjLBO-VdQxpta6tLDXtzUj2iZmeJYfmfzOq7c_B0YdzOI5eL5z5e3VHbsBe1v9X9PPLqYlZIal5Y4RGif_IIqv0l236gatx8pR7nrepWYxLc2obDeygf0233BRKFImQdrllSflmOm274ZdPsPhQtRyiMa9a-Dtxu3UDd-9QuD8FqOMtzKognmgbmctbK3R3RF4Y2ET-R2vgSNNmCVHolgMOEYBzVyxxC"}
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <h4 className="text-white font-headline-sm text-lg font-bold uppercase mb-1">Suresh M</h4>
                  <p className="text-molten-orange font-label-caps uppercase tracking-widest text-xs font-bold">Chief Executive Officer</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-0.5 bg-molten-orange"></div>
                  <span className="font-label-caps uppercase tracking-[0.2em] text-white/50 text-[10px] font-bold">Our CEO Says</span>
                </div>
                <h2 className="font-display-lg text-3xl md:text-4xl text-white font-bold uppercase leading-tight">The Secret of Success: <span className="text-molten-orange italic">Service.</span></h2>
              </div>
              <div className="quote-accent space-y-6">
                <p className="text-white/95 font-body-lg text-lg md:text-xl italic leading-relaxed pl-6 border-l-4 border-molten-orange">
                  "{ceo?.quote || "At Sri Vasavi Foundry Private Limited, we believe in the power of service. It's not just about satisfying our customers or making a profit; it's about doing both."}"
                </p>
                {!ceo?.quote && (
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                    "We understand that true success lies in providing valuable solutions that exceed expectations. Join us in embracing the secret of success that enables us to thrive in business."
                  </p>
                )}
              </div>
              <button 
                onClick={onRequestQuote}
                className="bg-molten-orange text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-molten-orange/20 cursor-pointer text-xs uppercase tracking-wider font-bold"
              >
                Connect with Leadership
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Section: Our Employees (NEW - Directly after CEO says) */}
      <section className="py-14 bg-surface-mist">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em] block">Our Professionals</span>
            <h2 className="font-headline-md text-2xl md:text-3xl text-on-surface font-bold uppercase">Our Engineering & Leadership Team</h2>
            <div className="w-24 h-1 bg-molten-orange mx-auto"></div>
            <p className="text-on-surface-variant text-sm">Meet the dedicated metallurgical experts and supervisors directing the precision casting work at Sri Vasavi Foundry.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {displayEmployees.map((emp, idx) => (
              <div key={idx} className="bg-white rounded-[24px] overflow-hidden border border-outline-variant/30 shadow-sm flex flex-col group hover:shadow-lg transition-all duration-300">
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <img 
                    alt={emp.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    src={emp.img}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <p className="text-white font-bold text-lg uppercase tracking-tight">{emp.name}</p>
                    <p className="text-secondary-fixed-dim font-label-caps text-[10px] uppercase font-bold">{emp.role}</p>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between border-t border-outline-variant/20 bg-white">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[18px]">call</span>
                    <span className="text-xs font-bold">{emp.phone}</span>
                  </div>
                  <a 
                    href={`tel:${emp.phone.replace(/\s+/g, '')}`}
                    className="bg-secondary/10 hover:bg-secondary text-secondary hover:text-white p-2.5 rounded-full transition-colors flex items-center justify-center"
                    aria-label={`Call ${emp.name}`}
                  >
                    <span className="material-symbols-outlined text-[16px]">phone_in_talk</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Capabilities (Bento) */}
      <section className="py-14 bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em] block">Our Strengths</span>
              <h2 className="font-headline-md text-2xl md:text-3xl text-on-surface font-bold uppercase">Why Industry Leaders Choose Vasavi Foundry</h2>
              <p className="text-on-surface-variant text-sm">Equipped with state-of-the-art facilities for Moulding, Melting, Fitting, and Finishing with comprehensive testing labs.</p>
            </div>
            <div className="h-1 w-32 bg-secondary hidden md:block"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="glass-card bg-surface-mist p-8 space-y-6 group hover:bg-white border border-outline-variant/10">
              <div className="w-16 h-16 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined text-[32px]">verified</span>
              </div>
              <div className="space-y-3">
                <h3 className="font-headline-sm text-base md:text-lg font-bold uppercase">Global Quality</h3>
                <p className="text-on-surface-variant text-xs leading-relaxed">Competent personnel and systems to maintain global quality standards for manufacturing and supplying Alloy Iron Castings.</p>
              </div>
            </div>
            
            {/* Innovation */}
            <div className="glass-card bg-surface-mist p-8 space-y-6 group hover:bg-white border border-outline-variant/10">
              <div className="w-16 h-16 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined text-[32px]">biotech</span>
              </div>
              <div className="space-y-3">
                <h3 className="font-headline-sm text-base md:text-lg font-bold uppercase">New Development</h3>
                <p className="text-on-surface-variant text-xs leading-relaxed">In-house ability to develop new items to specific customer requirements, backed by an experienced team of engineers.</p>
              </div>
            </div>
            
            {/* Scale */}
            <div className="glass-card bg-surface-mist p-8 space-y-6 group hover:bg-white border border-outline-variant/10">
              <div className="w-16 h-16 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined text-[32px]">precision_manufacturing</span>
              </div>
              <div className="space-y-3">
                <h3 className="font-headline-sm text-base md:text-lg font-bold uppercase">Large Volumes</h3>
                <p className="text-on-surface-variant text-xs leading-relaxed">Financial strength and infrastructure to support production of large volumes and extensive development plans.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: High-End Visual Break */}
      <section className="py-14 bg-surface-container">
        <div className="px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-[32px] overflow-hidden shadow-xl border border-outline-variant/20 bg-white">
            <div className="p-8 md:p-14 flex flex-col justify-center space-y-8">
              <div className="space-y-3">
                <span className="text-secondary font-label-caps text-xs uppercase tracking-widest font-bold">Innovation at Scale</span>
                <h2 className="font-headline-md text-xl md:text-2xl font-bold uppercase text-on-surface">State-of-the-art Infrastructure</h2>
              </div>
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <span className="text-molten-orange font-bold text-base md:text-lg">01.</span>
                  <p className="text-on-surface-variant text-xs md:text-sm"><strong className="text-on-surface font-semibold">Melting & Moulding:</strong> Precision controlled environment for uniform material properties.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-molten-orange font-bold text-base md:text-lg">02.</span>
                  <p className="text-on-surface-variant text-xs md:text-sm"><strong className="text-on-surface font-semibold">Spectro Lab:</strong> Advanced chemical analysis ensuring exact metallurgical composition.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-molten-orange font-bold text-base md:text-lg">03.</span>
                  <p className="text-on-surface-variant text-xs md:text-sm"><strong className="text-on-surface font-semibold">Testing:</strong> Sand testing, Metal hardness testing, and rigorous inspection protocols.</p>
                </div>
              </div>
            </div>
            
            <div className="relative min-h-[350px] lg:min-h-[400px]">
              <img 
                alt="Factory Fettling Process" 
                className="absolute inset-0 w-full h-full object-cover" 
                src={fettlingImg}
              />
              <div className="absolute inset-0 bg-secondary/15 mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default AboutPage;
