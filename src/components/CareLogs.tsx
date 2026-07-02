import React from 'react';
import { CareLogEntry } from '../types';
import { BookOpen, Calendar, HelpCircle, Flame, Star, Trophy } from 'lucide-react';

interface CareLogsProps {
  logs: CareLogEntry[];
  onClearLogs: () => void;
}

export const CareLogs: React.FC<CareLogsProps> = ({ logs, onClearLogs }) => {
  return (
    <div className="glass-panel p-5 rounded-3xl shadow-soft h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/40 pb-2.5 mb-4">
          <h3 className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#ff9a9e]" />
            <span>成长手账 (Care Logs)</span>
          </h3>
          {logs.length > 0 && (
            <button
              onClick={onClearLogs}
              className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition-colors bg-rose-500/10 hover:bg-rose-500/20 px-2 py-1 rounded-lg cursor-pointer"
            >
              清空记录
            </button>
          )}
        </div>

        {/* Log list container */}
        <div className="max-h-[180px] overflow-y-auto space-y-2.5 pr-1.5 scrollbar-thin">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-slate-400 select-none">
              <Calendar className="w-8 h-8 text-slate-300 mb-1.5" />
              <p className="text-xs font-bold">手账还是空的哦</p>
              <p className="text-[10px] text-slate-300 mt-1">开始给你的萌宠喂水喂食，记录美好成长轨迹吧！</p>
            </div>
          ) : (
            logs.map((log) => {
              // Icon mapping based on log action type
              const getLogIconAndStyle = () => {
                switch (log.type) {
                  case 'feed':
                    return { icon: '🍖', border: 'border-amber-100', bg: 'bg-amber-50/50' };
                  case 'water':
                    return { icon: '💧', border: 'border-blue-100', bg: 'bg-blue-50/50' };
                  case 'play':
                    return { icon: '🧸', border: 'border-teal-100', bg: 'bg-teal-50/50' };
                  case 'pet':
                    return { icon: '❤️', border: 'border-rose-100', bg: 'bg-rose-50/50' };
                  case 'buy_furniture':
                    return { icon: '🛍️', border: 'border-yellow-100', bg: 'bg-yellow-50/40' };
                  case 'place_furniture':
                    return { icon: '🏠', border: 'border-violet-100', bg: 'bg-violet-50/40' };
                  case 'level_up':
                    return { icon: '🌟', border: 'border-orange-200', bg: 'bg-orange-50' };
                  case 'streak':
                    return { icon: '🔥', border: 'border-amber-200', bg: 'bg-amber-50' };
                  case 'sleep':
                    return { icon: '🛌', border: 'border-indigo-100', bg: 'bg-indigo-50/50' };
                  default:
                    return { icon: '🗒️', border: 'border-slate-100', bg: 'bg-slate-50' };
                }
              };

              const style = getLogIconAndStyle();

              return (
                <div
                  key={log.id}
                  className={`p-2.5 rounded-xl border ${style.border} ${style.bg} flex items-start gap-2.5 transition-all hover:scale-[1.01]`}
                >
                  <span className="text-base leading-none select-none">{style.icon}</span>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-slate-700 leading-normal">{log.message}</span>
                    <span className="text-[8px] text-slate-400 font-medium mt-0.5">{log.timestamp}</span>
                  </div>
                </div>
              );
            })
          ).reverse()} {/* Show latest logs on top! */}
        </div>
      </div>

      {/* Guide Help card */}
      <div className="mt-4 p-3 bg-white/40 backdrop-blur-sm rounded-2xl border border-slate-200/50 text-[10px] text-slate-600 leading-relaxed font-medium">
        <div className="flex items-center gap-1 font-bold mb-1 text-slate-700">
          <Trophy className="w-3.5 h-3.5 text-[#ff9a9e]" />
          <span>萌宠饲养小贴士</span>
        </div>
        <ul className="list-disc pl-3 space-y-0.5">
          <li>保持饱食度与水分，它们消耗后会提醒。</li>
          <li>自由装扮模式可拖拽调整家具，双指/鼠标任意位置释放即可。</li>
          <li>召唤不同宠物，可触发特定玩具互动哦！</li>
        </ul>
      </div>
    </div>
  );
};
