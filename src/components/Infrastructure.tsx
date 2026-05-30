import React from 'react';

const Infrastructure: React.FC = () => {
  return (
    <section className="py-14 bg-surface-mist" id="infrastructure">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        {/* Section Header */}
        <div className="text-center mb-10 space-y-4">
          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em]">World Class Infrastructure</span>
          <h2 className="font-headline-md text-headline-md uppercase text-on-surface">Integrated Manufacturing Facility</h2>
        </div>

        {/* Bento Grid layout */}
        <div className="flex md:grid overflow-x-auto snap-x md:overflow-visible grid-cols-1 md:grid-cols-12 gap-6 min-h-[490px] pb-4 md:pb-0 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          
          {/* Melting Unit (Wide card) */}
          <div className="min-w-[85vw] md:min-w-0 snap-center md:col-span-8 md:row-span-1 rounded-brand overflow-hidden relative group border border-outline-variant/10 shadow-sm shrink-0">
            <img 
              alt="Melting Unit" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida/ADBb0uiakpmhz_rEQtK7_-Dt1Q_-BZecwY3ke-2nwQu_A5OSbajs5isjrbPqYvVXerkjseS0eknLjgwb4KHlDVj5qcqs9rsmmxjYm8ksPw-U8RTpz8dYPtpXqVXHvcPT9xgQqwabTfREJHq7UX4kLp8iNdFzWtl5yuzssM8DovaJ6Ko-MKyy5AAfA0jwlIMGAB_6mK1g11arQwkKmJFbEafyoCc2brluCt-u97GYx64LibRyZVZYjXEDvVC2rkQk"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-white font-headline-sm text-headline-sm mb-2 uppercase">Melting Unit</h3>
              <p className="text-white/80 max-w-lg text-sm leading-relaxed">
                Induction furnace facilities with high-capacity melting for consistent metallurgical properties.
              </p>
            </div>
          </div>

          {/* Spectro Lab (Tall card) */}
          <div className="min-w-[85vw] md:min-w-0 snap-center md:col-span-4 md:row-span-2 rounded-brand overflow-hidden relative group bg-tertiary border border-outline-variant/10 shadow-sm shrink-0">
            <img 
              alt="Spectro Lab" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60" 
              src="https://lh3.googleusercontent.com/aida/ADBb0uh4LUb1dscw5BiWWpI39BAZ3hd1Mnm3mE1IoCZFyb3hoWceThXO8bHhyTar4-I-VqKKBvmPmIPzzuQiMdGs8tKfnuap8L1FgtDiyCdA9x2vD080G0thn8PkcifBI8Ch2vH6ePwbsp9-Ob5H1fCQ9hM39b4ApfrNOuKh7iVv6WqMgpf26n-TbUzFVkGv5PRuA-NFqzmgzn_zJmmqye9A6jcN29D8O_pnYY9G2KESmp9jRsC7m01qEXenA9wG"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-tertiary to-transparent/10">
              <h3 className="text-white font-headline-sm text-headline-sm mb-2 uppercase">Spectro Lab</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                State-of-the-art chemical analysis ensuring metallurgy excellence for every specific alloy requirement.
              </p>
            </div>
          </div>

          {/* Moulding Section */}
          <div className="min-w-[85vw] md:min-w-0 snap-center md:col-span-4 md:row-span-1 rounded-brand overflow-hidden relative group border border-outline-variant/10 shadow-sm shrink-0">
            <img 
              alt="Moulding Section" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida/ADBb0ugrAcIZcqog2l2SRwezx1GOc3d_Zff_7_58kZ8iwv5KYxUR2tgqqJPMZmXNplde4DLO6J8FvNcXweJvTu7y3LvuB30LMSKFhZQMgceeof_E1yfhVQXbFOHRk1hodsMGw4M61jV4PBpvJOwASQdnCj6eipsVZnSiyYQfif9FP5_L_BflcH0__A-xOyl1hY7VJ9MgUnFqBAc8M8AeQzbQ_SnWdIHp76pzhupZpjSBNg8oMMMF5k8DtePtpM8"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-white font-headline-sm text-headline-sm mb-1 uppercase">Moulding Section</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Advanced core preparation and sand moulding for complex casting shapes.
              </p>
            </div>
          </div>

          {/* Quality Testing */}
          <div className="min-w-[85vw] md:min-w-0 snap-center md:col-span-4 md:row-span-1 rounded-brand overflow-hidden relative group border border-outline-variant/10 shadow-sm shrink-0">
            <img 
              alt="Inspection" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida/ADBb0uiQoYiyrsrCLols4lN01qJUvn2kdooh3LKLBmjAb3LzCbvwytY2A-VLpzFilzbqdlIj4MPR_78naDoeWVgJky_Mj3EGu50FB1lqyLurchFmIkpGtRG7daqYtJZ8IN_UK9y8xcUNO18DOxjxswoONAKTfSLAjm-JdlUeVL14018_zx16sd9fV16-BysUCExt7hMjkd15lU9_TFsp79u4Jr0YSUigeOFm6s-JdEEizfuXSIqyabZjq-TKn8I"
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
