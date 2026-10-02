import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: 'Cumpleaños',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `¡Hola Creaciones Ya&Fe! 👋
Contacto desde el sitio web:
• Nombre: ${formState.name}
• Teléfono: ${formState.phone}
• Correo: ${formState.email}
• Ocasión: ${formState.occasion}
• Mensaje: ${formState.message}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/12108331766?text=${encoded}`, '_blank');
    setIsSent(true);
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info & Taller Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-pink-600 uppercase mb-2 block">
                Atención Personalizada
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
                Hablemos de tu Proyecto
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                ¿Tienes una idea especial para un cumpleaños, graduación, bautizo o evento corporativo? En nuestro taller en San Antonio, TX cuidamos cada puntada y cada detalle para que tu regalo sea inolvidable.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4 pt-2">
              <a
                href="https://wa.me/12108331766"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">WhatsApp Directo</p>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                    +1 (210) 833-1766
                  </p>
                </div>
              </a>

              <a
                href="mailto:aridny22@hotmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:border-pink-300 hover:bg-pink-50/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Correo Electrónico</p>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-pink-700">
                    aridny22@hotmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50">
                <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Ubicación y Entregas</p>
                  <p className="text-sm font-bold text-slate-900">
                    San Antonio, TX 78245, Estados Unidos
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Curbside Pick-up & Envíos a todo EE.UU.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Horario de Taller</p>
                  <p className="text-sm font-bold text-slate-900">
                    Lunes a Sábado: 9:00 AM – 7:00 PM
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Pedidos urgentes bajo previa coordinación
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Direct Contact Form */}
          <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 font-serif mb-2">
              Envíanos un Mensaje
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Te responderemos en menos de 30 minutos con una cotización personalizada.
            </p>

            {isSent ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">
                  ¡Mensaje Enviado con Éxito!
                </h4>
                <p className="text-xs text-emerald-700">
                  Hemos abierto tu chat de WhatsApp con los datos completados. Estaremos en contacto contigo a la brevedad.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-2 text-xs font-semibold text-emerald-800 underline"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      WhatsApp o Teléfono *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+1 (210) ..."
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="nombre@ejemplo.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Tipo de Ocasión
                    </label>
                    <select
                      value={formState.occasion}
                      onChange={(e) => setFormState({ ...formState, occasion: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="Cumpleaños">Cumpleaños / Aniversario</option>
                      <option value="Graduación">Graduación (Oso / Globo)</option>
                      <option value="Bebé / Embarazo">Baby Shower / Bautizo</option>
                      <option value="Mandil / Uniforme">Mandil de Chef o Negocio</option>
                      <option value="San Valentín">San Valentín / Amor</option>
                      <option value="Otro">Otro pedido especial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    ¿Qué te gustaría personalizar? *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Cuéntanos detalles como colores, nombres a bordar, fecha del evento..."
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-pink-400" />
                  <span>Enviar Cotización Inmediata</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
