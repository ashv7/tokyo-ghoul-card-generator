import { generateGhoulCard, generateAnteikuCard, generateAogiriCard } from './factionGenerators'
import { generateCard as generateCCGCard, CARD_THEMES } from './cardGenerator'

/**
 * Fonction unifiée de génération de carte selon la faction
 * @param {Object} userData - Données utilisateur (nom, date, photo)
 * @param {Object} options - Options (theme)
 * @returns {Object} Carte générée
 */
export function generateCardByFaction(userData, options = {}) {
  const themeId = options.theme || 'ccg'
  
  // Trouver le thème sélectionné
  const theme = CARD_THEMES.find(t => t.id === themeId) || CARD_THEMES[0]
  
  let cardData
  
  // Générer selon la faction
  switch (themeId) {
    case 'ghoul':
      cardData = generateGhoulCard(userData)
      break
    
    case 'anteiku':
      cardData = generateAnteikuCard(userData)
      break
    
    case 'aogiri':
      cardData = generateAogiriCard(userData)
      break
    
    case 'ccg':
    default:
      cardData = generateCCGCard(userData, options)
      break
  }
  
  // Ajouter le thème à la carte
  cardData.theme = theme
  
  return cardData
}

// Ré-exporter les thèmes
export { CARD_THEMES } from './cardGenerator'
