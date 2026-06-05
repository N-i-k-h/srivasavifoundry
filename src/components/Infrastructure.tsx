import React from 'react';
import spectroImg from '../assets/inspection_stage.jpg';
import mouldingImg from '../assets/moulding_stage.jpg';
import meltingImg from '../assets/melting_stage.jpg';

const Infrastructure: React.FC = () => {
  return (
    <section className="py-14 bg-surface-mist" id="infrastructure">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        {/* Section Header */}
        <div className="hidden md:block text-center mb-10 space-y-4 reveal">
          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em]">World Class Infrastructure</span>
          <h2 className="font-headline-md text-headline-md uppercase text-on-surface">Integrated Manufacturing Facility</h2>
        </div>

        {/* Bento Grid layout */}
        <div className="flex md:grid overflow-x-auto snap-x md:overflow-visible grid-cols-1 md:grid-cols-12 gap-6 min-h-[320px] md:min-h-0 pb-4 md:pb-0 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          
          {/* Spectro Lab */}
          <div className="min-w-[85vw] md:min-w-0 snap-center md:col-span-4 md:row-span-1 rounded-brand overflow-hidden relative group bg-tertiary border border-outline-variant/10 shadow-sm shrink-0 reveal delay-100">
            <img 
              alt="Spectro Lab" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60" 
              src={spectroImg}
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-tertiary to-transparent/10">
              <h3 className="text-white font-headline-sm text-headline-sm mb-2 uppercase">Spectro Lab</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                State-of-the-art chemical analysis ensuring metallurgy excellence for every specific alloy requirement.
              </p>
            </div>
          </div>

          {/* Moulding Section */}
          <div className="min-w-[85vw] md:min-w-0 snap-center md:col-span-4 md:row-span-1 rounded-brand overflow-hidden relative group border border-outline-variant/10 shadow-sm shrink-0 reveal delay-250">
            <img 
              alt="Moulding Section" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              src={mouldingImg}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-white font-headline-sm text-headline-sm mb-1 uppercase">Moulding Section</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Advanced core preparation and sand moulding for complex casting shapes.
              </p>
            </div>
          </div>

          {/* Quality Testing */}
          <div className="min-w-[85vw] md:min-w-0 snap-center md:col-span-4 md:row-span-1 rounded-brand overflow-hidden relative group border border-outline-variant/10 shadow-sm shrink-0 reveal delay-400">
            <img 
              alt="Inspection" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              src={meltingImg}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-white font-headline-sm text-headline-sm mb-1 uppercase">Inspection &amp; Testing</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Hardness, dimensional, and ultrasonic testing for zero-defect output.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Infrastructure;
