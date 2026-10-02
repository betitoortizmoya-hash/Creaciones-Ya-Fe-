import React from 'react';
import { Heart, MessageCircle, MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <span className="text-xl font-black text-white font-serif tracking-tight">
              Creaciones <span className="text-pink-500">Ya&Fe</span>
            </span>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Taller de regalos personalizados, bordados textiles finos y arreglos de globos con amor en San Antonio, Texas. Cada pieza es elaborada artesanalmente cuidando cada puntada y detalle.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-pink-400 font-medium">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span>Detalles hechos con amor desde la imaginación</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Categorías
            </p>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a href="#catalogo" className="hover:text-pink-400 transition-colors">
                  Mandiles y Bordados de Trabajo
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-pink-400 transition-colors">
                  Globos Burbuja con Peluches & Luces
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-pink-400 transition-colors">
                  Ramos Buchones & Flores Eternas
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-pink-400 transition-colors">
                  Mamelucos y Ropa de Bebé
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-pink-400 transition-colors">
                  Aretes Artesanales de Autor
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-pink-400 transition-colors">
                  Rompecabezas y Cuadros Familiares
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact info */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              San Antonio, Texas
            </p>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-pink-500 shrink-0 mt-0.5" />
                <span>San Antonio, TX 78245, Bexar County</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <a href="tel:+12108331766" className="hover:text-white transition-colors">
                  +1 (210) 833-1766
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <a href="mailto:aridny22@hotmail.com" className="hover:text-white transition-colors">
                  aridny22@hotmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean copyright and location statement */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Creaciones Ya&Fe. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/12108331766"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Directo</span>
            </a>
            <span className="text-slate-800">·</span>
            <span>San Antonio, TX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
