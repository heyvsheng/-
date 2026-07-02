import React from 'react';
import { motion } from 'motion/react';
import { PetType, PetState } from '../types';

interface PetSvgProps {
  type: PetType;
  state: PetState;
  color: string;
  className?: string;
}

export const PetSvg: React.FC<PetSvgProps> = ({ type, state, color, className = '' }) => {
  const isSleeping = state === 'sleeping';
  const isEating = state === 'eating';
  const isDrinking = state === 'drinking';
  const isHappy = state === 'happy';
  const isPlaying = state === 'playing';
  const isWandering = state === 'wandering';

  // Animation variants
  const bodyVariants = {
    idle: {
      y: [0, -3, 0],
      scaleY: [1, 1.02, 1],
      transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
    },
    wandering: {
      y: [0, -6, 0],
      rotate: [-2, 2, -2],
      transition: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' }
    },
    eating: {
      y: [0, 4, 0],
      scaleY: [1, 0.95, 1],
      transition: { repeat: Infinity, duration: 0.4, ease: 'easeInOut' }
    },
    drinking: {
      y: [0, 6, 0],
      rotate: [0, 3, 0],
      transition: { repeat: Infinity, duration: 0.4, ease: 'easeInOut' }
    },
    sleeping: {
      y: [0, 2, 0],
      scaleY: [1, 0.97, 1],
      rotate: [0, 0, 0],
      transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
    },
    playing: {
      y: [0, -15, 0],
      scaleX: [1, 0.9, 1.1, 1],
      scaleY: [1, 1.1, 0.9, 1],
      transition: { repeat: Infinity, duration: 0.5, ease: 'easeInOut' }
    },
    happy: {
      y: [0, -8, 0],
      scaleY: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' }
    }
  };

  const tailVariants = {
    idle: {
      rotate: [-5, 15, -5],
      transition: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' }
    },
    wandering: {
      rotate: [-15, 25, -15],
      transition: { repeat: Infinity, duration: 0.5, ease: 'easeInOut' }
    },
    eating: {
      rotate: [5, 10, 5],
      transition: { repeat: Infinity, duration: 1, ease: 'easeInOut' }
    },
    sleeping: {
      rotate: [0, 2, 0],
      transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
    },
    playing: {
      rotate: [-30, 40, -30],
      transition: { repeat: Infinity, duration: 0.3, ease: 'easeInOut' }
    },
    happy: {
      rotate: [-45, 45, -45],
      transition: { repeat: Infinity, duration: 0.25, ease: 'easeInOut' }
    }
  };

  const currentVariant = bodyVariants[state] ? state : 'idle';
  const currentTailVariant = tailVariants[state] ? state : 'idle';

  // Renders different SVGs based on pet type
  const renderPet = () => {
    switch (type) {
      case 'dog': // Shiba Inu
        return (
          <g id="shiba-pet">
            {/* Tail */}
            <motion.path
              d="M 120 70 C 140 60, 150 40, 135 25 C 120 10, 105 30, 110 55"
              fill={color}
              stroke="#5c3f15"
              strokeWidth="3"
              strokeLinecap="round"
              transformOrigin="110px 55px"
              animate={currentTailVariant}
              variants={tailVariants}
            />
            {/* Left Ear */}
            <path
              d="M 30 35 L 10 5 L 45 20 Z"
              fill={color}
              stroke="#5c3f15"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M 27 30 L 15 11 L 38 19 Z"
              fill="#fda4af" // Pink inner ear
            />

            {/* Right Ear */}
            <path
              d="M 70 35 L 90 5 L 55 20 Z"
              fill={color}
              stroke="#5c3f15"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M 73 30 L 85 11 L 62 19 Z"
              fill="#fda4af"
            />

            {/* Body */}
            <rect
              x="25"
              y="45"
              width="70"
              height="50"
              rx="25"
              fill={color}
              stroke="#5c3f15"
              strokeWidth="3"
            />
            {/* White Tummy Chest */}
            <path
              d="M 35 46 C 45 65, 75 65, 85 46 C 85 75, 35 75, 35 46 Z"
              fill="#ffffff"
            />

            {/* Legs */}
            {/* Front Left */}
            <rect
              x="35"
              y="85"
              width="10"
              height="15"
              rx="4"
              fill="#ffffff"
              stroke="#5c3f15"
              strokeWidth="2.5"
            />
            {/* Front Right */}
            <rect
              x="55"
              y="85"
              width="10"
              height="15"
              rx="4"
              fill="#ffffff"
              stroke="#5c3f15"
              strokeWidth="2.5"
            />
            {/* Back Leg */}
            <rect
              x="75"
              y="82"
              width="12"
              height="16"
              rx="5"
              fill={color}
              stroke="#5c3f15"
              strokeWidth="2.5"
            />

            {/* Head */}
            <circle
              cx="50"
              cy="38"
              r="24"
              fill={color}
              stroke="#5c3f15"
              strokeWidth="3"
            />

            {/* White Cheeks (Muzzle Area) */}
            <path
              d="M 28 42 C 32 50, 45 52, 50 46 C 55 52, 68 50, 72 42 C 72 35, 28 35, 28 42 Z"
              fill="#ffffff"
            />

            {/* Eyes */}
            {isSleeping ? (
              <>
                {/* Left Sleeping Eye */}
                <path d="M 36 34 Q 40 38 44 34" fill="none" stroke="#5c3f15" strokeWidth="3" strokeLinecap="round" />
                {/* Right Sleeping Eye */}
                <path d="M 56 34 Q 60 38 64 34" fill="none" stroke="#5c3f15" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : isHappy ? (
              <>
                {/* Joyful eyes ^ ^ */}
                <path d="M 36 36 L 40 31 L 44 36" fill="none" stroke="#5c3f15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 56 36 L 60 31 L 64 36" fill="none" stroke="#5c3f15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </>
            ) : (
              <>
                {/* Normal Eyes */}
                <circle cx="40" cy="33" r="3.5" fill="#1e293b" />
                <circle cx="40" cy="31.5" r="1.2" fill="#ffffff" />
                <circle cx="60" cy="33" r="3.5" fill="#1e293b" />
                <circle cx="60" cy="31.5" r="1.2" fill="#ffffff" />
              </>
            )}

            {/* Blush cheeks */}
            {(isHappy || isPlaying) && (
              <>
                <ellipse cx="32" cy="40" rx="4" ry="2.5" fill="#fda4af" opacity="0.8" />
                <ellipse cx="68" cy="40" rx="4" ry="2.5" fill="#fda4af" opacity="0.8" />
              </>
            )}

            {/* Nose & Mouth */}
            <polygon points="48,41 52,41 50,43" fill="#1e293b" />
            {isEating ? (
              <path d="M 47 45 Q 50 49 53 45" fill="#f43f5e" stroke="#5c3f15" strokeWidth="2.5" strokeLinecap="round" />
            ) : (
              <path d="M 46 44 Q 50 47 54 44" fill="none" stroke="#5c3f15" strokeWidth="2.5" strokeLinecap="round" />
            )}
          </g>
        );

      case 'cat': // Orange Cat
        return (
          <g id="orange-cat">
            {/* Tail */}
            <motion.path
              d="M 120 70 C 135 75, 145 65, 140 45 C 135 30, 125 40, 120 50"
              fill="none"
              stroke={color}
              strokeWidth="9"
              strokeLinecap="round"
              transformOrigin="120px 70px"
              animate={currentTailVariant}
              variants={tailVariants}
            />
            <motion.path
              d="M 120 70 C 135 75, 145 65, 140 45 C 135 30, 125 40, 120 50"
              fill="none"
              stroke="#5c3f15"
              strokeWidth="3.5"
              strokeLinecap="round"
              transformOrigin="120px 70px"
              animate={currentTailVariant}
              variants={tailVariants}
            />

            {/* Left Ear */}
            <path
              d="M 28 32 L 10 10 L 40 22 Z"
              fill={color}
              stroke="#5c3f15"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M 25 28 L 15 15 L 34 20 Z"
              fill="#fda4af"
            />

            {/* Right Ear */}
            <path
              d="M 72 32 L 90 10 L 60 22 Z"
              fill={color}
              stroke="#5c3f15"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M 68 28 L 78 15 L 61 20 Z"
              fill="#fda4af"
            />

            {/* Body */}
            <rect
              x="25"
              y="45"
              width="72"
              height="48"
              rx="24"
              fill={color}
              stroke="#5c3f15"
              strokeWidth="3"
            />
            {/* Cat Stripes */}
            <path d="M 90 52 L 80 55 M 92 60 L 82 62 M 88 68 L 78 70" stroke="#c2410c" strokeWidth="4" strokeLinecap="round" />
            <path d="M 25 55 L 35 57 M 25 65 L 33 66" stroke="#c2410c" strokeWidth="4" strokeLinecap="round" />

            {/* Tummy */}
            <ellipse cx="55" cy="72" rx="18" ry="14" fill="#fffbeb" />

            {/* Legs */}
            {/* Front Left */}
            <rect
              x="36"
              y="85"
              width="10"
              height="12"
              rx="3"
              fill={color}
              stroke="#5c3f15"
              strokeWidth="2.5"
            />
            {/* Front Right */}
            <rect
              x="54"
              y="85"
              width="10"
              height="12"
              rx="3"
              fill={color}
              stroke="#5c3f15"
              strokeWidth="2.5"
            />
            {/* Back Left leg sitting */}
            <ellipse cx="26" cy="78" rx="10" ry="12" fill={color} stroke="#5c3f15" strokeWidth="2.5" />

            {/* Head */}
            <ellipse
              cx="50"
              cy="38"
              rx="23"
              ry="21"
              fill={color}
              stroke="#5c3f15"
              strokeWidth="3"
            />
            {/* Forehead Stripes */}
            <path d="M 45 19 L 45 24 M 50 18 L 50 25 M 55 19 L 55 24" stroke="#c2410c" strokeWidth="3" strokeLinecap="round" />

            {/* Eyes */}
            {isSleeping ? (
              <>
                <path d="M 34 35 Q 40 39 44 35" fill="none" stroke="#5c3f15" strokeWidth="3" strokeLinecap="round" />
                <path d="M 56 35 Q 60 39 64 35" fill="none" stroke="#5c3f15" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : isHappy ? (
              <>
                <path d="M 34 37 Q 39 32 44 37" fill="none" stroke="#5c3f15" strokeWidth="3" strokeLinecap="round" />
                <path d="M 56 37 Q 61 32 66 37" fill="none" stroke="#5c3f15" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* Big cute cat eyes */}
                <circle cx="39" cy="34" r="4.5" fill="#1e293b" />
                <circle cx="37.5" cy="32" r="1.5" fill="#ffffff" />
                <circle cx="39.5" cy="35" r="0.7" fill="#ffffff" />
                
                <circle cx="61" cy="34" r="4.5" fill="#1e293b" />
                <circle cx="59.5" cy="32" r="1.5" fill="#ffffff" />
                <circle cx="61.5" cy="35" r="0.7" fill="#ffffff" />
              </>
            )}

            {/* Cat Whiskers */}
            <path d="M 23 38 L 11 36 M 22 41 L 9 41 M 23 44 L 12 46" stroke="#5c3f15" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 77 38 L 89 36 M 78 41 L 91 41 M 77 44 L 88 46" stroke="#5c3f15" strokeWidth="1.5" strokeLinecap="round" />

            {/* Blush cheeks */}
            {(isHappy || isPlaying) && (
              <>
                <ellipse cx="30" cy="40" rx="3.5" ry="2" fill="#fda4af" opacity="0.85" />
                <ellipse cx="70" cy="40" rx="3.5" ry="2" fill="#fda4af" opacity="0.85" />
              </>
            )}

            {/* Nose & Mouth */}
            <polygon points="48,39 52,39 50,41" fill="#ea580c" />
            {isEating ? (
              <path d="M 45 43 C 48 48, 52 48, 55 43 Z" fill="#f43f5e" stroke="#5c3f15" strokeWidth="2.5" />
            ) : (
              // Cat wavy mouth structure :3
              <path d="M 45 42 Q 47.5 44 50 42 Q 52.5 44 55 42" fill="none" stroke="#5c3f15" strokeWidth="2" strokeLinecap="round" />
            )}
          </g>
        );

      case 'hamster': // Hamster
        return (
          <g id="hamster">
            {/* Tiny Tail */}
            <circle cx="80" cy="74" r="4" fill="#fda4af" stroke="#5c3f15" strokeWidth="1.5" />

            {/* Left Ear */}
            <circle cx="34" cy="24" r="10" fill="#e2b192" stroke="#5c3f15" strokeWidth="3" />
            <circle cx="34" cy="24" r="6" fill="#fda4af" />

            {/* Right Ear */}
            <circle cx="66" cy="24" r="10" fill="#e2b192" stroke="#5c3f15" strokeWidth="3" />
            <circle cx="66" cy="24" r="6" fill="#fda4af" />

            {/* Round Body */}
            <rect
              x="25"
              y="32"
              width="50"
              height="50"
              rx="25"
              fill={color}
              stroke="#5c3f15"
              strokeWidth="3"
            />

            {/* White Belly */}
            <ellipse cx="50" cy="62" rx="16" ry="18" fill="#ffffff" />

            {/* Little Feet */}
            {/* Left foot */}
            <ellipse cx="35" cy="81" rx="5" ry="3.5" fill="#fda4af" stroke="#5c3f15" strokeWidth="2" />
            {/* Right foot */}
            <ellipse cx="65" cy="81" rx="5" ry="3.5" fill="#fda4af" stroke="#5c3f15" strokeWidth="2" />

            {/* Cheeks expansion */}
            <ellipse cx="28" cy="54" rx="7" ry="9" fill={color} />
            <ellipse cx="72" cy="54" rx="7" ry="9" fill={color} />
            
            {/* Cheeks lines */}
            <path d="M 21 54 C 21 62, 30 62, 35 58" fill="none" stroke="#5c3f15" strokeWidth="2.5" />
            <path d="M 79 54 C 79 62, 70 62, 65 58" fill="none" stroke="#5c3f15" strokeWidth="2.5" />

            {/* Eyes */}
            {isSleeping ? (
              <>
                <path d="M 37 42 Q 41 45 45 42" fill="none" stroke="#5c3f15" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 55 42 Q 59 45 63 42" fill="none" stroke="#5c3f15" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : isHappy ? (
              <>
                <path d="M 36 44 L 40 40 L 44 44" fill="none" stroke="#5c3f15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 56 44 L 60 40 L 64 44" fill="none" stroke="#5c3f15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </>
            ) : (
              <>
                {/* Big sparkly black beady eyes */}
                <circle cx="40" cy="41" r="3.5" fill="#1e293b" />
                <circle cx="39" cy="39.5" r="1.2" fill="#ffffff" />
                <circle cx="60" cy="41" r="3.5" fill="#1e293b" />
                <circle cx="59" cy="39.5" r="1.2" fill="#ffffff" />
              </>
            )}

            {/* Whiskers */}
            <path d="M 22 51 L 12 49 M 21 54 L 10 54 M 22 57 L 13 59" stroke="#5c3f15" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 78 51 L 88 49 M 79 54 L 90 54 M 78 57 L 87 59" stroke="#5c3f15" strokeWidth="1.2" strokeLinecap="round" />

            {/* Blush cheeks */}
            <ellipse cx="33" cy="48" rx="4" ry="2" fill="#fda4af" opacity="0.9" />
            <ellipse cx="67" cy="48" rx="4" ry="2" fill="#fda4af" opacity="0.9" />

            {/* Pink Nose */}
            <circle cx="50" cy="47" r="2.2" fill="#fda4af" />

            {/* Mouth */}
            {isEating ? (
              <ellipse cx="50" cy="53" rx="2.5" ry="4" fill="#f43f5e" stroke="#5c3f15" strokeWidth="1.5" />
            ) : (
              // cute mouse teeth buck W
              <path d="M 47 50 Q 48.5 52 50 50 Q 51.5 52 53 50" fill="none" stroke="#5c3f15" strokeWidth="2" strokeLinecap="round" />
            )}

            {/* Little Hands */}
            <ellipse cx="43" cy="62" rx="3" ry="2" fill="#fda4af" stroke="#5c3f15" strokeWidth="1.5" />
            <ellipse cx="57" cy="62" rx="3" ry="2" fill="#fda4af" stroke="#5c3f15" strokeWidth="1.5" />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <motion.svg
      viewBox="0 0 150 110"
      className={`${className}`}
      animate={currentVariant}
      variants={bodyVariants}
      style={{ overflow: 'visible' }}
    >
      {renderPet()}
    </motion.svg>
  );
};
