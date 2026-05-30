import React, { useState, useEffect } from 'react';

const API_BASE = window.location.origin.includes('localhost') 
  ? 'http://localhost:7010/api' 
  : '/api';

interface AdminDashboardProps {
  onBackToHome: () => void;
  onRefreshData: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome, onRefreshData }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'banners' | 'clients' | 'ceo' | 'employees' | 'products' | 'certifications'>('banners');
  
  // Data lists
  const [banners, setBanners] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  
  // CRUD editing states
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form inputs
  const [bannerForm, setBannerForm] = useState({ mainText: '', secondaryText: '', imageUrl: '' });
  const [clientForm, setClientForm] = useState({ company: '', quote: '', logoUrl: '' });
  const [ceoForm, setCeoForm] = useState({ quote: '', imageUrl: '' });
  const [employeeForm, setEmployeeForm] = useState({ name: '', role: '', phone: '', imageUrl: '' });
  const [productForm, setProductForm] = useState<any>({
    name: '',
    category: 'Wear Plates',
    desc: '',
    alloy: '',
    weightRange: '',
    hardness: '',
    application: '',
    imageUrl: '',
    specs: [{ label: '', value: '' }]
  });
  const [certForm, setCertForm] = useState({ title: '', imageUrl: '' });

  // Check authentication on load
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token, activeTab]);

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    onRefreshData();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
        fetchData();
      } else {
        setLoginError(data.message || 'Login failed.');
      }
    } catch (err) {
      setLoginError('Error connecting to backend server.');
    }
  };

  // Helper headers
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  const getUploadHeaders = () => ({
    'Authorization': `Bearer ${token}`
  });

  // Fetch all CMS data
  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'banners') {
        const res = await fetch(`${API_BASE}/banners`);
        if (res.ok) setBanners(await res.json());
      } else if (activeTab === 'clients') {
        const res = await fetch(`${API_BASE}/clients`);
        if (res.ok) setClients(await res.json());
      } else if (activeTab === 'ceo' || activeTab === 'employees') {
        const res = await fetch(`${API_BASE}/about`);
        if (res.ok) {
          const data = await res.json();
          setCeoForm({ quote: data.ceo.quote, imageUrl: data.ceo.imageUrl });
          setEmployees(data.employees);
        }
      } else if (activeTab === 'products') {
        const res = await fetch(`${API_BASE}/products`);
        if (res.ok) setProducts(await res.json());
      } else if (activeTab === 'certifications') {
        const res = await fetch(`${API_BASE}/certifications`);
        if (res.ok) setCertifications(await res.json());
      }
    } catch (err) {
      console.error("Fetch CMS data error", err);
    } finally {
      setLoading(false);
    }
  };

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, onUrlResult: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: getUploadHeaders(),
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.url) {
        onUrlResult(data.url);
        showStatus('success', 'Image uploaded successfully!');
      } else {
        showStatus('error', data.message || 'Image upload failed.');
      }
    } catch (err) {
      showStatus('error', 'Error connecting to upload server.');
    } finally {
      setUploading(false);
    }
  };

  // =========================================================
  // CRUD ACTIONS
  // =========================================================

  // Banner Actions
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bannerForm.mainText.length > 50 || bannerForm.secondaryText.length > 50) {
      showStatus('error', 'Main and secondary text must be 50 characters or less.');
      return;
    }
    setLoading(true);
    try {
      const isEdit = editingItem !== null;
      const url = isEdit ? `${API_BASE}/banners/${editingItem._id}` : `${API_BASE}/banners`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(bannerForm)
      });

      if (res.ok) {
        showStatus('success', isEdit ? 'Banner updated successfully!' : 'Banner created successfully!');
        setEditingItem(null);
        setIsAdding(false);
        setBannerForm({ mainText: '', secondaryText: '', imageUrl: '' });
        fetchData();
        onRefreshData();
      } else {
        const errorData = await res.json();
        showStatus('error', errorData.message || 'Failed to save banner.');
      }
    } catch (err) {
      showStatus('error', 'Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    try {
      const res = await fetch(`${API_BASE}/banners/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        showStatus('success', 'Banner deleted successfully!');
        fetchData();
        onRefreshData();
      }
    } catch (err) {
      showStatus('error', 'Error deleting banner.');
    }
  };

  // Client Actions
  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (clientForm.quote.length > 200) {
      showStatus('error', 'Quote must be 200 characters or less.');
      return;
    }
    setLoading(true);
    try {
      const isEdit = editingItem !== null;
      const url = isEdit ? `${API_BASE}/clients/${editingItem._id}` : `${API_BASE}/clients`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(clientForm)
      });

      if (res.ok) {
        showStatus('success', isEdit ? 'Client updated successfully!' : 'Client added successfully!');
        setEditingItem(null);
        setIsAdding(false);
        setClientForm({ company: '', quote: '', logoUrl: '' });
        fetchData();
        onRefreshData();
      } else {
        showStatus('error', 'Failed to save client.');
      }
    } catch (err) {
      showStatus('error', 'Server error.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`${API_BASE}/clients/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        showStatus('success', 'Client deleted successfully!');
        fetchData();
        onRefreshData();
      }
    } catch (err) {
      showStatus('error', 'Server error.');
    }
  };

  // CEO Actions
  const handleSaveCeo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/about/ceo`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(ceoForm)
      });
      if (res.ok) {
        showStatus('success', 'CEO Profile updated successfully!');
        fetchData();
        onRefreshData();
      } else {
        showStatus('error', 'Failed to update CEO Profile.');
      }
    } catch (err) {
      showStatus('error', 'Server error.');
    } finally {
      setLoading(false);
    }
  };

  // Employee Actions
  const handleSaveEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isEdit = editingItem !== null;
      const url = isEdit ? `${API_BASE}/about/employees/${editingItem._id}` : `${API_BASE}/about/employees`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(employeeForm)
      });

      if (res.ok) {
        showStatus('success', isEdit ? 'Employee updated successfully!' : 'Employee added successfully!');
        setEditingItem(null);
        setIsAdding(false);
        setEmployeeForm({ name: '', role: '', phone: '', imageUrl: '' });
        fetchData();
        onRefreshData();
      }
    } catch (err) {
      showStatus('error', 'Server error.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`${API_BASE}/about/employees/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        showStatus('success', 'Employee removed successfully!');
        fetchData();
        onRefreshData();
      }
    } catch (err) {
      showStatus('error', 'Server error.');
    }
  };

  // Product Actions
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isEdit = editingItem !== null;
      const url = isEdit ? `${API_BASE}/products/${editingItem._id}` : `${API_BASE}/products`;
      const method = isEdit ? 'PUT' : 'POST';

      // Clean specifications list
      const cleanSpecs = productForm.specs.filter((s: any) => s.label.trim() !== '' && s.value.trim() !== '');

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify({ ...productForm, specs: cleanSpecs })
      });

      if (res.ok) {
        showStatus('success', isEdit ? 'Product updated successfully!' : 'Product added successfully!');
        setEditingItem(null);
        setIsAdding(false);
        setProductForm({
          name: '',
          category: 'Wear Plates',
          desc: '',
          alloy: '',
          weightRange: '',
          hardness: '',
          application: '',
          imageUrl: '',
          specs: [{ label: '', value: '' }]
        });
        fetchData();
        onRefreshData();
      }
    } catch (err) {
      showStatus('error', 'Server error.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        showStatus('success', 'Product deleted successfully!');
        fetchData();
        onRefreshData();
      }
    } catch (err) {
      showStatus('error', 'Server error.');
    }
  };

  // Certifications Actions
  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/certifications`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(certForm)
      });
      if (res.ok) {
        showStatus('success', 'Certificate added successfully!');
        setCertForm({ title: '', imageUrl: '' });
        setIsAdding(false);
        fetchData();
        onRefreshData();
      }
    } catch (err) {
      showStatus('error', 'Server error.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`${API_BASE}/certifications/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        showStatus('success', 'Certificate removed successfully!');
        fetchData();
        onRefreshData();
      }
    } catch (err) {
      showStatus('error', 'Server error.');
    }
  };

  // Render Login view
  if (!token) {
    return (
      <div className="min-h-screen bg-[#f4f2f1] flex items-center justify-center p-6 select-none relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-md w-full bg-white border border-outline-variant/35 rounded-brand p-8 md:p-10 shadow-2xl relative z-10">
          <div className="text-center mb-8 space-y-2">
            <div className="flex justify-center mb-4">
              <svg viewBox="0 0 100 100" className="h-14 w-14 text-[#0A2A54]">
                <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" fill="none" />
                <path d="M 12 32 H 38 L 50 78 L 62 32 H 88" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <text x="26" y="56" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" textAnchor="middle" fill="currentColor">S</text>
                <text x="74" y="56" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" textAnchor="middle" fill="currentColor">F</text>
              </svg>
            </div>
            <h2 className="font-headline-md text-2xl font-bold uppercase text-[#0A2A54]">Admin Central</h2>
            <p className="text-steel-gray text-sm">Sri Vasavi Foundry Administration Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Email Address</label>
              <input 
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vasavi.com"
                className="w-full bg-surface-mist px-4 py-3 rounded-xl border border-outline-variant/20 focus:outline-none focus:border-secondary text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Password</label>
              <input 
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-surface-mist px-4 py-3 rounded-xl border border-outline-variant/20 focus:outline-none focus:border-secondary text-sm font-medium"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#0A2A54] text-white py-3 rounded-xl font-bold hover:bg-[#002447] active:scale-[0.98] transition-all shadow-md mt-6"
            >
              Sign In
            </button>

            <button 
              type="button" 
              onClick={onBackToHome}
              className="w-full bg-transparent text-steel-gray py-2 text-xs hover:text-[#0A2A54] transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span> Return to Site
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Dashboard view
  return (
    <div className="min-h-screen bg-[#f8f6f5] flex flex-col md:flex-row text-on-surface relative overflow-x-hidden">
      
      {/* Mobile Header Bar */}
      <div className="flex md:hidden items-center justify-between bg-[#0A2A54] text-white p-4 border-b border-white/10 z-30 w-full">
        <div className="flex items-center gap-2 select-none">
          <svg viewBox="0 0 100 100" className="h-6 w-6 text-white">
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" fill="none" />
            <path d="M 12 32 H 38 L 50 78 L 62 32 H 88" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span className="font-bold text-xs uppercase tracking-wide">Vasavi CMS</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1 rounded-md border border-white/20 hover:bg-white/10 flex items-center justify-center"
          aria-label="Toggle admin sidebar"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isSidebarOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Sidebar backdrop overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar navigation */}
      <aside 
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-[#0A2A54] text-white flex flex-col justify-between flex-shrink-0 z-50 transform md:transform-none transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          {/* Brand header */}
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10 select-none">
            <svg viewBox="0 0 100 100" className="h-8 w-8 flex-shrink-0 text-white">
              <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" fill="none" />
              <path d="M 12 32 H 38 L 50 78 L 62 32 H 88" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <text x="26" y="56" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" textAnchor="middle" fill="currentColor">S</text>
              <text x="74" y="56" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" textAnchor="middle" fill="currentColor">F</text>
            </svg>
            <div>
              <h1 className="font-bold text-sm tracking-wide leading-none uppercase">Vasavi CMS</h1>
              <p className="text-[10px] text-white/50 tracking-wider font-semibold">ADMIN PANEL</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5 flex flex-col">
            <button 
              onClick={() => { setActiveTab('banners'); setIsAdding(false); setEditingItem(null); setIsSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all ${
                activeTab === 'banners' ? 'bg-white/15 text-white shadow-inner' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">view_carousel</span> Banners Management
            </button>
            <button 
              onClick={() => { setActiveTab('clients'); setIsAdding(false); setEditingItem(null); setIsSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all ${
                activeTab === 'clients' ? 'bg-white/15 text-white shadow-inner' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">group</span> Clients scroller
            </button>
            <button 
              onClick={() => { setActiveTab('ceo'); setIsAdding(false); setEditingItem(null); setIsSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all ${
                activeTab === 'ceo' ? 'bg-white/15 text-white shadow-inner' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">person</span> CEO Profile
            </button>
            <button 
              onClick={() => { setActiveTab('employees'); setIsAdding(false); setEditingItem(null); setIsSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all ${
                activeTab === 'employees' ? 'bg-white/15 text-white shadow-inner' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">badge</span> Team Profile
            </button>
            <button 
              onClick={() => { setActiveTab('products'); setIsAdding(false); setEditingItem(null); setIsSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all ${
                activeTab === 'products' ? 'bg-white/15 text-white shadow-inner' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">inventory</span> Products Catalog
            </button>
            <button 
              onClick={() => { setActiveTab('certifications'); setIsAdding(false); setEditingItem(null); setIsSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all ${
                activeTab === 'certifications' ? 'bg-white/15 text-white shadow-inner' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">verified</span> Certifications
            </button>
          </nav>
        </div>

        <div className="p-6 space-y-4">
          <button 
            onClick={() => { onBackToHome(); setIsSidebarOpen(false); }}
            className="w-full bg-white/5 border border-white/15 text-white/90 py-2.5 rounded-xl font-bold text-xs hover:bg-white/15 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span> View Live Website
          </button>
          <button 
            onClick={() => { handleLogout(); setIsSidebarOpen(false); }}
            className="w-full bg-red-600/80 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-red-600 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main dashboard content container */}
      <main className="flex-grow p-6 md:p-10 max-w-5xl mx-auto w-full">
        {/* Banner/status notifications */}
        {statusMsg.text && (
          <div className={`mb-6 p-4 rounded-xl border text-sm font-semibold flex items-center gap-2 shadow-sm animate-fade-in ${
            statusMsg.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
              : 'bg-red-50 text-red-800 border-red-200'
          }`}>
            <span className="material-symbols-outlined">
              {statusMsg.type === 'success' ? 'check_circle' : 'error'}
            </span>
            {statusMsg.text}
          </div>
        )}

        {/* Dynamic upload loader overlay */}
        {uploading && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-brand shadow-2xl flex items-center gap-3 border border-outline-variant/10">
              <span className="material-symbols-outlined animate-spin text-secondary text-[32px]">sync</span>
              <span className="font-bold text-sm text-on-surface">Uploading image to server...</span>
            </div>
          </div>
        )}

        {/* Tab Headers */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#0A2A54] uppercase tracking-wide">
              {activeTab === 'banners' && 'Hero Banners'}
              {activeTab === 'clients' && 'Client Testimonials'}
              {activeTab === 'ceo' && 'CEO Statement'}
              {activeTab === 'employees' && 'Foundry Team'}
              {activeTab === 'products' && 'Product Specifications'}
              {activeTab === 'certifications' && 'Certifications Gallery'}
            </h2>
            <p className="text-steel-gray text-xs mt-1">Manage content and dynamic assets displayed on your portal.</p>
          </div>

          {activeTab !== 'ceo' && !isAdding && !editingItem && (
            <button 
              onClick={() => {
                setIsAdding(true);
                // Clear forms
                if (activeTab === 'banners') setBannerForm({ mainText: '', secondaryText: '', imageUrl: '' });
                else if (activeTab === 'clients') setClientForm({ company: '', quote: '', logoUrl: '' });
                else if (activeTab === 'employees') setEmployeeForm({ name: '', role: '', phone: '', imageUrl: '' });
                else if (activeTab === 'certifications') setCertForm({ title: '', imageUrl: '' });
                else if (activeTab === 'products') setProductForm({
                  name: '', category: 'Wear Plates', desc: '', alloy: '', weightRange: '', hardness: '', application: '', imageUrl: '', specs: [{ label: '', value: '' }]
                });
              }}
              className="bg-secondary text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#004f6c] transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">add</span> Add New
            </button>
          )}
        </div>

        {/* TAB 1: HERO BANNERS MANAGEMENT */}
        {activeTab === 'banners' && (
          <div className="space-y-6">
            {(isAdding || editingItem) ? (
              <form onSubmit={handleSaveBanner} className="bg-white border border-outline-variant/20 rounded-brand p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="font-bold text-[#0A2A54] uppercase text-sm border-b pb-3 mb-4">
                  {editingItem ? 'Edit Banner Slide' : 'Add New Banner Slide'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase text-on-surface">Primary Banner Text</label>
                        <span className={`text-[10px] font-bold ${bannerForm.mainText.length > 50 ? 'text-red-500' : 'text-steel-gray'}`}>
                          {bannerForm.mainText.length}/50
                        </span>
                      </div>
                      <input 
                        required
                        maxLength={50}
                        type="text"
                        value={bannerForm.mainText}
                        onChange={(e) => setBannerForm({ ...bannerForm, mainText: e.target.value })}
                        className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium"
                        placeholder="e.g. HIGH-PERFORMANCE IRON CASTINGS"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase text-on-surface">Secondary Text / Description</label>
                        <span className={`text-[10px] font-bold ${bannerForm.secondaryText.length > 50 ? 'text-red-500' : 'text-steel-gray'}`}>
                          {bannerForm.secondaryText.length}/50
                        </span>
                      </div>
                      <textarea 
                        required
                        maxLength={50}
                        rows={2}
                        value={bannerForm.secondaryText}
                        onChange={(e) => setBannerForm({ ...bannerForm, secondaryText: e.target.value })}
                        className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium"
                        placeholder="e.g. Sri Vasavi Foundry delivers precision engineered castings."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-on-surface mb-2">Banner Image File</label>
                    <div className="border-2 border-dashed border-outline-variant/30 rounded-brand p-5 text-center bg-surface-mist flex flex-col items-center justify-center min-h-[140px] hover:bg-black/5 transition-all relative">
                      {bannerForm.imageUrl ? (
                        <div className="relative w-full">
                          <div className="w-full aspect-video rounded-lg overflow-hidden border border-outline-variant/20 mb-3">
                            <img src={bannerForm.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                          </div>
                          <button 
                            type="button"
                            onClick={() => setBannerForm({ ...bannerForm, imageUrl: '' })}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:bg-red-700 z-10 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <span className="material-symbols-outlined text-[36px] text-steel-gray">upload_file</span>
                          <p className="text-xs text-steel-gray font-semibold">Drag & drop or click to choose banner file</p>
                        </div>
                      )}
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (url) => setBannerForm({ ...bannerForm, imageUrl: url }))}
                        className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
                        style={{ display: bannerForm.imageUrl ? 'none' : 'block' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t">
                  <button 
                    type="button"
                    onClick={() => { setIsAdding(false); setEditingItem(null); }}
                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!bannerForm.imageUrl}
                    className="px-5 py-2 bg-secondary text-white rounded-xl font-bold text-xs hover:bg-[#004f6c] disabled:opacity-50"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banners.map((item) => (
                  <div key={item._id} className="bg-white border border-outline-variant/20 rounded-brand overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between">
                    <div className="aspect-[16/9] w-full bg-surface-mist relative border-b">
                      <img src={item.imageUrl} alt={item.mainText} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
                        <h4 className="font-bold text-lg leading-tight line-clamp-1">{item.mainText}</h4>
                        <p className="text-xs text-gray-200 line-clamp-1 mt-1">{item.secondaryText}</p>
                      </div>
                    </div>
                    <div className="p-4 flex justify-end gap-2 bg-surface-mist/30">
                      <button 
                        onClick={() => {
                          setEditingItem(item);
                          setBannerForm({ mainText: item.mainText, secondaryText: item.secondaryText, imageUrl: item.imageUrl });
                        }}
                        className="px-4 py-1.5 border border-outline-variant/40 hover:border-secondary hover:bg-secondary/5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 text-on-surface"
                      >
                        <span className="material-symbols-outlined text-[14px]">edit</span> Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteBanner(item._id)}
                        className="px-4 py-1.5 border border-red-200 hover:bg-red-50 rounded-xl text-[11px] font-bold flex items-center gap-1.5 text-red-600"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span> Delete
                      </button>
                    </div>
                  </div>
                ))}
                {banners.length === 0 && !loading && (
                  <div className="col-span-2 text-center py-16 bg-white border border-dashed rounded-brand text-steel-gray">
                    No banners configured. Click "Add New" to set up slide banners.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CLIENT TESTIMONIALS MARQUEE */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            {(isAdding || editingItem) ? (
              <form onSubmit={handleSaveClient} className="bg-white border border-outline-variant/20 rounded-brand p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="font-bold text-[#0A2A54] uppercase text-sm border-b pb-3 mb-4">
                  {editingItem ? 'Edit Client testimonial' : 'Add New Client testimonial'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase text-on-surface mb-1">Company / Brand Name</label>
                      <input 
                        required
                        type="text"
                        value={clientForm.company}
                        onChange={(e) => setClientForm({ ...clientForm, company: e.target.value })}
                        className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium"
                        placeholder="e.g. Schwing Stetter"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase text-on-surface">Testimonial Quote</label>
                        <span className={`text-[10px] font-bold ${clientForm.quote.length > 200 ? 'text-red-500' : 'text-steel-gray'}`}>
                          {clientForm.quote.length}/200
                        </span>
                      </div>
                      <textarea 
                        required
                        maxLength={200}
                        rows={4}
                        value={clientForm.quote}
                        onChange={(e) => setClientForm({ ...clientForm, quote: e.target.value })}
                        className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium leading-relaxed"
                        placeholder="Provide testimonial paragraph details here..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-on-surface mb-2">Client Logo Image</label>
                    <div className="border-2 border-dashed border-outline-variant/30 rounded-brand p-5 text-center bg-surface-mist flex flex-col items-center justify-center min-h-[140px] hover:bg-black/5 transition-all relative">
                      {clientForm.logoUrl ? (
                        <div className="relative w-full">
                          <div className="w-full aspect-video rounded-lg overflow-hidden border border-outline-variant/20 mb-3 bg-white p-4 flex items-center justify-center">
                            {/* If it's a default text symbol, we can show it, otherwise standard image tag */}
                            {clientForm.logoUrl.startsWith('http') || clientForm.logoUrl.startsWith('/') ? (
                              <img src={clientForm.logoUrl} className="max-h-full object-contain" alt="Client Logo" />
                            ) : (
                              <div className="text-xl font-black text-secondary">{clientForm.logoUrl}</div>
                            )}
                          </div>
                          <button 
                            type="button"
                            onClick={() => setClientForm({ ...clientForm, logoUrl: '' })}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:bg-red-700 z-10 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <span className="material-symbols-outlined text-[36px] text-steel-gray">upload_file</span>
                          <p className="text-xs text-steel-gray font-semibold">Choose client logo image or vector</p>
                        </div>
                      )}
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (url) => setClientForm({ ...clientForm, logoUrl: url }))}
                        className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
                        style={{ display: clientForm.logoUrl ? 'none' : 'block' }}
                      />
                    </div>
                    {/* Allow text override for simple logos */}
                    <div className="mt-3">
                      <label className="block text-[10px] font-bold uppercase text-steel-gray mb-1">Or input raw text abbreviation logo</label>
                      <input 
                        type="text" 
                        placeholder="e.g. JSW"
                        value={clientForm.logoUrl.startsWith('http') ? '' : clientForm.logoUrl}
                        onChange={(e) => setClientForm({ ...clientForm, logoUrl: e.target.value })}
                        className="w-full bg-surface-mist px-3 py-1.5 rounded-lg border border-outline-variant/20 text-xs focus:outline-none focus:border-secondary"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t">
                  <button 
                    type="button"
                    onClick={() => { setIsAdding(false); setEditingItem(null); }}
                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!clientForm.logoUrl}
                    className="px-5 py-2 bg-secondary text-white rounded-xl font-bold text-xs hover:bg-[#004f6c] disabled:opacity-50"
                  >
                    Save testimonial
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clients.map((item) => (
                  <div key={item._id} className="bg-white border border-outline-variant/20 rounded-brand p-6 shadow-sm hover:shadow-md flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-surface-mist p-2 rounded-lg border flex items-center justify-center min-h-[48px] px-4 font-bold text-secondary text-sm">
                          {item.logoUrl.startsWith('http') || item.logoUrl.startsWith('/') ? (
                            <img src={item.logoUrl} className="h-6 object-contain" alt={item.company} />
                          ) : (
                            item.logoUrl
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-steel-gray">{item.company}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant italic mb-6 leading-relaxed">
                        "{item.quote}"
                      </p>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <button 
                        onClick={() => {
                          setEditingItem(item);
                          setClientForm({ company: item.company, quote: item.quote, logoUrl: item.logoUrl });
                        }}
                        className="px-3.5 py-1.5 border border-outline-variant/40 hover:border-secondary hover:bg-secondary/5 rounded-lg text-[10px] font-bold flex items-center gap-1 text-on-surface"
                      >
                        <span className="material-symbols-outlined text-[12px]">edit</span> Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteClient(item._id)}
                        className="px-3.5 py-1.5 border border-red-200 hover:bg-red-50 rounded-lg text-[10px] font-bold flex items-center gap-1 text-red-600"
                      >
                        <span className="material-symbols-outlined text-[12px]">delete</span> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CEO BIOGRAPHY */}
        {activeTab === 'ceo' && (
          <form onSubmit={handleSaveCeo} className="bg-white border border-outline-variant/20 rounded-brand p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-bold text-[#0A2A54] uppercase text-sm border-b pb-3 mb-4">Edit CEO Statements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-on-surface mb-2">CEO Remarks / Biography</label>
                <textarea 
                  required
                  rows={6}
                  value={ceoForm.quote}
                  onChange={(e) => setCeoForm({ ...ceoForm, quote: e.target.value })}
                  className="w-full bg-surface-mist px-4 py-3 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium leading-relaxed"
                  placeholder="Enter biography statement from CEO..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-on-surface mb-2">CEO Image Portrait</label>
                <div className="border-2 border-dashed border-outline-variant/30 rounded-brand p-5 text-center bg-surface-mist flex flex-col items-center justify-center min-h-[160px] hover:bg-black/5 transition-all relative">
                  {ceoForm.imageUrl ? (
                    <div className="relative">
                      <div className="w-40 h-40 rounded-full overflow-hidden border border-outline-variant/20 mb-2">
                        <img src={ceoForm.imageUrl} className="w-full h-full object-cover" alt="CEO" />
                      </div>
                      <button 
                        type="button"
                        onClick={() => setCeoForm({ ...ceoForm, imageUrl: '' })}
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:bg-red-700 z-10 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <span className="material-symbols-outlined text-[36px] text-steel-gray">account_circle</span>
                      <p className="text-xs text-steel-gray font-semibold">Choose photo portrait</p>
                    </div>
                  )}
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, (url) => setCeoForm({ ...ceoForm, imageUrl: url }))}
                    className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
                    style={{ display: ceoForm.imageUrl ? 'none' : 'block' }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button 
                type="submit"
                disabled={!ceoForm.imageUrl || !ceoForm.quote}
                className="px-6 py-2.5 bg-secondary text-white rounded-xl font-bold text-xs hover:bg-[#004f6c]"
              >
                Save CEO Profile
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: FOUNDRY TEAM PROFILE */}
        {activeTab === 'employees' && (
          <div className="space-y-6">
            {(isAdding || editingItem) ? (
              <form onSubmit={handleSaveEmployee} className="bg-white border border-outline-variant/20 rounded-brand p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="font-bold text-[#0A2A54] uppercase text-sm border-b pb-3 mb-4">
                  {editingItem ? 'Edit Team Member' : 'Add Team Member'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase text-on-surface mb-1">Full Name</label>
                      <input 
                        required
                        type="text"
                        value={employeeForm.name}
                        onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
                        className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium"
                        placeholder="e.g. D. Sridharan"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-on-surface mb-1">Professional Role / Title</label>
                      <input 
                        required
                        type="text"
                        value={employeeForm.role}
                        onChange={(e) => setEmployeeForm({ ...employeeForm, role: e.target.value })}
                        className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium"
                        placeholder="e.g. Operations Head"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-on-surface mb-1">Phone Number</label>
                      <input 
                        type="tel"
                        value={employeeForm.phone}
                        onChange={(e) => setEmployeeForm({ ...employeeForm, phone: e.target.value })}
                        className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium"
                        placeholder="e.g. +91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-on-surface mb-2">Member Portrait Photo</label>
                    <div className="border-2 border-dashed border-outline-variant/30 rounded-brand p-5 text-center bg-surface-mist flex flex-col items-center justify-center min-h-[140px] hover:bg-black/5 transition-all relative">
                      {employeeForm.imageUrl ? (
                        <div className="relative">
                          <div className="w-36 h-36 rounded-full overflow-hidden border border-outline-variant/20 mb-2">
                            <img src={employeeForm.imageUrl} className="w-full h-full object-cover" alt="Member" />
                          </div>
                          <button 
                            type="button"
                            onClick={() => setEmployeeForm({ ...employeeForm, imageUrl: '' })}
                            className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:bg-red-700 z-10 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <span className="material-symbols-outlined text-[36px] text-steel-gray">add_photo_alternate</span>
                          <p className="text-xs text-steel-gray font-semibold">Choose photo file</p>
                        </div>
                      )}
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (url) => setEmployeeForm({ ...employeeForm, imageUrl: url }))}
                        className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
                        style={{ display: employeeForm.imageUrl ? 'none' : 'block' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t">
                  <button 
                    type="button"
                    onClick={() => { setIsAdding(false); setEditingItem(null); }}
                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!employeeForm.imageUrl}
                    className="px-5 py-2 bg-secondary text-white rounded-xl font-bold text-xs hover:bg-[#004f6c] disabled:opacity-50"
                  >
                    Save Member
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {employees.map((item) => (
                  <div key={item._id} className="bg-white border border-outline-variant/20 rounded-brand p-6 shadow-sm hover:shadow-md flex flex-col items-center text-center justify-between">
                    <div>
                      <div className="w-24 h-24 rounded-full overflow-hidden border border-outline-variant/15 mb-4 mx-auto">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-bold text-on-surface text-base leading-tight">{item.name}</h4>
                      <p className="text-steel-gray text-xs font-semibold mt-1">{item.role}</p>
                      {item.phone && (
                        <p className="text-secondary text-xs font-medium mt-2 flex items-center justify-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">call</span>
                          {item.phone}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-center gap-2 pt-4 border-t w-full mt-6">
                      <button 
                        onClick={() => {
                          setEditingItem(item);
                          setEmployeeForm({ name: item.name, role: item.role, phone: item.phone || '', imageUrl: item.imageUrl });
                        }}
                        className="px-3 py-1 border border-outline-variant/30 hover:border-secondary rounded-lg text-[10px] font-bold text-on-surface"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteEmployee(item._id)}
                        className="px-3 py-1 border border-red-100 hover:bg-red-50 rounded-lg text-[10px] font-bold text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PRODUCTS CATALOG SPECIFICATIONS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {(isAdding || editingItem) ? (
              <form onSubmit={handleSaveProduct} className="bg-white border border-outline-variant/20 rounded-brand p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="font-bold text-[#0A2A54] uppercase text-sm border-b pb-3 mb-4">
                  {editingItem ? 'Edit Product' : 'Add New Product'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase text-on-surface mb-1">Product Name</label>
                      <input 
                        required
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium"
                        placeholder="e.g. Cavity Wear Block Set"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-on-surface mb-1">Category</label>
                        <select 
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium"
                        >
                          <option value="Wear Plates">Wear Plates</option>
                          <option value="Cones">Cones</option>
                          <option value="Feed Rings">Feed Rings</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-on-surface mb-1">Hardness Index</label>
                        <input 
                          required
                          type="text"
                          value={productForm.hardness}
                          onChange={(e) => setProductForm({ ...productForm, hardness: e.target.value })}
                          className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium"
                          placeholder="e.g. 60 - 65 HRC"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-on-surface mb-1">Description</label>
                      <textarea 
                        required
                        rows={2}
                        value={productForm.desc}
                        onChange={(e) => setProductForm({ ...productForm, desc: e.target.value })}
                        className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium"
                        placeholder="Provide details about the component..."
                      />
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase text-on-surface mb-2">Product Image Graphic</label>
                      <div className="border-2 border-dashed border-outline-variant/30 rounded-brand p-5 text-center bg-surface-mist flex flex-col items-center justify-center min-h-[140px] hover:bg-black/5 transition-all relative">
                        {productForm.imageUrl ? (
                          <div className="relative w-full">
                            <div className="w-full aspect-video rounded-lg overflow-hidden border border-outline-variant/20 mb-2 bg-white flex items-center justify-center p-4">
                              <img src={productForm.imageUrl} className="max-h-full object-contain" alt="Product" />
                            </div>
                            <button 
                              type="button"
                              onClick={() => setProductForm({ ...productForm, imageUrl: '' })}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:bg-red-700 z-10 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <span className="material-symbols-outlined text-[36px] text-steel-gray">add_a_photo</span>
                            <p className="text-xs text-steel-gray font-semibold">Choose product image</p>
                          </div>
                        )}
                        <input 
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, (url) => setProductForm({ ...productForm, imageUrl: url }))}
                          className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
                          style={{ display: productForm.imageUrl ? 'none' : 'block' }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-on-surface mb-1">Alloy Spec</label>
                        <input 
                          required
                          type="text"
                          value={productForm.alloy}
                          onChange={(e) => setProductForm({ ...productForm, alloy: e.target.value })}
                          className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium"
                          placeholder="e.g. High Chrome Alloy"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-on-surface mb-1">Weight Range</label>
                        <input 
                          required
                          type="text"
                          value={productForm.weightRange}
                          onChange={(e) => setProductForm({ ...productForm, weightRange: e.target.value })}
                          className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium"
                          placeholder="e.g. 3 - 8 kg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 border-t pt-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-on-surface mb-1">Primary Application Area</label>
                    <input 
                      required
                      type="text"
                      value={productForm.application}
                      onChange={(e) => setProductForm({ ...productForm, application: e.target.value })}
                      className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium"
                      placeholder="e.g. VSI rotor pocket lining"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-xs font-bold uppercase text-on-surface">Specific Technical Attributes</label>
                      <button 
                        type="button"
                        onClick={() => setProductForm({
                          ...productForm,
                          specs: [...productForm.specs, { label: '', value: '' }]
                        })}
                        className="text-secondary font-bold text-xs flex items-center gap-1 hover:underline"
                      >
                        <span className="material-symbols-outlined text-[14px]">add_circle</span> Add Attribute
                      </button>
                    </div>

                    <div className="space-y-3">
                      {productForm.specs.map((spec: any, sIdx: number) => (
                        <div key={sIdx} className="flex gap-4 items-center">
                          <input 
                            type="text"
                            placeholder="e.g. Tolerances"
                            value={spec.label}
                            onChange={(e) => {
                              const newSpecs = [...productForm.specs];
                              newSpecs[sIdx].label = e.target.value;
                              setProductForm({ ...productForm, specs: newSpecs });
                            }}
                            className="flex-grow bg-surface-mist px-4 py-2 rounded-xl border border-outline-variant/20 text-xs font-medium"
                          />
                          <input 
                            type="text"
                            placeholder="e.g. ±0.5mm"
                            value={spec.value}
                            onChange={(e) => {
                              const newSpecs = [...productForm.specs];
                              newSpecs[sIdx].value = e.target.value;
                              setProductForm({ ...productForm, specs: newSpecs });
                            }}
                            className="flex-grow bg-surface-mist px-4 py-2 rounded-xl border border-outline-variant/20 text-xs font-medium"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              const newSpecs = productForm.specs.filter((_: any, idx: number) => idx !== sIdx);
                              setProductForm({ ...productForm, specs: newSpecs.length ? newSpecs : [{ label: '', value: '' }] });
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="material-symbols-outlined text-[18px]">remove_circle</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t">
                  <button 
                    type="button"
                    onClick={() => { setIsAdding(false); setEditingItem(null); }}
                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!productForm.imageUrl}
                    className="px-5 py-2 bg-secondary text-white rounded-xl font-bold text-xs hover:bg-[#004f6c] disabled:opacity-50"
                  >
                    Save Product Spec
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {products.map((item) => (
                  <div key={item._id} className="bg-white border border-outline-variant/20 rounded-brand p-5 shadow-sm hover:shadow-md flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-surface-mist rounded-xl border border-outline-variant/10 p-2 flex items-center justify-center flex-shrink-0">
                        <img src={item.imageUrl} className="max-h-full max-w-full object-contain" alt={item.name} />
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface text-base">{item.name}</h4>
                        <p className="text-steel-gray text-[11px] font-semibold mt-0.5">{item.category} • Alloy: {item.alloy} • Hardness: {item.hardness}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditingItem(item);
                          setProductForm({
                            name: item.name,
                            category: item.category,
                            desc: item.desc,
                            alloy: item.alloy,
                            weightRange: item.weightRange,
                            hardness: item.hardness,
                            application: item.application,
                            imageUrl: item.imageUrl,
                            specs: item.specs && item.specs.length ? item.specs : [{ label: '', value: '' }]
                          });
                        }}
                        className="px-3.5 py-1.5 border border-outline-variant/40 hover:border-secondary rounded-lg text-[10px] font-bold text-on-surface"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(item._id)}
                        className="px-3.5 py-1.5 border border-red-150 hover:bg-red-50 rounded-lg text-[10px] font-bold text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: CERTIFICATIONS GALLERY */}
        {activeTab === 'certifications' && (
          <div className="space-y-6">
            {isAdding ? (
              <form onSubmit={handleSaveCert} className="bg-white border border-outline-variant/20 rounded-brand p-6 shadow-sm space-y-5">
                <h3 className="font-bold text-[#0A2A54] uppercase text-sm border-b pb-3 mb-4">Add Certificate Document</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-on-surface mb-2">Certificate Title</label>
                    <input 
                      required
                      type="text"
                      value={certForm.title}
                      onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                      placeholder="e.g. TÜV SÜD ISO 9001:2015"
                      className="w-full bg-surface-mist px-4 py-2.5 rounded-xl border border-outline-variant/25 focus:outline-none focus:border-secondary text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-on-surface mb-2">Upload Certificate File</label>
                    <div className="border-2 border-dashed border-outline-variant/30 rounded-brand p-4 text-center bg-surface-mist flex flex-col items-center justify-center min-h-[140px] hover:bg-black/5 transition-all relative">
                      {certForm.imageUrl ? (
                        <div className="relative">
                          <div className="w-36 h-36 rounded-lg overflow-hidden border border-outline-variant/20 mb-2">
                            <img src={certForm.imageUrl} className="w-full h-full object-cover" alt="Cert" />
                          </div>
                          <button 
                            type="button"
                            onClick={() => setCertForm({ ...certForm, imageUrl: '' })}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:bg-red-700 z-10 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="material-symbols-outlined text-[32px] text-steel-gray">file_present</span>
                          <p className="text-[11px] text-steel-gray font-semibold">Choose certificate image file</p>
                        </div>
                      )}
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (url) => setCertForm({ ...certForm, imageUrl: url }))}
                        className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
                        style={{ display: certForm.imageUrl ? 'none' : 'block' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t">
                  <button 
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!certForm.imageUrl || !certForm.title}
                    className="px-5 py-2 bg-secondary text-white rounded-xl font-bold text-xs hover:bg-[#004f6c] disabled:opacity-50"
                  >
                    Save Certificate
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {certifications.map((item) => (
                  <div key={item._id} className="bg-white border border-outline-variant/20 rounded-brand overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between">
                    <div className="aspect-[3/4] bg-surface-mist relative flex items-center justify-center p-3 border-b">
                      <img src={item.imageUrl} alt={item.title} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="p-3 space-y-3">
                      <h4 className="font-bold text-[11px] uppercase tracking-wide text-on-surface line-clamp-1">{item.title}</h4>
                      <button 
                        onClick={() => handleDeleteCert(item._id)}
                        className="w-full py-1.5 border border-red-100 hover:bg-red-50 rounded-lg text-[10px] font-bold text-red-600 flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[12px]">delete</span> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
