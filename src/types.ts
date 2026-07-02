export type PetType = 'dog' | 'cat' | 'hamster';

export type PetState = 'idle' | 'wandering' | 'eating' | 'drinking' | 'sleeping' | 'playing' | 'happy';

export interface PetStatus {
  hunger: number; // 0 (starving) to 100 (full)
  thirst: number; // 0 (thirsty) to 100 (hydrated)
  energy: number; // 0 (tired) to 100 (energetic)
  affection: number; // 0 to 100 (love)
}

export type FurnitureCategory = 'bed' | 'toy' | 'food_water' | 'deco' | 'wallpaper' | 'flooring';

export interface FurnitureItem {
  id: string;
  name: string;
  category: FurnitureCategory;
  price: number;
  purchased: boolean;
  isPlaced: boolean;
  x: number; // Percentage coordinate (0-100) inside the room
  y: number; // Percentage coordinate (0-100) inside the room
  color: string;
  emoji: string; // fallback or decorative representation
  scale?: number; // size multiplier
}

export interface CareLogEntry {
  id: string;
  timestamp: string; // Date string
  type: 'feed' | 'water' | 'play' | 'pet' | 'buy_furniture' | 'place_furniture' | 'level_up' | 'streak' | 'sleep';
  message: string;
}

export interface PetConfig {
  id: PetType;
  name: string;
  displayName: string;
  description: string;
  primaryColor: string;
  favoriteFood: string;
  favoriteToy: string;
}
