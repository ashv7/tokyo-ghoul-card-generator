import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { LEGENDARY_QUINQUES, LEGENDARY_KAGUNE, CUSTOMIZATION_OPTIONS, isUnlocked, purchaseCustomization } from '../utils/legendarySystem'
import { calculateLevel } from '../utils/experienceSystem'
import { Sword, Palette, Lock, Check, ShoppingCart, Sparkles } from 'lucide-react'

function Shop() {
  const { token } = useAuth()
  const [activeTab, setActiveTab] = useState('quinques')
  const [userLevel, setUserLevel] = useState(1)
  const [userCurrency, setUserCurrency] = useState(0)
  const [ownedItems, setOwnedItems] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (token) {
      fetchUserData()
    }
  }, [token])

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/shop-data', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      const levelData = calculateLevel(data.totalXp || 0)
      setUserLevel(levelData.level)
      setUserCurrency(data.currency || 0)
      setOwnedItems(data.ownedItems || [])
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const handlePurchase = async (item, category) => {
    const unlockStatus = isUnlocked(item, userLevel, userCurrency)
    
    if (!unlockStatus.levelUnlocked) {
      setMessage(`Niveau ${item.unlockLevel} requis`)
      setTimeout(() => setMessage(''), 3000)
      return
    }

    if (!unlockStatus.canAfford) {
      setMessage(`Monnaie insuffisante (${item.cost} requis)`)
      setTimeout(() => setMessage(''), 3000)
      return
    }

    try {
      const response = await fetch('/api/shop/purchase', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: item.id, category })
      })

      if (response.ok) {
        setMessage(`${item.name} acheté avec succès!`)
        fetchUserData()
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      console.error('Error purchasing item:', error)
    }
  }

  const renderQuinqueCard = (quinque, category) => {
    const unlockStatus = isUnlocked(quinque, userLevel, userCurrency)
    const isOwned = ownedItems.includes(quinque.id)

    return (
      <div 
        key={quinque.id}
        className={`bg-ghoul-gray p-4 rounded-lg border-2 transition-all ${
          isOwned
            ? 'border-green-500'
            : unlockStatus.unlocked
            ? 'border-ghoul-red hover:shadow-lg hover:shadow-ghoul-red/20'
            : 'border-gray-700 opacity-60'
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-bold text-white">{quinque.name}</h3>
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                quinque.rarity === 'SS+' ? 'bg-red-500/20 text-red-400' :
                quinque.rarity === 'SS' ? 'bg-orange-500/20 text-orange-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {quinque.rarity}
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-2">{quinque.type}</p>
          </div>
          {isOwned && <Check size={24} className="text-green-500" />}
          {!unlockStatus.levelUnlocked && <Lock size={20} className="text-gray-500" />}
        </div>

        <p className="text-sm text-gray-300 mb-3">{quinque.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 bg-ghoul-dark rounded">
            <div className="text-xs text-gray-400">ATK</div>
            <div className="text-lg font-bold text-ghoul-red">{quinque.stats.attack}</div>
          </div>
          <div className="text-center p-2 bg-ghoul-dark rounded">
            <div className="text-xs text-gray-400">DEF</div>
            <div className="text-lg font-bold text-blue-400">{quinque.stats.defense}</div>
          </div>
          <div className="text-center p-2 bg-ghoul-dark rounded">
            <div className="text-xs text-gray-400">SPD</div>
            <div className="text-lg font-bold text-green-400">{quinque.stats.speed}</div>
          </div>
        </div>

        {/* Capacité spéciale */}
        <div className="mb-3 p-2 bg-purple-500/10 rounded border border-purple-500/30">
          <div className="text-xs text-purple-400 font-bold mb-1">Capacité spéciale</div>
          <div className="text-xs text-gray-300">{quinque.specialAbility}</div>
        </div>

        {/* Prix et achat */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-400">Niv. {quinque.unlockLevel}</span>
            <span className="text-yellow-400 font-bold">💰 {quinque.unlockCost}</span>
          </div>
          {!isOwned && unlockStatus.unlocked && (
            <button
              onClick={() => handlePurchase(quinque, category)}
              className="btn-primary text-sm py-1 px-4 flex items-center space-x-1"
            >
              <ShoppingCart size={16} />
              <span>Acheter</span>
            </button>
          )}
          {!unlockStatus.levelUnlocked && (
            <span className="text-xs text-gray-500">Niveau insuffisant</span>
          )}
        </div>
      </div>
    )
  }

  const renderCustomizationCard = (item, category) => {
    const unlockStatus = isUnlocked(item, userLevel, userCurrency)
    const isOwned = ownedItems.includes(item.id)

    return (
      <div 
        key={item.id}
        className={`bg-ghoul-gray p-4 rounded-lg border-2 transition-all ${
          isOwned
            ? 'border-green-500'
            : unlockStatus.unlocked
            ? 'border-ghoul-red hover:shadow-lg hover:shadow-ghoul-red/20'
            : 'border-gray-700 opacity-60'
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
            {item.description && (
              <p className="text-sm text-gray-400">{item.description}</p>
            )}
          </div>
          {isOwned && <Check size={24} className="text-green-500 ml-2" />}
          {!unlockStatus.levelUnlocked && <Lock size={20} className="text-gray-500 ml-2" />}
        </div>

        {/* Prévisualisation */}
        {item.gradient && (
          <div 
            className="h-20 rounded-lg mb-3"
            style={{ background: item.gradient }}
          />
        )}
        {item.color && (
          <div 
            className="h-20 rounded-lg mb-3 border-4"
            style={{ borderColor: item.color, background: '#1a1a1a' }}
          />
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {item.animated && (
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
              <Sparkles size={12} className="inline mr-1" />
              Animé
            </span>
          )}
          {item.glow && (
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
              ✨ Lueur
            </span>
          )}
        </div>

        {/* Prix et achat */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-400">Niv. {item.unlockLevel}</span>
            <span className="text-yellow-400 font-bold">💰 {item.cost}</span>
          </div>
          {!isOwned && item.cost > 0 && unlockStatus.unlocked && (
            <button
              onClick={() => handlePurchase(item, category)}
              className="btn-primary text-sm py-1 px-4 flex items-center space-x-1"
            >
              <ShoppingCart size={16} />
              <span>Acheter</span>
            </button>
          )}
          {item.cost === 0 && (
            <span className="text-xs text-green-400">Gratuit</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-ghoul-red">Boutique</h1>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-sm text-gray-400">Niveau</div>
              <div className="text-2xl font-bold text-white">{userLevel}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Monnaie</div>
              <div className="text-2xl font-bold text-yellow-400">💰 {userCurrency}</div>
            </div>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.includes('succès') 
              ? 'bg-green-900/50 text-green-200 border-green-500'
              : 'bg-red-900/50 text-red-200 border-red-500'
          }`}>
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 border-b border-gray-700 overflow-x-auto">
          <button
            onClick={() => setActiveTab('quinques')}
            className={`px-6 py-3 font-semibold transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'quinques'
                ? 'text-ghoul-red border-b-2 border-ghoul-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sword size={20} />
            <span>Quinques Légendaires</span>
          </button>
          <button
            onClick={() => setActiveTab('kagune')}
            className={`px-6 py-3 font-semibold transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'kagune'
                ? 'text-ghoul-red border-b-2 border-ghoul-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles size={20} />
            <span>Kagune Légendaires</span>
          </button>
          <button
            onClick={() => setActiveTab('backgrounds')}
            className={`px-6 py-3 font-semibold transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'backgrounds'
                ? 'text-ghoul-red border-b-2 border-ghoul-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Palette size={20} />
            <span>Arrière-plans</span>
          </button>
          <button
            onClick={() => setActiveTab('frames')}
            className={`px-6 py-3 font-semibold transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'frames'
                ? 'text-ghoul-red border-b-2 border-ghoul-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Palette size={20} />
            <span>Cadres</span>
          </button>
        </div>

        {/* Quinques */}
        {activeTab === 'quinques' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Quinques Mythiques</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {LEGENDARY_QUINQUES.mythic.map(q => renderQuinqueCard(q, 'quinque'))}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Quinques Légendaires</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {LEGENDARY_QUINQUES.legendary.map(q => renderQuinqueCard(q, 'quinque'))}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Quinques Rares</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LEGENDARY_QUINQUES.rare.map(q => renderQuinqueCard(q, 'quinque'))}
            </div>
          </div>
        )}

        {/* Kagune */}
        {activeTab === 'kagune' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Kagune Mythiques</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {LEGENDARY_KAGUNE.mythic.map(k => renderQuinqueCard(k, 'kagune'))}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Kagune Légendaires</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LEGENDARY_KAGUNE.legendary.map(k => renderQuinqueCard(k, 'kagune'))}
            </div>
          </div>
        )}

        {/* Arrière-plans */}
        {activeTab === 'backgrounds' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CUSTOMIZATION_OPTIONS.backgrounds.map(bg => renderCustomizationCard(bg, 'background'))}
          </div>
        )}

        {/* Cadres */}
        {activeTab === 'frames' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CUSTOMIZATION_OPTIONS.frames.map(frame => renderCustomizationCard(frame, 'frame'))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Shop
