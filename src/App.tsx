import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Infrastructure from './components/Infrastructure';
import Products from './components/Products';
import Quality from './components/Quality';
import Clients from './components/Clients';
import Industries from './components/Industries';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RFQModal from './components/RFQModal';
import ProductsPage from './components/ProductsPage';
import InfrastructurePage from './components/InfrastructurePage';
import AboutPage from './components/AboutPage';
import CertificationsPage from './components/CertificationsPage';
import ContactPage from './components/ContactPage';
import AdminDashboard from './components/AdminDashboard';
import AnimatedCounter from './components/AnimatedCounter';

const API_BASE = window.location.origin.includes('localhost') 
  ? 'http://localhost:7010/api' 
  : '/api';

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

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'infrastructure' | 'about' | 'certifications' | 'contact' | 'admin'>('home');
  const [activeSection, setActiveSection] = useState('home');
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // CMS dynamic database states
  const [banners, setBanners] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [ceo, setCeo] = useState<any>({ quote: '', imageUrl: '' });
  const [employees, setEmployees] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);

  const fetchCMSData = async () => {
    try {
      const resBanners = await fetch(`${API_BASE}/banners`);
      if (resBanners.ok) setBanners(await resBanners.json());

      const resClients = await fetch(`${API_BASE}/clients`);
      if (resClients.ok) setClients(await resClients.json());

      const resAbout = await fetch(`${API_BASE}/about`);
      if (resAbout.ok) {
        const aboutData = await resAbout.json();
        setCeo(aboutData.ceo);
        setEmployees(aboutData.employees);
      }

      const resProducts = await fetch(`${API_BASE}/products`);
      if (resProducts.ok) setProducts(await resProducts.json());

      const resCerts = await fetch(`${API_BASE}/certifications`);
      if (resCerts.ok) setCertifications(await resCerts.json());
    } catch (err) {
      console.warn("Express backend server offline. Using mock default fallbacks.");
    }
  };

  useEffect(() => {
    fetchCMSData();
  }, []);

  // Scroll reveal animation handler using Intersection Observer
  useEffect(() => {
    // We add a tiny delay to ensure all dynamically generated DOM nodes are fully rendered
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-fade, .reveal-left, .reveal-right');
      
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -8% 0px', // Trigger when element is slightly inside viewport
        threshold: 0.02
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Unobserve after animating to keep it clean and smooth
            observer.unobserve(entry.target);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);
      revealElements.forEach((el) => observer.observe(el));
    }, 150);

    return () => clearTimeout(timer);
  }, [currentPage, banners, clients, products, certifications, ceo, employees]);

  // Card mouse hover spotlight reflection effect
  useEffect(() => {
    // Add small delay to ensure elements are compiled in the DOM
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll('.interactive-card');
      
      const handleMouseMove = (e: MouseEvent) => {
        const card = e.currentTarget as HTMLElement;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      };

      cards.forEach((card) => {
        card.addEventListener('mousemove', handleMouseMove as any);
      });

      return () => {
        cards.forEach((card) => {
          card.removeEventListener('mousemove', handleMouseMove as any);
        });
      };
    }, 200);

    return () => clearTimeout(timer);
  }, [currentPage, banners, clients, products, certifications, ceo, employees]);

  // Trigger empty/general RFQ
  const handleRequestGeneralQuote = (productName?: string) => {
    if (productName) {
      setSelectedProduct({
        id: "custom",
        name: productName,
        category: "Custom Selection",
        desc: `RFQ requested for ${productName}`,
        alloy: "Customer Specified",
        weightRange: "Per Specification",
        hardness: "Per Specification",
        application: "Heavy Industrial Application"
      });
    } else {
      setSelectedProduct(null);
    }
    setIsRFQOpen(true);
  };

  // Smooth scroll handler with page transition support
  const handleScrollToSection = (id: string) => {
    if (id === 'products') {
      setCurrentPage('products');
      setActiveSection('products');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'infrastructure') {
      setCurrentPage('infrastructure');
      setActiveSection('infrastructure');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'about-us' || id === 'about') {
      setCurrentPage('about');
      setActiveSection('about-us');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'certifications') {
      setCurrentPage('certifications');
      setActiveSection('certifications');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'contact') {
      setCurrentPage('contact');
      setActiveSection('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const wasOnSubpage = currentPage === 'products' || currentPage === 'infrastructure' || currentPage === 'about' || currentPage === 'certifications' || currentPage === 'contact';
    if (wasOnSubpage) {
      setCurrentPage('home');
    }
    setActiveSection(id);

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, wasOnSubpage ? 120 : 0);
  };

  // Scroll spy effect using Intersection Observer (active on Home page only)
  useEffect(() => {
    if (currentPage !== 'home') return;

    const sections = ['home', 'about', 'infrastructure', 'products', 'industries', 'contact'];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [currentPage]);

  if (currentPage === 'admin') {
    return (
      <AdminDashboard 
        onBackToHome={() => {
          setCurrentPage('home');
          setActiveSection('home');
        }}
        onRefreshData={fetchCMSData}
      />
    );
  }

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden">
      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={handleScrollToSection}
        onRequestQuote={() => handleRequestGeneralQuote()}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main Page Rendering */}
      {currentPage === 'home' ? (
        <main className="pt-0">
          {/* Hero Section */}
          <Hero banners={banners} />
          
          {/* Stats Section */}
          <section className="hidden md:block py-[48px] bg-surface">
            <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-gutter">
              <div className="text-center p-8 interactive-card rounded-brand active-glow transition-all reveal delay-100">
                <div className="font-display-lg text-headline-md text-secondary mb-2">
                  <AnimatedCounter end={25} suffix="+" />
                </div>
                <div className="font-label-caps text-label-caps uppercase text-steel-gray">Years Success</div>
              </div>
              <div className="text-center p-8 interactive-card rounded-brand active-glow transition-all reveal delay-200">
                <div className="font-display-lg text-headline-md text-secondary mb-2">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <div className="font-label-caps text-label-caps uppercase text-steel-gray">Industrial Clients</div>
              </div>
              <div className="text-center p-8 interactive-card rounded-brand active-glow transition-all reveal delay-300">
                <div className="font-display-lg text-headline-md text-secondary mb-2">
                  <AnimatedCounter end={400} suffix="+" />
                </div>
                <div className="font-label-caps text-label-caps uppercase text-steel-gray">Tons Per Annum</div>
              </div>
              <div className="text-center p-8 interactive-card rounded-brand active-glow transition-all reveal delay-400">
                <div className="font-display-lg text-headline-md text-secondary mb-2">
                  2 - <AnimatedCounter start={2} end={120} />
                </div>
                <div className="font-label-caps text-label-caps uppercase text-steel-gray">Piece Weight (KG)</div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <About
            onLearnMore={() => handleScrollToSection('contact')}
          />

          {/* Infrastructure Bento Grid */}
          <Infrastructure />

          {/* Specialized Products (Preview Panel triggering redirection to Products Page) */}
          <Products
            onSelectProduct={() => handleScrollToSection('products')}
            products={products}
          />

          {/* Manufacturing Journey Timeline */}
          <Quality />

          {/* Client Testimonials */}
          <Clients clients={clients} />

          {/* Industries Served */}
          <Industries />

          {/* Contact Form Details */}
          <Contact />
        </main>
      ) : currentPage === 'products' ? (
        <main>
          {/* Dedicated Products Page */}
          <ProductsPage
            onRequestQuote={handleRequestGeneralQuote}
            onNavigateHome={handleScrollToSection}
            products={products}
          />
        </main>
      ) : currentPage === 'infrastructure' ? (
        <main>
          {/* Dedicated Infrastructure Page */}
          <InfrastructurePage
            onRequestQuote={() => handleRequestGeneralQuote()}
            onNavigateHome={handleScrollToSection}
          />
        </main>
      ) : currentPage === 'about' ? (
        <main>
          {/* Dedicated About Us Page */}
          <AboutPage
            onRequestQuote={() => handleRequestGeneralQuote()}
            onNavigateHome={handleScrollToSection}
            ceo={ceo}
            employees={employees}
          />
        </main>
      ) : currentPage === 'certifications' ? (
        <main>
          {/* Dedicated Certifications Page */}
          <CertificationsPage
            onRequestQuote={() => handleRequestGeneralQuote()}
            onNavigateHome={handleScrollToSection}
            certifications={certifications}
          />
        </main>
      ) : (
        <main>
          {/* Dedicated Contact Us Page */}
          <ContactPage />
        </main>
      )}

      {/* Footer */}
      <Footer
        onNavClick={handleScrollToSection}
      />

      {/* Quote Request Modal Overlay */}
      <RFQModal
        isOpen={isRFQOpen}
        onClose={() => setIsRFQOpen(false)}
        selectedProduct={selectedProduct}
      />
    </div>
  );
}

export default App;
