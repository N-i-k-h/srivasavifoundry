import React from 'react';
import feedRingImg from '../assets/premium_feed_ring.png';
import coneImg from '../assets/premium_cone.png';
import wearPlateImg from '../assets/premium_wear_plate.png';

interface Product {
  id: string;
  name: string;
  category: string;
  desc: string;
  alloy: string;
  weightRange: string;
  hardness: string;
  application: string;
}

interface ProductsProps {
  onSelectProduct: (product: any) => void;
  products?: any[];
}

const Products: React.FC<ProductsProps> = ({ onSelectProduct, products }) => {
  const defaultProducts = [
    {
      id: "prod-1",
      name: "Feed Ring",
      category: "Feed Rings",
      desc: "High-chrome wear-resistant feed rings for heavy industrial crushers.",
      alloy: "High Chrome Steel (25-28% Cr)",
      weightRange: "8 kg - 35 kg",
      hardness: "55 - 60 HRC",
      application: "Chute entry and funnel guides",
      img: feedRingImg
    },
    {
      id: "prod-2",
      name: "Industrial Cones",
      category: "Cones",
      desc: "Precision cast cones for infrastructure and mining applications.",
      alloy: "Ni-Hard / High Chrome Iron",
      weightRange: "12 kg - 45 kg",
      hardness: "58 - 62 HRC",
      application: "VSI rotor central distribution",
      img: coneImg
    },
    {
      id: "prod-3",
      name: "Cavity Wear Plate",
      category: "Wear Plates",
      desc: "Durable wear plates optimized for extreme pressure environments.",
      alloy: "High Chrome Alloy (28% Cr)",
      weightRange: "5 kg - 25 kg",
      hardness: "60 - 65 HRC",
      application: "Vertical Shaft Impactor rotor protection",
      img: wearPlateImg
    }
  ];

  const items = products && products.length > 0
    ? products.slice(0, 3).map(p => ({
        id: p._id || p.id,
        name: p.name,
        category: p.category,
        desc: p.desc,
        alloy: p.alloy,
        weightRange: p.weightRange,
        hardness: p.hardness,
        application: p.application,
        img: p.imageUrl || p.img
      }))
    : defaultProducts;

  return (
    <section className="py-12 bg-white" id="products">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="space-y-4">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em]">Product Showcase</span>
            <h2 className="font-headline-md text-headline-md uppercase text-on-surface">Specialized Industrial Components</h2>
          </div>
          <button 
            onClick={() => onSelectProduct(items[0])}
            className="text-secondary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform cursor-pointer"
          >
            View Full Catalog <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        {/* 3-Column Products Grid */}
        <div className="flex md:grid overflow-x-auto snap-x md:overflow-visible grid-cols-1 md:grid-cols-3 gap-gutter pb-4 md:pb-0 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {items.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[85vw] md:min-w-0 snap-center shrink-0 glass-card rounded-brand p-4 group hover:shadow-xl transition-all"
            >
              {/* Product Image */}
              <div className="aspect-[4/3] rounded-brand overflow-hidden bg-surface-mist mb-4 relative border border-outline-variant/10">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-fixed/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  alt={product.name} 
                  className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500" 
                  src={product.img}
                />
              </div>

              {/* Product Info */}
              <div className="px-4 pb-4">
                <h3 className="font-headline-sm text-headline-sm mb-1.5 text-on-surface uppercase">{product.name}</h3>
                <p className="text-on-surface-variant text-sm mb-3 min-h-[48px]">{product.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Products;
export type { Product };

