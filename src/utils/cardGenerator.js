// Compétences disponibles
export const SKILLS = [
  'Force surhumaine',
  'Régénération rapide',
  'Analyse tactique',
  'Discrétion',
  'Résistance mentale',
  'Adaptabilité',
  'Détection des goules',
  'Prédateur nocturne',
]

// Armes et leurs propriétés associées
export const WEAPONS = [
  {
    name: 'Couteau de CCG',
    properties: ['Discrétion', 'Maniabilité'],
    skills: ['Discrétion', 'Adaptabilité'],
  },
  {
    name: 'Rinkaku Quinque',
    properties: ['Force', 'Régénération'],
    skills: ['Force surhumaine', 'Régénération rapide'],
  },
  {
    name: 'Fusil anti-goule',
    properties: ['Analyse', 'Portée', 'Dissuasion'],
    skills: ['Analyse tactique', 'Détection des goules'],
  },
  {
    name: 'Fléau électrique',
    properties: ['Adaptabilité', 'Résistance'],
    skills: ['Adaptabilité', 'Résistance mentale'],
  },
  {
    name: 'Armure tactique',
    properties: ['Résistance', 'Prédation'],
    skills: ['Résistance mentale', 'Prédateur nocturne'],
  },
]

// Thèmes de cartes disponibles
export const CARD_THEMES = [
  {
    id: 'ccg',
    name: 'CCG Classique',
    colors: { primary: '#c41e3a', secondary: '#2c5f8d', background: '#1a1a1a' },
    style: 'Officiel et professionnel'
  },
  {
    id: 'ghoul',
    name: 'Goule',
    colors: { primary: '#8b0000', secondary: '#4a0000', background: '#0d0d0d' },
    style: 'Sombre et menaçant'
  },
  {
    id: 'anteiku',
    name: 'Anteiku',
    colors: { primary: '#8b4513', secondary: '#d2691e', background: '#2c1810' },
    style: 'Chaleureux et accueillant'
  },
  {
    id: 'aogiri',
    name: 'Aogiri Tree',
    colors: { primary: '#4b0082', secondary: '#8b008b', background: '#1a0033' },
    style: 'Mystérieux et dangereux'
  }
]

// Traits de personnalité
export const PERSONALITY_TRAITS = [
  { name: 'Impulsif', description: 'Agit rapidement sans réfléchir' },
  { name: 'Calculateur', description: 'Analyse chaque situation' },
  { name: 'Courageux', description: 'N\'hésite jamais face au danger' },
  { name: 'Prudent', description: 'Évalue les risques avec soin' },
  { name: 'Loyal', description: 'Fidèle à ses alliés' },
  { name: 'Ambitieux', description: 'Vise toujours plus haut' },
  { name: 'Empathique', description: 'Comprend les émotions des autres' },
  { name: 'Stoïque', description: 'Garde son sang-froid' },
  { name: 'Charismatique', description: 'Leader naturel' },
  { name: 'Solitaire', description: 'Préfère travailler seul' },
  { name: 'Protecteur', description: 'Défend les plus faibles' },
  { name: 'Vengeur', description: 'N\'oublie jamais une offense' }
]

// Équipement secondaire
export const SECONDARY_EQUIPMENT = {
  armor: [
    { name: 'Gilet pare-balles', bonus: 'Défense +2' },
    { name: 'Armure tactique renforcée', bonus: 'Défense +3, Mobilité -1' },
    { name: 'Exosquelette léger', bonus: 'Force +2, Vitesse +1' },
    { name: 'Combinaison furtive', bonus: 'Discrétion +3' }
  ],
  gadgets: [
    { name: 'Détecteur RC', bonus: 'Détection des goules +2' },
    { name: 'Sérum régénérant', bonus: 'Régénération +2' },
    { name: 'Fumigène tactique', bonus: 'Évasion +2' },
    { name: 'Analyseur de kagune', bonus: 'Analyse tactique +2' }
  ],
  communication: [
    { name: 'Radio tactique', bonus: 'Coordination +1' },
    { name: 'Écouteur crypté', bonus: 'Communication sécurisée' },
    { name: 'Caméra corporelle', bonus: 'Documentation +1' }
  ]
}

