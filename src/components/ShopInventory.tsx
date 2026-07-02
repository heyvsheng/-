import React, { useState } from 'react';
import { FurnitureItem, FurnitureCategory } from '../types';
import { ShoppingBag, Box, Coins, Check, Sofa, Sparkles, HelpCircle } from 'lucide-react';
import { FurnitureSvg } from './FurnitureSvg';

interface ShopInventoryProps {
  furniture: FurnitureItem[];
  coins: number;
  onBuyItem: (id: string) => void;
  onPlaceItem: (id: string) => void;
  onRecallItem: (id: string) => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

type ActiveTab = 'shop' | 'inventory';
type CategoryFilter = 'all' | FurnitureCategory;

export const ShopInventory: React.FC<ShopInventoryProps> = ({
  furniture,
  coins,
  onBuyItem,
  onPlaceItem,
  onRecallItem,
  isEditMode,
  onToggleEditMode
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inventory');
  const [filter, setFilter] = useState<CategoryFilter>('all');

  // Filter lists
  const availableShopItems = furniture.filter(f => !f.purchased);
  const purchasedBackpackItems = furniture.filter(f => f.purchased);

  const getFilteredItems = (items: FurnitureItem[]) => {
    if (filter === 'all') return items;
    return items.filter(item => item.category === filter);
  };

  const getCategoryChinese = (category: FurnitureCategory) => {
    switch (category) {
      case 'bed': return '卧具';
      case 'toy': return '玩具';
      case 'food_water': return '餐饮';
      case 'deco': return '摆件';
      case 'wallpaper': return '壁纸';
      case 'flooring': return '地板';
    }
  };

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: '全部' },
    { value: 'bed', label: '卧具' },
    { value: 'toy', label: '玩具' },
    { value: 'food_water', label: '食盆' },
    { value: 'deco', label: '饰品' },
    { value: 'wallpaper', label: '壁纸' },
    { value: 'flooring', label: '地板' }
  ];

