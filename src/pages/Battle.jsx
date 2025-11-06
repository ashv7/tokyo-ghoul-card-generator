import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { BATTLE_MODES, BATTLE_ACTIONS, simulateFullBattle, calculateBattleRewards } from '../utils/battleSystem'
import { Swords, Shield, Zap, Flag, Trophy, Target } from 'lucide-react'

function Battle() {
  const { token, user } = useAuth()
  const [selectedMode, setSelectedMode] = useState('ai')
  const [myCards, setMyCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [opponent, setOpponent] = useState(null)
  const [battleState, setBattleState] = useState('selection') // selection, fighting, result
  const [battleResult, setBattleResult] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      fetchMyCards()
    }
  }, [token])

  const fetchMyCards = async () => {
    try {
      const response = await fetch('/api/cards', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setMyCards(data.cards || [])
    } catch (error) {
      console.error('Error fetching cards:', error)
    }
  }

  const findOpponent = async () => {
    if (!selectedCard) {
      alert('Sélectionnez une carte d\'abord!')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/battle/find-opponent', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mode: selectedMode,
          cardId: selectedCard._id
        })
      })
      
      const data = await response.json()
      setOpponent(data.opponent)
      setBattleState('fighting')
    } catch (error) {
      console.error('Error finding opponent:', error)
    } finally {
      setLoading(false)
    }
  }

  const startBattle = () => {
    if (!selectedCard || !opponent) return

    // Simuler le combat
    const result = simulateFullBattle(selectedCard, opponent.card)
    
    // Calculer les récompenses
    const won = result.winner === 'player1'
    const rewards = calculateBattleRewards(
      selectedMode,
      won,
      user.level || 1,
      opponent.level || 1
    )

    setBattleResult({
      ...result,
      won,
      rewards
    })
    
    setBattleState('result')
    
    // Envoyer le résultat au serveur
    saveBattleResult(result, rewards)
  }

  const saveBattleResult = async (result, rewards) => {
    try {
      await fetch('/api/battle/save-result', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mode: selectedMode,
          cardId: selectedCard._id,
          opponentId: opponent.userId,
          opponentCardId: opponent.card._id,
          result,
          rewards
        })
      })
    } catch (error) {
      console.error('Error saving battle result:', error)
    }
  }

  const resetBattle = () => {
    setSelectedCard(null)
    setOpponent(null)
    setBattleState('selection')
    setBattleResult(null)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-ghoul-red mb-8 flex items-center">
          <Swords size={40} className="mr-3" />
          Bataille de Cartes
        </h1>

        {/* Sélection du mode */}
        {battleState === 'selection' && (
          <div className="space-y-6">
            <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Choisissez un mode de jeu</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.values(BATTLE_MODES).map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedMode === mode.id
                        ? 'border-ghoul-red bg-ghoul-red/20'
                        : 'border-gray-700 bg-ghoul-dark hover:border-gray-600'
                    }`}
                  >
                    <h3 className="text-lg font-bold text-white mb-2">{mode.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{mode.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-yellow-400">+{mode.rewards.xp} XP</span>
                      <span className="text-green-400">+{mode.rewards.currency} 💰</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sélection de la carte */}
            <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Sélectionnez votre carte</h2>
              {myCards.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  Vous n'avez pas encore de cartes. Générez-en une d'abord!
                </p>
              ) : (
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {myCards.map(card => (
                    <button
                      key={card._id}
                      onClick={() => setSelectedCard(card)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedCard?._id === card._id
                          ? 'border-ghoul-red bg-ghoul-red/20'
                          : 'border-gray-700 bg-ghoul-dark hover:border-gray-600'
                      }`}
                    >
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-white mb-1">{card.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">{card.rank || card.role}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-bold ${
                            card.rarity === 'SS+' ? 'text-red-400' :
                            card.rarity === 'SS' ? 'text-orange-400' :
                            card.rarity === 'S' ? 'text-yellow-400' :
                            'text-blue-400'
                          }`}>
                            {card.rarity}
                          </span>
                          <span className="text-ghoul-red">⚡ {card.totalScore}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bouton Trouver un adversaire */}
            {selectedCard && (
              <div className="text-center">
                <button
                  onClick={findOpponent}
                  disabled={loading}
                  className="btn-primary text-lg px-8 py-4 disabled:opacity-50"
                >
                  {loading ? 'Recherche...' : 'Trouver un adversaire'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Écran de combat */}
        {battleState === 'fighting' && opponent && (
          <div className="space-y-6">
            <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Combat en cours</h2>
              
              <div className="grid md:grid-cols-3 gap-6 items-center">
                {/* Votre carte */}
                <div className="bg-ghoul-dark p-4 rounded-lg border-2 border-blue-500">
                  <div className="text-center mb-3">
                    <span className="text-blue-400 font-bold">VOUS</span>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-2">{selectedCard.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rareté:</span>
                      <span className="text-yellow-400 font-bold">{selectedCard.rarity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Puissance:</span>
                      <span className="text-ghoul-red font-bold">{selectedCard.totalScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Faction:</span>
                      <span className="text-white capitalize">{selectedCard.faction}</span>
                    </div>
                  </div>
                </div>

                {/* VS */}
                <div className="text-center">
                  <div className="text-6xl font-bold text-ghoul-red mb-4">VS</div>
                  <button
                    onClick={startBattle}
                    className="btn-primary flex items-center space-x-2 mx-auto"
                  >
                    <Swords size={20} />
                    <span>Commencer le combat!</span>
                  </button>
                </div>

                {/* Carte adverse */}
                <div className="bg-ghoul-dark p-4 rounded-lg border-2 border-red-500">
                  <div className="text-center mb-3">
                    <span className="text-red-400 font-bold">ADVERSAIRE</span>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-2">{opponent.card.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rareté:</span>
                      <span className="text-yellow-400 font-bold">{opponent.card.rarity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Puissance:</span>
                      <span className="text-ghoul-red font-bold">{opponent.card.totalScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Faction:</span>
                      <span className="text-white capitalize">{opponent.card.faction}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Résultat du combat */}
        {battleState === 'result' && battleResult && (
          <div className="space-y-6">
            {/* Bannière de résultat */}
            <div className={`p-8 rounded-lg border-4 text-center ${
              battleResult.won
                ? 'bg-green-900/50 border-green-500'
                : 'bg-red-900/50 border-red-500'
            }`}>
              <div className="text-6xl mb-4">
                {battleResult.won ? '🎉' : '😢'}
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">
                {battleResult.won ? 'VICTOIRE!' : 'DÉFAITE'}
              </h2>
              <p className="text-xl text-gray-300">
                Combat terminé en {battleResult.turns} tours
              </p>
            </div>

            {/* Statistiques du combat */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-blue-400 mb-4">Votre carte</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nom:</span>
                    <span className="text-white font-bold">{selectedCard.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">HP restants:</span>
                    <span className="text-green-400 font-bold">
                      {battleResult.player1.hpPercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-red-400 mb-4">Adversaire</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nom:</span>
                    <span className="text-white font-bold">{opponent.card.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">HP restants:</span>
                    <span className="text-green-400 font-bold">
                      {battleResult.player2.hpPercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Récompenses */}
            <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Trophy size={24} className="mr-2 text-yellow-400" />
                Récompenses
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-ghoul-dark rounded-lg">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-2xl font-bold text-yellow-400">+{battleResult.rewards.xp}</div>
                  <div className="text-sm text-gray-400">XP</div>
                </div>
                <div className="text-center p-4 bg-ghoul-dark rounded-lg">
                  <div className="text-3xl mb-2">💰</div>
                  <div className="text-2xl font-bold text-green-400">+{battleResult.rewards.currency}</div>
                  <div className="text-sm text-gray-400">Monnaie</div>
                </div>
                {BATTLE_MODES[selectedMode].rewards.ranking && (
                  <div className="text-center p-4 bg-ghoul-dark rounded-lg">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className={`text-2xl font-bold ${
                      battleResult.rewards.rankingPoints > 0 ? 'text-blue-400' : 'text-red-400'
                    }`}>
                      {battleResult.rewards.rankingPoints > 0 ? '+' : ''}{battleResult.rewards.rankingPoints}
                    </div>
                    <div className="text-sm text-gray-400">Points de classement</div>
                  </div>
                )}
              </div>
            </div>

            {/* Log de combat */}
            <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Déroulement du combat</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {battleResult.log.map((entry, index) => (
                  <div key={index} className="p-2 bg-ghoul-dark rounded text-sm">
                    {entry.turn ? (
                      <div className="font-bold text-ghoul-red">{entry.message}</div>
                    ) : (
                      <div className="text-gray-300">{entry.message}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Boutons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={resetBattle}
                className="btn-secondary px-8 py-3"
              >
                Nouveau combat
              </button>
              <button
                onClick={() => window.location.href = '/ranking'}
                className="btn-primary px-8 py-3"
              >
                Voir le classement
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Battle