// Divisions du CCG
export const CCG_DIVISIONS = [
  { id: 1, name: '1ère Division', location: 'Tokyo - Centre' },
  { id: 2, name: '2ème Division', location: 'Tokyo - Est' },
  { id: 11, name: '11ème Division', location: 'Tokyo - Nord' },
  { id: 13, name: '13ème Division', location: 'Tokyo - Sud' },
  { id: 20, name: '20ème Division', location: 'Tokyo - Nerima' }
]

// Grades CCG selon le score total
export const CCG_RANKS = [
  { min: 8, max: 20, name: 'Inspecteur de 3ᵉ classe', rarity: 'D' },
  { min: 21, max: 26, name: 'Inspecteur de 2ᵉ classe', rarity: 'C' },
  { min: 27, max: 33, name: 'Inspecteur de 1ʳᵉ classe', rarity: 'B' },
  { min: 34, max: 37, name: 'Inspecteur de classe supérieure', rarity: 'A' },
  { min: 38, max: 41, name: 'Inspecteur spécial', rarity: 'S' },
  { min: 42, max: 46, name: 'Inspecteur spécial de classe supérieure', rarity: 'SS' },
  { min: 47, max: 999, name: 'Directeur adjoint / Directeur', rarity: 'SS+' },
]

// Générer des scores aléatoires pour les compétences (1-6 par compétence)
export function generateSkillScores() {
  const scores = {}
  SKILLS.forEach(skill => {
    scores[skill] = Math.floor(Math.random() * 6) + 1
  })
  return scores
}

// Calculer le score total
export function calculateTotalScore(scores) {
  return Object.values(scores).reduce((sum, score) => sum + score, 0)
}

// Déterminer le grade CCG
export function determineRank(totalScore) {
  const rank = CCG_RANKS.find(r => totalScore >= r.min && totalScore <= r.max)
  return rank || CCG_RANKS[0]
}

// Déterminer le type d'inspecteur
export function determineInspectorType(scores) {
  const combatSkills = [
    'Force surhumaine',
    'Régénération rapide',
    'Prédateur nocturne',
    'Résistance mentale',
  ]
  const analysisSkills = ['Analyse tactique', 'Détection des goules', 'Discrétion']

  const combatScore = combatSkills.reduce((sum, skill) => sum + (scores[skill] || 0), 0)
  const analysisScore = analysisSkills.reduce((sum, skill) => sum + (scores[skill] || 0), 0)

  return combatScore > analysisScore ? 'Terrain' : 'Bureau'
}

// Sélectionner les compétences dominantes (2-3 meilleures)
export function selectDominantSkills(scores) {
  const sortedSkills = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, Math.floor(Math.random() * 2) + 2) // 2 ou 3 compétences
    .map(([skill]) => skill)
  
  return sortedSkills
}

// Attribuer une arme selon les compétences dominantes
export function assignWeapon(dominantSkills, scores) {
  let bestWeapon = WEAPONS[0]
  let bestScore = 0

  WEAPONS.forEach(weapon => {
    let weaponScore = 0
    weapon.skills.forEach(skill => {
      if (dominantSkills.includes(skill)) {
        weaponScore += scores[skill] || 0
      }
    })

    if (weaponScore > bestScore) {
      bestScore = weaponScore
      bestWeapon = weapon
    }
  })

  // Si égalité, sélection aléatoire
  if (bestScore === 0) {
    bestWeapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)]
  }

  return bestWeapon
}

// Sélectionner un trait de personnalité basé sur les compétences
export function selectPersonalityTrait(scores, inspectorType) {
  const highestSkill = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
  
  const traitMap = {
    'Force surhumaine': ['Courageux', 'Impulsif'],
    'Régénération rapide': ['Stoïque', 'Protecteur'],
    'Analyse tactique': ['Calculateur', 'Prudent'],
    'Discrétion': ['Solitaire', 'Prudent'],
    'Résistance mentale': ['Stoïque', 'Loyal'],
    'Adaptabilité': ['Charismatique', 'Ambitieux'],
    'Détection des goules': ['Empathique', 'Calculateur'],
    'Prédateur nocturne': ['Vengeur', 'Solitaire']
  }
  
  const possibleTraits = traitMap[highestSkill] || ['Loyal', 'Courageux']
  const traitName = possibleTraits[Math.floor(Math.random() * possibleTraits.length)]
  return PERSONALITY_TRAITS.find(t => t.name === traitName)
}

