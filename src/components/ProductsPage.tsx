import React, { useState } from 'react';
import wearPlateImg from '../assets/premium_wear_plate.png';
import coneImg from '../assets/premium_cone.png';
import feedRingImg from '../assets/premium_feed_ring.png';
import assemblyImg from '../assets/premium_circular_assembly.png';
import pentFlangeImg from '../assets/premium_pent_flange.png';
import rotorTipImg from '../assets/premium_rotor_tip.png';
import grateStackImg from '../assets/premium_grate_stack.png';
import slottedLinerImg from '../assets/premium_slotted_liner.png';
import foundryImg from '../assets/hero_foundry.jpg';

const p1 = wearPlateImg;
const p2 = wearPlateImg;
const p3 = wearPlateImg;
const p4 = wearPlateImg;
const p5 = coneImg;
const p6 = coneImg;
const p7 = coneImg;
const p8 = coneImg;
const p9 = wearPlateImg;
const p10 = feedRingImg;
const p11 = pentFlangeImg;
const p12 = feedRingImg;
const p13 = feedRingImg;
const p14 = feedRingImg;
const p15 = feedRingImg;
const p16 = rotorTipImg;
const p17 = rotorTipImg;
const p18 = rotorTipImg;
const p19 = rotorTipImg;
const p20 = slottedLinerImg;
const p21 = rotorTipImg;
const p22 = rotorTipImg;
const p23 = assemblyImg;
const p24 = assemblyImg;
const p25 = slottedLinerImg;
const p26 = slottedLinerImg;
const p27 = slottedLinerImg;
const p28 = grateStackImg;
const p29 = grateStackImg;


interface Product {
  id: string;
  name: string;
  category: string;
  desc: string;
  alloy: string;
  weightRange: string;
  hardness: string;
  application: string;
  img: string;
  specs: { label: string; value: string }[];
}

