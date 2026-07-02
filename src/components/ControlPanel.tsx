import React from 'react';
import { PetType, PetState, PetStatus } from '../types';
import { AVAILABLE_PETS } from '../data/constants';
import { Utensils, Droplet, Smile, Moon, Heart, Sparkles, RefreshCw, CheckCircle, Circle } from 'lucide-react';

interface ControlPanelProps {
  activePetType: PetType;
  petState: PetState;
  petStatus: PetStatus;
  onFeed: () => void;
  onWater: () => void;
  onPlay: () => void;
  onSleep: () => void;
  onPet: () => void;
  onSwitchPet: (type: PetType) => void;
  petStatsMap: Record<PetType, { name: string; level: number }>;
  dailyQuests: { id: string; text: string; completed: boolean; claimed: boolean; reward: number }[];
  onClaimQuest: (id: string) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  activePetType,
  petState,
  petStatus,
  onFeed,
  onWater,
  onPlay,
  onSleep,
  onPet,
  onSwitchPet,
  petStatsMap,
  dailyQuests,
  onClaimQuest
}) => {
  const isSleeping = petState === 'sleeping';

  const actionButtons = [
    {
      label: '喂食 (Feed)',
      icon: <Utensils className="w-5 h-5" />,
      color: 'bg-amber-500 hover:bg-amber-600 text-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-200',
      description: '饱食度 +25, 产出金币',
      onClick: onFeed,
      disabled: isSleeping
    },
    {
      label: '给水 (Water)',
      icon: <Droplet className="w-5 h-5" />,
      color: 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-200',
      description: '水分值 +25, 产出金币',
      onClick: onWater,
      disabled: isSleeping
    },
    {
      label: '玩耍 (Play)',
      icon: <Smile className="w-5 h-5" />,
      color: 'bg-teal-500 hover:bg-teal-600 text-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-200',
      description: '亲密度 +15, 消耗体力',
      onClick: onPlay,
      disabled: isSleeping || petStatus.energy < 20
    },
    {
      label: isSleeping ? '唤醒 (Wake)' : '睡觉 (Sleep)',
      icon: <Moon className={`w-5 h-5 ${isSleeping ? 'animate-bounce' : ''}`} />,
      color: isSleeping 
        ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-200' 
        : 'bg-violet-500 hover:bg-violet-600 text-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-200',
      description: isSleeping ? '唤醒萌宠' : '精力值每秒回充',
      onClick: onSleep,
      disabled: false
    },
    {
      label: '抚摸 (Pet)',
      icon: <Heart className="w-5 h-5" />,
      color: 'bg-[#ff9a9e] hover:bg-[#ff858a] text-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-200',
      description: '亲密 +10, 散落爱心',
      onClick: onPet,
      disabled: isSleeping
    }
  ];

  return (
    <div className="space-y-5">
      {/* 1. DAILY ACTION CONTROLS */}
      <div className="glass-panel rounded-3xl p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-3.5 flex items-center gap-1.5 border-b border-slate-200/40 pb-2.5">
          <Sparkles className="w-4 h-4 text-[#ff9a9e] animate-spin" />
          <span>萌宠日常互动</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {actionButtons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick}
              disabled={btn.disabled}
              className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border border-transparent font-black text-xs transition-all cursor-pointer shadow-soft ${
                btn.disabled 
                  ? 'bg-slate-100 text-slate-400 border-slate-100 shadow-none cursor-not-allowed' 
                  : btn.color
              } ${index === 4 && 'col-span-2 sm:col-span-1'}`} // last button spans full width on mobile
            >
              <div className="mb-1">{btn.icon}</div>
              <span className="font-extrabold text-[11px] whitespace-nowrap">{btn.label}</span>
              <span className="text-[8px] opacity-85 mt-1 font-semibold block scale-90 leading-none">
                {btn.disabled && btn.label.startsWith('玩耍') && petStatus.energy < 20 ? '体力不足 20' : btn.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. PET FAMILY SELECTOR (MULTI-PET SYSTEM) */}
      <div className="glass-panel rounded-3xl p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-3.5 flex items-center gap-1.5 border-b border-slate-200/40 pb-2.5">
          <RefreshCw className="w-4 h-4 text-[#ff9a9e]" />
          <span>宠物家族 (切换召唤)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {AVAILABLE_PETS.map((pet) => {
            const isActive = activePetType === pet.id;
            const petInfo = petStatsMap[pet.id] || { name: pet.displayName, level: 1 };
            const petEmoji = pet.id === 'dog' ? '🐶' : pet.id === 'cat' ? '🐱' : '🐹';

            return (
              <div
                key={pet.id}
                onClick={() => !isActive && onSwitchPet(pet.id)}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isActive
                    ? 'bg-[#ff9a9e]/10 border-[#ff9a9e]/30 shadow-soft'
                    : 'bg-white/40 border-slate-200/50 hover:bg-white/80 hover:border-slate-300 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-2xl border shadow-inner transition-transform group-hover:scale-105"
                    style={{ backgroundColor: pet.primaryColor, borderColor: '#5c3f15' }}
                  >
                    {petEmoji}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">{petInfo.name}</span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5">等级: LV.{petInfo.level}</span>
                  </div>
                </div>

                {isActive ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#ff9a9e] text-white rounded-lg border border-[#ff9a9e]/30 shadow-sm">
                    已召唤
                  </span>
                ) : (
                  <button className="text-[10px] font-bold text-slate-500 hover:text-[#ff9a9e] bg-white border border-slate-200 px-2 py-0.5 rounded-lg shadow-sm transition-colors">
                    召唤
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. DAILY CARE QUESTS */}
      <div className="glass-panel rounded-3xl p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-3.5 flex items-center gap-1.5 border-b border-slate-200/40 pb-2.5">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>每日爱心任务 (Earn Coins)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {dailyQuests.map((quest) => (
            <div
              key={quest.id}
              className={`p-3 rounded-2xl border flex items-center justify-between gap-2.5 transition-all ${
                quest.claimed 
                  ? 'bg-slate-50/70 border-slate-100 opacity-60' 
                  : quest.completed 
                    ? 'bg-emerald-500/5 border-emerald-200' 
                    : 'bg-white/50 border-slate-200/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {quest.completed ? (
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-4.5 h-4.5 text-slate-300 shrink-0" />
                )}
                <div className="flex flex-col">
                  <span className={`text-xs font-bold ${quest.claimed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                    {quest.text}
                  </span>
                  <span className="text-[9px] text-amber-600 font-extrabold mt-0.5 flex items-center gap-0.5">
                    奖励: +{quest.reward} 金币
                  </span>
                </div>
              </div>

              {quest.claimed ? (
                <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  已领奖励
                </span>
              ) : quest.completed ? (
                <button
                  onClick={() => onClaimQuest(quest.id)}
                  className="px-2.5 py-1 text-[10px] font-black bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg cursor-pointer shadow border border-emerald-400 animate-pulse transition-all"
                >
                  领取
                </button>
              ) : (
                <span className="text-[9px] font-bold text-slate-400 bg-slate-100/50 px-2 py-0.5 rounded">
                  进行中
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
