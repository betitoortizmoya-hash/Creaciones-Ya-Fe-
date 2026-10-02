import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Sparkles, MessageCircle } from 'lucide-react';

export const Header: React.FC = () => {
  const { totalItemsCount, setIsDrawerOpen, currentNav, setCurrentNav } = useCart();

  const handleNavClick = (tab: 'inicio' | 'catalogo' | 'personaliza' | 'contacto', hashId?: string) => {
    setCurrentNav(tab);
    if (hashId) {
      const el = document.getElementById(hashId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('inicio')}
          className="text-left group cursor-pointer"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-serif">
            Creaciones <span className="text-pink-600 group-hover:text-pink-500 transition-colors">Ya&Fe</span>
          </span>
        </button>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button
            onClick={() => handleNavClick('inicio')}
            className={`transition-colors hover:text-slate-900 cursor-pointer ${
              currentNav === 'inicio' ? 'text-pink-600 font-bold' : ''
            }`}
          >
            Inicio
          </button>

          <button
            onClick={() => handleNavClick('catalogo', 'catalogo')}
            className={`transition-colors hover:text-slate-900 cursor-pointer ${
              currentNav === 'catalogo' ? 'text-pink-600 font-bold' : ''
            }`}
          >
            Catálogo
          </button>

          <button
            onClick={() => handleNavClick('personaliza', 'personalizador')}
            className={`flex items-center gap-1.5 transition-colors hover:text-slate-900 cursor-pointer ${
              currentNav === 'personaliza' ? 'text-pink-600 font-bold' : ''
            }`}
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>Personaliza en Vivo</span>
          </button>

          <button
            onClick={() => handleNavClick('contacto', 'contacto')}
            className={`transition-colors hover:text-slate-900 cursor-pointer ${
              currentNav === 'contacto' ? 'text-pink-600 font-bold' : ''
            }`}
          >
            Contacto
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/12108331766?text=Hola%20Creaciones%20Ya%26Fe,%20deseo%20m%C3%A1s%20informaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>+1 (210) 833-1766</span>
          </a>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-pink-400" />
            <span className="hidden xs:inline">Cotización</span>
            {totalItemsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-pink-600 text-white text-[10px] font-bold flex items-center justify-center -mr-1">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
