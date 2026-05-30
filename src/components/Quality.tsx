import React, { useState, useEffect } from 'react';
import patternImg from '../assets/pattern_stage.jpg';
import mouldingImg from '../assets/moulding_stage.jpg';
import meltingImg from '../assets/melting_stage.jpg';
import fettlingImg from '../assets/fettling_stage.jpg';
import inspectionImg from '../assets/inspection_stage.jpg';
import dispatchImg from '../assets/dispatch_stage.jpg';

interface Stage {
  icon: string;
  title: string;
  desc: string;
  details: string[];
  img: string;
}

const Quality: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoplay]);

  const stages: Stage[] = [
    {
      icon: "architecture",
      title: "Pattern",
      desc: "Precision design and pattern creation.",
      img: patternImg,
      details: [
        "Seasoned premium wood and metal pattern tooling",
        "Configured precise shrinkage offsets based on casting alloys",
        "Moisture-controlled pattern storage chamber"
      ]
    },
    {
      icon: "layers",
      title: "Moulding",
      desc: "High-fidelity sand core preparation.",
      img: mouldingImg,
      details: [
        "Silica sand core preparation with high-refractory wash coatings",
        "CO2 binding sand curing process to ensure absolute cavity stability",
        "Precision sand density audits to prevent metallic penetrations"
      ]
    },
    {
      icon: "fireplace",
      title: "Melting",
      desc: "Induction liquefaction & pouring.",
      img: meltingImg,
      details: [
        "Induction furnaces melting with dual crucible configurations",
        "Real-time pre-pour Optical Emission Spectrometer audits",
        "Pyrometric temperature checks at mold inoculation gates"
      ]
    },
    {
      icon: "handyman",
      title: "Fettling",
      desc: "Surface finishing & refinement.",
      img: fettlingImg,
      details: [
        "Vibratory knockout table core cleaning and shot-blasting audits",
        "Pneumatic gate and riser grinding to strict engineering profiles",
        "Heat treatment normalizations to release metal casting stresses"
      ]
    },
    {
      icon: "verified",
      title: "Inspection",
      desc: "Spectrometer & quality testing.",
      img: inspectionImg,
      details: [
        "Brinell / Rockwell indentation hardness index verification",
        "Microstructural microscopic check for uniform carbide matrix",
        "Ultrasonic defect inspections and strict dimension checks"
      ]
    },
    {
      icon: "local_shipping",
      title: "Dispatch",
      desc: "Timely delivery to global clients.",
      img: dispatchImg,
      details: [
        "Anti-corrosion protective coatings applied on all surfaces",
        "Secure custom timber pallet packaging for export shipment",
        "Dispatch tracking accompanied by chemical/physical lab reports"
      ]
    }
  ];

  return (
    <section className="hidden md:block py-section-gap bg-inverse-surface text-inverse-on-surface overflow-hidden" id="process">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <span className="font-label-caps text-label-caps text-secondary-fixed-dim uppercase tracking-[0.3em]">Lifecycle of Excellence</span>
          <h2 className="font-headline-md text-headline-md text-white uppercase">The Journey of Quality</h2>
        </div>

        {/* Timeline navigation grid */}
        <div className="relative px-4 mb-16">
          {/* Timeline Horizontal Line (Desktop) */}
          <div className="absolute top-12 left-[8.33%] w-[83.33%] h-0.5 bg-white/10 hidden md:block z-0">
            <div 
              className="h-full bg-gradient-to-r from-secondary to-secondary-fixed-dim transition-all duration-500 ease-out"
              style={{ width: `${(activeStep / (stages.length - 1)) * 100}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-12 relative z-10">
            {stages.map((stage, idx) => {
              const isMeltingStatic = idx === 2;
              const isActive = idx === activeStep;
              const isCompleted = idx < activeStep;

              return (
                <div 
                  key={idx}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsAutoplay(false);
                  }}
                  className="flex flex-col items-center text-center group cursor-pointer select-none"
                >
                  {/* Step Node */}
                  <div 
                    className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500 shadow-lg ${
                      isActive
                        ? isMeltingStatic 
                          ? 'bg-molten-orange/20 border-molten-orange/50 animate-pulse shadow-[0_0_20px_rgba(255,94,20,0.2)] text-molten-orange'
                          : 'bg-secondary/20 border-secondary text-white shadow-[0_0_20px_rgba(0,102,138,0.3)]'
                        : isCompleted
                          ? 'bg-secondary/5 border-secondary/35 text-secondary-fixed-dim/90 group-hover:border-secondary group-hover:bg-white/10'
                          : 'bg-white/5 border-white/10 text-secondary-fixed-dim group-hover:border-secondary group-hover:bg-white/10'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[40px] transition-colors duration-500 ${
                      isActive 
                        ? isMeltingStatic ? 'text-molten-orange' : 'text-white'
                        : isCompleted
                          ? 'text-secondary-fixed-dim/90 group-hover:text-white'
                          : 'text-secondary-fixed-dim group-hover:text-white'
                    }`}>
                      {stage.icon}
                    </span>
                  </div>
                  
                  {/* Step Title */}
                  <h4 className={`font-bold mb-2 text-lg transition-colors duration-500 ${
                    isActive 
                      ? 'text-white' 
                      : isCompleted
                        ? 'text-gray-200 group-hover:text-white'
                        : 'text-gray-400 group-hover:text-white'
                  }`}>
                    {stage.title}
                  </h4>
                  
                  {/* Step Subtitle */}
                  <p className="text-sm text-surface-variant max-w-[150px] leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-brand p-6 md:p-10 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Stage Image */}
            <div className="lg:col-span-5 h-56 rounded-brand overflow-hidden relative border border-white/10">
              <img 
                src={stages[activeStep].img} 
                alt={stages[activeStep].title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white font-bold text-sm">
                Stage {activeStep + 1}
              </div>
            </div>

            {/* Stage Text Specifications */}
            <div className="lg:col-span-7 space-y-4">
              <span className="font-label-caps text-[10px] text-secondary-fixed-dim uppercase tracking-wider block">
                Quality Verification Audits
              </span>
              <h3 className="text-2xl font-bold text-white uppercase">{stages[activeStep].title} Control Checklist</h3>
              <p className="text-sm text-surface-variant leading-relaxed">
                We perform the following metallurgical quality checks during the {stages[activeStep].title.toLowerCase()} process:
              </p>
              
              <ul className="space-y-2">
                {stages[activeStep].details.map((detail, dIdx) => (
                  <li key={dIdx} className="text-xs text-gray-300 flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim mt-1.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Quality;
