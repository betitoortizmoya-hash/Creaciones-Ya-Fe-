import React from 'react';
import { Product } from '../../types';
import { ProductVisual } from '../ProductVisual';
import { useCart } from '../../context/CartContext';
import { X, Sparkles, ShoppingBag, Send, Check } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addItem, startCustomizing, customerInfo } = useCart();

  if (!product) return null;

  const handleQuickAdd = () => {
    addItem({
      type: 'standard',
      title: product.name,
      subtitle: product.subtitle,
      price: product.estimatedPriceNum,
      quantity: 1,
      colorName: product.colorOptions[0]?.name,
      colorHex: product.colorOptions[0]?.hex,
      notes: `Pedido directo de catálogo: ${product.name}`,
    });
    onClose();
  };

  const handleCustomize = () => {
    if (product.baseProductId) {
      startCustomizing(product.baseProductId as any, product.defaultText);
      onClose();
      const el = document.getElementById('personalizador');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleWhatsAppQuote = () => {
    const text = `¡Hola Creaciones Ya&Fe! 👋
Me interesa cotizar este producto de su catálogo:

🎁 *${product.name}*
💰 *Precio Referencial*: ${product.priceEstimate}
📋 *Detalles*: ${product.subtitle}

👤 *Cliente*: ${customerInfo.name || 'Cliente Web'}
${customerInfo.phone ? `📞 Teléfono: ${customerInfo.phone}` : ''}
${customerInfo.eventDate ? `📅 Fecha para evento: ${customerInfo.eventDate}` : ''}

¿Tienen disponibilidad para elaborar este pedido?`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/12108331766?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Visual Area */}
          <div className="aspect-4/3 md:aspect-auto h-64 md:h-full relative overflow-hidden bg-slate-950">
            <ProductVisual
              productId={product.id}
              category={product.category}
              isHovered={true}
            />
          </div>

          {/* Right Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
                {product.category}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif leading-tight">
                {product.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-3">
                {product.subtitle}
              </p>

              <div className="text-2xl font-black text-pink-600 font-mono mb-4">
                {product.priceEstimate}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Features List */}
              <div className="space-y-1.5 mb-6">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Características Artesanales:
                </p>
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-pink-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Color Options Swatches */}
              {product.colorOptions.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Colores Disponibles:
                  </p>
                  <div className="flex items-center gap-2">
                    {product.colorOptions.map((c) => (
                      <div
                        key={c.name}
                        className="w-5 h-5 rounded-full border border-slate-300 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
              {product.customizable && product.baseProductId ? (
                <button
                  onClick={handleCustomize}
                  className="w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Personalizar este diseño en vivo</span>
                </button>
              ) : (
                <button
                  onClick={handleQuickAdd}
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar a Cotización</span>
                </button>
              )}

              <button
                onClick={handleWhatsAppQuote}
                className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-emerald-600" />
                <span>Consultar por WhatsApp (+1 210-833-1766)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
