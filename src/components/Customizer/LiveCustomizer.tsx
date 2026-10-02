import React, { useState, useEffect } from 'react';
import {
  BaseProductType,
  CanvasLayer,
  CanvasLayerText,
  CanvasLayerGraphic,
  CanvasLayerImage,
} from '../../types';
import {
  BASE_PRODUCTS,
  AVAILABLE_FONTS,
  THREAD_COLORS,
  PRESET_GRAPHICS,
} from '../../data/products';
import { ProductCanvas } from './ProductCanvas';
import { useCart } from '../../context/CartContext';
import confetti from 'canvas-confetti';
import {
  Type,
  Sparkles,
  Upload,
  Layers,
  ShoppingBag,
  RotateCcw,
  Check,
  Plus,
  Send,
  HelpCircle,
  Palette,
} from 'lucide-react';

export const LiveCustomizer: React.FC = () => {
  const {
    selectedBaseForCustomizer,
    addItem,
    customerInfo,
  } = useCart();

  // Active Base Product
  const [baseId, setBaseId] = useState<BaseProductType>(
    selectedBaseForCustomizer || 'apron'
  );

  // Sync if external action selected another base product
  useEffect(() => {
    if (selectedBaseForCustomizer) {
      setBaseId(selectedBaseForCustomizer);
    }
  }, [selectedBaseForCustomizer]);

  const baseConfig = BASE_PRODUCTS[baseId] || BASE_PRODUCTS.apron;

  // Selected Color for Base
  const [selectedColorHex, setSelectedColorHex] = useState<string>(
    baseConfig.defaultColorHex
  );
  const [selectedColorName, setSelectedColorName] = useState<string>(
    baseConfig.colors[0]?.name || 'Estándar'
  );

  // Update default color when base changes
  useEffect(() => {
    setSelectedColorHex(baseConfig.defaultColorHex);
    setSelectedColorName(baseConfig.colors[0]?.name || 'Estándar');
  }, [baseId, baseConfig]);

  // Active Layers on the Canvas
  const [layers, setLayers] = useState<CanvasLayer[]>(() => {
    // Initial sample layout
    return [
      {
        id: 'initial_text_1',
        type: 'text',
        text: 'Mary',
        fontFamily: "'Dancing Script', cursive",
        fontName: 'Cursiva Elegante',
        color: '#d97706',
        colorName: 'Oro Metálico',
        fontSize: 32,
        x: 0,
        y: -10,
        rotation: 0,
        isBold: true,
      },
      {
        id: 'initial_graphic_1',
        type: 'graphic',
        graphicId: 'mariposa',
        graphicName: 'Mariposa Bordada',
        svgIcon: PRESET_GRAPHICS[0].svg,
        color: '#db2777',
        size: 52,
        x: 0,
        y: -65,
        rotation: 0,
      },
    ];
  });

  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [isPreviewClean, setIsPreviewClean] = useState(false);
  const [activeToolTab, setActiveToolTab] = useState<'text' | 'graphics' | 'upload' | 'layers'>('text');
  const [customCraftNotes, setCustomCraftNotes] = useState('');

  // TEXT TOOL STATE
  const [inputText, setInputText] = useState('Mi Nombre');
  const [selectedFont, setSelectedFont] = useState(AVAILABLE_FONTS[0]);
  const [selectedThreadColor, setSelectedThreadColor] = useState(THREAD_COLORS[0]);
  const [fontSize, setFontSize] = useState(28);
  const [textRotation, setTextRotation] = useState(0);
  const [isCurved, setIsCurved] = useState(false);
  const [isBold, setIsBold] = useState(true);

  // GRAPHICS TOOL STATE
  const [selectedGraphicColor, setSelectedGraphicColor] = useState(THREAD_COLORS[2]); // Fucsia
  const [graphicSize, setGraphicSize] = useState(48);

  // UPLOAD TOOL STATE
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
  const [uploadedImageName, setUploadedImageName] = useState<string>('');
  const [imageShape, setImageShape] = useState<'rect' | 'circle' | 'heart'>('circle');
  const [imageScale, setImageScale] = useState(120);

  // Listen for canvas drop events from side palette
  useEffect(() => {
    const handleCanvasDrop = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.graphic) {
        const g = customEvent.detail.graphic;
        const newLayer: CanvasLayerGraphic = {
          id: 'graphic_' + Date.now(),
          type: 'graphic',
          graphicId: g.id,
          graphicName: g.name,
          svgIcon: g.svg,
          color: selectedGraphicColor.hex,
          size: graphicSize,
          x: customEvent.detail.x || 0,
          y: customEvent.detail.y || 0,
          rotation: 0,
        };
        setLayers((prev) => [...prev, newLayer]);
        setSelectedLayerId(newLayer.id);
      }
    };

    window.addEventListener('yafe_canvas_drop_graphic', handleCanvasDrop);
    return () => {
      window.removeEventListener('yafe_canvas_drop_graphic', handleCanvasDrop);
    };
  }, [selectedGraphicColor, graphicSize]);

  // Update existing layer properties
  const handleUpdateLayer = (id: string, updates: Partial<CanvasLayer>) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? ({ ...l, ...updates } as CanvasLayer) : l))
    );
  };

  // Delete layer
  const handleDeleteLayer = (id: string) => {
    setLayers((prev) => prev.filter((l) => l.id !== id));
    if (selectedLayerId === id) {
      setSelectedLayerId(null);
    }
  };

  // Reorder layer
  const handleReorderLayer = (id: string, direction: 'up' | 'down') => {
    const index = layers.findIndex((l) => l.id === id);
    if (index === -1) return;
    const newLayers = [...layers];
    if (direction === 'up' && index < newLayers.length - 1) {
      const temp = newLayers[index];
      newLayers[index] = newLayers[index + 1];
      newLayers[index + 1] = temp;
      setLayers(newLayers);
    } else if (direction === 'down' && index > 0) {
      const temp = newLayers[index];
      newLayers[index] = newLayers[index - 1];
      newLayers[index - 1] = temp;
      setLayers(newLayers);
    }
  };

  // Add New Text Layer
  const handleAddTextLayer = () => {
    if (!inputText.trim()) return;
    const newLayer: CanvasLayerText = {
      id: 'text_' + Date.now(),
      type: 'text',
      text: inputText.trim(),
      fontFamily: selectedFont.css,
      fontName: selectedFont.name,
      color: selectedThreadColor.hex,
      colorName: selectedThreadColor.name,
      fontSize,
      x: 0,
      y: 0,
      rotation: textRotation,
      isCurved,
      isBold,
    };
    setLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  // Add Preset Graphic Layer
  const handleAddGraphicLayer = (graphic: (typeof PRESET_GRAPHICS)[0]) => {
    const newLayer: CanvasLayerGraphic = {
      id: 'graphic_' + Date.now(),
      type: 'graphic',
      graphicId: graphic.id,
      graphicName: graphic.name,
      svgIcon: graphic.svg,
      color: selectedGraphicColor.hex,
      size: graphicSize,
      x: 0,
      y: -30,
      rotation: 0,
    };
    setLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  // Handle Image File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setUploadedImageSrc(result);
      setUploadedImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  // Add Uploaded Image to Canvas
  const handleAddImageToCanvas = () => {
    if (!uploadedImageSrc) return;
    const newLayer: CanvasLayerImage = {
      id: 'img_' + Date.now(),
      type: 'image',
      src: uploadedImageSrc,
      name: uploadedImageName || 'Foto Cliente',
      width: imageScale,
      height: imageScale,
      x: 0,
      y: 0,
      rotation: 0,
      shape: imageShape,
    };
    setLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  // Reset Canvas to base
  const handleResetCanvas = () => {
    if (confirm('¿Deseas reiniciar tu diseño y comenzar de cero?')) {
      setLayers([]);
      setSelectedLayerId(null);
    }
  };

  // Calculate customized price
  const customizationFee = Math.max(0, (layers.length - 1) * 3);
  const totalPrice = baseConfig.basePrice + customizationFee;

  // Add to Cart / Cotización
  const handleAddToCart = () => {
    const textLayers = layers
      .filter((l): l is CanvasLayerText => l.type === 'text')
      .map((l) => `"${l.text}" (${l.fontName}, ${l.colorName})`);

    const graphicsLayers = layers
      .filter((l): l is CanvasLayerGraphic => l.type === 'graphic')
      .map((l) => l.graphicName);

    const hasPhoto = layers.some((l) => l.type === 'image');

    addItem({
      type: 'custom',
      title: `${baseConfig.name} Personalizado`,
      subtitle: `Color: ${selectedColorName} · ${layers.length} detalles personalizados`,
      price: totalPrice,
      quantity: 1,
      colorName: selectedColorName,
      colorHex: selectedColorHex,
      customizationSummary: {
        baseProduct: baseConfig.name,
        textLayers,
        graphicsLayers,
        hasPhoto,
      },
      notes: customCraftNotes,
    });

    // Celebratory Confetti Effect
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#db2777', '#f43f5e', '#fbbf24', '#38bdf8', '#818cf8'],
    });
  };

  // Direct WhatsApp Quote
  const handleDirectWhatsApp = () => {
    const textLayers = layers
      .filter((l): l is CanvasLayerText => l.type === 'text')
      .map((l) => `  • Texto: "${l.text}" (Fuente: ${l.fontName}, Hilo: ${l.colorName})`)
      .join('\n');

    const graphicsLayers = layers
      .filter((l): l is CanvasLayerGraphic => l.type === 'graphic')
      .map((l) => `  • Gráfico/Bordado: ${l.graphicName}`)
      .join('\n');

    const hasPhoto = layers.some((l) => l.type === 'image');

    const message = `¡Hola Creaciones Ya&Fe! 👋
Me gustaría cotizar este diseño personalizado creado en su sitio web:

🎁 *Producto*: ${baseConfig.name}
🎨 *Color Base*: ${selectedColorName}
💰 *Precio Estimado*: $${totalPrice} USD

📝 *Detalles de Personalización*:
${textLayers || '  • Sin texto adicional'}
${graphicsLayers || ''}
${hasPhoto ? '  • Incluye fotografía/logo para sublimación' : ''}
${customCraftNotes ? `📌 *Notas Especiales*: ${customCraftNotes}` : ''}

👤 *Cliente*: ${customerInfo.name || 'Cliente Web'}
${customerInfo.phone ? `📞 Tel: ${customerInfo.phone}` : ''}
${customerInfo.eventDate ? `📅 Fecha para evento: ${customerInfo.eventDate}` : ''}

¿Me podrían confirmar disponibilidad y tiempo de entrega? ¡Gracias!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/12108331766?text=${encoded}`, '_blank');
  };

  return (
    <section id="personalizador" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold tracking-widest text-pink-600 uppercase mb-2 block">
          Experiencia de Diseño en Tiempo Real
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
          Crea tu Regalo Ideal
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Elige tu producto base, personaliza nombres con hilo bordado, añade gráficos artesanales o sube tus fotografías. Visualiza el resultado final al instante.
        </p>
      </div>

      {/* Base Product Selector Carousel / Horizontal Bar */}
      <div className="mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none px-2">
          {Object.values(BASE_PRODUCTS).map((prod) => {
            const isSelected = baseId === prod.id;
            return (
              <button
                key={prod.id}
                onClick={() => setBaseId(prod.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-pink-500/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-pink-300 hover:bg-pink-50/30'
                }`}
              >
                <span>{prod.name}</span>
                <span className="text-[11px] opacity-75 font-mono">
                  ${prod.basePrice}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid: Canvas Center & Controls Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center: Interactive Canvas Showcase */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col items-center">
          {/* Base Product Colors Palette */}
          <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-slate-100 flex-wrap gap-2">
            <div>
              <p className="text-xs font-bold text-slate-900">Color del Producto Base</p>
              <p className="text-xs text-slate-500">{selectedColorName}</p>
            </div>

            <div className="flex items-center gap-2">
              {baseConfig.colors.map((color) => {
                const isActive = selectedColorHex === color.hex;
                return (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColorHex(color.hex);
                      setSelectedColorName(color.name);
                    }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      isActive
                        ? 'border-pink-600 scale-110 shadow-sm ring-2 ring-pink-200'
                        : 'border-slate-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {isActive && (
                      <Check
                        className={`w-3.5 h-3.5 mx-auto ${
                          color.isLight ? 'text-slate-800' : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Dynamic Canvas Component */}
          <ProductCanvas
            baseProductId={baseId}
            colorHex={selectedColorHex}
            layers={layers}
            selectedLayerId={selectedLayerId}
            onSelectLayer={setSelectedLayerId}
            onUpdateLayer={handleUpdateLayer}
            onDeleteLayer={handleDeleteLayer}
            onReorderLayer={handleReorderLayer}
            isPreviewClean={isPreviewClean}
            onToggleCleanPreview={() => setIsPreviewClean(!isPreviewClean)}
          />

          {/* Canvas Bottom Quick Actions */}
          <div className="w-full max-w-[560px] flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              Arrastra y gira los elementos directamente
            </span>
            <button
              onClick={handleResetCanvas}
              className="flex items-center gap-1 text-slate-500 hover:text-rose-600 transition-colors font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar
            </button>
          </div>
        </div>

        {/* Right: Customization Toolset & Configuration Box */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Tool Navigation Tabs */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-1">
            <button
              onClick={() => setActiveToolTab('text')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                activeToolTab === 'text'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Texto</span>
            </button>

            <button
              onClick={() => setActiveToolTab('graphics')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                activeToolTab === 'graphics'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gráficos</span>
            </button>

            <button
              onClick={() => setActiveToolTab('upload')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                activeToolTab === 'upload'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Subir Foto</span>
            </button>

            <button
              onClick={() => setActiveToolTab('layers')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                activeToolTab === 'layers'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Capas ({layers.length})</span>
            </button>
          </div>

          {/* Active Tool Content Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            {/* TAB 1: TEXT TOOLS */}
            {activeToolTab === 'text' && (
              <div className="space-y-5">
                {/* Input Text */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Frase o Nombre a Bordar
                  </label>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ej. Chef Ricardo, Happy Birthday..."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pink-500 font-medium"
                  />

                  {/* Suggestion Quick Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {baseConfig.suggestedPhrases.slice(0, 3).map((phrase) => (
                      <button
                        key={phrase}
                        onClick={() => setInputText(phrase)}
                        className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md hover:bg-pink-50 hover:text-pink-600 transition-colors"
                      >
                        {phrase}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Typography Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Estilo de Tipografía
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {AVAILABLE_FONTS.map((font) => {
                      const isFontSelected = selectedFont.id === font.id;
                      return (
                        <button
                          key={font.id}
                          onClick={() => setSelectedFont(font)}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            isFontSelected
                              ? 'border-pink-600 bg-pink-50/50 ring-1 ring-pink-500'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <span className="block text-[11px] text-slate-500 mb-1">
                            {font.name}
                          </span>
                          <span
                            className="block text-sm text-slate-900 truncate"
                            style={{ fontFamily: font.css }}
                          >
                            {font.sample}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Thread & Vinyl Colors */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Color del Hilo / Vinil</span>
                    <span className="text-slate-500 font-normal">
                      {selectedThreadColor.name}
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {THREAD_COLORS.map((thread) => {
                      const isColorActive = selectedThreadColor.hex === thread.hex;
                      return (
                        <button
                          key={thread.name}
                          onClick={() => setSelectedThreadColor(thread)}
                          className={`w-7 h-7 rounded-full border-2 transition-transform ${
                            isColorActive
                              ? 'border-pink-600 scale-110 shadow-sm ring-2 ring-pink-200'
                              : 'border-slate-200 hover:scale-105'
                          }`}
                          style={{ backgroundColor: thread.hex }}
                          title={thread.name}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Font Size & Rotation Sliders */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>Tamaño</span>
                      <span>{fontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="16"
                      max="54"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full accent-pink-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>Inclinación</span>
                      <span>{textRotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="-45"
                      max="45"
                      value={textRotation}
                      onChange={(e) => setTextRotation(Number(e.target.value))}
                      className="w-full accent-pink-600"
                    />
                  </div>
                </div>

                {/* Add Text Button */}
                <button
                  onClick={handleAddTextLayer}
                  className="w-full py-3 px-4 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Agregar Texto al Lienzo
                </button>
              </div>
            )}

            {/* TAB 2: GRAPHICS & STICKERS */}
            {activeToolTab === 'graphics' && (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Galería de Gráficos & Bordados
                    </label>
                    <span className="text-[11px] text-pink-600 font-medium">
                      Haz clic o arrastra al producto
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2.5">
                    {PRESET_GRAPHICS.map((item) => (
                      <button
                        key={item.id}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData(
                            'application/json',
                            JSON.stringify({ type: 'graphic', ...item })
                          );
                        }}
                        onClick={() => handleAddGraphicLayer(item)}
                        className="group flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-pink-500 hover:bg-pink-50/50 transition-all text-slate-700 hover:text-pink-600 cursor-pointer"
                        title={`Añadir ${item.name}`}
                      >
                        <div
                          className="w-7 h-7 mb-1.5 transition-transform group-hover:scale-110"
                          dangerouslySetInnerHTML={{ __html: item.svg }}
                        />
                        <span className="text-[10px] font-medium text-slate-600 group-hover:text-pink-700 truncate w-full text-center">
                          {item.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color for Graphics */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Color del Gráfico</span>
                    <span className="text-slate-500 font-normal">
                      {selectedGraphicColor.name}
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {THREAD_COLORS.map((thread) => (
                      <button
                        key={thread.name}
                        onClick={() => setSelectedGraphicColor(thread)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          selectedGraphicColor.hex === thread.hex
                            ? 'border-pink-600 scale-110 shadow-sm ring-2 ring-pink-200'
                            : 'border-slate-200 hover:scale-105'
                        }`}
                        style={{ backgroundColor: thread.hex }}
                        title={thread.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Graphic Size */}
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Tamaño del Gráfico</span>
                    <span>{graphicSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="90"
                    value={graphicSize}
                    onChange={(e) => setGraphicSize(Number(e.target.value))}
                    className="w-full accent-pink-600"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: FILE UPLOAD */}
            {activeToolTab === 'upload' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Sube tu Foto o Logotipo
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    Ideal para rompecabezas, marcos familiares, termos o uniformes con logotipo empresarial.
                  </p>

                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-pink-400 transition-colors bg-slate-50/50">
                    <input
                      type="file"
                      id="customer_file_upload"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="customer_file_upload"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <Upload className="w-8 h-8 text-pink-500 mb-2" />
                      <span className="text-xs font-semibold text-slate-800">
                        {uploadedImageName ? uploadedImageName : 'Seleccionar Imagen'}
                      </span>
                      <span className="text-[11px] text-slate-400 mt-0.5">
                        PNG, JPG o WEBP (máx. 10MB)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Image Shape Mask & Scale Options */}
                {uploadedImageSrc && (
                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Forma de Recorte
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setImageShape('circle')}
                          className={`py-2 px-3 text-xs font-medium rounded-xl border ${
                            imageShape === 'circle'
                              ? 'border-pink-600 bg-pink-50 text-pink-700'
                              : 'border-slate-200 text-slate-700'
                          }`}
                        >
                          Circular
                        </button>
                        <button
                          onClick={() => setImageShape('heart')}
                          className={`py-2 px-3 text-xs font-medium rounded-xl border ${
                            imageShape === 'heart'
                              ? 'border-pink-600 bg-pink-50 text-pink-700'
                              : 'border-slate-200 text-slate-700'
                          }`}
                        >
                          Corazón
                        </button>
                        <button
                          onClick={() => setImageShape('rect')}
                          className={`py-2 px-3 text-xs font-medium rounded-xl border ${
                            imageShape === 'rect'
                              ? 'border-pink-600 bg-pink-50 text-pink-700'
                              : 'border-slate-200 text-slate-700'
                          }`}
                        >
                          Rectangular
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span>Escala de la Imagen</span>
                        <span>{imageScale}px</span>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="220"
                        value={imageScale}
                        onChange={(e) => setImageScale(Number(e.target.value))}
                        className="w-full accent-pink-600"
                      />
                    </div>

                    <button
                      onClick={handleAddImageToCanvas}
                      className="w-full py-3 px-4 bg-pink-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-pink-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Insertar Imagen al Producto
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: ACTIVE LAYERS & NOTES */}
            {activeToolTab === 'layers' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Elementos en el Producto ({layers.length})
                  </label>
                  {layers.length > 0 && (
                    <button
                      onClick={handleResetCanvas}
                      className="text-[11px] text-rose-600 hover:underline"
                    >
                      Limpiar todo
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {layers.map((layer) => {
                    const isSelected = selectedLayerId === layer.id;
                    return (
                      <div
                        key={layer.id}
                        onClick={() => setSelectedLayerId(layer.id)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'border-pink-500 bg-pink-50/40 shadow-xs'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span
                            className="w-4 h-4 rounded-full border shrink-0"
                            style={{
                              backgroundColor:
                                layer.type === 'text'
                                  ? layer.color
                                  : layer.type === 'graphic'
                                  ? layer.color
                                  : '#cbd5e1',
                            }}
                          />
                          <div className="truncate">
                            <p className="text-xs font-semibold text-slate-800 truncate">
                              {layer.type === 'text'
                                ? `Texto: "${layer.text}"`
                                : layer.type === 'graphic'
                                ? layer.graphicName
                                : layer.name}
                            </p>
                            <p className="text-[10px] text-slate-400 capitalize">
                              {layer.type}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLayer(layer.id);
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}

                  {layers.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6">
                      No hay elementos sobre el producto aún.
                    </p>
                  )}
                </div>

                {/* Craft Special Notes */}
                <div className="pt-3 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Instrucciones Especiales para el Taller
                  </label>
                  <textarea
                    rows={2}
                    value={customCraftNotes}
                    onChange={(e) => setCustomCraftNotes(e.target.value)}
                    placeholder="Ej. Deseo que el hilo tenga acabado brillante, agregar tarjeta con dedicatoria..."
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Checkout Summary Box (Apple-style contiguous module) */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">
                  Cotización Estimada
                </p>
                <h4 className="text-lg font-bold text-white">
                  {baseConfig.name}
                </h4>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-pink-400">
                  ${totalPrice}
                </span>
                <span className="text-xs text-slate-400 ml-1">USD</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span>Producto base ({selectedColorName}):</span>
                <span>${baseConfig.basePrice}</span>
              </div>
              {customizationFee > 0 && (
                <div className="flex justify-between text-pink-300">
                  <span>Detalles de personalización ({layers.length} capas):</span>
                  <span>+${customizationFee}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400 pt-1">
                <span>Tiempo estimado de elaboración:</span>
                <span>24 - 48 hrs</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar a Cotización</span>
              </button>

              <button
                onClick={handleDirectWhatsApp}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Pedir por WhatsApp</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Atención directa en San Antonio, TX · Envíos y Pick-Up disponible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
