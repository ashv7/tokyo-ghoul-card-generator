// ========================================
// SYSTÈME D'EXPÉRIENCE ET PROGRESSION
// ========================================

export const EXPERIENCE_SYSTEM = {
  // Niveaux et XP requis
  levels: [
    { level: 1, xpRequired: 0, title: 'Débutant', bonus: {} },
    { level: 2, xpRequired: 100, title: 'Novice', bonus: { statsBoost: 1 } },
    { level: 3, xpRequired: 250, title: 'Apprenti', bonus: { statsBoost: 1 } },
    { level: 4, xpRequired: 500, title: 'Initié', bonus: { statsBoost: 2 } },
    { level: 5, xpRequired: 850, title: 'Confirmé', bonus: { statsBoost: 2, unlockCustomization: true } },
    { level: 10, xpRequired: 1500, title: 'Expérimenté', bonus: { statsBoost: 3, unlockLegendary: true } },
    { level: 15, xpRequired: 2500, title: 'Vétéran', bonus: { statsBoost: 4 } },
    { level: 20, xpRequired: 4000, title: 'Expert', bonus: { statsBoost: 5, unlockMythic: true } },
    { level: 25, xpRequired: 6000, title: 'Maître', bonus: { statsBoost: 6 } },
    { level: 30, xpRequired: 9000, title: 'Légende', bonus: { statsBoost: 8, unlockAll: true } },
    { level: 40, xpRequired: 15000, title: 'Mythe', bonus: { statsBoost: 10 } },
    { level: 50, xpRequired: 25000, title: 'Divin', bonus: { statsBoost: 15, godMode: true } }
  ],

  // Sources d'XP
  xpSources: {
    cardGeneration: 10,
    cardSave: 25,
    dailyLogin: 50,
    missionComplete: 100,
    achievementUnlock: 150,
    collectionMilestone: 200,
    rarePull: 50,
    legendaryPull: 150,
    shareCard: 15,
    exportCard: 10
  }
}

// Calculer le niveau basé sur l'XP
export function calculateLevel(totalXp) {
  let currentLevel = 1
  let levelData = EXPERIENCE_SYSTEM.levels[0]
  
  for (const level of EXPERIENCE_SYSTEM.levels) {
    if (totalXp >= level.xpRequired) {
      currentLevel = level.level
      levelData = level
    } else {
      break
    }
  }
  
  // Calculer l'XP pour le prochain niveau
  const nextLevelIndex = EXPERIENCE_SYSTEM.levels.findIndex(l => l.level === currentLevel + 1)
  const nextLevel = nextLevelIndex !== -1 ? EXPERIENCE_SYSTEM.levels[nextLevelIndex] : null
  
  const xpForCurrentLevel = levelData.xpRequired
  const xpForNextLevel = nextLevel ? nextLevel.xpRequired : xpForCurrentLevel
  const xpProgress = totalXp - xpForCurrentLevel
  const xpNeeded = xpForNextLevel - xpForCurrentLevel
  const progressPercent = nextLevel ? (xpProgress / xpNeeded) * 100 : 100
  
  return {
    level: currentLevel,
    title: levelData.title,
    totalXp,
    xpForCurrentLevel,
    xpForNextLevel,
    xpProgress,
    xpNeeded,
    progressPercent,
    bonus: levelData.bonus,
    nextLevel: nextLevel ? nextLevel.level : null
  }
}

// Ajouter de l'XP
export function addExperience(currentXp, source) {
  const xpGained = EXPERIENCE_SYSTEM.xpSources[source] || 0
  const newXp = currentXp + xpGained
  
  const oldLevel = calculateLevel(currentXp)
  const newLevel = calculateLevel(newXp)
  
  const leveledUp = newLevel.level > oldLevel.level
  
  return {
    xpGained,
    newXp,
    oldLevel: oldLevel.level,
    newLevel: newLevel.level,
    leveledUp,
    levelData: newLevel
  }
}

// ========================================
// SYSTÈME DE MISSIONS
// ========================================

