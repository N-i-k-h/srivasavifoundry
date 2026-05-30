import React, { useState, useEffect } from 'react';

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

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
}

const RFQModal: React.FC<RFQModalProps> = ({ isOpen, onClose, selectedProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    productName: '',
    quantity: '50',
    specNotes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        productName: selectedProduct.name,
        specNotes: `Preselected Product specifications:\n- Category: ${selectedProduct.category}\n- Alloy Target: ${selectedProduct.alloy}\n- Weight range: ${selectedProduct.weightRange}\n- Hardness: ${selectedProduct.hardness}\n- Application: ${selectedProduct.application}\n\nPlease add custom specs here...`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        productName: 'Custom Component',
        specNotes: ''
      }));
    }
    setSubmitted(false);
  }, [selectedProduct, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-brand shadow-2xl border border-glass-border w-full max-w-xl max-h-[90vh] flex flex-col justify-between overflow-hidden animate-slide-up z-10">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-outline-variant/10 flex justify-between items-center bg-surface-mist">
          <div className="flex items-center gap-2 text-secondary">
            <span className="material-symbols-outlined text-xl">settings_suggest</span>
            <h3 className="font-headline-sm text-sm uppercase tracking-wider font-bold">
              Request Technical RFQ
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto flex-grow">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[28px]">verified</span>
              </div>
              <h4 className="font-bold text-lg text-on-surface">RFQ Request Received</h4>
              <p className="text-sm text-on-surface-variant max-w-xs mx-auto">
                Our design estimation engineers have received your drawing specifications and will deliver standard budgeting coordinates.
              </p>
              <button
                onClick={onClose}
                className="bg-secondary text-white px-6 py-2.5 rounded-brand font-bold text-xs uppercase shadow-sm cursor-pointer"
              >
                Close Request Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {selectedProduct && (
                <div className="p-4 bg-surface-mist rounded-xl border border-secondary/15 text-xs text-secondary font-medium leading-relaxed">
                  <span className="font-bold block text-on-secondary-container mb-1">Preselected: {selectedProduct.name}</span>
                  Target: {selectedProduct.alloy} | Hardness: {selectedProduct.hardness}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="modal-name" className="font-label-caps text-label-caps uppercase text-steel-gray block">Your Name</label>
                  <input
                    id="modal-name"
                    required
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-0 py-2 border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary text-sm text-on-surface bg-transparent font-medium"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="modal-email" className="font-label-caps text-label-caps uppercase text-steel-gray block">Work Email</label>
                  <input
                    id="modal-email"
                    required
                    type="email"
                    placeholder="email@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-0 py-2 border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary text-sm text-on-surface bg-transparent font-medium"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Company */}
                <div className="space-y-2">
                  <label htmlFor="modal-company" className="font-label-caps text-label-caps uppercase text-steel-gray block">Company</label>
                  <input
                    id="modal-company"
                    required
                    type="text"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-0 py-2 border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary text-sm text-on-surface bg-transparent font-medium"
                  />
                </div>

                {/* Estimated Qty */}
                <div className="space-y-2">
                  <label htmlFor="modal-qty" className="font-label-caps text-label-caps uppercase text-steel-gray block">Estimated Quantity (pcs)</label>
                  <input
                    id="modal-qty"
                    required
                    type="number"
                    min="1"
                    placeholder="e.g. 50"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-0 py-2 border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary text-sm text-on-surface bg-transparent font-medium"
                  />
                </div>

              </div>

              {/* Technical Specifications */}
              <div className="space-y-2">
                <label htmlFor="modal-specs" className="font-label-caps text-label-caps uppercase text-steel-gray block">Technical Specifications</label>
                <textarea
                  id="modal-specs"
                  rows={4}
                  placeholder="Enter custom dimensions, chemical preferences, weight tolerances, or other drawing information..."
                  value={formData.specNotes}
                  onChange={(e) => setFormData({ ...formData, specNotes: e.target.value })}
                  className="w-full px-0 py-2 border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary text-sm text-on-surface bg-transparent font-medium resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-tertiary text-white py-4 rounded-brand font-bold hover:shadow-lg transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing RFQ...</span>
                  </>
                ) : (
                  <span>Send Quotation RFQ</span>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default RFQModal;
export type { Product };
