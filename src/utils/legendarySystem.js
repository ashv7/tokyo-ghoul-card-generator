// ========================================
// QUINQUES LÉGENDAIRES
// ========================================

export const LEGENDARY_QUINQUES = {
  // Quinques SS+ (Mythiques)
  mythic: [
    {
      id: 'owl',
      name: 'IXA',
      type: 'Koukaku',
      rarity: 'SS+',
      description: 'Quinque légendaire de Kishou Arima. Bouclier et lance combinés.',
      stats: { attack: 10, defense: 10, speed: 8 },
      specialAbility: 'Forme Lance - Perce toute défense',
      origin: 'Yoshimura (Hibou Non-Tueur)',
      unlockLevel: 30,
      unlockCost: 5000
    },
    {
      id: 'narukami',
      name: 'Narukami',
      type: 'Ukaku',
      rarity: 'SS+',
      description: 'Quinque électrique d\'Arima. Projectiles foudroyants.',
      stats: { attack: 10, defense: 6, speed: 10 },
      specialAbility: 'Éclair Divin - Attaque électrique dévastatrice',
      origin: 'Lantern (Goule Ukaku)',
      unlockLevel: 30,
      unlockCost: 5000
    },
    {
      id: 'arata',
      name: 'Arata',
      type: 'Koukaku (Armure)',
      rarity: 'SS+',
      description: 'Armure quinque complète. Protection maximale.',
      stats: { attack: 6, defense: 10, speed: 5 },
      specialAbility: 'Forteresse Vivante - Régénération et défense absolue',
      origin: 'Arata Kirishima',
      unlockLevel: 25,
      unlockCost: 4000
    },
    {
      id: 'jason',
      name: '13\'s Jason',
      type: 'Rinkaku',
      rarity: 'SS+',
      description: 'Quinque de Juuzou Suzuya. Faux géante.',
      stats: { attack: 10, defense: 7, speed: 9 },
      specialAbility: 'Danse Macabre - Attaques multiples imprévisibles',
      origin: 'Yakumo Oomori (Jason)',
      unlockLevel: 20,
      unlockCost: 3500
    }
  ],

  // Quinques SS (Légendaires)
  legendary: [
    {
      id: 'yukimura',
      name: 'Yukimura 1/3',
      type: 'Koukaku',
      rarity: 'SS',
      description: 'Quinque de Yukinori Shinohara. Épée lourde.',
      stats: { attack: 9, defense: 8, speed: 6 },
      specialAbility: 'Frappe Titanesque - Dégâts massifs',
      origin: 'Yoshimura',
      unlockLevel: 15,
      unlockCost: 2500
    },
    {
      id: 'doujima',
      name: 'Doujima 1/2',
      type: 'Rinkaku',
      rarity: 'SS',
      description: 'Quinque de Koutarou Amon. Épée massive.',
      stats: { attack: 9, defense: 7, speed: 7 },
      specialAbility: 'Lame Dévorante - Absorbe l\'énergie ennemie',
      origin: 'Donato Porpora',
      unlockLevel: 15,
      unlockCost: 2500
    },
    {
      id: 'ginkui',
      name: 'Ginkui',
      type: 'Bikaku',
      rarity: 'SS',
      description: 'Quinque de Hairu Ihei. Fouet électrique.',
      stats: { attack: 8, defense: 7, speed: 9 },
      specialAbility: 'Fouet Argenté - Portée et vitesse extrêmes',
      origin: 'Nutcracker',
      unlockLevel: 12,
      unlockCost: 2000
    },
    {
      id: 'higher_mind',
      name: 'Higher Mind',
      type: 'Ukaku',
      rarity: 'SS',
      description: 'Quinque de Mougan Tanakamaru. Canon lourd.',
      stats: { attack: 10, defense: 5, speed: 6 },
      specialAbility: 'Tir Dévastateur - Destruction de zone',
      origin: 'Goule Ukaku inconnue',
      unlockLevel: 12,
      unlockCost: 2000
    }
  ],

  // Quinques S (Rares)
  rare: [
    {
      id: 'quinque_13',
      name: 'Scorpion 1/56',
      type: 'Bikaku',
      rarity: 'S',
      description: 'Quinque de Juuzou. Couteaux multiples.',
      stats: { attack: 8, defense: 6, speed: 9 },
      specialAbility: 'Pluie de Lames - Attaques rapides multiples',
      origin: 'Big Madam',
      unlockLevel: 10,
      unlockCost: 1500
    },
    {
      id: 'tsunagi',
      name: 'Tsunagi',
      type: 'Koukaku',
      rarity: 'S',
      description: 'Quinque défensif standard amélioré.',
      stats: { attack: 7, defense: 9, speed: 6 },
      specialAbility: 'Mur Impénétrable - Défense renforcée',
      origin: 'Goule Koukaku',
      unlockLevel: 8,
      unlockCost: 1000
    },
    {
      id: 't_human',
      name: 'T-Human',
      type: 'Rinkaku',
      rarity: 'S',
      description: 'Quinque de Koutarou Amon (ancien).',
      stats: { attack: 8, defense: 7, speed: 7 },
      specialAbility: 'Équilibre Parfait - Stats équilibrées',
      origin: 'Goule Rinkaku',
      unlockLevel: 8,
      unlockCost: 1000
    }
  ]
}

