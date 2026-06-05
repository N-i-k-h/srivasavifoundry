import React from 'react';
import meltingImg from '../assets/melting_stage.jpg';
import spectroImg from '../assets/inspection_stage.jpg';
import mouldingImg from '../assets/moulding_stage.jpg';

interface InfrastructurePageProps {
  onRequestQuote: () => void;
  onNavigateHome: (sectionId: string) => void;
}

const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ onRequestQuote, onNavigateHome }) => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <header 
        className="relative pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden text-white bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.65)), url(${meltingImg})` }}
      >
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-secondary text-white rounded-full font-label-caps text-xs mb-6 uppercase tracking-widest">
              Precision Casting Excellence
            </span>
            <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight uppercase font-bold">
              World-Class Manufacturing <span className="text-secondary-fixed-dim">Infrastructure</span>
            </h1>
            <p className="font-body-lg text-sm md:text-base text-primary-fixed-dim mb-8 max-w-2xl leading-relaxed">
              A legacy of 25 years in high-precision engineering. Our state-of-the-art Bhadravathi facility combines traditional metallurgical mastery with advanced digital monitoring systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onRequestQuote}
                className="bg-secondary text-white px-8 py-3.5 rounded-full font-label-caps hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all active:scale-95 btn-primary-glow cursor-pointer text-xs uppercase tracking-wider font-bold"
              >
                Request General Quote
              </button>
              <button 
                onClick={() => onNavigateHome('contact')}
                className="border border-glass-border px-8 py-3.5 rounded-full font-label-caps hover:bg-white/10 transition-all active:scale-95 cursor-pointer text-xs uppercase tracking-wider font-bold"
              >
                Contact Engineers
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Facility Showcase (Enhanced Bento Grid) */}
      <section className="py-14 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="mb-12">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em] block mb-2">Our Facility</span>
            <h2 className="font-headline-md text-2xl md:text-3xl text-on-surface font-bold uppercase mb-4">Precision-Driven Ecosystem</h2>
            <div className="w-24 h-1 bg-molten-orange mb-6"></div>
            <p className="text-on-surface-variant text-sm max-w-xl">Every stage of our manufacturing process is housed in specialized zones designed for maximum throughput and uncompromising quality control.</p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Melting Unit */}
            <div className="md:col-span-7 lg:col-span-8 glass-card rounded-[24px] overflow-hidden group relative min-h-[350px] md:h-[450px] reveal-left">
              <div className="absolute inset-0 bg-black/40 z-10 transition-colors group-hover:bg-black/30"></div>
              <img 
                alt="Melting Unit Facility" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={meltingImg}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12 text-white z-20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/30 backdrop-blur-md flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>fireplace</span>
                  </div>
                  <span className="font-label-caps tracking-widest text-secondary-fixed-dim text-xs uppercase font-bold">Primary Infrastructure</span>
                </div>
                <h3 className="font-headline-md text-xl md:text-2xl font-bold uppercase mb-3">Advanced Melting Unit</h3>
                <p className="text-gray-300 max-w-2xl text-xs md:text-sm leading-relaxed">
                  Equipped with high-performance induction furnaces specialized for High-Chrome, Gray Iron, SG Iron, and other complex Alloy Iron castings. Our thermal management systems ensure metallurgical purity in every heat.
                </p>
              </div>
            </div>

            {/* Spectro Lab */}
            <div className="md:col-span-5 lg:col-span-4 glass-card rounded-[24px] overflow-hidden group relative min-h-[350px] md:h-[450px] reveal-right">
              <div className="absolute inset-0 bg-black/40 z-10 transition-colors group-hover:bg-black/30"></div>
              <img 
                alt="Quality Testing Lab" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={spectroImg}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 text-white z-20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/30 backdrop-blur-md flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
                  </div>
                  <span className="font-label-caps tracking-widest text-secondary-fixed-dim text-xs uppercase font-bold">Analytical Lab</span>
                </div>
                <h3 className="font-headline-sm text-lg font-bold uppercase">Spectro Lab & Inspection</h3>
                <p className="text-gray-300 text-xs mt-3 leading-relaxed">
                  In-house Spectrometer for precise chemical analysis and elemental verification. Every batch undergoes rigorous inspection to ensure absolute compliance with material specifications.
                </p>
              </div>
            </div>

            {/* Moulding Area */}
            <div className="md:col-span-12 glass-card rounded-[24px] overflow-hidden group relative h-[300px] md:h-[350px] reveal">
              <div className="absolute inset-0 bg-black/40 z-10 transition-colors group-hover:bg-black/30"></div>
              <img 
                alt="Moulding and Casting Production" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={mouldingImg}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent flex flex-col justify-center p-8 md:p-12 text-white z-20">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-molten-orange/30 backdrop-blur-md flex items-center justify-center">
                      <span className="material-symbols-outlined text-molten-orange" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
                    </div>
                    <span className="font-label-caps tracking-widest text-molten-orange text-xs uppercase font-bold">Process Engineering</span>
                  </div>
                  <h3 className="font-headline-md text-xl md:text-2xl font-bold uppercase mb-3">Precision Moulding & Sand Testing</h3>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                    Our state-of-the-art facility features dedicated Moulding and Sand Testing zones. We utilize advanced equipment to maintain structural integrity and dimensional accuracy for items ranging from 2kg to 120kg.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Equipment Specs & Capacity */}
      <section className="py-14 bg-inverse-surface text-inverse-on-surface overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-20"></div>
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="reveal-left">
              <h2 className="font-headline-md text-2xl md:text-3xl font-bold uppercase mb-8">Capacity & Technical Specification</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 transition-all group-hover:bg-secondary group-hover:scale-105">
                    <span className="material-symbols-outlined text-secondary-fixed-dim text-2xl">weight</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-sm md:text-base font-bold uppercase mb-1">400 Tons Per Annum</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">High-volume production facility in Bhadravathi (Steel Town) capable of meeting large-scale industrial demands for wear-resistant components.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 transition-all group-hover:bg-secondary group-hover:scale-105">
                    <span className="material-symbols-outlined text-secondary-fixed-dim text-2xl">settings_input_component</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-sm md:text-base font-bold uppercase mb-1">2kg - 120kg Range</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">Versatile piece-weight capacity handling everything from small intricate assemblies to heavy-duty crushing cones and wear plates.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 transition-all group-hover:bg-secondary group-hover:scale-105">
                    <span className="material-symbols-outlined text-secondary-fixed-dim text-2xl">verified</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-sm md:text-base font-bold uppercase mb-1">Total Quality Facility</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">Comprehensive workflow covering Pattern development, Moulding, Melting, Fettling, Inspection, and systematic Dispatch.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative flex justify-center reveal-right">
              <div className="glass-card bg-white/5 border-white/10 p-10 md:p-12 rounded-[32px] w-full max-w-sm text-center relative z-10 overflow-hidden">
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary/15 rounded-full blur-[80px]"></div>
                <div className="space-y-4">
                  <span className="font-label-caps text-secondary-fixed-dim tracking-[0.2em] text-xs font-bold uppercase">SINCE</span>
                  <span className="block text-7xl md:text-8xl font-display-lg text-white leading-none font-bold">1997</span>
                  <div className="w-24 h-1 bg-molten-orange mx-auto"></div>
                  <p className="text-xs font-body-md text-gray-300 max-w-xs mx-auto">25+ Years of mastery in the art of manufacturing high-chrome castings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ISO Certification */}
      <section className="py-14 bg-surface-mist">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="glass-card bg-white p-8 md:p-14 rounded-[32px] flex flex-col md:flex-row items-center gap-12 border border-outline-variant/30">
            <div className="w-40 h-40 md:w-48 md:h-48 shrink-0 bg-white rounded-full shadow-lg flex items-center justify-center p-6 border border-outline-variant/20 reveal-left">
              <div className="text-center">
                <span className="block text-3xl font-bold text-on-surface mb-0.5">ISO</span>
                <span className="block text-lg font-bold text-secondary">9001:2015</span>
                <div className="w-10 h-1 bg-molten-orange mx-auto my-2.5"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Quality Certified</span>
              </div>
            </div>
            <div className="flex-1 reveal-right">
              <h2 className="font-headline-md text-2xl md:text-3xl text-on-surface font-bold uppercase mb-4">Commitment to Flawless Outcomes</h2>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                Our certification for manufacturing and supplying High-Chrome, Gray Iron, and SG Iron castings is maintained by competent personnel. Every step—from raw material to final fettling—is monitored to ensure absolute quality compliance.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <span className="font-body-md text-xs md:text-sm text-on-surface font-semibold">Metal Hardness Testing</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <span className="font-body-md text-xs md:text-sm text-on-surface font-semibold">Microstructural Analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <span className="font-body-md text-xs md:text-sm text-on-surface font-semibold">Dimensional Verification</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <span className="font-body-md text-xs md:text-sm text-on-surface font-semibold">In-house Spectro Lab Reports</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Expertise */}
      <section className="py-14 bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop text-center">
          <h2 className="font-headline-md text-2xl md:text-3xl text-on-surface font-bold uppercase mb-4 reveal">Engineering Expertise</h2>
          <p className="text-on-surface-variant text-sm max-w-2xl mx-auto mb-12 leading-relaxed reveal delay-100">
            Our infrastructure is powered by a dedicated team of professionals with over 25 years of specialized experience in the metallurgy of "High Quality High Chrome Castings".
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="glass-card bg-surface-mist p-8 rounded-[24px] flex flex-col items-center group border border-outline-variant/10 reveal delay-100">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-secondary text-3xl">groups</span>
              </div>
              <h4 className="font-headline-sm text-base md:text-lg font-bold uppercase mb-2">Experienced Team</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed">Led by professionals who understand that success lies in providing valuable solutions that exceed expectations.</p>
            </div>
            
            <div className="glass-card bg-surface-mist p-8 rounded-[24px] flex flex-col items-center group border border-outline-variant/10 reveal delay-250">
              <div className="w-16 h-16 bg-molten-orange/10 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-molten-orange text-3xl">engineering</span>
              </div>
              <h4 className="font-headline-sm text-base md:text-lg font-bold uppercase mb-2">New Development</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed">Exceptional ability to develop new, complex items tailored to specific customer requirements and drawings.</p>
            </div>
            
            <div className="glass-card bg-surface-mist p-8 rounded-[24px] flex flex-col items-center group border border-outline-variant/10 reveal delay-400">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-secondary text-3xl">handshake</span>
              </div>
              <h4 className="font-headline-sm text-base md:text-lg font-bold uppercase mb-2">Service First</h4>
              <p className="text-on-surface-variant text-xs leading-relaxed">A philosophy rooted in SERVICE—delighting customers through financial strength and on-time delivery commitments.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfrastructurePage;
