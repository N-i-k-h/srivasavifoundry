import React, { useState } from 'react';
import contactBg from '../assets/hero_foundry.jpg';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: 'Automotive',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        industry: 'Automotive',
        phone: '',
        message: ''
      });

      // Reset success state after a delay
      setTimeout(() => {
        setSubmitted(false);
      }, 4000);
    }, 1500);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] w-full flex items-center justify-center overflow-hidden">
        <img 
          alt="Contact Banner" 
          className="absolute inset-0 w-full h-full object-cover" 
          src={contactBg}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/85"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto space-y-4">
          <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold uppercase">Get in Touch</h1>
          <p className="font-body-lg text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Partner with an ISO 9001:2015 certified foundry delivering precision-engineered casting solutions globally.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-14 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Contact Sidebar */}
        <div className="lg:col-span-4 space-y-10 reveal-left">
          <div className="space-y-6">
            <h2 className="font-headline-md text-2xl font-bold uppercase text-secondary">Global HQ</h2>
            
            {/* Address */}
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              <div>
                <p className="font-bold text-on-surface text-sm uppercase">Manufacturing Plant</p>
                <address className="not-italic text-on-surface-variant font-body-md text-xs md:text-sm mt-1 leading-relaxed">
                  Industrial Estate, B-6, Lower Hutha,<br/>
                  Bhandrahalli, Bhadravathi,<br/>
                  Karnataka 577301, India
                </address>
              </div>
            </div>

            {/* Contact Person */}
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              <div>
                <p className="font-bold text-on-surface text-sm uppercase">Mr. Suresh M (MD)</p>
                <p className="text-on-surface-variant text-xs font-semibold">Managing Director</p>
                <a className="text-secondary hover:underline block text-xs mt-1 font-bold" href="mailto:suresh.m@srivasavi.com">suresh.m@srivasavi.com</a>
              </div>
            </div>

            {/* Direct Inquiries */}
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>phone_in_talk</span>
              <div>
                <p className="font-bold text-on-surface text-sm uppercase">Direct Inquiries</p>
                <p className="text-on-surface-variant text-xs md:text-sm mt-1 font-semibold">+91 4344 276 543</p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="relative w-full aspect-square rounded-[24px] overflow-hidden border border-outline-variant/30 shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3873.83529074!2d75.692231!3d13.8489235!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbb0115c1868881%3A0x7a1e2a6161b533c6!2sSri%20Vasavi%20Foundry%20Private%20Limited!5e0!3m2!1sen!2sin!4v1780132735420!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Sri Vasavi Foundry Plant Location"
            ></iframe>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-8 reveal-right">
          <div className="glass-card bg-white p-6 md:p-12 rounded-none md:rounded-[24px] border-x-0 md:border-x border-y border-outline-variant/30 shadow-none md:shadow-sm -mx-5 md:mx-0">
            <div className="mb-10">
              <h2 className="font-headline-md text-2xl font-bold uppercase text-on-surface mb-2">Technical Inquiry</h2>
              <p className="text-on-surface-variant text-xs md:text-sm">Fill out the form below for production quotes or facility visit requests.</p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200">
                  <span className="material-symbols-outlined text-3xl font-bold">check_circle</span>
                </div>
                <h3 className="font-bold text-xl text-on-surface uppercase">Inquiry Sent Successfully</h3>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                  Thank you! Your technical casting inquiry has been received. Our sales engineering team will respond within 24 business hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 bg-secondary text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="font-label-caps text-[10px] text-on-surface-variant uppercase ml-1 font-bold">Full Name</label>
                    <input 
                      required
                      type="text"
                      className="w-full bg-transparent border-0 border-b border-outline-variant/50 py-3 px-1 focus:ring-0 focus:border-secondary transition-all text-xs md:text-sm text-on-surface font-medium" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="font-label-caps text-[10px] text-on-surface-variant uppercase ml-1 font-bold">Corporate Email</label>
                    <input 
                      required
                      type="email"
                      className="w-full bg-transparent border-0 border-b border-outline-variant/50 py-3 px-1 focus:ring-0 focus:border-secondary transition-all text-xs md:text-sm text-on-surface font-medium" 
                      placeholder="john@company.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Industry */}
                  <div className="space-y-2">
                    <label className="font-label-caps text-[10px] text-on-surface-variant uppercase ml-1 font-bold">Industry</label>
                    <select 
                      className="w-full bg-transparent border-0 border-b border-outline-variant/50 py-3 px-1 focus:ring-0 focus:border-secondary transition-all text-xs md:text-sm text-gray-700 font-medium"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    >
                      <option>Automotive</option>
                      <option>Infrastructure</option>
                      <option>Heavy Machinery</option>
                      <option>Aerospace</option>
                      <option>Others</option>
                    </select>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="font-label-caps text-[10px] text-on-surface-variant uppercase ml-1 font-bold">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      className="w-full bg-transparent border-0 border-b border-outline-variant/50 py-3 px-1 focus:ring-0 focus:border-secondary transition-all text-xs md:text-sm text-on-surface font-medium" 
                      placeholder="+91 98450 56825" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-on-surface-variant uppercase ml-1 font-bold">Message / Requirements</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-transparent border-0 border-b border-outline-variant/50 py-3 px-1 focus:ring-0 focus:border-secondary transition-all text-xs md:text-sm text-on-surface font-medium resize-none" 
                    placeholder="Briefly describe your casting requirements..." 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="group bg-tertiary hover:bg-secondary text-white px-10 py-4.5 rounded-full font-bold flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-75 cursor-pointer text-xs uppercase tracking-wider"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[16px]">send</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="bg-surface-container-low py-14">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8 reveal">
            <div className="md:max-w-xl space-y-2">
              <span className="text-molten-orange font-label-caps text-xs tracking-widest uppercase block font-bold">Unmatched Precision</span>
              <h2 className="font-headline-md text-2xl md:text-3xl text-on-surface font-bold uppercase">Engineered for Global Standards</h2>
            </div>
            <p className="text-on-surface-variant text-sm md:max-w-md leading-relaxed">
              With over 25 years of experience, Sri Vasavi Foundry provides high-grade SG Iron and Gray Iron castings to leaders in the global supply chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="glass-card bg-white p-8 rounded-[24px] border border-outline-variant/20 hover:border-secondary/20 shadow-sm flex flex-col group transition-all duration-350 hover:shadow-md reveal delay-100">
              <div className="w-12 h-12 bg-secondary/5 rounded-xl flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <h3 className="font-bold text-sm md:text-base uppercase tracking-tight text-on-surface mb-3">Certified Quality</h3>
              <p className="text-on-surface-variant text-xs leading-relaxed">ISO 9001:2015 certified processes ensuring every casting meets rigorous international standards.</p>
            </div>

            {/* Card 2 */}
            <div className="glass-card bg-white p-8 rounded-[24px] border border-outline-variant/20 hover:border-secondary/20 shadow-sm flex flex-col group transition-all duration-350 hover:shadow-md reveal delay-250">
              <div className="w-12 h-12 bg-secondary/5 rounded-xl flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-[24px]">precision_manufacturing</span>
              </div>
              <h3 className="font-bold text-sm md:text-base uppercase tracking-tight text-on-surface mb-3">Modern Infrastructure</h3>
              <p className="text-on-surface-variant text-xs leading-relaxed">Equipped with fully automated molding lines and advanced CNC machining capabilities.</p>
            </div>

            {/* Card 3 */}
            <div className="glass-card bg-white p-8 rounded-[24px] border border-outline-variant/20 hover:border-secondary/20 shadow-sm flex flex-col group transition-all duration-350 hover:shadow-md reveal delay-400">
              <div className="w-12 h-12 bg-secondary/5 rounded-xl flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-[24px]">public</span>
              </div>
              <h3 className="font-bold text-sm md:text-base uppercase tracking-tight text-on-surface mb-3">Global Export</h3>
              <p className="text-on-surface-variant text-xs leading-relaxed">Serving clients across Europe, USA, and Southeast Asia with seamless logistics and support.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
