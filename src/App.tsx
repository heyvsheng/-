import React, { useState, useEffect } from 'react';
import { PetType, PetState, PetStatus as IPetStatus, FurnitureItem, CareLogEntry } from './types';
import { INITIAL_FURNITURE, AVAILABLE_PETS } from './data/constants';
import { PetRoom } from './components/PetRoom';
import { PetStatus } from './components/PetStatus';
import { ControlPanel } from './components/ControlPanel';
import { ShopInventory } from './components/ShopInventory';
import { CareLogs } from './components/CareLogs';
import { Home, Sparkles, Clock, RefreshCw } from 'lucide-react';

// Struct for individual pet state
interface PetProfile {
  name: string;
  level: number;
  xp: number;
  hunger: number;
  thirst: number;
  energy: number;
  affection: number;
  streak: number;
  lastCaredDate: string | null;
}

const DEFAULT_PROFILES: Record<PetType, PetProfile> = {
  dog: {
    name: '小木 (Shiba)',
    level: 1,
    xp: 20,
    hunger: 70,
    thirst: 60,
    energy: 75,
    affection: 50,
    streak: 1,
    lastCaredDate: null
  },
  cat: {
    name: '团团 (Mimi)',
    level: 1,
    xp: 0,
    hunger: 65,
    thirst: 70,
    energy: 80,
    affection: 40,
    streak: 1,
    lastCaredDate: null
  },
  hamster: {
    name: '豆子 (Pippi)',
    level: 1,
    xp: 0,
    hunger: 80,
    thirst: 75,
    energy: 90,
    affection: 55,
    streak: 1,
    lastCaredDate: null
  }
};

const DEFAULT_QUESTS = [
  { id: 'quest_feed', text: '🍖 添饭喂饱宠物一次', completed: false, claimed: false, reward: 30 },
  { id: 'quest_water', text: '💧 倒满清水解渴一次', completed: false, claimed: false, reward: 20 },
  { id: 'quest_play', text: '🧸 陪宠物痛快玩耍一次', completed: false, claimed: false, reward: 35 },
  { id: 'quest_deco', text: '🏠 摆放或移动一件家饰', completed: false, claimed: false, reward: 40 }
];

