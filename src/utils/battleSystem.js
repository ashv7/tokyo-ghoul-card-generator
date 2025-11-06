// ========================================
// SYSTÈME DE BATAILLE DE CARTES
// ========================================

export const BATTLE_MODES = {
  pvp: {
    id: 'pvp',
    name: 'PvP Classé',
    description: 'Affrontez d\'autres joueurs en combat classé',
    rewards: { xp: 100, currency: 50, ranking: true }
  },
  casual: {
    id: 'casual',
    name: 'Match Amical',
    description: 'Combat sans impact sur le classement',
    rewards: { xp: 50, currency: 25, ranking: false }
  },
  ai: {
    id: 'ai',
    name: 'Entraînement IA',
    description: 'Entraînez-vous contre l\'IA',
    rewards: { xp: 30, currency: 15, ranking: false }
  },
  tournament: {
    id: 'tournament',
    name: 'Tournoi',
    description: 'Participez aux tournois hebdomadaires',
    rewards: { xp: 200, currency: 150, ranking: true, special: true }
  }
}

// Types d'actions en combat
export const BATTLE_ACTIONS = {
  ATTACK: 'attack',
  DEFEND: 'defend',
  SPECIAL: 'special',
  ITEM: 'item',
  RETREAT: 'retreat'
}

// Calcul des dégâts
export function calculateDamage(attacker, defender, action) {
  let baseDamage = 0
  
  // Récupérer les stats de l'attaquant
  const attackerStats = {
    attack: attacker.totalScore || 0,
    defense: 0,
    speed: 0
  }
  
  // Si l'attaquant a un quinque/kagune légendaire
  if (attacker.legendaryWeapon) {
    attackerStats.attack += attacker.legendaryWeapon.stats.attack * 2
    attackerStats.speed += attacker.legendaryWeapon.stats.speed
  }
  
  // Récupérer les stats du défenseur
  const defenderStats = {
    attack: 0,
    defense: defender.totalScore ? defender.totalScore * 0.5 : 0,
    speed: 0
  }
  
  if (defender.legendaryWeapon) {
    defenderStats.defense += defender.legendaryWeapon.stats.defense * 2
    defenderStats.speed += defender.legendaryWeapon.stats.speed
  }
  
  // Calcul selon l'action
  switch (action.type) {
    case BATTLE_ACTIONS.ATTACK:
      baseDamage = attackerStats.attack - (defenderStats.defense * 0.5)
      break
      
    case BATTLE_ACTIONS.SPECIAL:
      // Capacité spéciale : ignore 50% de la défense
      baseDamage = attackerStats.attack * 1.5 - (defenderStats.defense * 0.25)
      break
      
    case BATTLE_ACTIONS.DEFEND:
      baseDamage = 0 // Pas de dégâts en défense
      break
      
    default:
      baseDamage = attackerStats.attack * 0.5
  }
  
  // Bonus de rareté
  const rarityMultiplier = {
    'D': 0.8,
    'C': 0.9,
    'B': 1.0,
    'A': 1.1,
    'S': 1.2,
    'SS': 1.4,
    'SS+': 1.6
  }
  
  baseDamage *= (rarityMultiplier[attacker.rarity] || 1.0)
  
  // Bonus de type (faction)
  const typeAdvantage = calculateTypeAdvantage(attacker.faction, defender.faction)
  baseDamage *= typeAdvantage
  
  // Variation aléatoire (±10%)
  const randomFactor = 0.9 + (Math.random() * 0.2)
  baseDamage *= randomFactor
  
  // Minimum 1 de dégâts
  return Math.max(1, Math.floor(baseDamage))
}

// Avantages de type entre factions
export function calculateTypeAdvantage(attackerFaction, defenderFaction) {
  const advantages = {
    'ccg': { 'ghoul': 1.3, 'aogiri': 1.2, 'anteiku': 0.9, 'ccg': 1.0 },
    'ghoul': { 'ccg': 0.8, 'ghoul': 1.0, 'anteiku': 1.1, 'aogiri': 0.9 },
    'anteiku': { 'ccg': 1.1, 'ghoul': 0.9, 'anteiku': 1.0, 'aogiri': 0.8 },
    'aogiri': { 'ccg': 0.9, 'ghoul': 1.2, 'anteiku': 1.3, 'aogiri': 1.0 }
  }
  
  return advantages[attackerFaction]?.[defenderFaction] || 1.0
}

// Déterminer qui attaque en premier
export function determineFirstAttacker(card1, card2) {
  // Basé sur la vitesse (totalScore + bonus arme)
  let speed1 = card1.totalScore || 0
  let speed2 = card2.totalScore || 0
  
  if (card1.legendaryWeapon) {
    speed1 += card1.legendaryWeapon.stats.speed * 3
  }
  if (card2.legendaryWeapon) {
    speed2 += card2.legendaryWeapon.stats.speed * 3
  }
  
  // Si égalité, aléatoire
  if (speed1 === speed2) {
    return Math.random() > 0.5 ? 'player1' : 'player2'
  }
  
  return speed1 > speed2 ? 'player1' : 'player2'
}

