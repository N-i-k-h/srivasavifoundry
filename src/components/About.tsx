import React from 'react';

interface AboutProps {
  onLearnMore: () => void;
}

const About: React.FC<AboutProps> = ({ onLearnMore }) => {
  const features = [
    {
      icon: "precision_manufacturing",
      title: "Proficient Development",
      desc: "Agile prototyping and engineering for complex industrial geometries."
    },
    {
      icon: "public",
      title: "Global Standards",
      desc: "Rigorous quality benchmarks that meet international export requirements."
    },
    {
      icon: "schedule",
      title: "On-Time Delivery",
      desc: "Optimized logistics pipeline ensuring zero downtime for your projects."
    },
    {
      icon: "account_balance",
      title: "Financial Strength",
      desc: "Stable institutional backing allowing for large-scale long-term contracts."
    }
  ];

  return (
    <section id="about" className="py-12 bg-white overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          
          {/* Left: High Impact Visual */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-brand overflow-hidden shadow-2xl h-[260px] lg:h-[320px] group border border-outline-variant/10">
              <img 
                alt="Precision Engineering at Sri Vasavi Foundry" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida/ADBb0uiQoYiyrsrCLols4lN01qJUvn2kdooh3LKLBmjAb3LzCbvwytY2A-VLpzFilzbqdlIj4MPR_78naDoeWVgJky_Mj3EGu50FB1lqyLurchFmIkpGtRG7daqYtJZ8IN_UK9y8xcUNO18DOxjxswoONAKTfSLAjm-JdlUeVL14018_zx16sd9fV16-BysUCExt7hMjkd15lU9_TFsp79u4Jr0YSUigeOFm6s-JdEEizfuXSIqyabZjq-TKn8I"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-secondary-fixed/40 to-transparent"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-brand shadow-2xl border border-outline-variant hidden xl:block max-w-[240px] backdrop-blur-xl bg-white/90">
              <div className="text-secondary text-headline-sm font-bold mb-1 italic">ISO 9001:2015</div>
              <p className="text-on-surface-variant text-[11px] font-medium leading-normal">Certified Quality Management Systems since inception.</p>
            </div>
          </div>

          {/* Right: Content & Features */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3 px-4 py-0.5 border border-secondary/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-caps text-[10px] text-secondary uppercase tracking-[0.2em]">The Vasavi Distinction</span>
              </div>
              <h2 className="font-headline-md text-2xl md:text-3xl lg:text-4xl text-on-surface leading-tight font-bold uppercase">
                <span className="hidden md:inline">Crafting the Future of </span><span className="md:hidden">Future of </span><span className="text-secondary">Iron Castings</span>
              </h2>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-xl">
                Headquartered in Karnataka's 'Steel Town' Bhadravati, we merge decades of metallurgical heritage with cutting-edge digital precision. Our commitment transcends manufacturing; we engineer trust into every molecule.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {features.map((feat, idx) => (
                <div key={idx} className="space-y-1.5 group cursor-default">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-[20px]">{feat.icon}</span>
                  </div>
                  <h3 className="font-bold text-base text-on-surface">{feat.title}</h3>
                  <p className="text-on-surface-variant text-xs">{feat.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Link button */}
            <div className="pt-2">
              <button 
                onClick={onLearnMore}
                className="group bg-on-surface text-white px-8 py-3.5 rounded-brand font-bold inline-flex items-center gap-3 hover:bg-secondary transition-all shadow-lg active:scale-95 cursor-pointer text-xs uppercase tracking-wider"
              >
                Learn Our Story
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