export default function App() {
  // 1. Core State
  const [activePetType, setActivePetType] = useState<PetType>('dog');
  const [petState, setPetState] = useState<PetState>('idle');
  const [petProfiles, setPetProfiles] = useState<Record<PetType, PetProfile>>(DEFAULT_PROFILES);
  const [furniture, setFurniture] = useState<FurnitureItem[]>(INITIAL_FURNITURE);
  const [coins, setCoins] = useState<number>(300); // Start with 300 coins to let them buy items early!
  const [logs, setLogs] = useState<CareLogEntry[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [dailyQuests, setDailyQuests] = useState(DEFAULT_QUESTS);
  const [timeStr, setTimeStr] = useState<string>('');

  // 2. Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedProfiles = localStorage.getItem('pet_profiles');
      const savedFurniture = localStorage.getItem('pet_furniture');
      const savedCoins = localStorage.getItem('pet_coins');
      const savedLogs = localStorage.getItem('pet_logs');
      const savedQuests = localStorage.getItem('pet_quests');
      const savedActivePet = localStorage.getItem('pet_active_type');

      if (savedProfiles) setPetProfiles(JSON.parse(savedProfiles));
      if (savedFurniture) setFurniture(JSON.parse(savedFurniture));
      if (savedCoins) setCoins(Number(savedCoins));
      if (savedLogs) setLogs(JSON.parse(savedLogs));
      if (savedQuests) setDailyQuests(JSON.parse(savedQuests));
      if (savedActivePet) setActivePetType(savedActivePet as PetType);

      // Add startup log
      addLogEntry('streak', `欢迎回到温馨小屋！小屋大门已敞开 🏡`);
    } catch (e) {
      console.error('Failed to load local storage:', e);
    }
  }, []);

  // 3. Save state on change
  useEffect(() => {
    localStorage.setItem('pet_profiles', JSON.stringify(petProfiles));
  }, [petProfiles]);

  useEffect(() => {
    localStorage.setItem('pet_furniture', JSON.stringify(furniture));
  }, [furniture]);

  useEffect(() => {
    localStorage.setItem('pet_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('pet_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('pet_quests', JSON.stringify(dailyQuests));
  }, [dailyQuests]);

  useEffect(() => {
    localStorage.setItem('pet_active_type', activePetType);
  }, [activePetType]);

  // 4. Real-time Clock loop
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('zh-CN', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 5. Background hunger/thirst/energy depletion tickers
  useEffect(() => {
    const depletionInterval = setInterval(() => {
      setPetProfiles(prev => {
        const updated = { ...prev };
        
        // Process each profile so pets drain stats in the background
        Object.keys(updated).forEach((key) => {
          const type = key as PetType;
          const p = { ...updated[type] };
          const isCurrentActive = type === activePetType;

          if (isCurrentActive && petState === 'sleeping') {
            // Sleeping recovers energy and depletes hunger/thirst slower
            p.energy = Math.min(100, p.energy + 3.5);
            p.hunger = Math.max(0, p.hunger - 0.4);
            p.thirst = Math.max(0, p.thirst - 0.5);

            // Auto-wake up at 100 energy
            if (p.energy >= 100) {
              p.energy = 100;
              setTimeout(() => {
                setPetState('idle');
                addLogEntry('sleep', `${p.name} 饱睡了一觉，精力充沛地起床了！🛌`);
              }, 100);
            }
          } else {
            // Normal awake depletion
            p.hunger = Math.max(0, p.hunger - 0.75);
            p.thirst = Math.max(0, p.thirst - 0.9);
            p.energy = Math.max(0, p.energy - 0.5);

            // Affection penalty for neglect
            if (p.hunger < 20 || p.thirst < 20) {
              p.affection = Math.max(10, p.affection - 0.3);
            }
          }

          updated[type] = p;
        });

        return updated;
      });
    }, 6000); // ticking down stats every 6 seconds

    return () => clearInterval(depletionInterval);
  }, [activePetType, petState]);

  // Active pet short-hand reference
  const currentPet = petProfiles[activePetType];

  // 6. Action helper: Add XP and level up check
  const grantXP = (profile: PetProfile, amount: number) => {
    let newXp = profile.xp + amount;
    let newLevel = profile.level;
    const xpNeeded = profile.level * 100;

    if (newXp >= xpNeeded) {
      newXp -= xpNeeded;
      newLevel += 1;
      setCoins(c => c + 150); // level up gold bonus!
      
      // Delay slightly to avoid react update collision
      setTimeout(() => {
        addLogEntry('level_up', `🌟 恭喜！${profile.name} 升级至 LV.${newLevel}！获得升级礼包 +150 金币！`);
      }, 200);
    }

    return { xp: newXp, level: newLevel };
  };

  // 7. Action helper: Care streaks tracker
  const updateStreakAndDate = (profile: PetProfile) => {
    const todayStr = new Date().toDateString();
    
    if (profile.lastCaredDate === todayStr) {
      return { streak: profile.streak, lastCaredDate: todayStr };
    }

    let newStreak = profile.streak;
    
    if (profile.lastCaredDate === null) {
      newStreak = 1;
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      if (profile.lastCaredDate === yesterdayStr) {
        newStreak += 1;
        setTimeout(() => {
          addLogEntry('streak', `🔥 连续照顾达成！${profile.name} 与你的连续喂养天数已达 ${newStreak} 天！`);
        }, 300);
      } else {
        newStreak = 1; // reset streak if gap exists
      }
    }

    return { streak: newStreak, lastCaredDate: todayStr };
  };

  // 8. Care interaction triggers
  const handleFeed = () => {
    if (petState === 'sleeping') return;
    
    setPetState('eating');
    setTimeout(() => setPetState('idle'), 3500);

    setPetProfiles(prev => {
      const p = { ...prev[activePetType] };
      p.hunger = Math.min(100, p.hunger + 25);
      
      // Grant XP and check Level-up
      const levelResult = grantXP(p, 15);
      p.xp = levelResult.xp;
      p.level = levelResult.level;

      // Update care streak
      const streakResult = updateStreakAndDate(p);
      p.streak = streakResult.streak;
      p.lastCaredDate = streakResult.lastCaredDate;

      return { ...prev, [activePetType]: p };
    });

    setCoins(c => c + 15);
    addLogEntry('feed', `喂食了 ${currentPet.name} 最爱的食物 🍖 金币 +15, XP +15`);
    completeQuest('quest_feed');
  };

  const handleWater = () => {
    if (petState === 'sleeping') return;

    setPetState('drinking');
    setTimeout(() => setPetState('idle'), 3500);

    setPetProfiles(prev => {
      const p = { ...prev[activePetType] };
      p.thirst = Math.min(100, p.thirst + 25);
      
      const levelResult = grantXP(p, 10);
      p.xp = levelResult.xp;
      p.level = levelResult.level;

      const streakResult = updateStreakAndDate(p);
      p.streak = streakResult.streak;
      p.lastCaredDate = streakResult.lastCaredDate;

      return { ...prev, [activePetType]: p };
    });

    setCoins(c => c + 10);
    addLogEntry('water', `倒满了清洁饮用水给 ${currentPet.name} 💧 金币 +10, XP +10`);
    completeQuest('quest_water');
  };

  const handlePlay = () => {
    if (petState === 'sleeping' || currentPet.energy < 20) return;

    setPetState('playing');
    setTimeout(() => setPetState('idle'), 4500);

    setPetProfiles(prev => {
      const p = { ...prev[activePetType] };
      p.energy = Math.max(0, p.energy - 20);
      p.affection = Math.min(100, p.affection + 15);
      
      const levelResult = grantXP(p, 25);
      p.xp = levelResult.xp;
      p.level = levelResult.level;

      const streakResult = updateStreakAndDate(p);
      p.streak = streakResult.streak;
      p.lastCaredDate = streakResult.lastCaredDate;

      return { ...prev, [activePetType]: p };
    });

    setCoins(c => c + 25);
    addLogEntry('play', `陪 ${currentPet.name} 尽情游玩了玩具 🧸 体力 -20, 亲密 +15, 金币 +25, XP +25`);
    completeQuest('quest_play');
  };

  const handleSleep = () => {
    if (petState === 'sleeping') {
      setPetState('idle');
      addLogEntry('sleep', `轻轻唤醒了睡梦中的 ${currentPet.name} 🌅`);
    } else {
      setPetState('sleeping');
      addLogEntry('sleep', `${currentPet.name} 缩进温和的角落甜美地睡着了... zzz 🛌`);
    }
  };

  const handlePet = () => {
    if (petState === 'sleeping') return;

    setPetState('happy');
    setTimeout(() => setPetState('idle'), 2500);

    setPetProfiles(prev => {
      const p = { ...prev[activePetType] };
      p.affection = Math.min(100, p.affection + 10);
      
      const levelResult = grantXP(p, 10);
      p.xp = levelResult.xp;
      p.level = levelResult.level;

      return { ...prev, [activePetType]: p };
    });

    addLogEntry('pet', `温柔抚摸了 ${currentPet.name} 的小脑袋，它开心地直蹭你 ❤️ XP +10`);
  };

  // 9. Pet Switching
  const handleSwitchPet = (type: PetType) => {
    if (type === activePetType) return;
    setPetState('idle');
    setActivePetType(type);
    
    const petName = petProfiles[type].name;
    addLogEntry('streak', `✨ 成功召唤了宠物伙伴: ${petName}！`);
  };

  const handleRenamePet = (newName: string) => {
    setPetProfiles(prev => {
      const p = { ...prev[activePetType] };
      const oldName = p.name;
      p.name = newName;
      
      setTimeout(() => {
        addLogEntry('streak', `📝 宠物重命名: 将「${oldName}」更改为「${newName}」！`);
      }, 100);

      return { ...prev, [activePetType]: p };
    });
  };

  // 10. Decoration Shop Logic
  const handleBuyItem = (id: string) => {
    const item = furniture.find(f => f.id === id);
    if (!item || item.purchased || coins < item.price) return;

    setCoins(c => c - item.price);
    setFurniture(prev =>
      prev.map(f => (f.id === id ? { ...f, purchased: true } : f))
    );

    addLogEntry('buy_furniture', `🛍️ 从商店购入了「${item.name}」！金币 -${item.price}`);
  };

  const handlePlaceItem = (id: string) => {
    const item = furniture.find(f => f.id === id);
    if (!item || !item.purchased) return;

    setFurniture(prev => {
      let updated = prev.map(f => {
        // If it's a wallpaper or flooring, un-place any other item in that category
        if ((item.category === 'wallpaper' && f.category === 'wallpaper') ||
            (item.category === 'flooring' && f.category === 'flooring')) {
          return { ...f, isPlaced: f.id === id };
        }
        // Normal item placement
        if (f.id === id) {
          return { ...f, isPlaced: true };
        }
        return f;
      });
      return updated;
    });

    addLogEntry('place_furniture', `🏠 在屋子里摆放并布置了「${item.name}」！`);
    completeQuest('quest_deco');
  };

  const handleRecallItem = (id: string) => {
    const item = furniture.find(f => f.id === id);
    if (!item) return;

    setFurniture(prev =>
      prev.map(f => (f.id === id ? { ...f, isPlaced: false } : f))
    );

    addLogEntry('place_furniture', `📦 将「${item.name}」收回到行李背包中。`);
  };

  const handleUpdateFurniturePosition = (id: string, x: number, y: number) => {
    setFurniture(prev =>
      prev.map(f => (f.id === id ? { ...f, x, y } : f))
    );
  };

  // 11. Daily Quests checklist
  const completeQuest = (id: string) => {
    setDailyQuests(prev =>
      prev.map(q => (q.id === id ? { ...q, completed: true } : q))
    );
  };

  const handleClaimQuest = (id: string) => {
    const quest = dailyQuests.find(q => q.id === id);
    if (!quest || !quest.completed || quest.claimed) return;

    setCoins(c => c + quest.reward);
    setDailyQuests(prev =>
      prev.map(q => (q.id === id ? { ...q, claimed: true } : q))
    );

    addLogEntry('streak', `🎉 领取日常任务奖励「${quest.text.slice(3)}」获得金币 +${quest.reward}！`);
  };

  // Reset quests daily (mock button or manual trigger if they clear logs)
  const handleClearLogs = () => {
    setLogs([]);
    setDailyQuests(DEFAULT_QUESTS);
    addLogEntry('streak', `🧹 手账已清空，日常任务已刷新复位！`);
  };

  // 12. Add Log Entry helper
  const addLogEntry = (type: CareLogEntry['type'], message: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    const newEntry: CareLogEntry = {
      id: (Date.now() + Math.random()).toString(),
      timestamp: time,
      type,
      message
    };
    setLogs(prev => [...prev, newEntry].slice(-40)); // Keep latest 40 logs
  };

  const activePlacedFurniture = furniture.filter(f => f.isPlaced);

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-[#2d3436] pb-12">
      {/* HEADER BAR */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-white/50 px-6 py-4 z-40 shadow-soft">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-[#ff9a9e] to-[#fecfef] text-white rounded-2xl shadow-md">
              <Home className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-black text-[#2d3436] tracking-tight flex items-center gap-1.5">
                <span>萌宠温馨小屋</span>
                <span className="text-[#ff9a9e] font-display">Virtual Pet Room</span>
              </h1>
              <p className="text-[11px] text-slate-400 font-bold mt-0.5">
                每天喂食喝水，自由打扮舒适小巢，观察宠物的治愈日常 🌸
              </p>
            </div>
          </div>

          {/* Real-time Clock display and status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/80 rounded-2xl border border-white/60 text-xs font-bold text-slate-600 shadow-soft">
              <Clock className="w-3.5 h-3.5 text-[#ff9a9e]" />
              <span>北京时间 {timeStr || '加载中...'}</span>
            </div>
            <div className="text-[10px] bg-emerald-500/10 text-emerald-700 font-extrabold border border-emerald-500/20 px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>线上实时饲养中</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN GAME DASHBOARD GRID */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: ROOM PANEL & CONTROLS (8 of 12 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* THE 2D INTERACTIVE PET ROOM */}
          <div className="relative">
            <PetRoom
              petType={activePetType}
              petState={petState}
              petName={currentPet.name}
              petColor={AVAILABLE_PETS.find(p => p.id === activePetType)!.primaryColor}
              placedFurniture={activePlacedFurniture}
              isEditMode={isEditMode}
              onUpdateFurniturePosition={handleUpdateFurniturePosition}
              onRemoveFurniture={handleRecallItem}
              onPetClick={handlePet}
              foodLevel={currentPet.hunger}
              waterLevel={currentPet.thirst}
            />
          </div>

          {/* LOWER CONTROLS PANEL (Care actions, summon selectors, daily quests) */}
          <ControlPanel
            activePetType={activePetType}
            petState={petState}
            petStatus={{
              hunger: Math.round(currentPet.hunger),
              thirst: Math.round(currentPet.thirst),
              energy: Math.round(currentPet.energy),
              affection: Math.round(currentPet.affection)
            }}
            onFeed={handleFeed}
            onWater={handleWater}
            onPlay={handlePlay}
            onSleep={handleSleep}
            onPet={handlePet}
            onSwitchPet={handleSwitchPet}
            petStatsMap={{
              dog: { name: petProfiles.dog.name, level: petProfiles.dog.level },
              cat: { name: petProfiles.cat.name, level: petProfiles.cat.level },
              hamster: { name: petProfiles.hamster.name, level: petProfiles.hamster.level }
            }}
            dailyQuests={dailyQuests}
            onClaimQuest={handleClaimQuest}
          />
        </div>

        {/* RIGHT COLUMN: HEALTH STATS, SHOPPING & TIMELINE LOGS (4 of 12 cols) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          {/* HEALTH STATS PANEL */}
          <PetStatus
            name={currentPet.name}
            type={activePetType}
            status={{
              hunger: Math.round(currentPet.hunger),
              thirst: Math.round(currentPet.thirst),
              energy: Math.round(currentPet.energy),
              affection: Math.round(currentPet.affection)
            }}
            coins={coins}
            streak={currentPet.streak}
            level={currentPet.level}
            xp={currentPet.xp}
            xpNeeded={currentPet.level * 100}
            onRename={handleRenamePet}
          />

          {/* SHOP AND BACKPACK STORAGE */}
          <div className="flex-1 min-h-[380px]">
            <ShopInventory
              furniture={furniture}
              coins={coins}
              onBuyItem={handleBuyItem}
              onPlaceItem={handlePlaceItem}
              onRecallItem={handleRecallItem}
              isEditMode={isEditMode}
              onToggleEditMode={() => setIsEditMode(!isEditMode)}
            />
          </div>

          {/* CARE CHRONOLOGICAL TIMELINE HANDBOOK */}
          <CareLogs
            logs={logs}
            onClearLogs={handleClearLogs}
          />
        </div>

      </main>
    </div>
  );
}
