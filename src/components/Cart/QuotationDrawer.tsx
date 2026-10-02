import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Send,
  Calendar,
  MapPin,
  Sparkles,
  Copy,
  Check,
  Phone,
  Mail,
  ShoppingBag,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuotationDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    removeItem,
    updateQuantity,
    clearCart,
    totalAmount,
    totalItemsCount,
    customerInfo,
    updateCustomerInfo,
  } = useCart();

  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState<'items' | 'checkout'>('items');

  if (!isDrawerOpen) return null;

  // Format WhatsApp quotation text
  const generateWhatsAppMessage = () => {
    let msg = `¡Hola Creaciones Ya&Fe! 👋\nQuiero solicitar la cotización para el siguiente pedido:\n\n`;

    items.forEach((item, index) => {
      msg += `🎁 *ITEM ${index + 1}: ${item.title}* (x${item.quantity})\n`;
      msg += `   • Precio Unitario: $${item.price} USD\n`;
      if (item.colorName) {
        msg += `   • Color: ${item.colorName}\n`;
      }
      if (item.customizationSummary) {
        if (item.customizationSummary.textLayers.length > 0) {
          msg += `   • Textos: ${item.customizationSummary.textLayers.join(', ')}\n`;
        }
        if (item.customizationSummary.graphicsLayers.length > 0) {
          msg += `   • Gráficos: ${item.customizationSummary.graphicsLayers.join(', ')}\n`;
        }
        if (item.customizationSummary.hasPhoto) {
          msg += `   • Incluye fotografía para impresión\n`;
        }
      }
      if (item.notes) {
        msg += `   • Notas: ${item.notes}\n`;
      }
      msg += `\n`;
    });

    msg += `💰 *TOTAL ESTIMADO*: $${totalAmount} USD\n\n`;
    msg += `👤 *DATOS DEL CLIENTE*:\n`;
    msg += `• Nombre: ${customerInfo.name || 'Cliente Web'}\n`;
    if (customerInfo.phone) msg += `• Teléfono: ${customerInfo.phone}\n`;
    if (customerInfo.eventDate) msg += `• Fecha del evento: ${customerInfo.eventDate}\n`;
    msg += `• Modalidad: ${
      customerInfo.deliveryType === 'pickup'
        ? 'Pick-up en San Antonio, TX'
        : `Envío a domicilio (${customerInfo.deliveryAddress || 'Dirección a confirmar'})`
    }\n`;
    if (customerInfo.specialInstructions) {
      msg += `• Instrucciones: ${customerInfo.specialInstructions}\n`;
    }

    msg += `\n¿Me confirman la disponibilidad y detalles de pago? ¡Muchas gracias!`;
    return msg;
  };

  const handleSendWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/12108331766?text=${encoded}`, '_blank');
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const handleCopySummary = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(
      `Cotización Creaciones Ya&Fe - ${customerInfo.name || 'Cliente'}`
    );
    const body = encodeURIComponent(generateWhatsAppMessage());
    window.open(`mailto:aridny22@hotmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Resumen de Cotización
              </h3>
              <p className="text-xs text-slate-500">
                {totalItemsCount} {totalItemsCount === 1 ? 'artículo' : 'artículos'} para cotizar
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDrawerOpen(false)}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 flex-1 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-semibold text-slate-800 mb-1">
                Tu cotización está vacía
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                Personaliza un producto en vivo o selecciona un artículo del catálogo para comenzar.
              </p>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Explorar Productos
              </button>
            </div>
          ) : (
            <>
              {/* Stepper Tabs */}
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setActiveStep('items')}
                  className={`flex-1 py-2 text-center rounded-lg transition-all ${
                    activeStep === 'items'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  1. Artículos ({items.length})
                </button>
                <button
                  onClick={() => setActiveStep('checkout')}
                  className={`flex-1 py-2 text-center rounded-lg transition-all ${
                    activeStep === 'checkout'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  2. Datos y Entrega
                </button>
              </div>

              {/* STEP 1: ITEMS LIST */}
              {activeStep === 'items' && (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-1.5">
                            {item.type === 'custom' && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                                Personalizado
                              </span>
                            )}
                            <h4 className="text-sm font-bold text-slate-900">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>

                        <span className="font-mono text-sm font-bold text-slate-900 shrink-0">
                          ${item.price * item.quantity}
                        </span>
                      </div>

                      {/* Customization Details List */}
                      {item.customizationSummary && (
                        <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 space-y-1">
                          {item.customizationSummary.textLayers.map((txt, idx) => (
                            <p key={idx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                              <span>{txt}</span>
                            </p>
                          ))}
                          {item.customizationSummary.graphicsLayers.map((grp, idx) => (
                            <p key={idx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              <span>{grp}</span>
                            </p>
                          ))}
                          {item.customizationSummary.hasPhoto && (
                            <p className="flex items-center gap-1.5 text-blue-600 font-medium">
                              <Sparkles className="w-3 h-3" />
                              <span>Foto/Gráfico adjunto para sublimación</span>
                            </p>
                          )}
                        </div>
                      )}

                      {/* Quantity & Delete Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-900 w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => setActiveStep('checkout')}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                  >
                    Continuar a Datos de Entrega
                  </button>
                </div>
              )}

              {/* STEP 2: CUSTOMER DETAILS & LOGISTICS */}
              {activeStep === 'checkout' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => updateCustomerInfo({ name: e.target.value })}
                      placeholder="Ej. María Ortiz"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        WhatsApp / Teléfono *
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => updateCustomerInfo({ phone: e.target.value })}
                        placeholder="+1 (210) ..."
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Fecha del Evento
                      </label>
                      <input
                        type="date"
                        value={customerInfo.eventDate}
                        onChange={(e) => updateCustomerInfo({ eventDate: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  {/* Delivery preference */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Modalidad de Entrega
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => updateCustomerInfo({ deliveryType: 'pickup' })}
                        className={`p-3 text-left rounded-xl border transition-all ${
                          customerInfo.deliveryType === 'pickup'
                            ? 'border-pink-600 bg-pink-50/50 text-pink-900 font-semibold'
                            : 'border-slate-200 text-slate-700'
                        }`}
                      >
                        <p className="text-xs font-bold flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-pink-600" />
                          Pick-Up Local
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          San Antonio, TX 78245
                        </p>
                      </button>

                      <button
                        onClick={() => updateCustomerInfo({ deliveryType: 'delivery' })}
                        className={`p-3 text-left rounded-xl border transition-all ${
                          customerInfo.deliveryType === 'delivery'
                            ? 'border-pink-600 bg-pink-50/50 text-pink-900 font-semibold'
                            : 'border-slate-200 text-slate-700'
                        }`}
                      >
                        <p className="text-xs font-bold flex items-center gap-1.5">
                          <Send className="w-3.5 h-3.5 text-pink-600" />
                          Envío Local / USA
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Costo según código postal
                        </p>
                      </button>
                    </div>

                    {customerInfo.deliveryType === 'delivery' && (
                      <input
                        type="text"
                        value={customerInfo.deliveryAddress}
                        onChange={(e) => updateCustomerInfo({ deliveryAddress: e.target.value })}
                        placeholder="Dirección completa y Código Postal..."
                        className="w-full mt-2 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Instrucciones o Notas Especiales
                    </label>
                    <textarea
                      rows={2}
                      value={customerInfo.specialInstructions}
                      onChange={(e) => updateCustomerInfo({ specialInstructions: e.target.value })}
                      placeholder="Colores específicos de globos, dedicatoria o especificaciones..."
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <button
                    onClick={() => setActiveStep('items')}
                    className="text-xs text-slate-500 hover:text-slate-900 underline"
                  >
                    ← Volver a la lista de artículos
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {items.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-3 sticky bottom-0">
            <div className="flex items-center justify-between text-slate-900">
              <span className="text-xs font-bold uppercase tracking-wider">
                Total Estimado
              </span>
              <div className="text-right">
                <span className="text-2xl font-black text-pink-600 font-mono">
                  ${totalAmount}
                </span>
                <span className="text-xs text-slate-500 ml-1">USD</span>
              </div>
            </div>

            {/* Direct WhatsApp Quote Button */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Pedido por WhatsApp</span>
            </button>

            {/* Secondary actions: Copy text & Email */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleCopySummary}
                className="py-2 px-3 border border-slate-200 hover:bg-white text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiado!' : 'Copiar Resumen'}</span>
              </button>

              <button
                onClick={handleSendEmail}
                className="py-2 px-3 border border-slate-200 hover:bg-white text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Enviar Email</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