// Simuler un tour de combat
export function simulateBattleTurn(attacker, defender, attackerAction, defenderAction) {
  const result = {
    attacker: { ...attacker },
    defender: { ...defender },
    log: []
  }
  
  // Déterminer l'ordre d'action
  const attackerSpeed = (attacker.totalScore || 0) + (attacker.legendaryWeapon?.stats.speed || 0) * 3
  const defenderSpeed = (defender.totalScore || 0) + (defender.legendaryWeapon?.stats.speed || 0) * 3
  
  const attackerFirst = attackerSpeed >= defenderSpeed
  
  // Actions dans l'ordre
  if (attackerFirst) {
    executeAction(result, 'attacker', attackerAction)
    if (result.defender.hp > 0) {
      executeAction(result, 'defender', defenderAction)
    }
  } else {
    executeAction(result, 'defender', defenderAction)
    if (result.attacker.hp > 0) {
      executeAction(result, 'attacker', attackerAction)
    }
  }
  
  return result
}

// Exécuter une action
function executeAction(result, actor, action) {
  const isAttacker = actor === 'attacker'
  const activeCard = isAttacker ? result.attacker : result.defender
  const targetCard = isAttacker ? result.defender : result.attacker
  
  switch (action.type) {
    case BATTLE_ACTIONS.ATTACK:
      const damage = calculateDamage(activeCard, targetCard, action)
      targetCard.hp = Math.max(0, targetCard.hp - damage)
      result.log.push({
        actor: activeCard.name,
        action: 'Attaque',
        target: targetCard.name,
        damage,
        message: `${activeCard.name} inflige ${damage} dégâts à ${targetCard.name}!`
      })
      break
      
    case BATTLE_ACTIONS.DEFEND:
      activeCard.defending = true
      result.log.push({
        actor: activeCard.name,
        action: 'Défense',
        message: `${activeCard.name} se met en position défensive!`
      })
      break
      
    case BATTLE_ACTIONS.SPECIAL:
      if (activeCard.specialUsed) {
        result.log.push({
          actor: activeCard.name,
          action: 'Spécial',
          message: `${activeCard.name} a déjà utilisé sa capacité spéciale!`
        })
      } else {
        const specialDamage = calculateDamage(activeCard, targetCard, action)
        targetCard.hp = Math.max(0, targetCard.hp - specialDamage)
        activeCard.specialUsed = true
        result.log.push({
          actor: activeCard.name,
          action: 'Capacité Spéciale',
          target: targetCard.name,
          damage: specialDamage,
          message: `${activeCard.name} utilise ${activeCard.legendaryWeapon?.specialAbility || 'sa capacité spéciale'} et inflige ${specialDamage} dégâts!`
        })
      }
      break
      
    case BATTLE_ACTIONS.RETREAT:
      result.retreated = actor
      result.log.push({
        actor: activeCard.name,
        action: 'Retraite',
        message: `${activeCard.name} bat en retraite!`
      })
      break
  }
}

// Simuler un combat complet (IA)
export function simulateFullBattle(card1, card2) {
  // Initialiser les HP (basés sur totalScore)
  const player1 = {
    ...card1,
    hp: 100 + (card1.totalScore || 0) * 2,
    maxHp: 100 + (card1.totalScore || 0) * 2,
    specialUsed: false,
    defending: false
  }
  
  const player2 = {
    ...card2,
    hp: 100 + (card2.totalScore || 0) * 2,
    maxHp: 100 + (card2.totalScore || 0) * 2,
    specialUsed: false,
    defending: false
  }
  
  const battleLog = []
  let turn = 1
  let winner = null
  
  // Maximum 20 tours
  while (turn <= 20 && player1.hp > 0 && player2.hp > 0) {
    battleLog.push({ turn, message: `--- Tour ${turn} ---` })
    
    // IA simple : attaque si HP > 50%, défense si HP < 30%, spécial si disponible et HP < 70%
    const p1Action = decideAIAction(player1, player2)
    const p2Action = decideAIAction(player2, player1)
    
    const turnResult = simulateBattleTurn(player1, player2, p1Action, p2Action)
    
    player1.hp = turnResult.attacker.hp
    player2.hp = turnResult.defender.hp
    player1.specialUsed = turnResult.attacker.specialUsed
    player2.specialUsed = turnResult.defender.specialUsed
    
    battleLog.push(...turnResult.log)
    
    if (turnResult.retreated) {
      winner = turnResult.retreated === 'attacker' ? player2 : player1
      break
    }
    
    turn++
  }
  
  // Déterminer le gagnant
  if (!winner) {
    if (player1.hp > player2.hp) {
      winner = player1
    } else if (player2.hp > player1.hp) {
      winner = player2
    } else {
      winner = Math.random() > 0.5 ? player1 : player2
    }
  }
  
  return {
    winner: winner.name === card1.name ? 'player1' : 'player2',
    player1: { ...player1, hpPercent: (player1.hp / player1.maxHp) * 100 },
    player2: { ...player2, hpPercent: (player2.hp / player2.maxHp) * 100 },
    turns: turn - 1,
    log: battleLog
  }
}