// ========================================
// KAGUNE LÉGENDAIRES (pour Goules)
// ========================================

export const LEGENDARY_KAGUNE = {
  mythic: [
    {
      id: 'one_eyed_owl',
      name: 'Kagune du Hibou Borgne',
      type: 'Ukaku Kakuja',
      rarity: 'SS+',
      description: 'Kakuja complet d\'Eto. Forme monstrueuse.',
      stats: { attack: 10, defense: 9, speed: 10 },
      specialAbility: 'Tempête de Cristaux - Projectiles RC massifs',
      unlockLevel: 30,
      unlockCost: 5000
    },
    {
      id: 'centipede',
      name: 'Kagune Centipède',
      type: 'Rinkaku Kakuja',
      rarity: 'SS+',
      description: 'Kakuja de Kaneki. Centaines de tentacules.',
      stats: { attack: 10, defense: 8, speed: 9 },
      specialAbility: 'Centipède Noir - Régénération et force extrême',
      unlockLevel: 25,
      unlockCost: 4000
    },
    {
      id: 'black_reaper',
      name: 'Kagune du Faucheur Noir',
      type: 'Rinkaku',
      rarity: 'SS+',
      description: 'Forme contrôlée de Kaneki. Puissance pure.',
      stats: { attack: 10, defense: 7, speed: 10 },
      specialAbility: 'Faux de la Mort - Vitesse et précision absolues',
      unlockLevel: 30,
      unlockCost: 5000
    }
  ],

  legendary: [
    {
      id: 'black_rabbit',
      name: 'Kagune du Lapin Noir',
      type: 'Ukaku',
      rarity: 'SS',
      description: 'Kagune d\'Ayato. Projectiles cristallins.',
      stats: { attack: 9, defense: 6, speed: 10 },
      specialAbility: 'Pluie de Cristaux - Tir rapide',
      unlockLevel: 15,
      unlockCost: 2500
    },
    {
      id: 'jason_kagune',
      name: 'Kagune de Jason',
      type: 'Rinkaku',
      rarity: 'SS',
      description: 'Kagune brutal de Yamori.',
      stats: { attack: 10, defense: 7, speed: 6 },
      specialAbility: 'Torture - Dégâts continus',
      unlockLevel: 15,
      unlockCost: 2500
    },
    {
      id: 'noro_kagune',
      name: 'Kagune de Noro',
      type: 'Bikaku Kakuja',
      rarity: 'SS',
      description: 'Kagune régénératif immortel.',
      stats: { attack: 8, defense: 10, speed: 5 },
      specialAbility: 'Immortalité - Régénération instantanée',
      unlockLevel: 12,
      unlockCost: 2000
    }
  ]
}

// ========================================
// PERSONNALISATION AVANCÉE
// ========================================

