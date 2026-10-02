import React, { useState, useMemo } from 'react';
import { CATALOG_PRODUCTS } from '../../data/products';
import { Product, ProductCategory } from '../../types';
import { ProductVisual } from '../ProductVisual';
import { ProductModal } from './ProductModal';
import { useCart } from '../../context/CartContext';
import { Search, Sparkles, ShoppingBag, Eye, SlidersHorizontal } from 'lucide-react';

export const CatalogGrid: React.FC = () => {
  const { startCustomizing, addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos los Artículos' },
    { id: 'bordados', label: 'Bordados Textiles' },
    { id: 'arreglos', label: 'Arreglos Especiales' },
    { id: 'accesorios', label: 'Accesorios & Aretes' },
    { id: 'sublimacion', label: 'Sublimación & Fotos' },
  ];

  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'todos' || product.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.subtitle.toLowerCase().includes(q) ||
        product.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCustomizeProduct = (product: Product) => {
    if (product.baseProductId) {
      startCustomizing(product.baseProductId as any, product.defaultText);
      const el = document.getElementById('personalizador');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setActiveModalProduct(product);
    }
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
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
  };

  return (
    <section id="catalogo" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-pink-600 uppercase mb-2 block">
            Galería de Creaciones
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
            Catálogo Exclusivo
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-xl">
            Bordados artesanales, arreglos con globos y recuerdos únicos hechos a mano en San Antonio, TX. Personaliza tu favorito o cotiza de inmediato.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por regalo, ocasión u objeto..."
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pink-500 shadow-xs"
          />
        </div>
      </div>

      {/* Filter Tabs (Functional segmented buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as ProductCategory)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProducts.map((product) => {
          return (
            <div
              key={product.id}
              onClick={() => setActiveModalProduct(product)}
              className="group relative bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Product Visual Top (leads with 65-75% height) */}
              <div className="relative w-full aspect-4/3 overflow-hidden bg-slate-900">
                <ProductVisual
                  productId={product.id}
                  category={product.category}
                />

                {/* Subtle Text Tag (Section 2.B no badge spam) */}
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                    {product.badge}
                  </span>
                )}

                {/* Quick View Floating Button on Hover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalProduct(product);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-slate-700 hover:text-pink-600 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Ver detalles"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Card Content & Clean Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-1.5">
                    <span className="capitalize text-pink-600 font-semibold">
                      {product.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>San Antonio, TX</span>
                    {product.customizable && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-amber-600">Personalizable</span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-pink-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                {/* Bottom Row: Price & Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="font-mono text-sm font-bold text-slate-900">
                    {product.priceEstimate}
                  </div>

                  <div className="flex items-center gap-2">
                    {product.customizable && product.baseProductId ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCustomizeProduct(product);
                        }}
                        className="px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                        <span>Personalizar</span>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-pink-400" />
                        <span>Cotizar</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
          <p className="text-sm font-semibold text-slate-700 mb-1">
            No encontramos resultados para tu búsqueda
          </p>
          <p className="text-xs text-slate-500 mb-4">
            Prueba con otra palabra clave o explora todas las categorías.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('todos');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
          >
            Ver todos los productos
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  );
};