// Décision IA
function decideAIAction(card, opponent) {
  const hpPercent = (card.hp / card.maxHp) * 100
  
  // Spécial si disponible et HP < 70%
  if (!card.specialUsed && hpPercent < 70 && Math.random() > 0.3) {
    return { type: BATTLE_ACTIONS.SPECIAL }
  }
  
  // Défense si HP < 30%
  if (hpPercent < 30 && Math.random() > 0.4) {
    return { type: BATTLE_ACTIONS.DEFEND }
  }
  
  // Retraite si HP < 10%
  if (hpPercent < 10 && Math.random() > 0.7) {
    return { type: BATTLE_ACTIONS.RETREAT }
  }
  
  // Attaque par défaut
  return { type: BATTLE_ACTIONS.ATTACK }
}

// Calculer les récompenses de bataille
export function calculateBattleRewards(mode, won, playerLevel, opponentLevel) {
  const baseRewards = BATTLE_MODES[mode].rewards
  
  let xp = baseRewards.xp
  let currency = baseRewards.currency
  
  // Bonus de victoire
  if (won) {
    xp *= 2
    currency *= 2
  } else {
    xp *= 0.5
    currency *= 0.5
  }
  
  // Bonus selon la différence de niveau
  const levelDiff = opponentLevel - playerLevel
  if (levelDiff > 0) {
    xp *= (1 + levelDiff * 0.1)
    currency *= (1 + levelDiff * 0.1)
  }
  
  // Arrondir
  xp = Math.floor(xp)
  currency = Math.floor(currency)
  
  return { xp, currency, rankingPoints: won ? 25 : -10 }
}

// ========================================
// SYSTÈME DE CLASSEMENT
// ========================================

export const RANKING_TIERS = [
  { tier: 'Bronze', minPoints: 0, maxPoints: 499, color: '#cd7f32', icon: '🥉' },
  { tier: 'Argent', minPoints: 500, maxPoints: 999, color: '#c0c0c0', icon: '🥈' },
  { tier: 'Or', minPoints: 1000, maxPoints: 1499, color: '#ffd700', icon: '🥇' },
  { tier: 'Platine', minPoints: 1500, maxPoints: 1999, color: '#e5e4e2', icon: '💎' },
  { tier: 'Diamant', minPoints: 2000, maxPoints: 2999, color: '#b9f2ff', icon: '💠' },
  { tier: 'Maître', minPoints: 3000, maxPoints: 4999, color: '#9370db', icon: '👑' },
  { tier: 'Grand Maître', minPoints: 5000, maxPoints: 9999, color: '#ff1493', icon: '⭐' },
  { tier: 'Challenger', minPoints: 10000, maxPoints: Infinity, color: '#ff0000', icon: '✨' }
]

// Déterminer le tier selon les points
export function getRankingTier(points) {
  return RANKING_TIERS.find(tier => points >= tier.minPoints && points <= tier.maxPoints) || RANKING_TIERS[0]
}

// Calculer la progression dans le tier
export function getTierProgress(points) {
  const tier = getRankingTier(points)
  const tierRange = tier.maxPoints - tier.minPoints
  const progress = points - tier.minPoints
  const percentage = (progress / tierRange) * 100
  
  return {
    tier,
    points,
    progress,
    percentage: Math.min(100, percentage),
    nextTier: RANKING_TIERS[RANKING_TIERS.findIndex(t => t.tier === tier.tier) + 1] || null
  }
}

// Calculer le classement global
export function calculateGlobalRanking(players) {
  return players
    .sort((a, b) => b.rankingPoints - a.rankingPoints)
    .map((player, index) => ({
      ...player,
      rank: index + 1,
      tier: getRankingTier(player.rankingPoints)
    }))
}

// Statistiques de bataille
export function getBattleStats(userId, battles) {
  const userBattles = battles.filter(b => b.player1Id === userId || b.player2Id === userId)
  
  const wins = userBattles.filter(b => b.winnerId === userId).length
  const losses = userBattles.length - wins
  const winRate = userBattles.length > 0 ? (wins / userBattles.length) * 100 : 0
  
  return {
    totalBattles: userBattles.length,
    wins,
    losses,
    winRate: winRate.toFixed(1),
    currentStreak: calculateStreak(userBattles, userId),
    bestStreak: calculateBestStreak(userBattles, userId)
  }
}

// Calculer la série actuelle
function calculateStreak(battles, userId) {
  let streak = 0
  const sortedBattles = battles.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  for (const battle of sortedBattles) {
    if (battle.winnerId === userId) {
      streak++
    } else {
      break
    }
  }
  
  return streak
}

// Calculer la meilleure série
function calculateBestStreak(battles, userId) {
  let currentStreak = 0
  let bestStreak = 0
  
  for (const battle of battles) {
    if (battle.winnerId === userId) {
      currentStreak++
      bestStreak = Math.max(bestStreak, currentStreak)
    } else {
      currentStreak = 0
    }
  }
  
  return bestStreak
}