interface ProductsPageProps {
  onRequestQuote: (productName?: string) => void;
  onNavigateHome: (sectionId: string) => void;
  products?: any[];
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onRequestQuote, onNavigateHome, products }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const defaultProducts: Product[] = [
    {
      id: "prod-1",
      name: "Cavity Wear Block Set",
      category: "Wear Plates",
      desc: "High-chrome iron wear blocks designed for rotor cavity protection in vertical shaft impactors.",
      alloy: "High Chrome Alloy (28% Cr)",
      weightRange: "3 - 8 kg per block",
      hardness: "60 - 65 HRC",
      application: "VSI rotor pocket lining",
      img: p1,
      specs: [
        { label: "Hardness", value: "60-65 HRC" },
        { label: "Service Life", value: "2x Standard" }
      ]
    },
    {
      id: "prod-2",
      name: "Trapezoidal Guide Plates",
      category: "Wear Plates",
      desc: "Precision-cast trapezoidal guide plates with double mounting holes for severe abrasion protection.",
      alloy: "Ni-Hard / High Chrome Iron",
      weightRange: "4 - 10 kg",
      hardness: "58 - 62 HRC",
      application: "Chute liners and chute transfer zones",
      img: p2,
      specs: [
        { label: "Mounting", value: "2x Bolt Holes" },
        { label: "Tolerance", value: "±0.5mm" }
      ]
    },
    {
      id: "prod-3",
      name: "Hooked Liner Blocks",
      category: "Wear Plates",
      desc: "Rectangular wear liners featuring integrated hooking lips for secure interlock attachment under heavy vibration.",
      alloy: "Manganese Steel / High Chrome",
      weightRange: "6 - 12 kg",
      hardness: "55 - 60 HRC",
      application: "Hopper walls and primary chute deflectors",
      img: p3,
      specs: [
        { label: "Design", value: "Interlocking Hook" },
        { label: "Finish", value: "Shot Blasted" }
      ]
    },
    {
      id: "prod-4",
      name: "Parallelogram Wear Liners",
      category: "Wear Plates",
      desc: "Angled parallelogram wear plates with recessed bolt sleeves for flush-surface installations.",
      alloy: "Chromium-Molybdenum Alloy",
      weightRange: "5 - 11 kg",
      hardness: "60 - 64 HRC",
      application: "Aggregate conveyor transfer chutes",
      img: p4,
      specs: [
        { label: "Recess Depth", value: "12mm Flush" },
        { label: "Alloy Grade", value: "ASTM A532" }
      ]
    },
    {
      id: "prod-5",
      name: "Cavity Distribution Cone",
      category: "Cones",
      desc: "Standard distribution cone for centrifugal vertical crushers, directing feed streams evenly.",
      alloy: "High Chrome Steel (26% Cr)",
      weightRange: "15 - 30 kg",
      hardness: "58 - 62 HRC",
      application: "VSI central feed distribution",
      img: p5,
      specs: [
        { label: "Incline Angle", value: "35 Degrees" },
        { label: "Balanced", value: "G2.5 Precision" }
      ]
    },
    {
      id: "prod-6",
      name: "Stepped Distribution Cone",
      category: "Cones",
      desc: "Low profile distribution cone featuring stepped outer lips to break material impact velocities.",
      alloy: "Ni-Hard Cast Iron",
      weightRange: "18 - 35 kg",
      hardness: "60 - 63 HRC",
      application: "High-moisture aggregate processing",
      img: p6,
      specs: [
        { label: "Base Type", value: "Stepped Collar" },
        { label: "Impact Strength", value: "High" }
      ]
    },
    {
      id: "prod-7",
      name: "Flanged Distribution Cone",
      category: "Cones",
      desc: "Heavy duty distributor cone with recessed mounting socket, coated with corrosion-inhibiting industrial enamel.",
      alloy: "High Chrome Iron",
      weightRange: "20 - 45 kg",
      hardness: "62 - 66 HRC",
      application: "Mining slurry and gravel crushers",
      img: p7,
      specs: [
        { label: "Coating", value: "Enamel Shield" },
        { label: "Socket Dia", value: "90mm" }
      ]
    },
    {
      id: "prod-8",
      name: "Conical Wear Cap",
      category: "Cones",
      desc: "Metallic gray conical wear caps featuring thick-walled apex casting to withstand extreme vertical impact.",
      alloy: "Manganese-Chrome Steel",
      weightRange: "12 - 25 kg",
      hardness: "50 - 55 HRC",
      application: "Rotor center shaft protection",
      img: p8,
      specs: [
        { label: "Wall Thickness", value: "35mm Apex" },
        { label: "Alloy", value: "Mn-Cr Carbon" }
      ]
    },
    {
      id: "prod-9",
      name: "Hexagonal Wear Plates",
      category: "Wear Plates",
      desc: "Solid and center-bored hexagonal wear plates for customizable honeycomb wear protection on flat surfaces.",
      alloy: "High Chrome Alloy (28% Cr)",
      weightRange: "4 - 9 kg",
      hardness: "60 - 65 HRC",
      application: "Cyclones and dry particulate hoppers",
      img: p9,
      specs: [
        { label: "Width A/F", value: "180mm" },
        { label: "Pattern", value: "Honeycomb Fit" }
      ]
    },
    {
      id: "prod-10",
      name: "Four-Hole Flange Ring",
      category: "Flanges & Rings",
      desc: "Heavy industrial feed ring flange with four uniform bolt points for secure hopper connection.",
      alloy: "Ductile SG Iron (Grade 500/7)",
      weightRange: "10 - 22 kg",
      hardness: "220 - 250 HB",
      application: "Feed chute hopper joints",
      img: p10,
      specs: [
        { label: "PCD Dia", value: "320mm" },
        { label: "Machining", value: "CNC Flange Face" }
      ]
    },
    {
      id: "prod-11",
      name: "Pentagonal Flange Plate",
      category: "Flanges & Rings",
      desc: "Cast feed collar plate with five-point pentagonal base flange to match specialized circular-to-five-sided chute transitions.",
      alloy: "High Chrome Steel",
      weightRange: "12 - 25 kg",
      hardness: "55 - 60 HRC",
      application: "Material divert valves",
      img: p11,
      specs: [
        { label: "Mounting Holes", value: "5x M16" },
        { label: "Core Dia", value: "210mm" }
      ]
    },
    {
      id: "prod-12",
      name: "Segmented Pentagonal Assembly",
      category: "Flanges & Rings",
      desc: "Spheroidal graphite iron segmented ring composed of 5 interlocking arc plates for easy replacement and maintenance.",
      alloy: "Spheroidal Graphite Iron",
      weightRange: "45 - 90 kg (Assembly)",
      hardness: "200 - 240 HB",
      application: "Heavy mill drum inlet collars",
      img: p12,
      specs: [
        { label: "Segments", value: "5 Pieces" },
        { label: "Assembly OD", value: "680mm" }
      ]
    },
    {
      id: "prod-13",
      name: "Hexagonal Flange Collar",
      category: "Flanges & Rings",
      desc: "Medium-weight hexagonal mounting collar with a raised center flange for high vibration pipe transitions.",
      alloy: "High Chrome Alloy",
      weightRange: "8 - 18 kg",
      hardness: "58 - 62 HRC",
      application: "Pneumatic ash handling pipe couplings",
      img: p13,
      specs: [
        { label: "Flange Height", value: "45mm" },
        { label: "Bore Dia", value: "150mm" }
      ]
    },
    {
      id: "prod-14",
      name: "Six-Hole Red Flange",
      category: "Flanges & Rings",
      desc: "Red-coated heavy flange ring featuring six slotted mounting holes to permit minor alignment corrections during installation.",
      alloy: "SG Iron / Mild Steel",
      weightRange: "14 - 32 kg",
      hardness: "180 - 220 HB",
      application: "Slurry transport pipe connections",
      img: p14,
      specs: [
        { label: "Slotted Holes", value: "6x Slotted" },
        { label: "Color Coating", value: "Anti-corrosive Red" }
      ]
    },
    {
      id: "prod-15",
      name: "Concentric Machined Ring Set",
      category: "Flanges & Rings",
      desc: "Precision dual-ring concentric setup, CNC-machined to sub-micron flatness specs for high-pressure seals.",
      alloy: "Austenitic Stainless Steel",
      weightRange: "15 - 38 kg",
      hardness: "30 - 35 HRC",
      application: "Rotary kiln inlet seals",
      img: p15,
      specs: [
        { label: "Flatness", value: "0.02mm" },
        { label: "Concentricity", value: "0.05mm" }
      ]
    },
    {
      id: "prod-16",
      name: "Rotor Wear Vanes",
      category: "Rotor Components",
      desc: "Wing-like wear vanes designed to balance gas flow and deflect coarse particulates away from the rotor shaft.",
      alloy: "Super High Chrome (30% Cr)",
      weightRange: "7 - 15 kg per piece",
      hardness: "62 - 66 HRC",
      application: "High velocity classifier rotors",
      img: p16,
      specs: [
        { label: "Air Flow Coeff", value: "0.85" },
        { label: "Dynamic Balance", value: "ISO G1.0" }
      ]
    },
    {
      id: "prod-17",
      name: "Curved Rotor Tip Plates",
      category: "Rotor Components",
      desc: "Left/Right paired curved wear plates designed for rotor margins, providing maximum protection at the high-velocity discharge arc.",
      alloy: "High Chrome Iron",
      weightRange: "6 - 13 kg",
      hardness: "60 - 64 HRC",
      application: "VSI discharge rotor tips",
      img: p17,
      specs: [
        { label: "Pairs", value: "L/R Balanced" },
        { label: "Arc Length", value: "220mm" }
      ]
    },
    {
      id: "prod-18",
      name: "Tall Slotted Wear Segments",
      category: "Rotor Components",
      desc: "Elongated wear segments with narrow curved profile and slot mounts for high throughput classifiers.",
      alloy: "Chromium-Molybdenum Steel",
      weightRange: "8 - 19 kg",
      hardness: "58 - 62 HRC",
      application: "Air classifier guide vanes",
      img: p18,
      specs: [
        { label: "Height", value: "310mm" },
        { label: "Mounting Type", value: "T-Slot Bolted" }
      ]
    },
    {
      id: "prod-19",
      name: "Vertical Guide Vanes",
      category: "Rotor Components",
      desc: "Tall wear plates featuring dual recessed oval mounting holes for aggregate stream control.",
      alloy: "High Chrome Alloy",
      weightRange: "10 - 24 kg",
      hardness: "60 - 65 HRC",
      application: "Centrifugal separator liners",
      img: p19,
      specs: [
        { label: "Slots", value: "2x Oval Slots" },
        { label: "Alloy Grade", value: "Class III Type A" }
      ]
    },
    {
      id: "prod-20",
      name: "Segmented Curved Liners",
      category: "Rotor Components",
      desc: "Heavy duty vertical wear plate segments forming the primary impact shield in rotor housings.",
      alloy: "Ni-Hard IV Alloy",
      weightRange: "12 - 28 kg",
      hardness: "61 - 65 HRC",
      application: "Rotary mill housing lining",
      img: p20,
      specs: [
        { label: "Curvature Radius", value: "480mm" },
        { label: "Thickness", value: "28mm" }
      ]
    },
    {
      id: "prod-21",
      name: "Hooked Mounting Wear Tips",
      category: "Rotor Components",
      desc: "Hooked profile rotor wear tips with dual bolt holes, designed to absorb high torsional stress.",
      alloy: "Forged Chrome Steel",
      weightRange: "7 - 16 kg",
      hardness: "55 - 60 HRC",
      application: "Primary impactor rotor teeth",
      img: p21,
      specs: [
        { label: "Stress Max", value: "1200 MPa" },
        { label: "Bore Dia", value: "18mm" }
      ]
    },
    {
      id: "prod-22",
      name: "Precision Rotor Tip Set",
      category: "Rotor Components",
      desc: "A 5-piece matched set of precision rotor tips designed for dynamic balancing and high-capacity aggregate pulverizing.",
      alloy: "Super Chrome Alloy (30% Cr)",
      weightRange: "9 - 20 kg per set",
      hardness: "63 - 67 HRC",
      application: "VSI rotor replacement tips",
      img: p22,
      specs: [
        { label: "Set Qty", value: "5 Pieces" },
        { label: "Tolerances", value: "±0.25mm" }
      ]
    },
    {
      id: "prod-23",
      name: "Segmented Outer Ring Assembly",
      category: "Flanges & Rings",
      desc: "Large diameter segmented flange ring composed of 12 arc segments, bolted together to form a wear-resistant shield.",
      alloy: "High Chrome Iron (28% Cr)",
      weightRange: "150 - 320 kg (Full Assembly)",
      hardness: "60 - 64 HRC",
      application: "Rotary kiln exit flange shield",
      img: p23,
      specs: [
        { label: "Segments", value: "12 Pieces" },
        { label: "Full Diameter", value: "1150mm" }
      ]
    },
    {
      id: "prod-24",
      name: "Circular Segment Assembly (2440mm)",
      category: "Wear Plates",
      desc: "Massive 69-piece wear-liner assembly arranged in concentric circles, weighing 697 kg. Pre-balanced and test-assembled.",
      alloy: "High Chrome Alloy (28% Cr)",
      weightRange: "697 kg",
      hardness: "60 - 65 HRC",
      application: "Vertical roller mill table liner",
      img: p24,
      specs: [
        { label: "Total Diameter", value: "2440 mm" },
        { label: "Casting Qty", value: "69 Nos" }
      ]
    },
    {
      id: "prod-25",
      name: "Slotted Wear Liners",
      category: "Wear Plates",
      desc: "Thick rectangular plates with two elongated vertical slots for adjustable height wear lining.",
      alloy: "Ni-Hard Cast Iron",
      weightRange: "14 - 30 kg",
      hardness: "58 - 62 HRC",
      application: "Chute slide-way liners",
      img: p25,
      specs: [
        { label: "Slot Length", value: "110mm" },
        { label: "Thickness", value: "30mm" }
      ]
    },
    {
      id: "prod-26",
      name: "Flanged Curved Segment",
      category: "Wear Plates",
      desc: "Curved radial segment casting with dual mounting holes, designed to bolt onto internal cylindrical surfaces.",
      alloy: "High Chrome Steel",
      weightRange: "18 - 35 kg",
      hardness: "55 - 60 HRC",
      application: "Ball mill cylinder linings",
      img: p26,
      specs: [
        { label: "Radius", value: "1200mm" },
        { label: "Mounting Type", value: "Radial Bolted" }
      ]
    },
    {
      id: "prod-27",
      name: "T-Profile Guide Segment",
      category: "Wear Plates",
      desc: "T-section wear guide combined with custom curve mating plate for sliding track alignments in mining elevators.",
      alloy: "Spheroidal Graphite Iron",
      weightRange: "15 - 28 kg",
      hardness: "220 - 260 HB",
      application: "Guide rail assemblies",
      img: p27,
      specs: [
        { label: "Profile Type", value: "T-Shape" },
        { label: "Tensile Strength", value: "600 MPa" }
      ]
    },
    {
      id: "prod-28",
      name: "Industrial Grate Stack",
      category: "Grate & Support",
      desc: "Heavy duty ladder-style grate stack castings, designed to sift coarse mineral chunks under thermal stress.",
      alloy: "Heat-Resistant Chrome Alloy",
      weightRange: "25 - 55 kg",
      hardness: "350 - 400 HB",
      application: "Sintering machine grates",
      img: p28,
      specs: [
        { label: "Slot Gap", value: "22mm" },
        { label: "Temp Max", value: "950°C" }
      ]
    },
    {
      id: "prod-29",
      name: "Dog-Bone Support Bars",
      category: "Grate & Support",
      desc: "High-tensile dog-bone shaped structural support castings for furnace grates and kiln support structures.",
      alloy: "High Manganese Steel",
      weightRange: "12 - 30 kg",
      hardness: "200 - 240 HB",
      application: "Furnace grate support beams",
      img: p29,
      specs: [
        { label: "Yield Strength", value: "350 MPa" },
        { label: "Behavior", value: "Work-hardening" }
      ]
    }
  ];

  const displayProducts = products && products.length > 0
    ? products.map(p => ({
        id: p._id || p.id,
        name: p.name,
        category: p.category,
        desc: p.desc,
        alloy: p.alloy,
        weightRange: p.weightRange,
        hardness: p.hardness,
        application: p.application,
        img: p.imageUrl || p.img,
        specs: p.specs || []
      }))
    : defaultProducts;

  const filteredProducts = activeFilter === 'All' 
    ? displayProducts 
    : displayProducts.filter(p => p.category === activeFilter);

  const filters = ['All', 'Wear Plates', 'Flanges & Rings', 'Cones', 'Rotor Components', 'Grate & Support'];

  return (
    <div className="pt-20">
      <section 
        className="py-12 md:py-20 px-margin-desktop text-white relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.65)), url(${foundryImg})` }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <span className="font-label-caps text-label-caps text-secondary-fixed-dim tracking-[0.2em] block uppercase">
              Precision Manufacturing Since 1997
            </span>
            <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight uppercase font-bold text-white">
              Engineered Precision Components
            </h1>
            <p className="font-body-lg text-sm md:text-base text-primary-fixed-dim max-w-xl leading-relaxed">
              Delivering high-chrome, gray iron, and alloy castings with microscopic accuracy. Our ISO 9001:2015 certified process ensures industrial-grade durability for global infrastructure.
            </p>
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => {
                  const element = document.getElementById('portfolio-grid');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="bg-secondary-container text-on-secondary-container px-6 md:px-8 py-3.5 rounded-[20px] font-bold hover:shadow-[0_0_20px_rgba(64,194,253,0.4)] transition-all cursor-pointer text-xs uppercase tracking-wider"
              >
                Explore Catalog
              </button>
              <button 
                onClick={() => onNavigateHome('process')}
                className="border border-glass-border px-6 md:px-8 py-3.5 rounded-[20px] font-bold hover:bg-white/10 transition-all cursor-pointer text-xs uppercase tracking-wider"
              >
                Technical Data
              </button>
            </div>
          </div>
          
          <div className="relative group flex justify-center">
            <div className="absolute -inset-4 bg-secondary-container/10 rounded-full blur-3xl group-hover:bg-secondary-container/20 transition-all duration-700"></div>
            <img 
              alt="Pattern Manufacturing" 
              className="rounded-[20px] shadow-2xl relative z-10 w-full max-w-md object-cover aspect-[1.5] border border-white/5" 
              src={p24}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Filterable Product Grid */}
      <section id="portfolio-grid" className="py-14 px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="space-y-2">
            <h2 className="font-headline-md text-2xl md:text-3xl text-inverse-surface font-bold uppercase">Product Portfolio</h2>
            <p className="font-body-md text-on-surface-variant text-sm max-w-xl">
              Explore our comprehensive range of high-chrome and alloy castings designed for extreme wear environments.
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                  activeFilter === filter 
                    ? 'bg-inverse-surface text-white' 
                    : 'border border-outline-variant text-on-surface hover:border-secondary hover:text-secondary'
                }`}
              >
                {filter === 'All' ? 'All Components' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => onRequestQuote(product.name)}
              className="bg-white rounded-[24px] border border-outline-variant/30 overflow-hidden product-hover transition-all duration-500 flex flex-col group shadow-sm cursor-pointer"
            >
              {/* Product Image Wrapper - Solid White Background */}
              <div className="overflow-hidden aspect-[4/3] relative bg-white border-b border-outline-variant/10 flex items-center justify-center p-6">
                <img 
                  alt={product.name} 
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
                  src={product.img}
                />
              </div>

              {/* Product Card Details */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <h3 className="font-headline-sm text-base md:text-lg text-on-surface font-bold uppercase">{product.name}</h3>
                    <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase shrink-0">
                      {product.category === 'Flanges & Rings' ? 'Machined' : product.category === 'Rotor Components' ? 'Precision' : product.category === 'Grate & Support' ? 'Heavy Duty' : 'High Chrome'}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-xs md:text-sm mb-6 leading-relaxed">
                    {product.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Custom Casting Solutions */}
      <section className="bg-surface-container py-14 px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h2 className="font-display-lg text-2xl md:text-3xl mb-4 font-bold uppercase text-on-surface">Custom Alloy Casting Solutions</h2>
              <p className="font-body-lg text-sm md:text-base text-on-surface-variant mb-8 leading-relaxed max-w-xl">
                With over 25 years of metallurgical expertise, we specialize in developing bespoke alloy formulations tailored to your specific wear patterns and operational stressors.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3.5 rounded-2xl text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">science</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface mb-1 text-sm">In-house Spectro Lab</h4>
                    <p className="text-xs text-on-surface-variant">Real-time chemical analysis ensures 100% alloy integrity.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3.5 rounded-2xl text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">model_training</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface mb-1 text-sm">Rapid Prototyping</h4>
                    <p className="text-xs text-on-surface-variant">From CAD design to pattern within 14 business days.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-[24px] shadow-sm flex flex-col items-center justify-center text-center border border-outline-variant/10">
                <span className="font-display-lg text-2xl md:text-3xl text-secondary block mb-1 font-bold">25+</span>
                <span className="font-label-caps text-[10px] text-steel-gray uppercase tracking-wider font-bold">Years Exp</span>
              </div>
              <div className="bg-secondary text-white p-6 rounded-[24px] shadow-sm flex flex-col items-center justify-center text-center">
                <span className="font-display-lg text-2xl md:text-3xl block mb-1 font-bold text-white">400</span>
                <span className="font-label-caps text-[10px] opacity-70 uppercase tracking-wider font-bold">Tons / Annum</span>
              </div>
              <div className="col-span-2 bg-inverse-surface text-white p-6 md:p-8 rounded-[24px] flex items-center gap-6 shadow-xl border border-white/5">
                <span className="material-symbols-outlined text-[#FF5E14] text-5xl shrink-0">verified</span>
                <div>
                  <h4 className="font-headline-sm text-sm md:text-base font-bold text-white uppercase mb-1">ISO 9001:2015 Certified</h4>
                  <p className="text-xs opacity-70 leading-relaxed text-gray-300">
                    International Standards for Quality Management Systems and process excellence.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Quality Assurance */}
      <section className="py-14 px-margin-desktop max-w-container-max mx-auto text-center">
        <h2 className="font-display-lg text-2xl md:text-3xl mb-12 font-bold uppercase text-on-surface">Institutional Quality Assurance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-surface-mist rounded-[20px] flex items-center justify-center border border-outline-variant/30 text-secondary">
              <span className="material-symbols-outlined text-2xl">magnification_small</span>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1 text-on-surface">Spectrometer</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                24-element analysis for precise chemical composition and metallurgical consistency.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-surface-mist rounded-[20px] flex items-center justify-center border border-outline-variant/30 text-secondary">
              <span className="material-symbols-outlined text-2xl">hardware</span>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1 text-on-surface">Hardness Testing</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Rockwell and Brinell testing for wear resistance verification across the entire component.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-surface-mist rounded-[20px] flex items-center justify-center border border-outline-variant/30 text-secondary">
              <span className="material-symbols-outlined text-2xl">architecture</span>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1 text-on-surface">Dimensional Inspection</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Micro-metric accuracy checks for complex assemblies ensuring perfect onsite fitment.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-surface-mist rounded-[20px] flex items-center justify-center border border-outline-variant/30 text-secondary">
              <span className="material-symbols-outlined text-2xl">humidity_mid</span>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1 text-on-surface">Sand Testing</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Continuous monitoring of moulding sand parameters to maintain surface finish quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Request Quote CTA */}
      <section className="px-margin-desktop pb-14">
        <div className="max-w-container-max mx-auto bg-inverse-surface rounded-[32px] p-10 md:p-16 relative overflow-hidden text-center shadow-2xl border border-white/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF5E14]/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-display-lg text-3xl md:text-4xl text-white font-bold uppercase leading-tight">Partner with Excellence</h2>
            <p className="font-body-lg text-xs md:text-sm text-surface-variant leading-relaxed text-gray-300">
              Get a detailed technical quote for your specific casting requirements. Our engineers are ready to assist with design and alloy selection.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <a 
                className="bg-white text-inverse-surface px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer" 
                href="mailto:info@vasavifoundry.in"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                Request a Quote
              </a>
              <a 
                className="border border-glass-border text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer" 
                href="tel:+919448143242"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Call Sales Expert
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
export type { Product };