export const MISSIONS = {
  daily: [
    {
      id: 'daily_generate_1',
      name: 'Premier pas',
      description: 'Générer 1 carte',
      requirement: { type: 'generate', count: 1 },
      reward: { xp: 50, currency: 10 },
      repeatable: true
    },
    {
      id: 'daily_generate_3',
      name: 'Collectionneur du jour',
      description: 'Générer 3 cartes',
      requirement: { type: 'generate', count: 3 },
      reward: { xp: 100, currency: 25 },
      repeatable: true
    },
    {
      id: 'daily_save_2',
      name: 'Archiviste',
      description: 'Sauvegarder 2 cartes',
      requirement: { type: 'save', count: 2 },
      reward: { xp: 75, currency: 15 },
      repeatable: true
    },
    {
      id: 'daily_share_1',
      name: 'Ambassadeur',
      description: 'Partager 1 carte',
      requirement: { type: 'share', count: 1 },
      reward: { xp: 50, currency: 10 },
      repeatable: true
    }
  ],

  weekly: [
    {
      id: 'weekly_generate_20',
      name: 'Producteur hebdomadaire',
      description: 'Générer 20 cartes cette semaine',
      requirement: { type: 'generate', count: 20 },
      reward: { xp: 500, currency: 100 },
      repeatable: true
    },
    {
      id: 'weekly_rare_5',
      name: 'Chasseur de rares',
      description: 'Obtenir 5 cartes rares (S+)',
      requirement: { type: 'rarity', rarity: 'S', count: 5 },
      reward: { xp: 750, currency: 150 },
      repeatable: true
    },
    {
      id: 'weekly_all_factions',
      name: 'Diplomate',
      description: 'Créer au moins 1 carte de chaque faction',
      requirement: { type: 'factions', count: 4 },
      reward: { xp: 600, currency: 120 },
      repeatable: true
    }
  ],

  achievements: [
    {
      id: 'first_card',
      name: 'Première carte',
      description: 'Générer votre première carte',
      requirement: { type: 'generate', count: 1 },
      reward: { xp: 100, currency: 50, badge: 'first_card' },
      repeatable: false
    },
    {
      id: 'collector_10',
      name: 'Petit collectionneur',
      description: 'Sauvegarder 10 cartes',
      requirement: { type: 'save', count: 10 },
      reward: { xp: 200, currency: 100, badge: 'collector_bronze' },
      repeatable: false
    },
    {
      id: 'collector_50',
      name: 'Grand collectionneur',
      description: 'Sauvegarder 50 cartes',
      requirement: { type: 'save', count: 50 },
      reward: { xp: 500, currency: 250, badge: 'collector_silver' },
      repeatable: false
    },
    {
      id: 'collector_100',
      name: 'Collectionneur légendaire',
      description: 'Sauvegarder 100 cartes',
      requirement: { type: 'save', count: 100 },
      reward: { xp: 1000, currency: 500, badge: 'collector_gold' },
      repeatable: false
    },
    {
      id: 'legendary_pull',
      name: 'Coup de chance',
      description: 'Obtenir une carte SS+',
      requirement: { type: 'rarity', rarity: 'SS+', count: 1 },
      reward: { xp: 300, currency: 150, badge: 'lucky' },
      repeatable: false
    },
    {
      id: 'all_factions_master',
      name: 'Maître des factions',
      description: 'Obtenir au moins 10 cartes de chaque faction',
      requirement: { type: 'factions_complete', count: 10 },
      reward: { xp: 1500, currency: 750, badge: 'faction_master' },
      repeatable: false
    },
    {
      id: 'level_10',
      name: 'Vétéran',
      description: 'Atteindre le niveau 10',
      requirement: { type: 'level', level: 10 },
      reward: { xp: 500, currency: 250, badge: 'veteran' },
      repeatable: false
    },
    {
      id: 'level_25',
      name: 'Maître',
      description: 'Atteindre le niveau 25',
      requirement: { type: 'level', level: 25 },
      reward: { xp: 1000, currency: 500, badge: 'master' },
      repeatable: false
    },
    {
      id: 'level_50',
      name: 'Divin',
      description: 'Atteindre le niveau 50',
      requirement: { type: 'level', level: 50 },
      reward: { xp: 2500, currency: 1000, badge: 'divine' },
      repeatable: false
    }
  ]
}

