import React from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LiveCustomizer } from './components/Customizer/LiveCustomizer';
import { CatalogGrid } from './components/Catalog/CatalogGrid';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuotationDrawer } from './components/Cart/QuotationDrawer';
import { MessageCircle } from 'lucide-react';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex flex-col font-sans selection:bg-pink-100 selection:text-pink-900">
        {/* Sticky Header with Top Bar Contract */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Banner with Featured Custom Products */}
          <Hero />

          {/* Star Feature: Live Customizer (Apple-style interactive preview) */}
          <LiveCustomizer />

          {/* Filterable Products Catalog */}
          <CatalogGrid />

          {/* Contact & Workshop Information in San Antonio, TX */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Quotation & Cart Drawer */}
        <QuotationDrawer />

        {/* Floating WhatsApp Quick Action Button */}
        <a
          href="https://wa.me/12108331766?text=Hola%20Creaciones%20Ya%26Fe,%20deseo%20cotizar%20un%20regalo%20personalizado"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
          title="Escríbenos por WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
            ¡Cotiza por WhatsApp!
          </span>
        </a>
      </div>
    </CartProvider>
  );
}
