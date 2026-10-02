import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, ArrowRight, Heart, Award, ShieldCheck } from 'lucide-react';
import { ProductVisual } from './ProductVisual';

export const Hero: React.FC = () => {
  const { setCurrentNav, startCustomizing } = useCart();

  const handleStartCustomizer = () => {
    startCustomizing('apron');
    const el = document.getElementById('personalizador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreCatalog = () => {
    setCurrentNav('catalogo');
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-pink-50/20 to-[#faf9f6] py-12 sm:py-20 lg:py-24 border-b border-slate-200/60">
      {/* Subtle organic background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-purple-200/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Editorial Lead-in */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100/70 text-pink-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Artesanía & Bordado en San Antonio, TX</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-serif leading-[1.15]">
              Detalles que emocionan,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600">
                personalizados a tu gusto
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              En <strong className="text-slate-800">Creaciones Ya&Fe</strong> transformamos tus momentos especiales en piezas únicas: mandiles con bordados finos, globos burbuja con peluches y flores, termos sublimados y recuerdos conmemorativos.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleStartCustomizer}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-sm uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-pink-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Crea tu regalo ideal</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleExploreCatalog}
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl border border-slate-200 shadow-xs transition-colors cursor-pointer"
              >
                Ver Catálogo Completo
              </button>
            </div>

            {/* Trust Markers without pill boxes */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                <span>Hecho 100% a mano con amor</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Hilos y materiales premium</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Entrega y pick-up local</span>
              </div>
            </div>
          </div>

          {/* Right Product Composition Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Back Card: Globo Burbuja Graduación */}
              <div className="absolute -top-6 -right-4 sm:-right-8 w-60 sm:w-72 aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-white/80 rotate-3 transition-transform hover:rotate-0 duration-500 hidden sm:block">
                <ProductVisual
                  productId="globo-burbuja-oso-graduacion"
                  category="arreglos"
                  isHovered={true}
                />
              </div>

              {/* Front Center Card: Mandil Bordado Chef Mary */}
              <div className="relative z-10 w-full sm:w-80 md:w-96 aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-2 border-white -rotate-2 hover:rotate-0 transition-transform duration-500">
                <ProductVisual
                  productId="mandil-chef-mary"
                  category="bordados"
                  isHovered={true}
                />
              </div>

              {/* Bottom Card: Termo Rayados / Mameluco */}
              <div className="absolute -bottom-8 -left-4 sm:-left-8 w-56 sm:w-64 aspect-4/3 rounded-3xl overflow-hidden shadow-xl border border-white/80 rotate-6 transition-transform hover:rotate-0 duration-500 hidden sm:block">
                <ProductVisual
                  productId="mameluco-bebe-hermano-mayor"
                  category="bordados"
                />
              </div>

              {/* Interactive badge floating button */}
              <button
                onClick={() => startCustomizing('bubble-balloon')}
                className="absolute bottom-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-lg border border-slate-700 hover:bg-slate-900 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Personalizar Globo Burbuja</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
