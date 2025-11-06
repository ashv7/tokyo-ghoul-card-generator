import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { Shield, Award, User, MapPin, Heart } from 'lucide-react'

function CardID({ cardData }) {
  const qrRef = useRef(null)

  useEffect(() => {
    if (cardData && qrRef.current) {
      const theme = cardData.theme || { colors: { primary: '#c41e3a', background: '#1a1a1a' } }
      QRCode.toCanvas(qrRef.current, cardData.uniqueId, {
        width: 80,
        margin: 1,
        color: {
          dark: theme.colors.primary,
          light: theme.colors.background,
        },
      })
    }
  }, [cardData])

  if (!cardData) return null

  const theme = cardData.theme || { colors: { primary: '#c41e3a', secondary: '#2c5f8d', background: '#1a1a1a' } }
  const themeColors = theme.colors

  const getRarityColor = (rarity) => {
    const colors = {
      'D': 'text-gray-500',
      'C': 'text-green-500',
      'B': 'text-blue-500',
      'A': 'text-purple-500',
      'S': 'text-yellow-500',
      'SS': 'text-orange-500',
      'SS+': 'text-red-500',
    }
    return colors[rarity] || 'text-gray-500'
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Format carte d'identité horizontale */}
      <div 
        className="rounded-xl overflow-hidden border-2 shadow-2xl"
        style={{ 
          borderColor: themeColors.primary,
          background: `linear-gradient(135deg, ${themeColors.background} 0%, ${themeColors.secondary} 100%)`
        }}
      >
        <div className="flex">
          {/* Partie gauche - Photo et QR */}
          <div 
            className="w-1/3 p-6 flex flex-col items-center justify-between border-r-2"
            style={{ 
              backgroundColor: themeColors.background,
              borderColor: themeColors.primary
            }}
          >
            {/* Photo */}
            <div className="w-full aspect-square bg-ghoul-dark rounded-lg border-2 flex items-center justify-center overflow-hidden mb-4"
              style={{ borderColor: themeColors.primary }}
            >
              {cardData.photo ? (
                <img src={cardData.photo} alt={cardData.name} className="w-full h-full object-cover" />
              ) : (
                <User size={64} className="text-gray-600" />
              )}
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center">
              <canvas ref={qrRef} className="w-20 h-20" />
              <p className="text-xs text-gray-500 text-center mt-2 font-mono break-all">
                {cardData.uniqueId}
              </p>
            </div>

            {/* Rareté */}
            <div className={`text-4xl font-bold mt-4 ${getRarityColor(cardData.rarity)}`}>
              {cardData.rarity}
            </div>
          </div>

          {/* Partie droite - Informations */}
          <div className="w-2/3 p-6">
            {/* Header */}
            <div className="mb-4 pb-4 border-b-2" style={{ borderColor: themeColors.primary }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold" style={{ color: themeColors.primary }}>
                    {theme.id === 'ghoul' ? 'GOULE' : theme.id === 'anteiku' ? 'ANTEIKU' : theme.id === 'aogiri' ? 'AOGIRI' : 'CCG'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {theme.id === 'ghoul' ? 'Carte de Goule' : theme.id === 'anteiku' ? 'Café Anteiku' : theme.id === 'aogiri' ? 'Aogiri Tree' : 'Commission of Counter Ghoul'}
                  </p>
                </div>
              </div>
            </div>

            {/* Nom et date de naissance */}
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-white">{cardData.name}</h2>
              <p className="text-sm text-gray-400">
                Né le {new Date(cardData.birthdate).toLocaleDateString('fr-FR')}
              </p>
            </div>

            {/* Informations principales */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Shield size={16} style={{ color: themeColors.primary }} />
                  <span className="text-xs text-gray-400">Grade</span>
                </div>
                <p className="text-sm text-white font-semibold">{cardData.rank}</p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Award size={16} style={{ color: themeColors.primary }} />
                  <span className="text-xs text-gray-400">Type</span>
                </div>
                <p className="text-sm text-white font-semibold">{cardData.inspectorType}</p>
              </div>

              {cardData.division && (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin size={16} style={{ color: themeColors.primary }} />
                    <span className="text-xs text-gray-400">Division</span>
                  </div>
                  <p className="text-sm text-white font-semibold">{cardData.division.name}</p>
                </div>
              )}

              {cardData.personality && (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart size={16} style={{ color: themeColors.primary }} />
                    <span className="text-xs text-gray-400">Personnalité</span>
                  </div>
                  <p className="text-sm text-white font-semibold">{cardData.personality.name}</p>
                </div>
              )}
            </div>

            {/* Compétences dominantes */}
            <div className="mb-4">
              <h4 className="text-xs font-bold mb-2 uppercase" style={{ color: themeColors.primary }}>
                Compétences dominantes
              </h4>
              <div className="flex flex-wrap gap-2">
                {cardData.dominantSkills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="px-3 py-1 rounded-full text-xs bg-ghoul-dark/50 text-gray-300"
                  >
                    {skill} ({cardData.scores[skill]}/6)
                  </div>
                ))}
              </div>
            </div>

            {/* Score total et arme */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div>
                <span className="text-xs text-gray-400">Arme principale</span>
                <p className="text-sm text-white font-semibold">{cardData.weapon}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400">Score total</span>
                <p className="text-2xl font-bold" style={{ color: themeColors.primary }}>
                  {cardData.totalScore}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardID
