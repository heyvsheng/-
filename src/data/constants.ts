import { PetConfig, FurnitureItem } from '../types';

export const AVAILABLE_PETS: PetConfig[] = [
  {
    id: 'dog',
    name: '柴柴 (Shiba)',
    displayName: '小柴犬',
    description: '一只活泼可爱的柴犬，精力充沛，超级喜欢骨头和在屋里撒欢。',
    primaryColor: '#e0a353',
    favoriteFood: '烤肉骨头',
    favoriteToy: '彩色飞盘'
  },
  {
    id: 'cat',
    name: '橘猫 (Mimi)',
    displayName: '小橘猫',
    description: '性格温顺有点小慵懒的橘猫，大部分时间在打盹，喜欢小鱼干和毛线球。',
    primaryColor: '#f7a862',
    favoriteFood: '美味金枪鱼罐头',
    favoriteToy: '七彩毛线球'
  },
  {
    id: 'hamster',
    name: '皮皮 (Hamster)',
    displayName: '小仓鼠',
    description: '体型娇小、行动敏捷的仓鼠，喜欢塞满脸颊，最爱跑轮和瓜子。',
    primaryColor: '#e0c8b0',
    favoriteFood: '香脆葵花籽',
    favoriteToy: '动感小跑轮'
  }
];

export const INITIAL_FURNITURE: FurnitureItem[] = [
  // Beds
  {
    id: 'bed_basic',
    name: '舒适爪爪宠物垫',
    category: 'bed',
    price: 150,
    purchased: false,
    isPlaced: false,
    x: 20,
    y: 75,
    color: '#ff9494',
    emoji: '🛏️',
    scale: 1.1
  },
  {
    id: 'bed_luxury',
    name: '北欧风实木宠物床',
    category: 'bed',
    price: 450,
    purchased: false,
    isPlaced: false,
    x: 15,
    y: 70,
    color: '#9c8167',
    emoji: '👑',
    scale: 1.3
  },
  // Toys
  {
    id: 'toy_cat_tree',
    name: '豪华多层猫爬架',
    category: 'deco',
    price: 380,
    purchased: false,
    isPlaced: false,
    x: 80,
    y: 50,
    color: '#d4c0ab',
    emoji: '🌳',
    scale: 1.4
  },
  {
    id: 'toy_wheel',
    name: '仓鼠欢乐大跑轮',
    category: 'toy',
    price: 180,
    purchased: false,
    isPlaced: false,
    x: 85,
    y: 70,
    color: '#6bb8ff',
    emoji: '🎡',
    scale: 1.1
  },
  {
    id: 'toy_ball',
    name: '编织彩色毛线球',
    category: 'toy',
    price: 60,
    purchased: false,
    isPlaced: false,
    x: 45,
    y: 80,
    color: '#c27fff',
    emoji: '🧶',
    scale: 0.8
  },
  // Food & Water
  {
    id: 'bowl_auto',
    name: '二合一智能自动喂食碗',
    category: 'food_water',
    price: 260,
    purchased: false,
    isPlaced: false,
    x: 55,
    y: 82,
    color: '#84cc16',
    emoji: '🍽️',
    scale: 1.0
  },
  {
    id: 'bowl_basic',
    name: '双格不锈钢食盆',
    category: 'food_water',
    price: 80,
    purchased: true, // User starts with a basic food bowl!
    isPlaced: true,
    x: 65,
    y: 82,
    color: '#cbd5e1',
    emoji: '🥣',
    scale: 0.9
  },
  // Decorations
  {
    id: 'deco_plant',
    name: '北欧风大叶绿植盆栽',
    category: 'deco',
    price: 120,
    purchased: false,
    isPlaced: false,
    x: 75,
    y: 65,
    color: '#10b981',
    emoji: '🪴',
    scale: 1.15
  },
  {
    id: 'deco_window',
    name: '温馨落日大飘窗',
    category: 'deco',
    price: 320,
    purchased: false,
    isPlaced: false,
    x: 50,
    y: 30,
    color: '#bfdbfe',
    emoji: '🪟',
    scale: 1.5
  },
  {
    id: 'deco_lamp',
    name: '复古暖光落日台灯',
    category: 'deco',
    price: 190,
    purchased: false,
    isPlaced: false,
    x: 35,
    y: 60,
    color: '#facc15',
    emoji: '💡',
    scale: 1.0
  },
  // Wallpapers (special categorization)
  {
    id: 'wall_pink',
    name: '温馨樱粉壁纸',
    category: 'wallpaper',
    price: 200,
    purchased: false,
    isPlaced: false,
    x: 0,
    y: 0,
    color: '#ffe4e6',
    emoji: '🌸'
  },
  {
    id: 'wall_blue',
    name: '静谧星空蓝壁纸',
    category: 'wallpaper',
    price: 250,
    purchased: false,
    isPlaced: false,
    x: 0,
    y: 0,
    color: '#e0f2fe',
    emoji: '🌌'
  },
  // Floorings
  {
    id: 'floor_wood',
    name: '北欧暖阳原木地板',
    category: 'flooring',
    price: 200,
    purchased: false,
    isPlaced: false,
    x: 0,
    y: 0,
    color: '#f5e1c8',
    emoji: '🪵'
  },
  {
    id: 'floor_tatami',
    name: '清新草香榻榻米',
    category: 'flooring',
    price: 280,
    purchased: false,
    isPlaced: false,
    x: 0,
    y: 0,
    color: '#ecfccb',
    emoji: '🎋'
  }
];

export const PET_THOUGHTS: Record<string, string[]> = {
  idle: [
    '今天又是元气满满的一天！',
    '唔，主人现在在看我吗？',
    '尾巴摇啊摇～',
    '在想等下吃点什么好呢？',
    '这个房间真舒服呀～'
  ],
  wandering: [
    '巡视本汪/本喵的领地！',
    '屋里藏了什么好玩的吗？',
    '散散步，锻炼身体！',
    '左晃晃，右晃晃～',
    '哇，这里有个新角落！'
  ],
  eating: [
    '嚼嚼嚼……太美味啦！',
    '干饭人，干饭魂！',
    '呼噜噜，好香的食物！',
    '呜哇！最喜欢吃这个了！'
  ],
  drinking: [
    '吨吨吨……好清凉的水！',
    '咕嘟咕嘟，解渴解渴！',
    '喝点水，保持水灵灵！'
  ],
  sleeping: [
    '呼哧……呼哧……zzz',
    '梦到好多好吃的肉肉/小鱼……',
    '好困呀，睡个美美的大觉……',
    '呼……哈……zzz'
  ],
  playing: [
    '呀哈！看我的无敌旋风扑！',
    '这个玩具太好玩啦，开心！',
    '飞跃！旋转！我是一个运动健将！',
    '快乐值正在疯狂暴涨！'
  ],
  happy: [
    '最喜欢主人摸摸啦！',
    '贴贴主人！感觉暖洋洋的！',
    '啾咪～给主人比个心！',
    '主人最棒了！爱你哟！'
  ]
};
