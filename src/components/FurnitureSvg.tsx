import React from 'react';
import { FurnitureCategory } from '../types';

interface FurnitureSvgProps {
  id: string;
  category: FurnitureCategory;
  color?: string;
  className?: string;
}

export const FurnitureSvg: React.FC<FurnitureSvgProps> = ({ id, category, color = '#cbd5e1', className = '' }) => {
  // Render specific items based on id
  switch (id) {
    case 'bed_basic':
      return (
        <svg viewBox="0 0 100 60" className={`${className}`} style={{ overflow: 'visible' }}>
          {/* Shadow */}
          <ellipse cx="50" cy="45" rx="42" ry="12" fill="#000000" opacity="0.12" />
          {/* Main cushion rim */}
          <ellipse cx="50" cy="35" rx="40" ry="18" fill={color} stroke="#5c3f15" strokeWidth="2.5" />
          {/* Inner ring soft */}
          <ellipse cx="50" cy="33" rx="30" ry="13" fill="#ffffff" opacity="0.3" />
          <ellipse cx="50" cy="34" rx="28" ry="11" fill={color} filter="brightness(1.15)" />
          {/* Cute paw print in the center */}
          <g transform="translate(50, 34) scale(0.65)" fill="#ffffff" opacity="0.8">
            <circle cx="0" cy="0" r="7" />
            <circle cx="-10" cy="-8" r="3.5" />
            <circle cx="0" cy="-11" r="3.7" />
            <circle cx="10" cy="-8" r="3.5" />
          </g>
        </svg>
      );

    case 'bed_luxury':
      return (
        <svg viewBox="0 0 110 70" className={`${className}`} style={{ overflow: 'visible' }}>
          {/* Shadow */}
          <ellipse cx="55" cy="55" rx="48" ry="11" fill="#000000" opacity="0.15" />
          {/* Wood frame backboard */}
          <rect x="15" y="10" width="80" height="35" rx="6" fill="#a16207" stroke="#5c3f15" strokeWidth="2.5" />
          <path d="M 15 25 L 95 25" stroke="#5c3f15" strokeWidth="1.5" />
          {/* Mattress */}
          <rect x="10" y="32" width="90" height="22" rx="8" fill="#f8fafc" stroke="#5c3f15" strokeWidth="2.5" />
          {/* Cute Luxury Pillow */}
          <rect x="20" y="24" width="28" height="15" rx="4" fill="#f43f5e" stroke="#5c3f15" strokeWidth="2" />
          <ellipse cx="34" cy="31.5" rx="5" ry="5" fill="#fecdd3" />
          {/* Duvet/Blanket folded */}
          <path d="M 45 32 L 98 32 C 100 32, 100 52, 98 52 L 48 52 C 45 52, 42 45, 45 32" fill="#fda4af" stroke="#5c3f15" strokeWidth="2" />
          <path d="M 45 32 C 42 45, 45 52, 48 52" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
          {/* Wooden corner bed posts */}
          <rect x="8" y="25" width="8" height="32" rx="2" fill="#78350f" stroke="#5c3f15" strokeWidth="2.5" />
          <rect x="94" y="25" width="8" height="32" rx="2" fill="#78350f" stroke="#5c3f15" strokeWidth="2.5" />
          {/* Golden finials */}
          <circle cx="12" cy="23" r="3.5" fill="#eab308" stroke="#5c3f15" strokeWidth="1.5" />
          <circle cx="98" cy="23" r="3.5" fill="#eab308" stroke="#5c3f15" strokeWidth="1.5" />
        </svg>
      );

    case 'toy_cat_tree':
      return (
        <svg viewBox="0 0 100 130" className={`${className}`} style={{ overflow: 'visible' }}>
          {/* Shadow */}
          <ellipse cx="50" cy="120" rx="40" ry="8" fill="#000000" opacity="0.15" />
          {/* Base */}
          <rect x="15" y="112" width="70" height="10" rx="3" fill="#cbd5e1" stroke="#5c3f15" strokeWidth="2.5" />
          <line x1="15" y1="117" x2="85" y2="117" stroke="#5c3f15" strokeWidth="1" />

          {/* Pillars */}
          {/* Main tall trunk */}
          <rect x="32" y="30" width="10" height="82" fill="#b45309" stroke="#5c3f15" strokeWidth="2.5" />
          {/* Sisal wrapping lines */}
          <path d="M 32 40 H 42 M 32 50 H 42 M 32 60 H 42 M 32 70 H 42 M 32 80 H 42 M 32 90 H 42 M 32 100 H 42" stroke="#d97706" strokeWidth="1.5" />

          {/* Right shorter pillar */}
          <rect x="62" y="70" width="8" height="42" fill="#b45309" stroke="#5c3f15" strokeWidth="2.5" />
          <path d="M 62 78 H 70 M 62 86 H 70 M 62 94 H 70 M 62 102 H 70" stroke="#d97706" strokeWidth="1.5" />

          {/* Platform 1 (Middle Left) */}
          <rect x="10" y="70" width="35" height="7" rx="2" fill="#e2e8f0" stroke="#5c3f15" strokeWidth="2.5" />
          <line x1="22" y1="77" x2="22" y2="112" stroke="#5c3f15" strokeWidth="2" /> {/* Left support post */}

          {/* Platform 2 (Right Shorter) */}
          <rect x="52" y="65" width="28" height="7" rx="2" fill="#e2e8f0" stroke="#5c3f15" strokeWidth="2.5" />

          {/* Platform 3 (Top main bed) */}
          <rect x="22" y="24" width="30" height="7" rx="2" fill="#e2e8f0" stroke="#5c3f15" strokeWidth="2.5" />
          {/* Bed cushion rim top */}
          <path d="M 22 24 C 22 14, 52 14, 52 24 Z" fill="none" stroke="#5c3f15" strokeWidth="2" />
          <path d="M 22 24 C 24 16, 50 16, 52 24" fill="none" stroke="#f43f5e" strokeWidth="3" />

          {/* Dangling mouse toy */}
          <line x1="48" y1="31" x2="48" y2="48" stroke="#5c3f15" strokeWidth="1.5" />
          <circle cx="48" cy="51" r="3.5" fill="#94a3b8" stroke="#5c3f15" strokeWidth="1.5" />
          <path d="M 48 54 Q 52 58 49 61" fill="none" stroke="#5c3f15" strokeWidth="1" />
        </svg>
      );

    case 'toy_wheel':
      return (
        <svg viewBox="0 0 90 90" className={`${className}`} style={{ overflow: 'visible' }}>
          {/* Shadow */}
          <ellipse cx="45" cy="84" rx="35" ry="6" fill="#000000" opacity="0.14" />

          {/* Stand Support */}
          <path d="M 45 45 L 25 80 L 65 80 Z" fill="none" stroke="#5c3f15" strokeWidth="3" strokeLinejoin="round" />
          <rect x="20" y="78" width="50" height="6" rx="2" fill="#475569" stroke="#5c3f15" strokeWidth="2" />

          {/* Outer Wheel Rim */}
          <circle cx="45" cy="40" r="32" fill="#f0fdf4" stroke="#5c3f15" strokeWidth="3" />
          <circle cx="45" cy="40" r="28" fill="none" stroke={color} strokeWidth="2.5" />

          {/* Spokes / Treads */}
          <circle cx="45" cy="40" r="1.5" fill="#5c3f15" />
          <line x1="45" y1="8" x2="45" y2="72" stroke="#5c3f15" strokeWidth="1.5" />
          <line x1="13" y1="40" x2="77" y2="40" stroke="#5c3f15" strokeWidth="1.5" />
          <line x1="22.4" y1="17.4" x2="67.6" y2="62.6" stroke="#5c3f15" strokeWidth="1" />
          <line x1="22.4" y1="62.6" x2="67.6" y2="17.4" stroke="#5c3f15" strokeWidth="1" />

          {/* Center Hub */}
          <circle cx="45" cy="40" r="6" fill={color} stroke="#5c3f15" strokeWidth="2" />
        </svg>
      );

    case 'toy_ball':
      return (
        <svg viewBox="0 0 70 55" className={`${className}`} style={{ overflow: 'visible' }}>
          {/* Shadow */}
          <ellipse cx="35" cy="46" rx="24" ry="6" fill="#000000" opacity="0.15" />

          {/* Yarn Lines */}
          <circle cx="35" cy="30" r="18" fill={color} stroke="#5c3f15" strokeWidth="2.5" />
          {/* Yarn swirls */}
          <path d="M 22 20 Q 32 38 48 40" fill="none" stroke="#5c3f15" strokeWidth="2" />
          <path d="M 20 30 Q 35 25 50 30" fill="none" stroke="#5c3f15" strokeWidth="2" />
          <path d="M 24 40 Q 38 20 45 15" fill="none" stroke="#5c3f15" strokeWidth="2" />
          <path d="M 30 13 Q 32 30 38 47" fill="none" stroke="#5c3f15" strokeWidth="1.5" />

          {/* Loose thread trail */}
          <path d="M 45 42 C 55 48, 60 38, 65 44 C 68 47, 62 50, 58 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 45 42 C 55 48, 60 38, 65 44 C 68 47, 62 50, 58 48" fill="none" stroke="#5c3f15" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'bowl_basic':
      return (
        <svg viewBox="0 0 90 40" className={`${className}`} style={{ overflow: 'visible' }}>
          {/* Shadow */}
          <ellipse cx="45" cy="32" rx="42" ry="7" fill="#000000" opacity="0.14" />
          {/* Support Tray */}
          <rect x="5" y="15" width="80" height="15" rx="5" fill="#475569" stroke="#5c3f15" strokeWidth="2.5" />

          {/* Food Bowl (Left) */}
          <ellipse cx="28" cy="15" rx="18" ry="8" fill={color} stroke="#5c3f15" strokeWidth="2" />
          <ellipse cx="28" cy="15" rx="13" ry="5" fill="#1e293b" />
          {/* Food Kibbles */}
          <circle cx="23" cy="14" r="2.2" fill="#78350f" />
          <circle cx="28" cy="13" r="2.5" fill="#b45309" />
          <circle cx="33" cy="14" r="2.0" fill="#78350f" />
          <circle cx="26" cy="16" r="2.2" fill="#b45309" />
          <circle cx="30" cy="16" r="2.4" fill="#d97706" />

          {/* Water Bowl (Right) */}
          <ellipse cx="62" cy="15" rx="18" ry="8" fill={color} stroke="#5c3f15" strokeWidth="2" />
          <ellipse cx="62" cy="15" rx="13" ry="5" fill="#38bdf8" />
          {/* Water reflection */}
          <path d="M 54 15 Q 60 18 68 14" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.75" />
        </svg>
      );

    case 'bowl_auto':
      return (
        <svg viewBox="0 0 100 80" className={`${className}`} style={{ overflow: 'visible' }}>
          {/* Shadow */}
          <ellipse cx="50" cy="72" rx="42" ry="7" fill="#000000" opacity="0.16" />

          {/* Tall reservoir back body */}
          <rect x="18" y="8" width="30" height="58" rx="6" fill="#f1f5f9" stroke="#5c3f15" strokeWidth="2.5" />
          {/* Water container clear window */}
          <rect x="23" y="14" width="20" height="32" rx="3" fill="#e0f2fe" stroke="#5c3f15" strokeWidth="1.5" />
          {/* Water inside level */}
          <path d="M 23 28 H 43 V 45 C 43 46, 41 46, 41 46 H 25 C 23 46, 23 45, 23 45 Z" fill="#38bdf8" opacity="0.5" />
          <line x1="23" y1="28" x2="43" y2="28" stroke="#0284c7" strokeWidth="1" />

          {/* Left Food hopper body */}
          <rect x="52" y="16" width="30" height="50" rx="6" fill="#f1f5f9" stroke="#5c3f15" strokeWidth="2.5" />
          <circle cx="67" cy="30" r="5" fill={color} stroke="#5c3f15" strokeWidth="1.5" />

          {/* Ground Base Bowls tray */}
          <rect x="10" y="58" width="80" height="14" rx="4" fill="#cbd5e1" stroke="#5c3f15" strokeWidth="2.5" />

          {/* Water bowl (Left) */}
          <ellipse cx="33" cy="62" rx="16" ry="6" fill="#1e293b" />
          <ellipse cx="33" cy="62" rx="13" ry="4" fill="#0284c7" />

          {/* Food bowl (Right) */}
          <ellipse cx="67" cy="62" rx="16" ry="6" fill="#1e293b" />
          {/* Pile of food kibble */}
          <ellipse cx="67" cy="61" rx="10" ry="3.5" fill="#78350f" />
          <circle cx="65" cy="59" r="1.5" fill="#b45309" />
          <circle cx="69" cy="59" r="1.5" fill="#d97706" />
          <circle cx="67" cy="58" r="1.2" fill="#78350f" />
        </svg>
      );

    case 'deco_plant':
      return (
        <svg viewBox="0 0 80 120" className={`${className}`} style={{ overflow: 'visible' }}>
          {/* Shadow */}
          <ellipse cx="40" cy="112" rx="20" ry="5" fill="#000000" opacity="0.18" />

          {/* Plant Pot */}
          <polygon points="26,82 54,82 50,112 30,112" fill="#94a3b8" stroke="#5c3f15" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="23" y="78" width="34" height="6" rx="1.5" fill="#64748b" stroke="#5c3f15" strokeWidth="2" />

          {/* Tall Bamboo / Monstera Stems */}
          <path d="M 40 80 Q 35 40, 25 15" fill="none" stroke="#047857" strokeWidth="2.5" />
          <path d="M 40 80 Q 45 45, 55 20" fill="none" stroke="#047857" strokeWidth="2.5" />
          <path d="M 40 80 Q 38 55, 38 30" fill="none" stroke="#047857" strokeWidth="2.5" />

          {/* Big Green Monstera Leaves */}
          {/* Left Leaf */}
          <g transform="translate(25, 15) rotate(-35) scale(0.85)">
            <ellipse cx="0" cy="0" rx="14" ry="20" fill={color} stroke="#5c3f15" strokeWidth="2" />
            <line x1="0" y1="-20" x2="0" y2="20" stroke="#045d43" strokeWidth="1.5" />
            {/* Monstera slits */}
            <path d="M -14 0 H -4 M -12 -8 L -3 -3 M -12 8 L -3 3" stroke="#047857" strokeWidth="1.5" />
            <path d="M 14 0 H 4 M 12 -8 L 3 -3 M 12 8 L 3 3" stroke="#047857" strokeWidth="1.5" />
          </g>

          {/* Right Leaf */}
          <g transform="translate(55, 20) rotate(25) scale(0.95)">
            <ellipse cx="0" cy="0" rx="15" ry="22" fill={color} stroke="#5c3f15" strokeWidth="2" />
            <line x1="0" y1="-22" x2="0" y2="22" stroke="#045d43" strokeWidth="1.5" />
            <path d="M -15 0 H -5 M -13 -10 L -4 -4 M -13 10 L -4 4" stroke="#047857" strokeWidth="1.5" />
            <path d="M 15 0 H 5 M 13 -10 L 3 -4 M 13 10 L 3 4" stroke="#047857" strokeWidth="1.5" />
          </g>

          {/* Center Upright Leaf */}
          <g transform="translate(38, 30) rotate(-5) scale(0.75)">
            <ellipse cx="0" cy="0" rx="12" ry="18" fill={color} stroke="#5c3f15" strokeWidth="2" />
            <line x1="0" y1="-18" x2="0" y2="18" stroke="#045d43" strokeWidth="1.5" />
          </g>

          {/* Tiny soil patch visible */}
          <ellipse cx="40" cy="79" rx="12" ry="2.5" fill="#451a03" />
        </svg>
      );

    case 'deco_window':
      return (
        <svg viewBox="0 0 120 90" className={`${className}`} style={{ overflow: 'visible' }}>
          {/* Glass windowpane Sunset background */}
          <rect x="10" y="5" width="100" height="75" rx="4" fill="url(#sunset-gradient)" stroke="#5c3f15" strokeWidth="3" />

          {/* Gradients definition */}
          <defs>
            <linearGradient id="sunset-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="60%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>
          </defs>

          {/* Mountain details in background */}
          <path d="M 10 80 L 35 60 L 60 75 L 85 55 L 110 80 Z" fill="#4c1d95" opacity="0.6" />
          {/* Glowing Sun */}
          <circle cx="85" cy="40" r="12" fill="#fef08a" opacity="0.95" />

          {/* Window pane grids */}
          <line x1="60" y1="5" x2="60" y2="80" stroke="#5c3f15" strokeWidth="2.5" />
          <line x1="10" y1="42" x2="110" y2="42" stroke="#5c3f15" strokeWidth="2.5" />

          {/* Window Frame Trim (Sill) */}
          <rect x="5" y="78" width="110" height="7" rx="1.5" fill="#78350f" stroke="#5c3f15" strokeWidth="2" />

          {/* Curtains */}
          {/* Left curtain */}
          <path d="M 10 5 C 25 5, 25 40, 15 80 L 10 80 Z" fill="#ffffff" opacity="0.85" stroke="#5c3f15" strokeWidth="1.5" />
          <path d="M 10 5 C 25 5, 25 40, 15 80" fill="none" stroke="#e2e8f0" strokeWidth="1" />
          {/* Right curtain */}
          <path d="M 110 5 C 95 5, 95 40, 105 80 L 110 80 Z" fill="#ffffff" opacity="0.85" stroke="#5c3f15" strokeWidth="1.5" />
          <path d="M 110 5 C 95 5, 95 40, 105 80" fill="none" stroke="#e2e8f0" strokeWidth="1" />

          {/* Curtain rod */}
          <rect x="8" y="2" width="104" height="4" rx="1" fill="#1e293b" />
          <circle cx="7" cy="4" r="2.5" fill="#eab308" />
          <circle cx="113" cy="4" r="2.5" fill="#eab308" />
        </svg>
      );

    case 'deco_lamp':
      return (
        <svg viewBox="0 0 60 120" className={`${className}`} style={{ overflow: 'visible' }}>
          {/* Light Glow Beam Effect behind */}
          <polygon points="30,30 -40,115 100,115" fill="#fef08a" opacity="0.18" />

          {/* Lamp Base shadow */}
          <ellipse cx="30" cy="114" rx="18" ry="4" fill="#000000" opacity="0.15" />

          {/* Lamp Base */}
          <ellipse cx="30" cy="112" rx="15" ry="5" fill="#64748b" stroke="#5c3f15" strokeWidth="2" />
          
          {/* Tall stand */}
          <line x1="30" y1="30" x2="30" y2="112" stroke="#5c3f15" strokeWidth="3" />
          {/* Little metal knob on stem */}
          <circle cx="30" cy="70" r="2" fill="#eab308" />

          {/* Sunset Glass Shade */}
          {/* bulb inside */}
          <circle cx="30" cy="28" r="6" fill="#fef08a" />
          <polygon points="18,34 42,34 38,10 22,10" fill={color} stroke="#5c3f15" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="18" y1="34" x2="42" y2="34" stroke="#5c3f15" strokeWidth="1.5" />

          {/* Little pull-string switch */}
          <line x1="36" y1="34" x2="36" y2="48" stroke="#5c3f15" strokeWidth="1" />
          <circle cx="36" cy="49" r="1.5" fill="#cbd5e1" stroke="#5c3f15" strokeWidth="1" />
        </svg>
      );

    default:
      // Generic fallback container with emoji
      return (
        <div className="flex items-center justify-center w-full h-full text-5xl">
          {category === 'bed' && '🛏️'}
          {category === 'toy' && '🧸'}
          {category === 'food_water' && '🥣'}
          {category === 'deco' && '🪴'}
        </div>
      );
  }
};
