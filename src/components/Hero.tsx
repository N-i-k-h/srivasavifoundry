import React, { useState, useEffect } from 'react';
import heroFoundryImg from '../assets/hero_foundry.jpg';
import inspectionImg from '../assets/inspection_stage.jpg';

const Hero: React.FC<{ banners?: any[] }> = ({ banners }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultSlides = [
    {
      title: "Precision Iron Castings Engineered For Industrial Excellence",
      desc: "Mastering the art of high-chrome, gray iron, and SG iron castings since 1997 with state-of-the-art metallurgical expertise.",
      bgImg: heroFoundryImg
    },
    {
      title: "Rigorous Hardness Controls & Zero Defect Policies",
      desc: "Strict sand testing, microstructural audits, and hardness checks guaranteeing absolute durability.",
      bgImg: inspectionImg
    }
  ];

  const slides = banners && banners.length > 0 
    ? banners.map(b => ({ title: b.mainText, desc: b.secondaryText, bgImg: b.imageUrl }))
    : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-12 overflow-hidden bg-slate-950">
      
      {/* Dynamic Background Image Layers with Smooth Opacity Fades (Normal brightness, full-color) */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 z-0 ${
            idx === currentSlide ? 'opacity-85' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide.bgImg})` }}
        />
      ))}

      {/* Subtle overlay only to prevent text washout, keeping images completely natural */}
      <div className="absolute inset-0 bg-black/25 z-10"></div>
      
      {/* Background Graphic Blueprint overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-15">
        <div className="w-[600px] h-[600px] border-[1px] border-white/20 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20"></div>
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/20"></div>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="max-w-container-max mx-auto px-margin-desktop w-full flex flex-col items-center justify-center text-center relative z-20 space-y-8 pt-8 pb-14 text-white">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`transition-all duration-700 w-full ${
              idx === currentSlide 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 -translate-y-4 scale-95 absolute hidden'
            }`}
          >
            {/* Title */}
            <h1 
              className="font-display-lg text-display-lg-mobile md:text-display-lg text-white leading-tight max-w-4xl mx-auto uppercase"
              style={{ textShadow: '0 4px 16px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.9)' }}
            >
              {slide.title}
            </h1>

            {/* Description */}
            <p 
              className="font-body-lg text-body-lg text-gray-200 max-w-3xl mx-auto mt-4 font-semibold leading-relaxed"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.9)' }}
            >
              {slide.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Slider Nav Controls */}
      <div className="absolute bottom-12 left-0 w-full px-margin-desktop flex justify-center items-center gap-12 z-30">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-md flex items-center justify-center transition-all active:scale-90 border border-white/10 cursor-pointer"
          aria-label="Previous slide"
        >
          <span className="material-symbols-outlined font-bold">chevron_left</span>
        </button>

        <div className="flex items-center gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentSlide ? 'w-8 h-1.5 bg-secondary' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-md flex items-center justify-center transition-all active:scale-90 border border-white/10 cursor-pointer"
          aria-label="Next slide"
        >
          <span className="material-symbols-outlined font-bold">chevron_right</span>
        </button>
      </div>

    </section>
  );
};

export default Hero;