  return (
    <div className="glass-panel p-5 rounded-3xl shadow-soft h-full flex flex-col justify-between">
      <div>
        {/* Main Tabs */}
        <div className="flex border-b border-slate-200/50 mb-5">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'inventory'
                ? 'border-[#ff9a9e] text-[#ff9a9e]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>我的背包 ({purchasedBackpackItems.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'shop'
                ? 'border-[#ff9a9e] text-[#ff9a9e]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>家具商店 ({availableShopItems.length})</span>
          </button>
        </div>

        {/* Categories filters scrollbar */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-thin select-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all border ${
                filter === cat.value
                  ? 'bg-[#ff9a9e] border-[#ff9a9e] text-white shadow-soft'
                  : 'bg-white/40 hover:bg-white/80 text-slate-500 border-slate-200/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* LISTINGS BOX */}
        <div className="max-h-[290px] overflow-y-auto pr-1">
          {activeTab === 'shop' ? (
            /* ================= SHOP LISTINGS ================= */
            getFilteredItems(availableShopItems).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-slate-400">
                <Sparkles className="w-8 h-8 text-[#ff9a9e] mb-2 animate-pulse" />
                <p className="text-xs font-bold">该品类下所有商品都已搬回小屋啦！</p>
                <p className="text-[10px] text-slate-300 mt-1">去看看其他精美装扮吧</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {getFilteredItems(availableShopItems).map((item) => {
                  const isAffordable = coins >= item.price;
                  return (
                    <div
                      key={item.id}
                      className="p-3 bg-white/50 hover:bg-white/90 rounded-2xl border border-slate-200/50 flex flex-col justify-between h-[135px] transition-all hover:shadow-soft"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <div className="flex flex-col">
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                          <span className="text-[9px] font-semibold text-slate-400 mt-0.5 bg-slate-200/50 px-1.5 py-0.5 rounded-md w-fit">
                            {getCategoryChinese(item.category)}
                          </span>
                        </div>
                        {/* Cost Tag */}
                        <div className="flex items-center gap-0.5 text-xs font-black text-amber-600">
                          <Coins className="w-3.5 h-3.5 text-yellow-500 fill-yellow-100" />
                          <span>{item.price}</span>
                        </div>
                      </div>

                      {/* Visual rendering */}
                      <div className="h-12 flex items-center justify-center my-1 select-none">
                        {item.category === 'wallpaper' || item.category === 'flooring' ? (
                          <div
                            className="w-14 h-9 rounded-lg border border-slate-300 flex items-center justify-center text-2xl shadow-sm"
                            style={{ backgroundColor: item.color }}
                          >
                            {item.emoji}
                          </div>
                        ) : (
                          <div className="w-12 h-12 flex items-center justify-center">
                            <FurnitureSvg id={item.id} category={item.category} color={item.color} className="w-full h-auto drop-shadow-sm" />
                          </div>
                        )}
                      </div>

                      {/* Purchase action */}
                      <button
                        onClick={() => onBuyItem(item.id)}
                        disabled={!isAffordable}
                        className={`w-full py-1.5 text-[10px] font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1 ${
                          isAffordable
                            ? 'bg-[#ff9a9e] hover:bg-[#ff858a] text-white cursor-pointer'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Coins className="w-3 h-3" />
                        <span>{isAffordable ? '购买' : '金币不足'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* ================= BACKPACK INVENTORY LISTINGS ================= */
            getFilteredItems(purchasedBackpackItems).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                <Box className="w-10 h-10 text-slate-300 mb-2" />
                <p className="text-xs font-bold">背包空空如也呢</p>
                <p className="text-[10px] text-slate-300 mt-1">去隔壁商店购买一些好康的装扮吧！</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {getFilteredItems(purchasedBackpackItems).map((item) => {
                  const isPlaced = item.isPlaced;
                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border flex flex-col justify-between h-[135px] transition-all ${
                        isPlaced
                          ? 'bg-[#ff9a9e]/10 border-[#ff9a9e]/30 shadow-soft'
                          : 'bg-white/50 border-slate-200/50 hover:bg-white/90 hover:shadow-soft'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                          <span className="text-[9px] font-semibold text-slate-400 mt-0.5 bg-slate-200/50 px-1.5 py-0.5 rounded-md w-fit">
                            {getCategoryChinese(item.category)}
                          </span>
                        </div>
                        {/* Placed indicator status */}
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          isPlaced
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          {isPlaced ? '摆放中' : '闲置'}
                        </span>
                      </div>

                      {/* Visual rendering */}
                      <div className="h-12 flex items-center justify-center my-1 select-none">
                        {item.category === 'wallpaper' || item.category === 'flooring' ? (
                          <div
                            className="w-14 h-9 rounded-lg border border-slate-300 flex items-center justify-center text-2xl shadow-sm"
                            style={{ backgroundColor: item.color }}
                          >
                            {item.emoji}
                          </div>
                        ) : (
                          <div className="w-12 h-12 flex items-center justify-center">
                            <FurnitureSvg id={item.id} category={item.category} color={item.color} className="w-full h-auto drop-shadow-sm" />
                          </div>
                        )}
                      </div>

                      {/* Toggle placement action */}
                      {isPlaced ? (
                        <button
                          onClick={() => onRecallItem(item.id)}
                          className="w-full py-1.5 text-[10px] font-bold rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300/80 cursor-pointer transition-all flex items-center justify-center gap-1 shadow-sm"
                        >
                          <span>收回</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onPlaceItem(item.id)}
                          className="w-full py-1.5 text-[10px] font-bold rounded-xl bg-[#ff9a9e] hover:bg-[#ff858a] text-white cursor-pointer transition-all flex items-center justify-center gap-1 shadow-sm"
                        >
                          <Check className="w-3 h-3" />
                          <span>摆放使用</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>
      </div>

      {/* FOOTER ACTION: Toggle Edit / Arrange mode */}
      <div className="mt-5 pt-4 border-t border-slate-200/40 flex items-center justify-between gap-2.5">
        <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-[#ff9a9e]" />
          <span>壁纸与地板摆放即刻生效</span>
        </div>
        <button
          onClick={onToggleEditMode}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-black shadow-soft cursor-pointer border transition-all ${
            isEditMode
              ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-900'
              : 'bg-[#ff9a9e]/10 hover:bg-[#ff9a9e]/20 text-[#ff9a9e] border-[#ff9a9e]/20'
          }`}
        >
          <Sofa className="w-3.5 h-3.5" />
          <span>{isEditMode ? '结束布置 (保存)' : '自由装扮屋子'}</span>
        </button>
      </div>
    </div>
  );
};
