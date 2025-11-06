import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import JsBarcode from 'jsbarcode'
import { Swords, Award, User, MapPin, Heart, Package, Target } from 'lucide-react'

function CardAogiri({ cardData }) {
  const qrRef = useRef(null)
  const barcodeRef = useRef(null)

  useEffect(() => {
    if (cardData && qrRef.current) {
      const theme = cardData.theme || { colors: { primary: '#4b0082', background: '#1a0033' } }
      QRCode.toCanvas(qrRef.current, cardData.uniqueId, {
        width: 100,
        margin: 1,
        color: {
          dark: theme.colors.primary,
          light: theme.colors.background,
        },
      })
    }

    if (cardData && barcodeRef.current) {
      const theme = cardData.theme || { colors: { primary: '#4b0082', background: '#1a0033' } }
      JsBarcode(barcodeRef.current, cardData.uniqueId, {
        format: 'CODE128',
        width: 2,
        height: 40,
        displayValue: false,
        background: theme.colors.background,
        lineColor: theme.colors.primary,
      })
    }
  }, [cardData])

  if (!cardData) return null

  const theme = cardData.theme || { colors: { primary: '#4b0082', secondary: '#8b008b', background: '#1a0033' } }
  const themeColors = theme.colors

  const getRarityColor = (rarity) => {
    const colors = {
      'C': 'text-green-500',
      'B': 'text-blue-500',
      'A': 'text-purple-500',
      'S': 'text-yellow-500',
      'SS': 'text-orange-500',
      'SS+': 'text-red-500',
    }
    return colors[rarity] || 'text-gray-500'
  }

  const getRarityGlow = (rarity) => {
    const glows = {
      'C': 'shadow-green-500/50',
      'B': 'shadow-blue-500/50',
      'A': 'shadow-purple-500/50',
      'S': 'shadow-yellow-500/50',
      'SS': 'shadow-orange-500/50',
      'SS+': 'shadow-red-500/50',
    }
    return glows[rarity] || 'shadow-gray-500/50'
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={`rounded-xl overflow-hidden border-2 shadow-2xl ${getRarityGlow(cardData.rarity)}`}
        style={{ 
          borderColor: themeColors.primary,
          background: `linear-gradient(135deg, ${themeColors.background} 0%, ${themeColors.secondary} 100%)`
        }}
      >
        {/* Header */}
        <div 
          className="p-4 border-b-2"
          style={{ 
            backgroundColor: themeColors.background,
            borderColor: themeColors.primary
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold" style={{ color: themeColors.primary }}>
                AOGIRI TREE
              </h3>
              <p className="text-xs text-gray-400">
                Organisation Aogiri - {cardData.rank}
              </p>
            </div>
            <div className={`text-3xl font-bold ${getRarityColor(cardData.rarity)}`}>
              {cardData.rarity}
            </div>
          </div>
        </div>

        {/* Photo Section */}
        <div className="p-6 bg-ghoul-gray/50">
          <div className="flex items-start space-x-4">
            <div className="w-32 h-32 bg-ghoul-dark rounded-lg border-2 flex items-center justify-center overflow-hidden"
              style={{ borderColor: themeColors.primary }}
            >
              {cardData.photo ? (
                <img src={cardData.photo} alt={cardData.name} className="w-full h-full object-cover" />
              ) : (
                <User size={64} className="text-gray-600" />
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">{cardData.name}</h2>
              <p className="text-sm text-gray-400 mb-2">
                Né le {new Date(cardData.birthdate).toLocaleDateString('fr-FR')}
              </p>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-sm">
                  <Swords size={16} style={{ color: themeColors.primary }} />
                  <span className="text-gray-300">{cardData.powerName}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Award size={16} style={{ color: themeColors.primary }} />
                  <span className="text-gray-300">{cardData.combatRole}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Target size={16} style={{ color: themeColors.primary }} />
                  <span className="text-gray-300">{cardData.technique}</span>
                </div>
                {cardData.personality && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Heart size={16} style={{ color: themeColors.primary }} />
                    <span className="text-gray-300">{cardData.personality.name}</span>
                  </div>
                )}
                {cardData.base && (
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin size={16} style={{ color: themeColors.primary }} />
                    <span className="text-gray-300">{cardData.base.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="p-6 bg-ghoul-dark/50">
          <h4 className="text-sm font-bold mb-3 uppercase" style={{ color: themeColors.primary }}>
            Capacités de combat
          </h4>
          <div className="space-y-2">
            {cardData.dominantSkills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between bg-ghoul-dark/50 px-3 py-2 rounded">
                <span className="text-sm text-gray-300">{skill}</span>
                <span className="text-sm font-bold" style={{ color: themeColors.primary }}>
                  {cardData.scores[skill]}/6
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Puissance totale</span>
              <span className="text-xl font-bold" style={{ color: themeColors.primary }}>
                {cardData.totalScore}
              </span>
            </div>
          </div>
        </div>

        {/* Equipment Section */}
        {cardData.equipment && (
          <div className="p-6 bg-ghoul-dark/30">
            <h4 className="text-sm font-bold mb-3 uppercase flex items-center space-x-2" style={{ color: themeColors.primary }}>
              <Package size={16} />
              <span>Arsenal</span>
            </h4>
            <div className="space-y-2 text-xs">
              {cardData.equipment.combatGear && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Équipement:</span>
                  <span className="text-gray-300">{cardData.equipment.combatGear.name}</span>
                </div>
              )}
              {cardData.equipment.weapon && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Arme:</span>
                  <span className="text-gray-300">{cardData.equipment.weapon.name}</span>
                </div>
              )}
              {cardData.equipment.tactical && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tactique:</span>
                  <span className="text-gray-300">{cardData.equipment.tactical.name}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="p-6 bg-ghoul-gray/30">
          <p className="text-xs text-gray-300 leading-relaxed">
            {cardData.description}
          </p>
        </div>

        {/* Footer with QR and Barcode */}
        <div 
          className="p-4 border-t-2"
          style={{ 
            backgroundColor: themeColors.background,
            borderColor: themeColors.primary
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <canvas ref={qrRef} className="w-20 h-20" />
            </div>
            <div className="flex-1 mx-4">
              <svg ref={barcodeRef} className="w-full" />
              <p className="text-xs text-gray-500 text-center mt-1 font-mono">
                {cardData.uniqueId}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardAogiri
