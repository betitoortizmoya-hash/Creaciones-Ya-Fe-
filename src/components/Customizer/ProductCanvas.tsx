import React, { useRef, useState, useEffect } from 'react';
import { BaseProductType, CanvasLayer } from '../../types';
import { BASE_PRODUCTS } from '../../data/products';
import { RotateCw, Trash2, ArrowUp, ArrowDown, Eye, Check, Sparkles } from 'lucide-react';

interface ProductCanvasProps {
  baseProductId: BaseProductType;
  colorHex: string;
  layers: CanvasLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string | null) => void;
  onUpdateLayer: (id: string, updates: Partial<CanvasLayer>) => void;
  onDeleteLayer: (id: string) => void;
  onReorderLayer: (id: string, direction: 'up' | 'down') => void;
  isPreviewClean: boolean;
  onToggleCleanPreview: () => void;
}

export const ProductCanvas: React.FC<ProductCanvasProps> = ({
  baseProductId,
  colorHex,
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
  onDeleteLayer,
  onReorderLayer,
  isPreviewClean,
  onToggleCleanPreview,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialLayerPos, setInitialLayerPos] = useState({ x: 0, y: 0 });

  const activeProduct = BASE_PRODUCTS[baseProductId] || BASE_PRODUCTS.apron;

  // Handle pointer down for dragging elements
  const handleLayerPointerDown = (e: React.PointerEvent, layer: CanvasLayer) => {
    e.stopPropagation();
    onSelectLayer(layer.id);
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialLayerPos({ x: layer.x, y: layer.y });
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || !selectedLayerId) return;
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      onUpdateLayer(selectedLayerId, {
        x: initialLayerPos.x + dx,
        y: initialLayerPos.y + dy,
      });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, selectedLayerId, dragStart, initialLayerPos, onUpdateLayer]);

  // Drop target for drag & drop from side palette
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const graphicData = e.dataTransfer.getData('application/json');
    if (!graphicData) return;
    try {
      const data = JSON.parse(graphicData);
      if (data.type === 'graphic') {
        const rect = containerRef.current?.getBoundingClientRect();
        const dropX = rect ? e.clientX - rect.left - 250 : 0;
        const dropY = rect ? e.clientY - rect.top - 250 : 0;
        // Broadcast custom event or parent callback
        window.dispatchEvent(
          new CustomEvent('yafe_canvas_drop_graphic', {
            detail: { graphic: data, x: dropX, y: dropY },
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Render Base Product Mockup Geometry with user-chosen colorHex
  const renderProductBase = () => {
    switch (baseProductId) {
      case 'apron':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl">
            <defs>
              <filter id="apronFabricGrain">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.12 0" />
                <feComposite in2="SourceGraphic" in="glare" operator="in" />
              </filter>
              <linearGradient id="apronShading" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            {/* Neck Strap */}
            <path d="M190,40 Q250,5 310,40" fill="none" stroke="#27272a" strokeWidth="20" strokeLinecap="round" />
            <path d="M190,40 Q250,5 310,40" fill="none" stroke="#52525b" strokeWidth="2" strokeDasharray="6,4" />

            {/* Main Apron Silhouette */}
            <path
              d="M175,70 L325,70 L345,180 L385,200 L395,440 L105,440 L115,200 L155,180 Z"
              fill={colorHex}
              stroke="rgba(0,0,0,0.3)"
              strokeWidth="3"
            />
            {/* Shading overlay */}
            <path
              d="M175,70 L325,70 L345,180 L385,200 L395,440 L105,440 L115,200 L155,180 Z"
              fill="url(#apronShading)"
            />

            {/* Realistic Hem Stitching */}
            <path
              d="M182,78 L318,78 L338,182 L378,202 L387,432 L113,432 L122,202 L162,182 Z"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.8"
              strokeDasharray="5,4"
            />

            {/* Front Big Kangaroo Pocket */}
            <g transform="translate(150, 270)">
              <rect x="0" y="0" width="200" height="120" rx="8" fill={colorHex} stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" />
              <rect x="0" y="0" width="200" height="120" rx="8" fill="url(#apronShading)" opacity="0.6" />
              {/* Pocket Stitching */}
              <rect x="6" y="6" width="188" height="108" rx="6" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4,4" />
              {/* Center divider line */}
              <line x1="100" y1="0" x2="100" y2="120" stroke="rgba(0,0,0,0.4)" strokeWidth="2" />
              <line x1="100" y1="0" x2="100" y2="120" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4,4" />
            </g>

            {/* Waist Tie Straps */}
            <path d="M115,200 C60,230 40,300 20,380" fill="none" stroke="#27272a" strokeWidth="14" strokeLinecap="round" />
            <path d="M385,200 C440,230 460,300 480,380" fill="none" stroke="#27272a" strokeWidth="14" strokeLinecap="round" />
          </svg>
        );

      case 'onesie':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="onesieShade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Baby Onesie Body */}
            <path
              d="M150,70 C190,55 310,55 350,70 L430,140 L390,195 L350,165 L350,330 C350,360 320,410 280,410 L220,410 C180,410 150,360 150,330 L150,165 L110,195 L70,140 Z"
              fill={colorHex}
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="3"
            />
            <path
              d="M150,70 C190,55 310,55 350,70 L430,140 L390,195 L350,165 L350,330 C350,360 320,410 280,410 L220,410 C180,410 150,360 150,330 L150,165 L110,195 L70,140 Z"
              fill="url(#onesieShade)"
            />

            {/* Envelope Neck Fold Details */}
            <path d="M170,70 Q250,120 330,70" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="6" strokeLinecap="round" />
            <path d="M155,68 L200,98" stroke="rgba(0,0,0,0.15)" strokeWidth="3" />
            <path d="M345,68 L300,98" stroke="rgba(0,0,0,0.15)" strokeWidth="3" />

            {/* Seams */}
            <path
              d="M160,82 C195,70 305,70 340,82 L415,145 L385,188 L340,155 L340,325 C340,352 312,398 275,398 L225,398 C188,398 160,352 160,325 L160,155 L115,188 L85,145 Z"
              fill="none"
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            />

            {/* Bottom snap buttons */}
            <circle cx="225" cy="395" r="5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="250" cy="395" r="5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="275" cy="395" r="5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          </svg>
        );

      case 'bubble-balloon':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="balloonSphereGlow" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="75%" stopColor="#93c5fd" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.45" />
              </radialGradient>
              <linearGradient id="balloonBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colorHex} />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Internal Soft Fairy Lights Glow */}
            <circle cx="250" cy="200" r="160" fill="none" stroke="rgba(253,224,71,0.2)" strokeWidth="10" filter="blur(8px)" />

            {/* Crystal Clear Balloon Sphere */}
            <circle cx="250" cy="200" r="165" fill="url(#balloonSphereGlow)" stroke="rgba(255,255,255,0.85)" strokeWidth="3" />

            {/* Specular curved highlights on the glassy surface */}
            <path d="M140,110 A140,140 0 0,1 230,60" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" opacity="0.85" />
            <circle cx="250" cy="65" r="5" fill="#ffffff" opacity="0.8" />
            <path d="M340,290 A140,140 0 0,1 365,220" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.5" />

            {/* Decorative Plush Bear Silhouette inside */}
            <g transform="translate(250, 240) scale(0.9)" opacity="0.9">
              <circle cx="-32" cy="-55" r="18" fill="#a16207" stroke="#78350f" strokeWidth="2" />
              <circle cx="32" cy="-55" r="18" fill="#a16207" stroke="#78350f" strokeWidth="2" />
              <circle cx="0" cy="-35" r="42" fill="#b45309" stroke="#78350f" strokeWidth="2" />
              <ellipse cx="0" cy="-24" rx="20" ry="14" fill="#fde68a" />
              <ellipse cx="0" cy="-28" rx="7" ry="5" fill="#18181b" />
              <circle cx="-14" cy="-40" r="4" fill="#18181b" />
              <circle cx="14" cy="-40" r="4" fill="#18181b" />
              <ellipse cx="0" cy="20" rx="36" ry="30" fill="#a16207" stroke="#78350f" strokeWidth="2" />
            </g>

            {/* Twinkling micro fairy lights */}
            <circle cx="170" cy="180" r="4" fill="#fde047" opacity="0.9" className="animate-ping" />
            <circle cx="320" cy="160" r="3.5" fill="#fde047" opacity="0.95" />
            <circle cx="210" cy="280" r="3" fill="#fde047" opacity="0.85" />
            <circle cx="290" cy="270" r="3" fill="#fde047" opacity="0.9" />

            {/* Balloon Neck Tie */}
            <polygon points="238,365 262,365 250,380" fill={colorHex} />

            {/* Gift Box Base */}
            <g transform="translate(175, 380)">
              <rect x="0" y="0" width="150" height="70" rx="10" fill="url(#balloonBaseGrad)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              {/* Ribbon */}
              <rect x="66" y="0" width="18" height="70" fill="#fde047" />
              {/* Big Satin Ribbon Bow */}
              <path d="M75,0 C40,-25 35,5 75,0 C115,5 110,-25 75,0" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
            </g>
          </svg>
        );

      case 'tumbler':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="tumblerCylinderShading" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
                <stop offset="25%" stopColor={colorHex} />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="75%" stopColor={colorHex} />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
              </linearGradient>
            </defs>

            {/* Clear Reusable Straw */}
            <rect x="244" y="30" width="12" height="110" rx="4" fill="rgba(255,255,255,0.8)" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Acrylic Lid */}
            <ellipse cx="250" cy="115" rx="76" ry="20" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2.5" />
            <ellipse cx="250" cy="110" rx="70" ry="15" fill="#f8fafc" />

            {/* Tumbler Body */}
            <path
              d="M178,115 L186,430 C187,440 198,448 212,448 L288,448 C302,448 313,440 314,430 L322,115 Z"
              fill={colorHex}
              stroke="#64748b"
              strokeWidth="2.5"
            />
            {/* Realistic Curved Specular Highlight for 3D cylinder effect */}
            <path
              d="M178,115 L186,430 C187,440 198,448 212,448 L288,448 C302,448 313,440 314,430 L322,115 Z"
              fill="url(#tumblerCylinderShading)"
            />

            {/* Specular White Stripe */}
            <line x1="236" y1="115" x2="238" y2="445" stroke="#ffffff" strokeWidth="6" opacity="0.5" />
            <line x1="243" y1="115" x2="244" y2="445" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
          </svg>
        );

      case 'puzzle':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="puzzleHeartGradCustom" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colorHex} />
                <stop offset="100%" stopColor="#4c0519" />
              </linearGradient>
            </defs>

            {/* Heart Shaped Puzzle Silhouette */}
            <path
              d="M250,420 C80,290 40,210 40,145 C40,75 95,50 145,50 C195,50 235,90 250,115 C265,90 305,50 355,50 C405,50 460,75 460,145 C460,210 420,290 250,420 Z"
              fill="url(#puzzleHeartGradCustom)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="4"
            />

            {/* Realistic Jigsaw Puzzle Cut Lines */}
            <path
              d="M45,170 Q120,180 180,170 C190,150 210,150 220,170 Q300,160 380,170 Q430,165 455,170 M45,260 Q140,250 220,260 C230,280 250,280 260,260 Q340,270 435,260 M170,60 Q165,150 170,220 C150,230 150,250 170,260 Q160,330 200,370 M330,60 Q335,150 330,220 C350,230 350,250 330,260 Q340,330 300,370"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2.5"
              strokeDasharray="8,3"
            />
          </svg>
        );

      case 'backpack':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl">
            {/* Top Handle */}
            <path d="M210,100 C210,60 290,60 290,100" fill="none" stroke="#27272a" strokeWidth="18" strokeLinecap="round" />

            {/* Backpack Main Body */}
            <rect x="130" y="90" width="240" height="340" rx="60" fill={colorHex} stroke="#18181b" strokeWidth="4" />
            <path d="M140,110 C170,95 330,95 360,110" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />

            {/* Zipper Curve */}
            <path d="M145,140 C200,120 300,120 355,140" fill="none" stroke="#374151" strokeWidth="5" strokeDasharray="5,3" />

            {/* Front Pocket */}
            <rect x="155" y="240" width="190" height="170" rx="30" fill={colorHex} stroke="#18181b" strokeWidth="3" />
            <rect x="155" y="240" width="190" height="170" rx="30" fill="rgba(0,0,0,0.12)" />
            <path d="M165,270 L335,270" stroke="#374151" strokeWidth="4" strokeDasharray="5,3" />

            {/* Side pockets */}
            <rect x="110" y="260" width="22" height="100" rx="8" fill="#18181b" opacity="0.3" />
            <rect x="368" y="260" width="22" height="100" rx="8" fill="#18181b" opacity="0.3" />
          </svg>
        );

      case 'cap':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl">
            {/* Crown Top Button */}
            <circle cx="250" cy="115" r="10" fill="#09090b" />

            {/* 6-Panel Crown Dome */}
            <path
              d="M130,240 C130,120 370,120 370,240 Z"
              fill={colorHex}
              stroke="#09090b"
              strokeWidth="4"
            />
            {/* Panel seams */}
            <path d="M250,115 L250,240" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeDasharray="4,4" />
            <path d="M250,115 Q190,160 150,240" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4,4" />
            <path d="M250,115 Q310,160 350,240" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4,4" />

            {/* Eyelet embroidered ventilation holes */}
            <circle cx="200" cy="170" r="3.5" fill="#09090b" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <circle cx="250" cy="165" r="3.5" fill="#09090b" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <circle cx="300" cy="170" r="3.5" fill="#09090b" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

            {/* Precurved Visor (Brim) */}
            <path
              d="M90,270 C140,230 360,230 410,270 C340,320 160,320 90,270 Z"
              fill={colorHex}
              stroke="#09090b"
              strokeWidth="3.5"
            />
            <path
              d="M110,275 C160,245 340,245 390,275 C330,310 170,310 110,275 Z"
              fill="rgba(0,0,0,0.18)"
            />
            {/* Visor Stitches */}
            <path d="M120,280 Q250,250 380,280" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4,3" />
          </svg>
        );

      case 'frame':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl">
            {/* Outer Wood Frame */}
            <rect x="70" y="60" width="360" height="380" rx="6" fill={colorHex} stroke="#78350f" strokeWidth="6" />
            {/* Inner Gold Bevel */}
            <rect x="85" y="75" width="330" height="350" rx="3" fill="none" stroke="#d97706" strokeWidth="3" />
            {/* White Museum Passepartout / Mat */}
            <rect x="95" y="85" width="310" height="330" fill="#fdfbf7" stroke="#e2e8f0" strokeWidth="2" />
            {/* Glass Glare Reflection */}
            <polygon points="95,85 240,85 140,415 95,415" fill="#ffffff" opacity="0.12" />
          </svg>
        );

      default:
        return null;
    }
  };

  const selectedLayer = layers.find((l) => l.id === selectedLayerId);

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[560px] mx-auto select-none">
      {/* Top Floating Bar: Clean Mode Toggle & Layer Quick Count */}
      <div className="w-full flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Lienzo Interactivo de Personalización</span>
          <span className="text-slate-300">·</span>
          <span>{layers.length} {layers.length === 1 ? 'elemento' : 'elementos'}</span>
        </div>

        <button
          onClick={onToggleCleanPreview}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            isPreviewClean
              ? 'bg-pink-600 text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
          title="Ocultar guías y marcos de selección"
        >
          <Eye className="w-3.5 h-3.5" />
          {isPreviewClean ? 'Ver Controles' : 'Vista Limpia'}
        </button>
      </div>

      {/* Main Interactive Stage Container */}
      <div
        ref={containerRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => onSelectLayer(null)}
        className="relative w-full aspect-square bg-gradient-to-b from-white via-slate-50 to-slate-100 rounded-2xl border border-slate-200/80 shadow-inner overflow-hidden flex items-center justify-center cursor-crosshair"
      >
        {/* Subtle coordinate guide grid (hidden in clean preview) */}
        {!isPreviewClean && (
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
        )}

        {/* Printable Area Safe Guide (subtle dashed boundary) */}
        {!isPreviewClean && (
          <div
            className="absolute border border-dashed border-pink-400/50 pointer-events-none z-10 transition-all"
            style={{
              width: `${(activeProduct.printableArea.width / 500) * 100}%`,
              height: `${(activeProduct.printableArea.height / 500) * 100}%`,
              borderRadius: activeProduct.printableArea.borderRadius || '8px',
            }}
          >
            <span className="absolute -top-5 left-2 text-[10px] font-semibold uppercase tracking-wider text-pink-500 bg-white/90 px-1.5 py-0.5 rounded shadow-xs">
              Área de Personalización
            </span>
          </div>
        )}

        {/* Base Realistic Product SVG Mockup */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
          {renderProductBase()}
        </div>

        {/* Interactive Layers Mounted on Top of Mockup */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {layers.map((layer) => {
            const isSelected = selectedLayerId === layer.id && !isPreviewClean;

            return (
              <div
                key={layer.id}
                onPointerDown={(e) => handleLayerPointerDown(e, layer)}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectLayer(layer.id);
                }}
                className={`absolute pointer-events-auto cursor-move transition-shadow ${
                  isSelected
                    ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-white rounded-md shadow-lg'
                    : 'hover:ring-1 hover:ring-pink-300'
                }`}
                style={{
                  left: `calc(50% + ${layer.x}px)`,
                  top: `calc(50% + ${layer.y}px)`,
                  transform: `translate(-50%, -50%) rotate(${layer.rotation}deg)`,
                  touchAction: 'none',
                }}
              >
                {/* Layer Content Render */}
                {layer.type === 'text' && (
                  <div
                    className="whitespace-nowrap px-2 py-1 select-none"
                    style={{
                      fontFamily: layer.fontFamily,
                      color: layer.color,
                      fontSize: `${layer.fontSize}px`,
                      fontWeight: layer.isBold ? 700 : 500,
                      letterSpacing: `${layer.letterSpacing || 0}px`,
                      textShadow:
                        layer.color === '#ffffff'
                          ? '0 1px 3px rgba(0,0,0,0.6)'
                          : '0 1px 2px rgba(0,0,0,0.35)',
                      transform: layer.isCurved ? 'scale(1, 1.1)' : 'none',
                    }}
                  >
                    {layer.text || 'Tu Texto Aquí'}
                  </div>
                )}

                {layer.type === 'graphic' && (
                  <div
                    className="p-1 select-none drop-shadow-md flex items-center justify-center"
                    style={{
                      width: `${layer.size}px`,
                      height: `${layer.size}px`,
                      color: layer.color,
                    }}
                    dangerouslySetInnerHTML={{ __html: layer.svgIcon }}
                  />
                )}

                {layer.type === 'image' && (
                  <div
                    className="relative overflow-hidden select-none border-2 border-white/80 shadow-md"
                    style={{
                      width: `${layer.width}px`,
                      height: `${layer.height}px`,
                      borderRadius:
                        layer.shape === 'circle'
                          ? '50%'
                          : layer.shape === 'heart'
                          ? '20px'
                          : '6px',
                    }}
                  >
                    <img
                      src={layer.src}
                      alt={layer.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                )}

                {/* Transform HUD / Controls for selected layer */}
                {isSelected && (
                  <>
                    {/* Top rotate handle */}
                    <div
                      className="absolute -top-7 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border border-pink-500 rounded-full shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing text-pink-600 hover:scale-110 transition-transform"
                      title="Girar elemento"
                      onPointerDown={(e) => {
                        e.stopPropagation();
                        const currentRot = layer.rotation || 0;
                        onUpdateLayer(layer.id, { rotation: (currentRot + 45) % 360 });
                      }}
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </div>

                    {/* Quick delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteLayer(layer.id);
                      }}
                      className="absolute -top-3 -right-3 w-6 h-6 bg-rose-600 text-white rounded-full shadow-md flex items-center justify-center hover:bg-rose-700 transition-colors"
                      title="Eliminar capa"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty canvas message */}
        {layers.length === 0 && !isPreviewClean && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30">
            <div className="bg-white/90 backdrop-blur-xs px-4 py-2 rounded-xl shadow-xs border border-pink-200 text-center animate-bounce">
              <p className="text-xs font-semibold text-pink-600 flex items-center gap-1.5 justify-center">
                <Sparkles className="w-4 h-4 text-pink-500" />
                Agrega texto o gráficos para comenzar a diseñar
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Selected Layer Micro Toolbar (bottom nudging & order controls) */}
      {selectedLayer && !isPreviewClean && (
        <div className="w-full mt-3 px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-slate-800 truncate">
              {selectedLayer.type === 'text'
                ? `Texto: "${selectedLayer.text}"`
                : selectedLayer.type === 'graphic'
                ? `Gráfico: ${selectedLayer.graphicName}`
                : `Imagen Subida`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Reorder Buttons */}
            <button
              onClick={() => onReorderLayer(selectedLayer.id, 'up')}
              className="p-1 rounded hover:bg-slate-100 text-slate-600"
              title="Traer al frente"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onReorderLayer(selectedLayer.id, 'down')}
              className="p-1 rounded hover:bg-slate-100 text-slate-600"
              title="Enviar al fondo"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-4 bg-slate-200" />
            <button
              onClick={() => onDeleteLayer(selectedLayer.id)}
              className="p-1 rounded hover:bg-rose-50 text-rose-600"
              title="Eliminar elemento"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
