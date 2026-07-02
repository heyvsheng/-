import React, { useState } from 'react';
import { PetStatus as IPetStatus, PetType } from '../types';
import { Heart, Utensils, Droplet, Zap, Award, Coins, Flame, Edit2, Check } from 'lucide-react';

interface PetStatusProps {
  name: string;
  type: PetType;
  status: IPetStatus;
  coins: number;
  streak: number;
  level: number;
  xp: number;
  xpNeeded: number;
  onRename: (newName: string) => void;
}

export const PetStatus: React.FC<PetStatusProps> = ({
  name,
  type,
  status,
  coins,
  streak,
  level,
  xp,
  xpNeeded,
  onRename
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(name);

  const getPetBreedChinese = () => {
    if (type === 'dog') return '柴犬';
    if (type === 'cat') return '橘猫';
    return '仓鼠';
  };

  const getPetTypeBadgeColor = () => {
    if (type === 'dog') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (type === 'cat') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-stone-100 text-stone-700 border-stone-200';
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      onRename(tempName.trim());
      setIsEditingName(false);
    }
  };

  // Status helper configuration
  const statsConfig = [
    {
      key: 'hunger',
      label: '饱食度',
      value: status.hunger,
      icon: <Utensils className="w-4 h-4 text-amber-500" />,
      color: 'bg-amber-500',
      trackColor: 'bg-amber-100',
      description: status.hunger < 30 ? '饿瘪啦，求喂食！' : status.hunger > 85 ? '肚子鼓鼓哒' : '饱食状态'
    },
    {
      key: 'thirst',
      label: '水分值',
      value: status.thirst,
      icon: <Droplet className="w-4 h-4 text-blue-500" />,
      color: 'bg-blue-500',
      trackColor: 'bg-blue-100',
      description: status.thirst < 30 ? '快渴冒烟了，求喝水！' : status.thirst > 85 ? '水灵灵哒' : '水分充足'
    },
    {
      key: 'energy',
      label: '精力值',
      value: status.energy,
      icon: <Zap className="w-4 h-4 text-violet-500" />,
      color: 'bg-violet-500',
      trackColor: 'bg-violet-100',
      description: status.energy < 25 ? '好困啊，想去被窝睡觉' : status.energy > 80 ? '活力四射！' : '体力适中'
    },
    {
      key: 'affection',
      label: '亲密度',
      value: status.affection,
      icon: <Heart className="w-4 h-4 text-rose-500" />,
      color: 'bg-rose-500',
      trackColor: 'bg-rose-100',
      description: status.affection < 40 ? '主人多摸摸我嘛' : status.affection > 85 ? '最爱主人了！❤' : '贴贴中'
    }
  ];

  return (
    <div className="glass-panel p-5 rounded-3xl shadow-soft">
      {/* Name, Breed, and Level Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value.slice(0, 10))}
                className="px-2.5 py-1 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#ff9a9e] w-28 font-medium"
                maxLength={10}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              />
              <button
                onClick={handleSaveName}
                className="p-1.5 bg-[#ff9a9e] text-white rounded-xl hover:bg-[#ff858a] shadow-sm transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 group">
              <h2 className="text-xl font-black text-slate-800 tracking-tight">{name}</h2>
              <button
                onClick={() => {
                  setTempName(name);
                  setIsEditingName(true);
                }}
                className="p-1 text-slate-400 hover:text-[#ff9a9e] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                title="重命名宠物"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getPetTypeBadgeColor()}`}>
            {getPetBreedChinese()}
          </span>
        </div>

        {/* Level display */}
        <div className="flex items-center gap-1 bg-[#ff9a9e]/10 text-[#ff9a9e] px-3 py-1 rounded-full text-xs font-bold border border-[#ff9a9e]/20">
          <Award className="w-3.5 h-3.5" />
          <span>LV.{level} 萌宠达人</span>
        </div>
      </div>

      {/* Level XP Progress Bar */}
      <div className="mb-5 bg-white/70 border border-slate-200/50 p-2.5 rounded-2xl">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1 px-1">
          <span>成长进度 XP</span>
          <span>{xp} / {xpNeeded}</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ff9a9e] to-[#ffb3b7] rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (xp / xpNeeded) * 100)}%` }}
          />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {statsConfig.map((stat) => (
          <div key={stat.key} className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/50 shadow-soft flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                {stat.icon}
                <span>{stat.label}</span>
              </div>
              <span className="text-xs font-bold text-slate-700">{stat.value}%</span>
            </div>
            
            {/* Health Bar */}
            <div className={`w-full h-2.5 ${stat.trackColor} rounded-full overflow-hidden mb-1.5`}>
              <div
                className={`h-full ${stat.color} rounded-full transition-all duration-500`}
                style={{ width: `${stat.value}%` }}
              />
            </div>

            {/* Hint message */}
            <span className="text-[10px] text-slate-400 font-medium truncate">
              {stat.description}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom stats: Coins & Daily Care Streak */}
      <div className="mt-4 pt-3.5 border-t border-slate-200/40 flex items-center justify-between">
        {/* Coins indicator */}
        <div className="flex items-center gap-1.5 bg-amber-500/5 px-3 py-1.5 rounded-xl border border-amber-500/10 shadow-sm">
          <div className="w-5 h-5 bg-amber-400 text-amber-950 rounded-full flex items-center justify-center font-black shadow-sm text-xs animate-bounce">
            <Coins className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-amber-600 font-extrabold leading-none">宠币余额</span>
            <span className="text-sm font-black text-amber-700 mt-0.5">{coins}</span>
          </div>
        </div>

        {/* Daily Streak Indicator */}
        <div className="flex items-center gap-1.5 bg-[#ff9a9e]/5 px-3 py-1.5 rounded-xl border border-[#ff9a9e]/10 shadow-sm">
          <Flame className="w-4 h-4 text-[#ff9a9e] fill-rose-50/50 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[9px] text-[#ff9a9e] font-extrabold leading-none">连续喂养</span>
            <span className="text-sm font-black text-[#ff9a9e] mt-0.5">{streak} 天</span>
          </div>
        </div>
      </div>
    </div>
  );
};