// Sélectionner l'équipement secondaire
export function selectSecondaryEquipment(inspectorType, rarity) {
  const equipment = {
    armor: null,
    gadget: null,
    communication: null
  }
  
  // Armure selon le type
  if (inspectorType === 'Terrain') {
    equipment.armor = SECONDARY_EQUIPMENT.armor[Math.floor(Math.random() * 2)] // Armure lourde
  } else {
    equipment.armor = SECONDARY_EQUIPMENT.armor[2 + Math.floor(Math.random() * 2)] // Armure légère
  }
  
  // Gadget aléatoire
  equipment.gadget = SECONDARY_EQUIPMENT.gadgets[Math.floor(Math.random() * SECONDARY_EQUIPMENT.gadgets.length)]
  
  // Communication selon la rareté
  const commIndex = ['D', 'C', 'B'].includes(rarity) ? 0 : Math.floor(Math.random() * SECONDARY_EQUIPMENT.communication.length)
  equipment.communication = SECONDARY_EQUIPMENT.communication[commIndex]
  
  return equipment
}

// Sélectionner une division
export function selectDivision(userData) {
  // Sélection aléatoire ou basée sur la localisation si fournie
  return CCG_DIVISIONS[Math.floor(Math.random() * CCG_DIVISIONS.length)]
}

// Sélectionner un thème de carte
export function selectCardTheme(preference = null) {
  if (preference) {
    return CARD_THEMES.find(t => t.id === preference) || CARD_THEMES[0]
  }
  return CARD_THEMES[0] // Par défaut CCG
}

// Générer une description immersive enrichie
export function generateDescription(rank, inspectorType, weapon, dominantSkills, personality, division) {
  const descriptions = {
    Terrain: [
      `Un combattant redoutable sur le terrain, spécialisé dans l'affrontement direct.`,
      `Expert en combat rapproché, ce ${rank.name.toLowerCase()} excelle dans les situations dangereuses.`,
      `Reconnu pour son courage au combat et sa détermination sans faille.`,
    ],
    Bureau: [
      `Un analyste brillant, capable de déchiffrer les schémas comportementaux des goules.`,
      `Expert en stratégie et coordination, ce ${rank.name.toLowerCase()} orchestre les opérations depuis le QG.`,
      `Reconnu pour son intelligence tactique et sa capacité d'analyse exceptionnelle.`,
    ],
  }

  const typeDescriptions = descriptions[inspectorType]
  const baseDescription = typeDescriptions[Math.floor(Math.random() * typeDescriptions.length)]

  const personalityDesc = `De nature ${personality.name.toLowerCase()}, ${personality.description.toLowerCase()}.`
  const weaponReason = `L'arme "${weapon.name}" a été attribuée en raison de ses compétences en ${dominantSkills.slice(0, 2).join(' et ')}.`
  const divisionInfo = `Affecté à la ${division.name} (${division.location}).`

  return `${baseDescription} ${personalityDesc} ${weaponReason} ${divisionInfo}`
}

// Générer un identifiant unique
export function generateUniqueId() {
  return `CCG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

// Fonction principale de génération de carte
export function generateCard(userData, options = {}) {
  const theme = selectCardTheme(options.theme)
  
  // Importer les générateurs de faction
  import('./factionGenerators.js').then(module => {
    // Cette partie sera gérée différemment
  })
  
  // Pour l'instant, on garde la génération CCG par défaut
  // Les autres factions seront gérées par les composants
  const scores = generateSkillScores()
  const totalScore = calculateTotalScore(scores)
  const rank = determineRank(totalScore)
  const inspectorType = determineInspectorType(scores)
  const dominantSkills = selectDominantSkills(scores)
  const weapon = assignWeapon(dominantSkills, scores)
  const personality = selectPersonalityTrait(scores, inspectorType)
  const division = selectDivision(userData)
  const secondaryEquipment = selectSecondaryEquipment(inspectorType, rank.rarity)
  const description = generateDescription(rank, inspectorType, weapon, dominantSkills, personality, division)
  const uniqueId = generateUniqueId()

  return {
    ...userData,
    faction: 'ccg',
    scores,
    totalScore,
    rank: rank.name,
    rarity: rank.rarity,
    inspectorType,
    dominantSkills,
    weapon: weapon.name,
    weaponProperties: weapon.properties,
    personality,
    division,
    secondaryEquipment,
    theme,
    description,
    uniqueId,
    generatedAt: new Date().toISOString(),
  }
}
