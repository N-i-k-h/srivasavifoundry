import React, { useState } from 'react';
import tuvIsoImg from '../assets/cert_tuv_iso.png';
import zedPledgeImg from '../assets/cert_zed_pledge.png';
import zedBronzeImg from '../assets/cert_zed_bronze.png';
import udyamImg from '../assets/cert_udyam.png';
import gstImg from '../assets/cert_gst.png';
import inspectionImg from '../assets/inspection_stage.jpg';
import meltingImg from '../assets/melting_stage.jpg';

interface CertificationsPageProps {
  onRequestQuote: () => void;
  onNavigateHome: (sectionId: string) => void;
  certifications?: any[];
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  docNumber: string;
  validity: string;
  scope: string;
  img: string;
  description: string;
}

const CertificationsPage: React.FC<CertificationsPageProps> = ({ onRequestQuote, onNavigateHome, certifications }) => {
  const [activeCertIdx, setActiveCertIdx] = useState<number | null>(null);

  const defaultCertificates: Certificate[] = [
    {
      id: 'tuv-iso',
      title: 'TÜV SÜD ISO 9001:2015 Certificate',
      issuer: 'TÜV SÜD South Asia Private Limited',
      docNumber: '99 100 03459',
      validity: 'Valid from 2022-11-16 until 2025-11-15',
      scope: 'Manufacture and Supply of SG Iron, Gray Iron & Alloy Iron Castings',
      img: tuvIsoImg,
      description: 'The premier quality benchmark certifying our systematically audited Quality Management System for casting production.'
    },
    {
      id: 'zed-bronze',
      title: 'MSME ZED Bronze Certificate',
      issuer: 'Ministry of Micro, Small & Medium Enterprises, Government of India',
      docNumber: '08022023_024789',
      validity: 'Valid for 3 years from February 8, 2023',
      scope: 'Manufacture of basic metals (NIC Code: 24)',
      img: zedBronzeImg,
      description: 'ZED (Zero Defect Zero Effect) certification highlighting our focus on high manufacturing standards with minimal environmental footprint.'
    },
    {
      id: 'zed-pledge',
      title: 'MSME Sustainable (ZED) Pledge',
      issuer: 'Ministry of Micro, Small & Medium Enterprises, Government of India',
      docNumber: 'ZED_02012023_24789',
      validity: 'Pledged on January 2, 2023',
      scope: 'Sustainable Business Pledge',
      img: zedPledgeImg,
      description: 'Official pledge demonstrating our undertaking to conform to values of Zero Defect, Zero Effect in enterprise operations.'
    },
    {
      id: 'udyam-reg',
      title: 'Udyam Registration Certificate',
      issuer: 'Ministry of Micro, Small & Medium Enterprises, Government of India',
      docNumber: 'UDYAM-KR-24-0000380',
      validity: 'Registered on August 21, 2020',
      scope: 'Manufacturing / Micro Enterprise classification',
      img: udyamImg,
      description: 'Official registration license documenting Sri Vasavi Foundry Private Limited as an accredited industrial manufacturing enterprise.'
    },
    {
      id: 'gst-appreciation',
      title: 'GST Certificate of Appreciation',
      issuer: 'Ministry of Finance, Government of India',
      docNumber: 'GSTIN: 29AACCV4304M1Z3',
      validity: 'Issued for compliance up to March 31, 2021',
      scope: 'Indirect Taxes Compliance Appreciation',
      img: gstImg,
      description: 'Appreciation certificate by CBIC acknowledging prompt filing of GST returns and contributions to building a resilient nation.'
    }
  ];

  const displayCertificates = certifications && certifications.length > 0
    ? certifications.map((c, index) => ({
        id: c._id || `cert-${index}`,
        title: c.title,
        issuer: c.title.toUpperCase().includes('ISO') ? 'TÜV SÜD South Asia' : 'Government of India',
        docNumber: 'Verified',
        validity: 'Active',
        scope: 'Industrial Casting Operations',
        img: c.imageUrl,
        description: 'Audit checked and verified certificate document.'
      }))
    : defaultCertificates;

  const handleOpenLightbox = (index: number) => {
    setActiveCertIdx(index);
  };

  const handleCloseLightbox = () => {
    setActiveCertIdx(null);
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeCertIdx === null) return;
    setActiveCertIdx((activeCertIdx - 1 + displayCertificates.length) % displayCertificates.length);
  };

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeCertIdx === null) return;
    setActiveCertIdx((activeCertIdx + 1) % displayCertificates.length);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <header 
        className="relative py-16 md:py-28 px-margin-desktop bg-cover bg-center overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(248, 250, 252, 0.98) 35%, rgba(248, 250, 252, 0.85) 60%, rgba(248, 250, 252, 0.2) 100%), url(${inspectionImg})` 
        }}
      >
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container/20 text-secondary font-label-caps text-xs uppercase tracking-widest font-bold">Global Standards</span>
            <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-on-surface mb-4 leading-tight font-bold uppercase">
              Engineering <br/><span className="text-secondary">Excellence</span> Certified.
            </h1>
            <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed">
              Sri Vasavi Foundry operates with the precision of a high-tech lab and the power of heavy industry. Our certifications are not just badges; they are our commitment to global quality benchmarks.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={onRequestQuote}
                className="bg-secondary text-white px-8 py-3.5 rounded-full font-bold hover:bg-secondary-container hover:shadow-lg transition-all active:scale-95 cursor-pointer text-xs uppercase tracking-wider"
              >
                Request Quote
              </button>
              <button 
                onClick={() => onNavigateHome('contact')}
                className="border-2 border-outline/30 px-8 py-3.5 rounded-full font-bold hover:bg-surface-container transition-all cursor-pointer text-xs uppercase tracking-wider text-on-surface"
              >
                Contact Quality Team
              </button>
            </div>
          </div>
        </div>
        {/* Subtle caption bottom right */}
        <div className="absolute bottom-4 right-8 text-on-surface-variant/70 font-label-caps text-[9px] uppercase tracking-wider font-bold hidden md:block">
          Precision Inspection Lab | Bhadravathi
        </div>
      </header>

      {/* Official Certificates Grid */}
      <section className="py-14 bg-white border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em] block">Credentials</span>
            <h2 className="font-headline-md text-2xl md:text-3xl text-on-surface font-bold uppercase">Official Certificates & Registrations</h2>
            <div className="w-24 h-1 bg-molten-orange mx-auto"></div>
            <p className="text-on-surface-variant text-sm">Click on any certificate to view it in full screen and download details.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCertificates.map((cert, idx) => (
              <div 
                key={cert.id} 
                className="bg-surface-container-low rounded-[24px] overflow-hidden border border-outline-variant/30 hover:border-secondary/40 shadow-sm flex flex-col group hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleOpenLightbox(idx)}
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-white p-4 border-b border-outline-variant/20 flex items-center justify-center">
                  <img 
                    alt={cert.title} 
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]" 
                    src={cert.img}
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[18px]">zoom_in</span>
                      View Document
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div className="space-y-3">
                    <h3 className="font-bold text-sm md:text-base uppercase tracking-tight text-on-surface line-clamp-1">{cert.title}</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">{cert.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-outline-variant/10 flex flex-col gap-1 text-[11px] text-gray-500 font-medium">
                    <div className="flex justify-between">
                      <span className="text-secondary font-bold">No:</span>
                      <span className="text-on-surface font-semibold">{cert.docNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary font-bold">Scope:</span>
                      <span className="text-on-surface font-semibold text-right line-clamp-1">{cert.scope}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ISO Certification Detail */}
      <section className="py-14 bg-surface-mist relative">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <h2 className="font-headline-md text-2xl md:text-3xl text-on-surface font-bold uppercase leading-tight">ISO 9001:2015 <br/>Validation Metrics</h2>
              <div className="w-24 h-1 bg-molten-orange"></div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Our core philosophy revolves around the "Quality First" principle. Every component leaving our facility undergoes rigorous multi-stage validation to ensure zero-defect delivery.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 glass-card border-none bg-white shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-2xl">analytics</span>
                  <span className="text-xs md:text-sm font-bold text-on-surface">Process Driven Growth</span>
                </div>
                <div className="flex items-center gap-4 p-4 glass-card border-none bg-white shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-2xl">precision_manufacturing</span>
                  <span className="text-xs md:text-sm font-bold text-on-surface">Traceability Guaranteed</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Quality Cards */}
                <div className="bg-white p-8 rounded-[24px] border border-outline-variant/30 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-secondary/5 rounded-xl flex items-center justify-center text-secondary mb-5 group-hover:bg-secondary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-[24px]">science</span>
                  </div>
                  <h3 className="font-bold text-sm md:text-base uppercase tracking-tight text-on-surface mb-3">Chemical Analysis</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">Equipped with sophisticated Spectrometers to maintain precise alloy composition within ±0.01% tolerance.</p>
                  <span className="font-label-caps text-[10px] text-secondary uppercase font-bold tracking-widest block">Precision Testing</span>
                </div>
                <div className="bg-white p-8 rounded-[24px] border border-outline-variant/30 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-secondary/5 rounded-xl flex items-center justify-center text-secondary mb-5 group-hover:bg-secondary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-[24px]">lens_blur</span>
                  </div>
                  <h3 className="font-bold text-sm md:text-base uppercase tracking-tight text-on-surface mb-3">Micro-Structure</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">In-house metallurgical lab for nodularity checking and graphite distribution analysis in ductile iron.</p>
                  <span className="font-label-caps text-[10px] text-secondary uppercase font-bold tracking-widest block">Material Science</span>
                </div>
                <div className="bg-white p-8 rounded-[24px] border border-outline-variant/30 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-secondary/5 rounded-xl flex items-center justify-center text-secondary mb-5 group-hover:bg-secondary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-[24px]">square_foot</span>
                  </div>
                  <h3 className="font-bold text-sm md:text-base uppercase tracking-tight text-on-surface mb-3">Dimensional Check</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">High-precision CMM and digital height gauges for ensuring strict adherence to customer drawing specifications.</p>
                  <span className="font-label-caps text-[10px] text-secondary uppercase font-bold tracking-widest block">Metrology</span>
                </div>
                <div className="bg-white p-8 rounded-[24px] border border-outline-variant/30 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-secondary/5 rounded-xl flex items-center justify-center text-secondary mb-5 group-hover:bg-secondary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-[24px]">rule</span>
                  </div>
                  <h3 className="font-bold text-sm md:text-base uppercase tracking-tight text-on-surface mb-3">Physical Properties</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">Universal Testing Machines for tensile strength, hardness, and elongation testing per ASTM standards.</p>
                  <span className="font-label-caps text-[10px] text-secondary uppercase font-bold tracking-widest block">Standardization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Focus Operations */}
      <section className="py-14 bg-white border-t border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-12 space-y-4">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em] block">Operational Integrity</span>
            <h2 className="font-headline-md text-2xl md:text-3xl text-on-surface font-bold uppercase">Quality Focus Operations</h2>
            <div className="w-24 h-1 bg-molten-orange mx-auto"></div>
            <p className="text-on-surface-variant text-sm max-w-xl mx-auto">Transparency in our manufacturing process ensures that our clients receive components that power industries with reliability.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group rounded-[24px] overflow-hidden shadow-lg aspect-[1.6]">
              <img 
                alt="Detailed component inspection" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={inspectionImg}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/30 to-transparent flex flex-col justify-end p-8 text-white z-10">
                <h4 className="font-headline-sm text-base md:text-lg font-bold uppercase mb-2">Rigorous Inspection</h4>
                <p className="text-gray-300 text-xs max-w-md leading-relaxed">Every batch undergoes 100% visual and dimensional inspection before dispatch to ensure zero defects.</p>
              </div>
            </div>
            <div className="relative group rounded-[24px] overflow-hidden shadow-lg aspect-[1.6]">
              <img 
                alt="Technical laboratory setup" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={meltingImg}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/30 to-transparent flex flex-col justify-end p-8 text-white z-10">
                <h4 className="font-headline-sm text-base md:text-lg font-bold uppercase mb-2">Spectro Lab Analysis</h4>
                <p className="text-gray-300 text-xs max-w-md leading-relaxed">Maintaining metallurgical integrity through real-time furnace composition analysis on chemical parameters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification CTA */}
      <section className="py-16 bg-tertiary relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent z-0"></div>
        <div className="max-w-container-max mx-auto px-margin-desktop text-center relative z-10 space-y-6">
          <h2 className="font-headline-md text-2xl md:text-3xl text-white font-bold uppercase">Reliability You Can Trust. Period.</h2>
          <p className="text-sm md:text-base text-tertiary-fixed max-w-2xl mx-auto leading-relaxed">
            Download our ISO Certification documents or request a detailed Quality Manual to understand how we can meet your specific project standards.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a 
              href={tuvIsoImg} 
              download="Sri_Vasavi_Foundry_ISO_Certificate.png"
              className="bg-white text-tertiary px-8 py-3.5 rounded-full font-bold hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors text-xs uppercase tracking-wider shadow-md"
            >
              Download ISO Certificate
            </a>
            <button 
              onClick={() => handleOpenLightbox(0)}
              className="border border-white/30 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-colors text-xs uppercase tracking-wider cursor-pointer"
            >
              View Quality Manual
            </button>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {activeCertIdx !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-4 transition-all duration-300"
          onClick={handleCloseLightbox}
        >
          {/* Modal Header */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white bg-gradient-to-b from-black/60 to-transparent z-[110]">
            <h4 className="font-bold text-sm md:text-base uppercase tracking-wider max-w-[80%] truncate">
              {displayCertificates[activeCertIdx].title}
            </h4>
            <div className="flex items-center gap-4">
              <a 
                href={displayCertificates[activeCertIdx].img} 
                download={`${displayCertificates[activeCertIdx].id}.png`}
                className="text-white hover:text-secondary-fixed-dim transition-colors p-2"
                onClick={(e) => e.stopPropagation()}
                aria-label="Download document"
                title="Download Document"
              >
                <span className="material-symbols-outlined text-2xl">download</span>
              </a>
              <button 
                onClick={handleCloseLightbox} 
                className="text-white hover:text-red-400 transition-colors p-2 cursor-pointer"
                aria-label="Close fullscreen view"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
          </div>

          {/* Nav Chevrons */}
          <button 
            onClick={handlePrevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-[110] cursor-pointer"
            aria-label="Previous Certificate"
          >
            <span className="material-symbols-outlined text-3xl">chevron_left</span>
          </button>
          <button 
            onClick={handleNextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-[110] cursor-pointer"
            aria-label="Next Certificate"
          >
            <span className="material-symbols-outlined text-3xl">chevron_right</span>
          </button>

          {/* Centered Image Frame */}
          <div 
            className="max-w-[90%] max-h-[75vh] md:max-h-[80vh] flex items-center justify-center transition-all duration-300 relative z-[105]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              alt={displayCertificates[activeCertIdx].title} 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10" 
              src={displayCertificates[activeCertIdx].img}
            />
          </div>

          {/* Metadata Footer */}
          <div 
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white text-center z-[110] space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs md:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {displayCertificates[activeCertIdx].description}
            </p>
            <div className="flex justify-center gap-6 text-[10px] uppercase tracking-widest text-secondary-fixed-dim font-bold">
              <span>No: {displayCertificates[activeCertIdx].docNumber}</span>
              <span>•</span>
              <span>Issuer: {displayCertificates[activeCertIdx].issuer}</span>
              <span>•</span>
              <span>{displayCertificates[activeCertIdx].validity}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationsPage;