// Vérifier la progression d'une mission
export function checkMissionProgress(mission, userStats) {
  const { requirement } = mission
  let progress = 0
  let completed = false
  
  switch (requirement.type) {
    case 'generate':
      progress = userStats.cardsGenerated || 0
      completed = progress >= requirement.count
      break
    
    case 'save':
      progress = userStats.cardsSaved || 0
      completed = progress >= requirement.count
      break
    
    case 'share':
      progress = userStats.cardsShared || 0
      completed = progress >= requirement.count
      break
    
    case 'rarity':
      progress = userStats.rarityPulls?.[requirement.rarity] || 0
      completed = progress >= requirement.count
      break
    
    case 'factions':
      const factionCount = Object.keys(userStats.factionCards || {}).length
      progress = factionCount
      completed = progress >= requirement.count
      break
    
    case 'factions_complete':
      const allFactions = ['ccg', 'ghoul', 'anteiku', 'aogiri']
      const completedFactions = allFactions.filter(
        faction => (userStats.factionCards?.[faction] || 0) >= requirement.count
      )
      progress = completedFactions.length
      completed = progress >= 4
      break
    
    case 'level':
      progress = userStats.level || 1
      completed = progress >= requirement.level
      break
    
    default:
      break
  }
  
  return {
    progress,
    required: requirement.count || requirement.level,
    completed,
    percentage: requirement.count ? (progress / requirement.count) * 100 : (completed ? 100 : 0)
  }
}

// Réclamer une récompense de mission
export function claimMissionReward(mission, currentXp, currentCurrency) {
  const { reward } = mission
  
  const xpResult = addExperience(currentXp, 'missionComplete')
  const newCurrency = currentCurrency + (reward.currency || 0)
  
  return {
    xp: xpResult,
    currency: newCurrency,
    badge: reward.badge || null,
    totalXpGained: (reward.xp || 0) + xpResult.xpGained,
    currencyGained: reward.currency || 0
  }
}

// ========================================
// SYSTÈME DE BADGES
// ========================================

export const BADGES = {
  first_card: {
    id: 'first_card',
    name: 'Première Carte',
    description: 'A généré sa première carte',
    icon: '🎴',
    rarity: 'common'
  },
  collector_bronze: {
    id: 'collector_bronze',
    name: 'Collectionneur Bronze',
    description: '10 cartes sauvegardées',
    icon: '🥉',
    rarity: 'common'
  },
  collector_silver: {
    id: 'collector_silver',
    name: 'Collectionneur Argent',
    description: '50 cartes sauvegardées',
    icon: '🥈',
    rarity: 'rare'
  },
  collector_gold: {
    id: 'collector_gold',
    name: 'Collectionneur Or',
    description: '100 cartes sauvegardées',
    icon: '🥇',
    rarity: 'legendary'
  },
  lucky: {
    id: 'lucky',
    name: 'Chanceux',
    description: 'A obtenu une carte SS+',
    icon: '🍀',
    rarity: 'rare'
  },
  faction_master: {
    id: 'faction_master',
    name: 'Maître des Factions',
    description: '10+ cartes de chaque faction',
    icon: '👑',
    rarity: 'legendary'
  },
  veteran: {
    id: 'veteran',
    name: 'Vétéran',
    description: 'Niveau 10 atteint',
    icon: '⭐',
    rarity: 'rare'
  },
  master: {
    id: 'master',
    name: 'Maître',
    description: 'Niveau 25 atteint',
    icon: '💫',
    rarity: 'legendary'
  },
  divine: {
    id: 'divine',
    name: 'Divin',
    description: 'Niveau 50 atteint',
    icon: '✨',
    rarity: 'mythic'
  }
}
