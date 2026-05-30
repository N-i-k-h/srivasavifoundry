import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'High Chrome Castings',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        projectType: 'High Chrome Castings',
        message: ''
      });
    }, 1000);
  };

  return (
    <section className="py-section-gap bg-surface-mist relative overflow-hidden" id="contact">
      <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left details */}
        <div className="hidden lg:block space-y-8">
          <h2 className="font-headline-md text-display-lg-mobile md:text-headline-md uppercase text-on-surface">Ready to start your technical project?</h2>
          <p className="text-on-surface-variant text-body-lg">Get in touch with our engineering team for specialized casting requirements or volume quotes. Commitment to excellence in every pour.</p>
          
          <div className="space-y-6">
            
            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-brand shadow-sm flex-shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">location_on</span>
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-base">Our Foundry</h4>
                <p className="text-sm text-steel-gray leading-relaxed">Industrial Estate, B-6, Lower Hutha, Bhandrahalli, Bhadravathi, Karnataka 577301, India</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-brand shadow-sm flex-shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">mail</span>
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-base">Email Us</h4>
                <p className="text-sm text-steel-gray">info@vasavifoundry.in</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-brand shadow-sm flex-shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">call</span>
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-base">Call Now</h4>
                <p className="text-sm text-steel-gray">+91 94481 43242 / +91 82822 51642</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Form Card */}
        <div className="bg-white p-10 rounded-brand shadow-2xl border border-glass-border">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <h3 className="font-bold text-xl text-on-surface">Thank You!</h3>
              <p className="text-sm text-on-surface-variant max-w-xs mx-auto">
                Your technical casting inquiry has been received. Our sales engineering team will respond within 24 business hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 bg-secondary text-white px-6 py-2 rounded-brand font-bold text-xs uppercase transition-all"
              >
                Send New Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="input-name" className="font-label-caps text-label-caps uppercase text-steel-gray block">Full Name</label>
                  <input 
                    id="input-name"
                    required
                    className="w-full px-0 py-2 border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary transition-all text-sm text-on-surface font-medium bg-transparent" 
                    placeholder="John Doe" 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="input-email" className="font-label-caps text-label-caps uppercase text-steel-gray block">Work Email</label>
                  <input 
                    id="input-email"
                    required
                    className="w-full px-0 py-2 border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary transition-all text-sm text-on-surface font-medium bg-transparent" 
                    placeholder="john@company.com" 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <label htmlFor="input-project" className="font-label-caps text-label-caps uppercase text-steel-gray block">Project Type</label>
                <select 
                  id="input-project"
                  className="w-full px-0 py-2 border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary transition-all text-sm text-gray-700 bg-transparent"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                >
                  <option>High Chrome Castings</option>
                  <option>Gray Iron / SG Iron</option>
                  <option>New Product Development</option>
                  <option>Other Alloy Iron</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="input-msg" className="font-label-caps text-label-caps uppercase text-steel-gray block">Message</label>
                <textarea 
                  id="input-msg"
                  required
                  className="w-full px-0 py-2 border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary transition-all resize-none text-sm text-on-surface font-medium bg-transparent" 
                  placeholder="Describe your technical requirements..." 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Submit button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-tertiary text-white py-4 rounded-brand font-bold hover:shadow-lg hover:shadow-secondary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <span>Send Inquiry</span>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default Contact;
