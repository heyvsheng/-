import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PetType, PetState, FurnitureItem } from '../types';
import { PetSvg } from './PetSvg';
import { FurnitureSvg } from './FurnitureSvg';
import { PET_THOUGHTS } from '../data/constants';
import { Heart, Trash2, Move, HelpCircle } from 'lucide-react';

interface PetRoomProps {
  petType: PetType;
  petState: PetState;
  petName: string;
  petColor: string;
  placedFurniture: FurnitureItem[];
  isEditMode: boolean;
  onUpdateFurniturePosition: (id: string, x: number, y: number) => void;
  onRemoveFurniture: (id: string) => void;
  onPetClick: () => void;
  foodLevel: number; // visually show if there is food in bowl
  waterLevel: number; // visually show if there is water in bowl
}

export const PetRoom: React.FC<PetRoomProps> = ({
  petType,
  petState,
  petName,
  petColor,
  placedFurniture,
  isEditMode,
  onUpdateFurniturePosition,
  onRemoveFurniture,
  onPetClick,
  foodLevel,
  waterLevel
}) => {
  const roomRef = useRef<HTMLDivElement>(null);

  // Pet movement state (percent-based: 0 to 100 relative to the room container)
  const [petX, setPetX] = useState(50);
  const [petY, setPetY] = useState(72);
  const [petTargetX, setPetTargetX] = useState(50);
  const [petTargetY, setPetTargetY] = useState(72);
  const [isFacingLeft, setIsFacingLeft] = useState(false);

  // Pet thoughts and hearts
  const [thought, setThought] = useState<string>('你好，我的主人！');
  const [showThought, setShowThought] = useState(true);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [zzzs, setZzzs] = useState<{ id: number; x: number; y: number }[]>([]);

  // Find active wallpaper & flooring
  const activeWallpaper = placedFurniture.find(f => f.category === 'wallpaper');
  const activeFlooring = placedFurniture.find(f => f.category === 'flooring');

  // Pet movement loop (autonomous AI wandering or heading to action coordinates)
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (petState === 'sleeping') {
      // Find a bed item to sleep on, if placed
      const bed = placedFurniture.find(f => f.category === 'bed');
      if (bed) {
        setPetTargetX(bed.x);
        setPetTargetY(bed.y - 4); // Slightly above bed
      } else {
        setPetTargetX(25);
        setPetTargetY(75);
      }
    } else if (petState === 'eating' || petState === 'drinking') {
      // Find a food/water bowl to eat/drink from
      const bowl = placedFurniture.find(f => f.category === 'food_water');
      if (bowl) {
        setPetTargetX(bowl.x - 8);
        setPetTargetY(bowl.y);
      } else {
        setPetTargetX(60);
        setPetTargetY(78);
      }
    } else if (petState === 'playing') {
      // Find a toy to play with
      const toy = placedFurniture.find(f => f.category === 'toy');
      if (toy) {
        setPetTargetX(toy.x);
        setPetTargetY(toy.y + 2);
      } else {
        setPetTargetX(70);
        setPetTargetY(70);
      }
    } else if (petState === 'happy') {
      // Stay where you are and enjoy the pats!
    } else {
      // Wandering / Idle AI
      const wander = () => {
        // Choose a random location on the floor (x: 10-90%, y: 65-85% for floor perspective)
        const randomX = Math.floor(Math.random() * 75) + 12;
        const randomY = Math.floor(Math.random() * 18) + 66;
        setPetTargetX(randomX);
        setPetTargetY(randomY);

        // Update thoughts randomly
        const thoughtsList = PET_THOUGHTS[petState] || PET_THOUGHTS.idle;
        const randomThought = thoughtsList[Math.floor(Math.random() * thoughtsList.length)];
        setThought(randomThought);
        setShowThought(true);

        // Auto hide thought after 6s
        setTimeout(() => setShowThought(false), 6000);
      };

      // Wander every 10-15 seconds
      interval = setInterval(wander, 12000);
      // Trigger one wander immediately
      wander();
    }

    return () => clearInterval(interval);
  }, [petState, placedFurniture]);

  // Interpolation / walking movement step
  useEffect(() => {
    const walkInterval = setInterval(() => {
      const dx = petTargetX - petX;
      const dy = petTargetY - petY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 1.5) {
        const speed = 0.8; // Percent per frame
        const moveX = (dx / distance) * speed;
        const moveY = (dy / distance) * speed;
        setPetX(prev => prev + moveX);
        setPetY(prev => prev + moveY);

        // Face direction of travel
        if (moveX < -0.1) setIsFacingLeft(true);
        if (moveX > 0.1) setIsFacingLeft(false);
      }
    }, 30);

    return () => clearInterval(walkInterval);
  }, [petTargetX, petTargetY, petX, petY]);

  // Sync pet thoughts with petState changes
  useEffect(() => {
    const list = PET_THOUGHTS[petState] || PET_THOUGHTS.idle;
    const t = list[Math.floor(Math.random() * list.length)];
    setThought(t);
    setShowThought(true);
    const timer = setTimeout(() => setShowThought(false), 5000);
    return () => clearTimeout(timer);
  }, [petState]);

  // Sleeping Zzz loop
  useEffect(() => {
    if (petState !== 'sleeping') return;

    const zInterval = setInterval(() => {
      setZzzs(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: petX + (isFacingLeft ? -5 : 5),
          y: petY - 10
        }
      ].slice(-6)); // keep max 6
    }, 1800);

    return () => clearInterval(zInterval);
  }, [petState, petX, petY, isFacingLeft]);

  // Click on pet handler
  const handlePetInteraction = () => {
    if (isEditMode) return;
    onPetClick();

    // Spawn hearts above the pet
    const newHearts = Array.from({ length: 3 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: petX + (Math.random() * 16 - 8),
      y: petY - 12 - (Math.random() * 8)
    }));

    setHearts(prev => [...prev, ...newHearts].slice(-8));
  };

  // Drag handlers for furniture placing
  const handleDragEnd = (id: string, event: any, info: any) => {
    if (!roomRef.current) return;
    const rect = roomRef.current.getBoundingClientRect();
    const x = ((info.point.x - rect.left) / rect.width) * 100;
    const y = ((info.point.y - rect.top) / rect.height) * 100;

    // Constrain to the room boundary: x: 5-95%, y: wall window range vs floor range
    const item = placedFurniture.find(f => f.id === id);
    if (!item) return;

    let clampedX = Math.max(5, Math.min(95, x));
    let clampedY = Math.max(5, Math.min(95, y));

    // Constrain vertical range depending on item category (e.g. wall hanging vs floor furniture)
    if (item.category === 'wallpaper' || item.category === 'flooring') {
      return; // Wallpapers and floorings are full screen themes, no dragging
    }

    if (id === 'deco_window') {
      // Windows should be on the upper wall (15% - 45%)
      clampedY = Math.max(15, Math.min(45, y));
    } else {
      // Normal floor furniture should sit on the floor (55% - 88%)
      clampedY = Math.max(55, Math.min(88, y));
    }

    onUpdateFurniturePosition(id, clampedX, clampedY);
  };

  // Clean wallpaper background
  const getWallpaperStyle = () => {
    if (activeWallpaper) {
      if (activeWallpaper.id === 'wall_pink') {
        return 'bg-gradient-to-b from-rose-100 to-rose-200';
      }
      if (activeWallpaper.id === 'wall_blue') {
        return 'bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-b border-indigo-900';
      }
    }
    // Default wallpaper
    return 'bg-gradient-to-tr from-[#fff9e6] to-[#ffeaa7]';
  };

  // Clean flooring background
  const getFlooringStyle = () => {
    if (activeFlooring) {
      if (activeFlooring.id === 'floor_wood') {
        return 'bg-amber-100/90 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]';
      }
      if (activeFlooring.id === 'floor_tatami') {
        return 'bg-lime-50/80 bg-[linear-gradient(90deg,rgba(163,230,53,0.15)_50%,transparent_50%)] [background-size:12px_100%]';
      }
    }
    // Default flooring
    return 'bg-stone-100 bg-[linear-gradient(rgba(120,113,108,0.06)_1px,transparent_1px)] [background-size:100%_12px]';
  };

  return (
    <div className="relative w-full overflow-hidden border border-slate-200 bg-white rounded-3xl shadow-soft aspect-[4/3] md:aspect-[1.45/1]" ref={roomRef}>
      {/* Wall Container (Top 68%) */}
      <div className={`absolute top-0 left-0 right-0 h-[68%] transition-all duration-700 ${getWallpaperStyle()} flex flex-col justify-between p-4 overflow-hidden`}>
        {/* Sky View decoration (if window not placed, just default plain wall) */}
        {!placedFurniture.some(f => f.id === 'deco_window') && (
          <div className="flex justify-between w-full opacity-30 select-none">
            <div className="w-16 h-8 bg-white/40 rounded-full blur-sm animate-pulse" />
            <div className="w-24 h-10 bg-white/40 rounded-full blur-sm animate-pulse delay-1000" />
          </div>
        )}

        {/* Wall Posters or instructions in Edit Mode */}
        {isEditMode && (
          <div className="absolute inset-x-0 top-3 flex justify-center z-20 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/95 text-white text-xs font-medium rounded-full shadow-lg border border-amber-400"
            >
              <Move className="w-3.5 h-3.5 animate-bounce" />
              <span>拖拽家具布置屋子，点击垃圾桶可回收</span>
            </motion.div>
          </div>
        )}
      </div>

      {/* Floor Container (Bottom 32%) */}
      <div className={`absolute bottom-0 left-0 right-0 h-[32%] transition-all duration-700 ${getFlooringStyle()} border-t-4 border-amber-800/30`} />

      {/* RENDER FURNITURE */}
      {placedFurniture
        .filter(f => f.category !== 'wallpaper' && f.category !== 'flooring')
        .map(item => {
          const isWindow = item.id === 'deco_window';
          // Scale sizing multiplier
          const widthClass = isWindow ? 'w-[28%] md:w-[25%]' : 'w-[18%] md:w-[15%]';

          return (
            <motion.div
              key={item.id}
              className={`absolute group cursor-pointer z-10`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)',
                touchAction: 'none'
              }}
              drag={isEditMode}
              dragMomentum={false}
              dragElastic={0}
              dragConstraints={roomRef}
              onDragEnd={(e, info) => handleDragEnd(item.id, e, info)}
              whileHover={isEditMode ? { scale: 1.05, zIndex: 30 } : { scale: 1.02 }}
              whileTap={isEditMode ? { scale: 0.95 } : {}}
            >
              {/* Furniture Graphic wrapper */}
              <div className={`${widthClass} relative`}>
                <FurnitureSvg
                  id={item.id}
                  category={item.category}
                  color={item.color}
                  className="w-full h-auto drop-shadow-md filter group-hover:brightness-105 transition-all"
                />

                {/* Edit Mode highlights */}
                {isEditMode && (
                  <div className="absolute -inset-2 border-2 border-dashed border-amber-500 rounded-lg bg-amber-500/10 flex items-center justify-center animate-pulse z-20">
                    {/* Delete / Recycle button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFurniture(item.id);
                      }}
                      className="absolute -top-6 -right-6 p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-lg border border-rose-400 transition-colors pointer-events-auto"
                      title="收回背包"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {/* Drag indicator handle */}
                    <div className="p-1 bg-amber-500 text-white rounded-full shadow border border-amber-300">
                      <Move className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

      {/* RENDER PET FOOD DISH OVERLAY (Visual confirmation of water / kibble filling bowl) */}
      {placedFurniture.some(f => f.id === 'bowl_basic') && (
        <div
          className="absolute text-xs font-bold text-emerald-600 px-1 py-0.5 rounded bg-white/80 pointer-events-none border border-emerald-100 z-10 transition-all shadow"
          style={{
            left: `${placedFurniture.find(f => f.id === 'bowl_basic')!.x}%`,
            top: `${placedFurniture.find(f => f.id === 'bowl_basic')!.y - 12}%`,
            transform: 'translateX(-50%)'
          }}
        >
          {foodLevel > 50 ? '🍖已添饭' : foodLevel > 0 ? '🍛少许' : '🍽️空盘'} | {waterLevel > 0 ? '💧满水' : '💧没水'}
        </div>
      )}

      {/* RENDER PET */}
      <motion.div
        className="absolute z-20 cursor-pointer select-none"
        style={{
          left: `${petX}%`,
          top: `${petY}%`,
          transform: `translate(-50%, -85%) scaleX(${isFacingLeft ? -1 : 1})`,
          touchAction: 'none'
        }}
        onClick={handlePetInteraction}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Floating thought bubble */}
        <AnimatePresence>
          {showThought && thought && !isEditMode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-[108%] left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 text-slate-800 text-xs md:text-sm font-medium px-3.5 py-2 rounded-2xl shadow-xl border border-amber-200/80 flex items-center gap-1.5 z-30"
              style={{ transform: `translateX(-50%) scaleX(${isFacingLeft ? -1 : 1})` }} // Counteract scaleX flipping
            >
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-3 h-3 bg-white border-r border-b border-amber-200/80 rotate-45" />
              <span>{thought}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pet SVG body */}
        <div className="w-[88px] h-[72px] sm:w-[105px] sm:h-[85px] relative">
          <PetSvg type={petType} state={petState} color={petColor} className="w-full h-full" />
        </div>
      </motion.div>

      {/* SPARK PARTICLES: FLOATING HEARTS & SLEEP ZZZ */}
      {/* Floating Hearts */}
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: [1, 1.3, 1], y: -50, x: Math.random() * 20 - 10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute text-rose-500 pointer-events-none z-30 font-bold"
            style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
          >
            <Heart className="w-5 h-5 fill-rose-500" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Sleep ZZZs */}
      <AnimatePresence>
        {zzzs.map(z => (
          <motion.div
            key={z.id}
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: [0, 1, 0.8, 0], scale: [0.7, 1.2, 1.5], y: -45, x: Math.random() * 15 - 5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            className="absolute text-violet-500 font-mono font-bold text-sm pointer-events-none z-30 select-none"
            style={{ left: `${z.x}%`, top: `${z.y}%` }}
          >
            Zz
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Sun glow effect for retro lamp if placed and not sleeping */}
      {placedFurniture.some(f => f.id === 'deco_lamp') && petState !== 'sleeping' && (
        <div
          className="absolute pointer-events-none w-48 h-48 rounded-full bg-yellow-300/10 blur-xl mix-blend-screen z-10 animate-pulse"
          style={{
            left: `${placedFurniture.find(f => f.id === 'deco_lamp')!.x}%`,
            top: `${placedFurniture.find(f => f.id === 'deco_lamp')!.y + 5}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </div>
  );
};