export const CUSTOMIZATION_OPTIONS = {
  // Arrière-plans
  backgrounds: [
    {
      id: 'default',
      name: 'Défaut',
      description: 'Dégradé standard',
      unlockLevel: 1,
      cost: 0
    },
    {
      id: 'tokyo_night',
      name: 'Tokyo de Nuit',
      description: 'Ville illuminée',
      gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      unlockLevel: 5,
      cost: 500
    },
    {
      id: 'blood_moon',
      name: 'Lune de Sang',
      description: 'Ciel rouge sombre',
      gradient: 'linear-gradient(135deg, #2c0000 0%, #8b0000 50%, #4a0000 100%)',
      unlockLevel: 10,
      cost: 1000
    },
    {
      id: 'ccg_facility',
      name: 'Laboratoire CCG',
      description: 'Intérieur high-tech',
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      unlockLevel: 15,
      cost: 1500
    },
    {
      id: 'anteiku_warmth',
      name: 'Chaleur d\'Anteiku',
      description: 'Ambiance café',
      gradient: 'linear-gradient(135deg, #3e2723 0%, #5d4037 50%, #6d4c41 100%)',
      unlockLevel: 15,
      cost: 1500
    },
    {
      id: 'aogiri_darkness',
      name: 'Ténèbres Aogiri',
      description: 'Obscurité menaçante',
      gradient: 'linear-gradient(135deg, #1a0033 0%, #2d0052 50%, #4b0082 100%)',
      unlockLevel: 20,
      cost: 2000
    },
    {
      id: 'legendary_aura',
      name: 'Aura Légendaire',
      description: 'Effet lumineux doré',
      gradient: 'linear-gradient(135deg, #1a1a1a 0%, #ffd700 50%, #1a1a1a 100%)',
      animated: true,
      unlockLevel: 30,
      cost: 5000
    }
  ],

  // Polices
  fonts: [
    {
      id: 'default',
      name: 'Défaut',
      fontFamily: 'system-ui',
      unlockLevel: 1,
      cost: 0
    },
    {
      id: 'gothic',
      name: 'Gothic',
      fontFamily: '"Cinzel", serif',
      unlockLevel: 5,
      cost: 300
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      fontFamily: '"Orbitron", sans-serif',
      unlockLevel: 10,
      cost: 500
    },
    {
      id: 'japanese',
      name: 'Japonais',
      fontFamily: '"Noto Sans JP", sans-serif',
      unlockLevel: 15,
      cost: 800
    },
    {
      id: 'horror',
      name: 'Horreur',
      fontFamily: '"Creepster", cursive',
      unlockLevel: 20,
      cost: 1000
    }
  ],

  // Effets de bordure
  borders: [
    {
      id: 'default',
      name: 'Standard',
      style: 'solid',
      width: 2,
      unlockLevel: 1,
      cost: 0
    },
    {
      id: 'glow',
      name: 'Lueur',
      style: 'solid',
      width: 2,
      glow: true,
      unlockLevel: 5,
      cost: 400
    },
    {
      id: 'double',
      name: 'Double',
      style: 'double',
      width: 4,
      unlockLevel: 10,
      cost: 600
    },
    {
      id: 'animated',
      name: 'Animé',
      style: 'solid',
      width: 3,
      animated: true,
      unlockLevel: 20,
      cost: 1500
    },
    {
      id: 'legendary',
      name: 'Légendaire',
      style: 'solid',
      width: 4,
      glow: true,
      animated: true,
      unlockLevel: 30,
      cost: 3000
    }
  ],

  // Effets de rareté
  rarityEffects: [
    {
      id: 'default',
      name: 'Standard',
      effect: 'none',
      unlockLevel: 1,
      cost: 0
    },
    {
      id: 'sparkle',
      name: 'Étincelles',
      effect: 'sparkle',
      unlockLevel: 10,
      cost: 800
    },
    {
      id: 'holographic',
      name: 'Holographique',
      effect: 'holographic',
      unlockLevel: 15,
      cost: 1200
    },
    {
      id: 'flames',
      name: 'Flammes',
      effect: 'flames',
      unlockLevel: 20,
      cost: 1800
    },
    {
      id: 'divine',
      name: 'Divin',
      effect: 'divine',
      unlockLevel: 30,
      cost: 3500
    }
  ],

  // Cadres spéciaux
  frames: [
    {
      id: 'none',
      name: 'Aucun',
      unlockLevel: 1,
      cost: 0
    },
    {
      id: 'bronze',
      name: 'Bronze',
      color: '#cd7f32',
      unlockLevel: 5,
      cost: 300
    },
    {
      id: 'silver',
      name: 'Argent',
      color: '#c0c0c0',
      unlockLevel: 10,
      cost: 600
    },
    {
      id: 'gold',
      name: 'Or',
      color: '#ffd700',
      unlockLevel: 15,
      cost: 1000
    },
    {
      id: 'platinum',
      name: 'Platine',
      color: '#e5e4e2',
      unlockLevel: 20,
      cost: 1500
    },
    {
      id: 'diamond',
      name: 'Diamant',
      color: '#b9f2ff',
      animated: true,
      unlockLevel: 30,
      cost: 3000
    }
  ]
}

// Vérifier si un élément est débloqué
export function isUnlocked(item, userLevel, userCurrency) {
  const levelUnlocked = userLevel >= item.unlockLevel
  const canAfford = userCurrency >= item.cost
  return { levelUnlocked, canAfford, unlocked: levelUnlocked && canAfford }
}

// Acheter un élément de personnalisation
export function purchaseCustomization(item, userCurrency) {
  if (userCurrency >= item.cost) {
    return {
      success: true,
      newCurrency: userCurrency - item.cost,
      item
    }
  }
  return {
    success: false,
    message: 'Monnaie insuffisante'
  }
}
