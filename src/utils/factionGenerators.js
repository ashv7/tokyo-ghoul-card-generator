import { GHOUL_SYSTEM, ANTEIKU_SYSTEM, AOGIRI_SYSTEM, CCG_SYSTEM } from './factionSystems'

// Fonction utilitaire pour sélectionner un élément aléatoire
const randomChoice = (array) => array[Math.floor(Math.random() * array.length)]

// Fonction utilitaire pour générer des scores
const generateScores = (skills) => {
  const scores = {}
  skills.forEach(skill => {
    scores[skill] = Math.floor(Math.random() * 6) + 1
  })
  return scores
}

// ========================================
// GÉNÉRATEUR GOULE
// ========================================

export function generateGhoulCard(userData) {
  const scores = generateScores(GHOUL_SYSTEM.skills)
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  
  // Déterminer le rang de menace
  const threatRank = GHOUL_SYSTEM.threat_ranks.find(
    r => totalScore >= r.scoreMin && totalScore <= r.scoreMax
  )
  
  // Déterminer le type de kagune basé sur le score
  let kagune
  if (totalScore >= 36) kagune = GHOUL_SYSTEM.kagune_types[6] // Kakuja Complet
  else if (totalScore >= 30) kagune = GHOUL_SYSTEM.kagune_types[5] // Kakuja
  else if (totalScore >= 25) kagune = GHOUL_SYSTEM.kagune_types[4] // Chimera
  else if (totalScore >= 20) kagune = GHOUL_SYSTEM.kagune_types[2] // Rinkaku
  else if (totalScore >= 15) kagune = randomChoice([GHOUL_SYSTEM.kagune_types[1], GHOUL_SYSTEM.kagune_types[3]]) // Koukaku ou Bikaku
  else kagune = GHOUL_SYSTEM.kagune_types[0] // Ukaku
  
  // Déterminer le type de goule
  const dominantSkills = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([skill]) => skill)
  
  let ghoulType
  if (dominantSkills.includes('Force décuplée') || dominantSkills.includes('Chasse nocturne')) {
    ghoulType = GHOUL_SYSTEM.ghoul_types[0] // Prédateur
  } else if (dominantSkills.includes('Camouflage humain') || dominantSkills.includes('Sens aiguisés')) {
    ghoulType = GHOUL_SYSTEM.ghoul_types[1] // Furtif
  } else if (dominantSkills.includes('Résistance à la douleur')) {
    ghoulType = GHOUL_SYSTEM.ghoul_types[2] // Territorial
  } else {
    ghoulType = GHOUL_SYSTEM.ghoul_types[3] // Nomade
  }
  
  // Sélectionner une capacité spéciale
  const ability = GHOUL_SYSTEM.special_abilities.find(
    a => a.kagune === kagune.type
  ) || randomChoice(GHOUL_SYSTEM.special_abilities)
  
  // Sélectionner un territoire
  const territory = randomChoice(GHOUL_SYSTEM.territories)
  
  // Sélectionner un trait de personnalité
  const personality = randomChoice(GHOUL_SYSTEM.personalities)
  
  // Sélectionner l'équipement
  const equipment = {
    mask: randomChoice(GHOUL_SYSTEM.equipment.masks),
    accessory: randomChoice(GHOUL_SYSTEM.equipment.accessories),
    supply: randomChoice(GHOUL_SYSTEM.equipment.supplies)
  }
  
  // Générer la description
  const description = `Une goule ${ghoulType.type.toLowerCase()} de type ${kagune.type}, classée ${threatRank.rank}. ` +
    `${kagune.description}. De nature ${personality.name.toLowerCase()}, ${personality.description.toLowerCase()}. ` +
    `Capacité spéciale : ${ability.name}. Territoire : ${territory.ward} (${territory.area}). ` +
    `Niveau de danger : ${territory.danger}.`
  
  return {
    ...userData,
    faction: 'ghoul',
    kagune: kagune.type,
    kagune_description: kagune.description,
    threatRank: threatRank.rank,
    threatLevel: threatRank.name,
    ghoulType: ghoulType.type,
    ghoulTypeDesc: ghoulType.description,
    ability: ability.name,
    scores,
    totalScore,
    dominantSkills,
    territory,
    personality,
    equipment,
    rarity: kagune.rarity,
    description,
    uniqueId: `GHL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }
}

// ========================================
// GÉNÉRATEUR ANTEIKU
// ========================================

export function generateAnteikuCard(userData) {
  const scores = generateScores(ANTEIKU_SYSTEM.skills)
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  
  // Déterminer le niveau d'expérience
  const experienceLevel = ANTEIKU_SYSTEM.experience_levels.find(
    l => totalScore >= l.scoreMin && totalScore <= l.scoreMax
  )
  
  // Déterminer le rôle basé sur le score
  let role
  if (totalScore >= 36) role = ANTEIKU_SYSTEM.roles[5] // Manager
  else if (totalScore >= 30) role = ANTEIKU_SYSTEM.roles[4] // Gardien
  else if (totalScore >= 25) role = ANTEIKU_SYSTEM.roles[3] // Mentor
  else if (totalScore >= 20) role = ANTEIKU_SYSTEM.roles[2] // Protecteur
  else if (totalScore >= 15) role = ANTEIKU_SYSTEM.roles[1] // Serveur
  else role = ANTEIKU_SYSTEM.roles[0] // Apprenti
  
  // Déterminer la spécialisation
  const dominantSkills = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([skill]) => skill)
  
  let specialization
  if (dominantSkills.includes('Cuisine et service') || dominantSkills.includes('Empathie humaine')) {
    specialization = ANTEIKU_SYSTEM.specializations[0] // Barista
  } else if (dominantSkills.includes('Collecte éthique') || dominantSkills.includes('Discrétion sociale')) {
    specialization = ANTEIKU_SYSTEM.specializations[1] // Collecteur
  } else if (dominantSkills.includes('Contrôle du kagune') || dominantSkills.includes('Protection des faibles')) {
    specialization = ANTEIKU_SYSTEM.specializations[2] // Protecteur
  } else {
    specialization = ANTEIKU_SYSTEM.specializations[3] // Médiateur
  }
  
  // Sélectionner une capacité
  const ability = ANTEIKU_SYSTEM.peaceful_abilities.find(
    a => a.specialization === specialization.type
  ) || randomChoice(ANTEIKU_SYSTEM.peaceful_abilities)
  
  // Sélectionner une zone d'opération
  const area = randomChoice(ANTEIKU_SYSTEM.areas)
  
  // Sélectionner un trait de personnalité
  const personality = randomChoice(ANTEIKU_SYSTEM.personalities)
  
  // Sélectionner l'équipement
  const equipment = {
    workItem: randomChoice(ANTEIKU_SYSTEM.equipment.work_items),
    protectiveGear: randomChoice(ANTEIKU_SYSTEM.equipment.protective_gear),
    supply: randomChoice(ANTEIKU_SYSTEM.equipment.supplies)
  }
  
  // Générer la description
  const description = `Membre d'Anteiku avec le rôle de ${role.role}, niveau ${experienceLevel.level}. ` +
    `Spécialisé en tant que ${specialization.type}. ${specialization.description}. ` +
    `De nature ${personality.name.toLowerCase()}, ${personality.description.toLowerCase()}. ` +
    `Capacité principale : ${ability.name}. Zone d'opération : ${area.location} (${area.ward} arrondissement).`
  
  return {
    ...userData,
    faction: 'anteiku',
    role: role.role,
    roleDescription: role.description,
    experienceLevel: experienceLevel.level,
    experienceName: experienceLevel.name,
    specialization: specialization.type,
    specializationDesc: specialization.description,
    ability: ability.name,
    scores,
    totalScore,
    dominantSkills,
    area,
    personality,
    equipment,
    rarity: role.rarity,
    description,
    uniqueId: `ANT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }
}

// ========================================
// GÉNÉRATEUR AOGIRI TREE
// ========================================

export function generateAogiriCard(userData) {
  const scores = generateScores(AOGIRI_SYSTEM.skills)
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  
  // Déterminer le niveau de puissance
  const powerLevel = AOGIRI_SYSTEM.power_levels.find(
    l => totalScore >= l.scoreMin && totalScore <= l.scoreMax
  )
  
  // Déterminer le rang basé sur le score
  let rank
  if (totalScore >= 36) rank = AOGIRI_SYSTEM.ranks[5] // Subordonné direct
  else if (totalScore >= 30) rank = AOGIRI_SYSTEM.ranks[4] // Exécutif
  else if (totalScore >= 25) rank = AOGIRI_SYSTEM.ranks[3] // Commandant
  else if (totalScore >= 20) rank = AOGIRI_SYSTEM.ranks[2] // Exécuteur
  else if (totalScore >= 15) rank = AOGIRI_SYSTEM.ranks[1] // Soldat
  else rank = AOGIRI_SYSTEM.ranks[0] // Recrue
  
  // Déterminer le rôle de combat
  const dominantSkills = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([skill]) => skill)
  
  let combatRole
  if (dominantSkills.includes('Combat brutal') || dominantSkills.includes('Résistance extrême')) {
    combatRole = AOGIRI_SYSTEM.combat_roles[0] // Assaillant
  } else if (dominantSkills.includes('Tactiques de guérilla') || dominantSkills.includes('Cruauté calculée')) {
    combatRole = AOGIRI_SYSTEM.combat_roles[1] // Assassin
  } else if (dominantSkills.includes('Coordination d\'attaque') || dominantSkills.includes('Domination territoriale')) {
    combatRole = AOGIRI_SYSTEM.combat_roles[2] // Tacticien
  } else {
    combatRole = AOGIRI_SYSTEM.combat_roles[3] // Berserker
  }
  
  // Sélectionner une technique de combat
  const technique = AOGIRI_SYSTEM.combat_techniques.find(
    t => t.role === combatRole.type
  ) || randomChoice(AOGIRI_SYSTEM.combat_techniques)
  
  // Sélectionner une base d'opération
  const base = randomChoice(AOGIRI_SYSTEM.bases)
  
  // Sélectionner un trait de personnalité
  const personality = randomChoice(AOGIRI_SYSTEM.personalities)
  
  // Sélectionner l'équipement
  const equipment = {
    combatGear: randomChoice(AOGIRI_SYSTEM.equipment.combat_gear),
    weapon: randomChoice(AOGIRI_SYSTEM.equipment.weapons),
    tactical: randomChoice(AOGIRI_SYSTEM.equipment.tactical)
  }
  
  // Générer la description
  const description = `Membre d'Aogiri Tree au rang de ${rank.rank}, niveau de puissance ${powerLevel.level}. ` +
    `Rôle de combat : ${combatRole.type}. ${combatRole.description}. ` +
    `De nature ${personality.name.toLowerCase()}, ${personality.description.toLowerCase()}. ` +
    `Technique de combat : ${technique.name}. Base d'opération : ${base.location} (${base.area}). ` +
    `Contrôle de la zone : ${base.control}.`
  
  return {
    ...userData,
    faction: 'aogiri',
    rank: rank.rank,
    rankDescription: rank.description,
    powerLevel: powerLevel.level,
    powerName: powerLevel.name,
    combatRole: combatRole.type,
    combatRoleDesc: combatRole.description,
    technique: technique.name,
    scores,
    totalScore,
    dominantSkills,
    base,
    personality,
    equipment,
    rarity: rank.rarity,
    description,
    uniqueId: `AOG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }
}

// ========================================
// GÉNÉRATEUR CCG (Original)
// ========================================

export function generateCCGCard(userData, originalGenerateCard) {
  // Utilise la fonction originale de génération CCG
  return originalGenerateCard(userData, { theme: 'ccg' })
}
