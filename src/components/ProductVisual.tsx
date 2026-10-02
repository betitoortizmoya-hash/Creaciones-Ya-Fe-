import React from 'react';

interface ProductVisualProps {
  productId: string;
  category: string;
  className?: string;
  isHovered?: boolean;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  productId,
  className = '',
  isHovered = false,
}) => {
  // Renders beautiful, tailored artisanal vector visuals with textures, lighting, and embroidery stitching effects
  switch (productId) {
    case 'mandil-chef-mary':
      return (
        <div className={`relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#242429] to-[#121215] overflow-hidden ${className}`}>
          {/* Fabric texture overlay */}
          <div className="absolute inset-0 opacity-15 mix-blend-overlay bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px]" />
          
          <svg viewBox="0 0 320 280" className="w-[82%] h-[82%] drop-shadow-2xl transition-transform duration-500 transform group-hover:scale-105">
            <defs>
              <linearGradient id="apronDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2c2c34" />
                <stop offset="50%" stopColor="#1e1e24" />
                <stop offset="100%" stopColor="#141418" />
              </linearGradient>
              <linearGradient id="goldThreadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <filter id="stitchShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="1" dy="1" stdDeviation="0.8" floodColor="#000" floodOpacity="0.6"/>
              </filter>
            </defs>

            {/* Neck Strap */}
            <path d="M125,25 Q160,0 195,25" fill="none" stroke="#374151" strokeWidth="12" strokeLinecap="round" />
            
            {/* Apron Body */}
            <path
              d="M115,50 L205,50 L220,120 L245,130 L250,265 L70,265 L75,130 L100,120 Z"
              fill="url(#apronDarkGrad)"
              stroke="#374151"
              strokeWidth="2.5"
            />
            {/* Hem seams */}
            <path
              d="M120,55 L200,55 L215,122 L240,132 L244,260 L76,260 L80,132 L105,122 Z"
              fill="none"
              stroke="#4b5563"
              strokeWidth="1.2"
              strokeDasharray="4,3"
            />
            
            {/* Front Pocket */}
            <rect x="95" y="170" width="130" height="75" rx="6" fill="#17171c" stroke="#374151" strokeWidth="2" />
            <line x1="160" y1="170" x2="160" y2="245" stroke="#4b5563" strokeWidth="1.5" strokeDasharray="3,2" />
            
            {/* Embroidered Name & Butterfly on the bib */}
            <g filter="url(#stitchShadow)">
              {/* Butterfly Icon */}
              <g transform="translate(142, 75) scale(0.9)">
                <path d="M10,12 Q6,2 0,4 Q-4,10 6,18 Q10,14 10,12" fill="#ec4899" />
                <path d="M10,12 Q14,2 20,4 Q24,10 14,18 Q10,14 10,12" fill="#38bdf8" />
                <path d="M10,14 Q8,20 2,21 Q-1,17 6,15" fill="#f43f5e" />
                <path d="M10,14 Q12,20 18,21 Q21,17 14,15" fill="#a855f7" />
                <line x1="10" y1="6" x2="10" y2="22" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
              </g>

              {/* Embroidered Name "Mary" in authentic script */}
              <text
                x="160"
                y="125"
                textAnchor="middle"
                fill="url(#goldThreadGrad)"
                fontFamily="'Dancing Script', cursive"
                fontSize="24"
                fontWeight="700"
                letterSpacing="1"
              >
                Mary
              </text>
              <text
                x="160"
                y="140"
                textAnchor="middle"
                fill="#cbd5e1"
                fontFamily="'Montserrat', sans-serif"
                fontSize="7"
                letterSpacing="3"
                opacity="0.85"
              >
                GRILL & CHEF
              </text>
            </g>

            {/* Tie Straps */}
            <path d="M75,130 C40,145 30,190 20,230" fill="none" stroke="#2c2c34" strokeWidth="8" strokeLinecap="round" />
            <path d="M245,130 C280,145 290,190 300,230" fill="none" stroke="#2c2c34" strokeWidth="8" strokeLinecap="round" />
          </svg>
          
          <div className="absolute bottom-3 left-4 text-[11px] font-medium tracking-wider uppercase text-pink-300/90 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            Bordado Premium en Gabardina
          </div>
        </div>
      );

    case 'globo-burbuja-oso-graduacion':
      return (
        <div className={`relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#181824] via-[#0f111a] to-[#090a10] overflow-hidden ${className}`}>
          {/* Ambient Glow */}
          <div className={`absolute w-44 h-44 rounded-full bg-amber-400/20 blur-2xl transition-opacity duration-700 ${isHovered ? 'opacity-100 scale-110' : 'opacity-60'}`} />
          
          <svg viewBox="0 0 320 300" className="w-[85%] h-[85%] transition-transform duration-500 transform group-hover:scale-105">
            <defs>
              <radialGradient id="balloonGlow" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.08" />
                <stop offset="90%" stopColor="#38bdf8" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.45" />
              </radialGradient>
              <linearGradient id="sashGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            {/* Bubble Sphere */}
            <circle cx="160" cy="120" r="95" fill="url(#balloonGlow)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" />
            
            {/* Balloon Specular Highlights */}
            <path d="M100,65 A75,75 0 0,1 155,42" fill="none" stroke="white" strokeWidth="4.5" strokeLinecap="round" opacity="0.8" />
            <circle cx="170" cy="46" r="3" fill="white" opacity="0.7" />

            {/* Inside the Bubble: Cute Plush Teddy Bear with Graduation Cap */}
            <g transform="translate(160, 130)">
              {/* Bear Ears */}
              <circle cx="-25" cy="-35" r="14" fill="#a16207" stroke="#78350f" strokeWidth="1.5" />
              <circle cx="-25" cy="-35" r="8" fill="#d97706" />
              <circle cx="25" cy="-35" r="14" fill="#a16207" stroke="#78350f" strokeWidth="1.5" />
              <circle cx="25" cy="-35" r="8" fill="#d97706" />

              {/* Bear Head */}
              <circle cx="0" cy="-20" r="32" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
              {/* Snout */}
              <ellipse cx="0" cy="-12" rx="14" ry="10" fill="#fde68a" />
              <ellipse cx="0" cy="-15" rx="5" ry="3.5" fill="#18181b" />
              {/* Eyes */}
              <circle cx="-10" cy="-24" r="3" fill="#18181b" />
              <circle cx="-9" cy="-25" r="1" fill="#fff" />
              <circle cx="10" cy="-24" r="3" fill="#18181b" />
              <circle cx="11" cy="-25" r="1" fill="#fff" />

              {/* Graduation Cap (Birrete) */}
              <polygon points="0,-60 36,-48 0,-36 -36,-48" fill="#1e1e24" stroke="#d97706" strokeWidth="1" />
              <rect x="-10" y="-42" width="20" height="9" fill="#1e1e24" />
              {/* Tassel */}
              <line x1="0" y1="-48" x2="28" y2="-44" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="28" cy="-42" r="2.5" fill="#f59e0b" />

              {/* Bear Body & Arms */}
              <ellipse cx="0" cy="18" rx="28" ry="24" fill="#a16207" stroke="#78350f" strokeWidth="1.5" />
              <circle cx="-26" cy="12" r="9" fill="#92400e" />
              <circle cx="26" cy="12" r="9" fill="#92400e" />

              {/* Graduation Sash "Class of 2026" */}
              <path d="M-22,6 Q0,16 22,26" stroke="url(#sashGrad)" strokeWidth="9" strokeLinecap="round" />
              <text x="0" y="19" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="bold">CLASS 2026</text>
            </g>

            {/* Micro LED fairy lights around base & sphere */}
            <circle cx="110" cy="180" r="3" fill="#fde047" className="animate-ping" opacity="0.8" />
            <circle cx="205" cy="175" r="2.5" fill="#fde047" opacity="0.9" />
            <circle cx="130" cy="80" r="2" fill="#fde047" opacity="0.7" />
            <circle cx="195" cy="85" r="2.5" fill="#fde047" opacity="0.8" />

            {/* Vinyl text on balloon curve */}
            <text x="160" y="85" textAnchor="middle" fill="#ffffff" fontFamily="'Dancing Script', cursive" fontSize="18" fontWeight="bold" opacity="0.95">
              ¡Felicidades Graduado!
            </text>

            {/* Bottom Balloon Tie & Luxury Gift Box Base */}
            <polygon points="152,215 168,215 160,225" fill="#3b82f6" />
            <rect x="110" y="225" width="100" height="45" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            {/* Satin Ribbon & Bow */}
            <rect x="154" y="225" width="12" height="45" fill="#60a5fa" />
            <path d="M160,225 C140,210 135,228 160,225 C185,228 180,210 160,225" fill="#93c5fd" stroke="#2563eb" strokeWidth="1" />
          </svg>

          <div className="absolute bottom-3 left-4 text-[11px] font-medium tracking-wider uppercase text-amber-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Esfera 24" Cristal con Luces LED
          </div>
        </div>
      );

    case 'mameluco-bebe-hermano-mayor':
      return (
        <div className={`relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#fdfbf7] to-[#f4eee6] overflow-hidden ${className}`}>
          <svg viewBox="0 0 320 280" className="w-[85%] h-[85%] drop-shadow-xl transition-transform duration-500 transform group-hover:scale-105">
            <defs>
              <linearGradient id="onesieWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f8fafc" />
              </linearGradient>
              <linearGradient id="heartPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#db2777" />
              </linearGradient>
            </defs>

            {/* Baby Onesie Silhouette */}
            <path
              d="M100,50 C120,40 200,40 220,50 L270,95 L245,130 L220,110 L220,205 C220,220 200,245 175,245 L145,245 C120,245 100,220 100,205 L100,110 L75,130 L50,95 Z"
              fill="url(#onesieWhiteGrad)"
              stroke="#e2e8f0"
              strokeWidth="2.5"
            />
            {/* Neckline Trim with envelope folds */}
            <path d="M115,50 Q160,85 205,50" fill="none" stroke="#cbd5e1" strokeWidth="4" />
            <path d="M105,48 L135,68" stroke="#cbd5e1" strokeWidth="2.5" />
            <path d="M215,48 L185,68" stroke="#cbd5e1" strokeWidth="2.5" />

            {/* Sleeve hems */}
            <line x1="50" y1="95" x2="75" y2="130" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3,2" />
            <line x1="270" y1="95" x2="245" y2="130" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3,2" />

            {/* Embroidered Text: "Estoy en camino · Te Amo Hermano Mayor" */}
            <text x="160" y="112" textAnchor="middle" fill="#334155" fontFamily="'Dancing Script', cursive" fontSize="18" fontWeight="700">
              Estoy en camino
            </text>
            <text x="160" y="132" textAnchor="middle" fill="#475569" fontFamily="'Playfair Display', serif" fontSize="13" fontStyle="italic">
              Te Amo
            </text>
            <text x="160" y="152" textAnchor="middle" fill="#1e293b" fontFamily="'Montserrat', sans-serif" fontSize="11" fontWeight="800" letterSpacing="1">
              HERMANO MAYOR
            </text>

            {/* Sparkling embroidered sequin heart */}
            <g transform="translate(160, 182) scale(1.1)">
              <path
                d="M0,8 C-12,-8 -24,4 0,22 C24,4 12,-8 0,8 Z"
                fill="url(#heartPinkGrad)"
                stroke="#fda4af"
                strokeWidth="1.5"
              />
              {/* Sequin glitter stitches */}
              <circle cx="-4" cy="5" r="1.5" fill="#ffffff" />
              <circle cx="5" cy="8" r="1.2" fill="#ffffff" />
              <circle cx="0" cy="14" r="1" fill="#ffffff" />
            </g>

            {/* Bottom snap buttons */}
            <circle cx="145" cy="235" r="3" fill="#cbd5e1" stroke="#94a3b8" />
            <circle cx="160" cy="235" r="3" fill="#cbd5e1" stroke="#94a3b8" />
            <circle cx="175" cy="235" r="3" fill="#cbd5e1" stroke="#94a3b8" />
          </svg>

          <div className="absolute bottom-3 left-4 text-[11px] font-medium tracking-wider uppercase text-pink-600/90 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            100% Algodón Hipoalergénico
          </div>
        </div>
      );

    case 'aretes-calaverita-catrina':
    case 'aretes-botas-texanas':
    case 'aretes-mariposas-multicolor':
      return (
        <div className={`relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#1c1917] via-[#292524] to-[#0c0a09] overflow-hidden ${className}`}>
          <svg viewBox="0 0 320 280" className="w-[85%] h-[85%] drop-shadow-2xl transition-transform duration-500 transform group-hover:scale-105">
            <defs>
              <linearGradient id="goldHookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#a16207" />
              </linearGradient>
            </defs>

            {/* Left Earring */}
            <g transform="translate(100, 40)">
              {/* Ear Hook */}
              <path d="M0,0 C-8,-15 12,-20 10,-3 C9,5 0,15 0,22" fill="none" stroke="url(#goldHookGrad)" strokeWidth="2.5" />
              <circle cx="0" cy="22" r="3" fill="#eab308" />

              {/* Skull Body / Calaverita */}
              <path
                d="M-28,45 C-32,30 -22,10 0,10 C22,10 32,30 28,45 C25,55 18,60 14,75 L-14,75 C-18,60 -25,55 -28,45 Z"
                fill="#f8fafc"
                stroke="#09090b"
                strokeWidth="2"
              />
              {/* Eyes with floral borders */}
              <circle cx="-10" cy="38" r="7" fill="#09090b" />
              <circle cx="-10" cy="38" r="9" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="3,2" />
              <circle cx="10" cy="38" r="7" fill="#09090b" />
              <circle cx="10" cy="38" r="9" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="3,2" />
              {/* Nose */}
              <polygon points="0,48 -4,55 4,55" fill="#09090b" />
              {/* Teeth */}
              <line x1="-10" y1="68" x2="10" y2="68" stroke="#09090b" strokeWidth="1.5" />
              <line x1="-6" y1="64" x2="-6" y2="72" stroke="#09090b" strokeWidth="1.2" />
              <line x1="0" y1="64" x2="0" y2="72" stroke="#09090b" strokeWidth="1.2" />
              <line x1="6" y1="64" x2="6" y2="72" stroke="#09090b" strokeWidth="1.2" />

              {/* Crown of 3D Red Embroidered Roses */}
              <circle cx="-18" cy="16" r="8" fill="#e11d48" stroke="#881337" strokeWidth="1" />
              <circle cx="0" cy="10" r="10" fill="#be123c" stroke="#881337" strokeWidth="1.5" />
              <circle cx="18" cy="16" r="8" fill="#e11d48" stroke="#881337" strokeWidth="1" />
              
              {/* Hanging bead tassel */}
              <line x1="0" y1="75" x2="0" y2="120" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="0" cy="90" r="3" fill="#ec4899" />
              <circle cx="0" cy="105" r="3.5" fill="#38bdf8" />
              <polygon points="0,115 -5,128 5,128" fill="#eab308" />
            </g>

            {/* Right Earring (Matching Pair) */}
            <g transform="translate(220, 40)">
              <path d="M0,0 C-8,-15 12,-20 10,-3 C9,5 0,15 0,22" fill="none" stroke="url(#goldHookGrad)" strokeWidth="2.5" />
              <circle cx="0" cy="22" r="3" fill="#eab308" />

              <path
                d="M-28,45 C-32,30 -22,10 0,10 C22,10 32,30 28,45 C25,55 18,60 14,75 L-14,75 C-18,60 -25,55 -28,45 Z"
                fill="#f8fafc"
                stroke="#09090b"
                strokeWidth="2"
              />
              <circle cx="-10" cy="38" r="7" fill="#09090b" />
              <circle cx="-10" cy="38" r="9" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="3,2" />
              <circle cx="10" cy="38" r="7" fill="#09090b" />
              <circle cx="10" cy="38" r="9" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="3,2" />
              <polygon points="0,48 -4,55 4,55" fill="#09090b" />
              <line x1="-10" y1="68" x2="10" y2="68" stroke="#09090b" strokeWidth="1.5" />
              <line x1="-6" y1="64" x2="-6" y2="72" stroke="#09090b" strokeWidth="1.2" />
              <line x1="0" y1="64" x2="0" y2="72" stroke="#09090b" strokeWidth="1.2" />
              <line x1="6" y1="64" x2="6" y2="72" stroke="#09090b" strokeWidth="1.2" />

              <circle cx="-18" cy="16" r="8" fill="#e11d48" stroke="#881337" strokeWidth="1" />
              <circle cx="0" cy="10" r="10" fill="#be123c" stroke="#881337" strokeWidth="1.5" />
              <circle cx="18" cy="16" r="8" fill="#e11d48" stroke="#881337" strokeWidth="1" />
              
              <line x1="0" y1="75" x2="0" y2="120" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="0" cy="90" r="3" fill="#ec4899" />
              <circle cx="0" cy="105" r="3.5" fill="#38bdf8" />
              <polygon points="0,115 -5,128 5,128" fill="#eab308" />
            </g>
          </svg>

          <div className="absolute bottom-3 left-4 text-[11px] font-medium tracking-wider uppercase text-pink-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
            Bordado a Mano · Joyería Textil
          </div>
        </div>
      );

    case 'tumbler-rayados-monterrey':
      return (
        <div className={`relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#111827] via-[#0f172a] to-[#020617] overflow-hidden ${className}`}>
          <svg viewBox="0 0 320 280" className="w-[85%] h-[85%] drop-shadow-2xl transition-transform duration-500 transform group-hover:scale-105">
            <defs>
              <linearGradient id="tumblerSteelShine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0b1329" />
                <stop offset="30%" stopColor="#1e3a8a" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Clear Straw */}
            <rect x="156" y="15" width="8" height="60" rx="3" fill="rgba(255,255,255,0.7)" stroke="#94a3b8" strokeWidth="1" />

            {/* Acrylic Lid */}
            <ellipse cx="160" cy="70" rx="46" ry="12" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" opacity="0.9" />
            <ellipse cx="160" cy="67" rx="42" ry="9" fill="#f1f5f9" />

            {/* Tumbler Body */}
            <path
              d="M116,70 L122,250 C123,256 130,260 140,260 L180,260 C190,260 197,256 198,250 L204,70 Z"
              fill="url(#tumblerSteelShine)"
              stroke="#475569"
              strokeWidth="2"
            />
            {/* Specular Highlight Streak */}
            <path d="M152,70 L154,260" stroke="#ffffff" strokeWidth="5" opacity="0.4" />
            <path d="M157,70 L158,260" stroke="#ffffff" strokeWidth="2" opacity="0.7" />

            {/* Rayados / Athletic Custom Graphics */}
            {/* White Navy Stripes */}
            <g transform="translate(122, 100) scale(0.75)">
              <rect x="10" y="0" width="8" height="150" fill="#ffffff" opacity="0.9" />
              <rect x="26" y="0" width="8" height="150" fill="#ffffff" opacity="0.9" />
              <rect x="66" y="0" width="8" height="150" fill="#ffffff" opacity="0.9" />
              <rect x="82" y="0" width="8" height="150" fill="#ffffff" opacity="0.9" />
            </g>

            {/* Center Emblem / Shield "M" */}
            <g transform="translate(160, 155)">
              <polygon points="0,-32 24,-18 20,24 0,36 -20,24 -24,-18" fill="#ffffff" stroke="#1e3a8a" strokeWidth="2" />
              <text x="0" y="10" textAnchor="middle" fill="#1e3a8a" fontFamily="'Montserrat', sans-serif" fontSize="24" fontWeight="900">
                M
              </text>
              <text x="0" y="24" textAnchor="middle" fill="#d97706" fontSize="9" fontWeight="bold">
                ★★★★★
              </text>
            </g>

            {/* Name Personalization */}
            <text x="160" y="225" textAnchor="middle" fill="#ffffff" fontFamily="'Montserrat', sans-serif" fontSize="12" fontWeight="700" letterSpacing="2">
              RAYADOS 20oz
            </text>
          </svg>

          <div className="absolute bottom-3 left-4 text-[11px] font-medium tracking-wider uppercase text-blue-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Acero Inox 20oz Doble Pared
          </div>
        </div>
      );

    case 'rompecabezas-corazon-foto':
      return (
        <div className={`relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#2a131b] via-[#1a0a10] to-[#0d0408] overflow-hidden ${className}`}>
          <svg viewBox="0 0 320 280" className="w-[85%] h-[85%] drop-shadow-2xl transition-transform duration-500 transform group-hover:scale-105">
            <defs>
              <linearGradient id="puzzleHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="50%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#9f1239" />
              </linearGradient>
              <clipPath id="heartClip">
                <path d="M160,245 C60,170 30,120 30,85 C30,45 65,30 95,30 C125,30 150,55 160,70 C170,55 195,30 225,30 C255,30 290,45 290,85 C290,120 260,170 160,245 Z" />
              </clipPath>
            </defs>

            {/* Heart Silhouette Base */}
            <path
              d="M160,245 C60,170 30,120 30,85 C30,45 65,30 95,30 C125,30 150,55 160,70 C170,55 195,30 225,30 C255,30 290,45 290,85 C290,120 260,170 160,245 Z"
              fill="url(#puzzleHeartGrad)"
              stroke="#fda4af"
              strokeWidth="3"
            />

            {/* Inside Content: Photo Representation & Jigsaw Puzzle Lines */}
            <g clipPath="url(#heartClip)">
              {/* Warm romantic photo scenery */}
              <circle cx="160" cy="110" r="85" fill="#f43f5e" opacity="0.25" />
              
              {/* Couple Silhouette */}
              <g transform="translate(160, 140)">
                <circle cx="-16" cy="-22" r="12" fill="#fff" opacity="0.9" />
                <path d="M-32,15 C-32,-6 -4,-6 -4,15 Z" fill="#fff" opacity="0.9" />
                <circle cx="16" cy="-20" r="11" fill="#fff" opacity="0.9" />
                <path d="M4,15 C4,-4 28,-4 28,15 Z" fill="#fff" opacity="0.9" />
                {/* Heart between them */}
                <path d="M0,-10 C-4,-16 -10,-10 0,0 C10,-10 4,-16 0,-10 Z" fill="#fde047" />
              </g>

              {/* Jigsaw Puzzle Interlocking Grid Overlay */}
              <path
                d="M30,100 Q80,105 110,100 C115,85 130,85 135,100 Q190,95 240,100 M30,160 Q90,155 140,160 C145,175 160,175 165,160 Q220,165 290,160 M110,40 Q105,100 110,140 C95,145 95,160 110,165 Q105,200 130,230 M210,40 Q215,90 210,140 C225,145 225,160 210,165 Q215,190 190,230"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.8"
                strokeDasharray="6,2"
              />
            </g>

            {/* Romantic Typography Text */}
            <text x="160" y="195" textAnchor="middle" fill="#ffffff" fontFamily="'Dancing Script', cursive" fontSize="22" fontWeight="bold">
              Juntos por Siempre
            </text>
            <text x="160" y="215" textAnchor="middle" fill="#fde047" fontFamily="'Montserrat', sans-serif" fontSize="10" fontWeight="600" letterSpacing="2">
              75 PIEZAS · ALTO BRILLO
            </text>
          </svg>

          <div className="absolute bottom-3 left-4 text-[11px] font-medium tracking-wider uppercase text-rose-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            75 Piezas con Caja Estuche
          </div>
        </div>
      );

    default:
      // Elegant Generic Craft Product Visual
      return (
        <div className={`relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#1e1e24] to-[#121215] overflow-hidden ${className}`}>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-300">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-widest text-pink-300/80 font-semibold mb-1">Creaciones Ya&Fe</p>
            <p className="text-sm text-slate-200 font-medium">Artesanía Personalizada</p>
          </div>
        </div>
      );
  }
};
