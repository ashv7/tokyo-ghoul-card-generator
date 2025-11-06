import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { RANKING_TIERS, getRankingTier, getTierProgress, getBattleStats } from '../utils/battleSystem'
import { Trophy, TrendingUp, Award, Flame, Target, Users } from 'lucide-react'

function Ranking() {
  const { token, user } = useAuth()
  const [activeTab, setActiveTab] = useState('global')
  const [rankings, setRankings] = useState([])
  const [myRanking, setMyRanking] = useState(null)
  const [myStats, setMyStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState('all') // all, week, month

  useEffect(() => {
    if (token) {
      fetchRankings()
    }
  }, [token, timeframe])

  const fetchRankings = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/ranking?timeframe=${timeframe}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      
      setRankings(data.rankings || [])
      setMyRanking(data.myRanking || null)
      setMyStats(data.myStats || null)
    } catch (error) {
      console.error('Error fetching rankings:', error)
    } finally {
      setLoading(false)
    }
  }

  const tierProgress = myRanking ? getTierProgress(myRanking.rankingPoints) : null

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-ghoul-red mb-8 flex items-center">
          <Trophy size={40} className="mr-3" />
          Classement Communautaire
        </h1>

        {/* Votre classement */}
        {myRanking && tierProgress && (
          <div className="bg-ghoul-gray p-6 rounded-lg border-2 border-ghoul-red mb-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Tier actuel */}
              <div className="text-center">
                <div className="text-6xl mb-2">{tierProgress.tier.icon}</div>
                <h3 className="text-2xl font-bold mb-1" style={{ color: tierProgress.tier.color }}>
                  {tierProgress.tier.tier}
                </h3>
                <p className="text-gray-400 text-sm">Votre tier</p>
              </div>

              {/* Progression */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold">Progression</span>
                  <span className="text-gray-400">
                    {tierProgress.points} / {tierProgress.nextTier ? tierProgress.nextTier.minPoints : '∞'} pts
                  </span>
                </div>
                <div className="w-full bg-ghoul-dark rounded-full h-6 overflow-hidden mb-4">
                  <div 
                    className="h-full transition-all duration-500"
                    style={{ 
                      width: `${tierProgress.percentage}%`,
                      background: `linear-gradient(90deg, ${tierProgress.tier.color}, ${tierProgress.nextTier?.color || tierProgress.tier.color})`
                    }}
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-ghoul-dark rounded-lg">
                    <div className="text-2xl font-bold text-white">#{myRanking.rank}</div>
                    <div className="text-xs text-gray-400">Classement</div>
                  </div>
                  {myStats && (
                    <>
                      <div className="text-center p-3 bg-ghoul-dark rounded-lg">
                        <div className="text-2xl font-bold text-green-400">{myStats.wins}</div>
                        <div className="text-xs text-gray-400">Victoires</div>
                      </div>
                      <div className="text-center p-3 bg-ghoul-dark rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">{myStats.winRate}%</div>
                        <div className="text-xs text-gray-400">Taux de victoire</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('global')}
            className={`px-6 py-3 font-semibold transition-colors flex items-center space-x-2 ${
              activeTab === 'global'
                ? 'text-ghoul-red border-b-2 border-ghoul-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Trophy size={20} />
            <span>Classement Global</span>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-3 font-semibold transition-colors flex items-center space-x-2 ${
              activeTab === 'stats'
                ? 'text-ghoul-red border-b-2 border-ghoul-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp size={20} />
            <span>Mes Statistiques</span>
          </button>
          <button
            onClick={() => setActiveTab('tiers')}
            className={`px-6 py-3 font-semibold transition-colors flex items-center space-x-2 ${
              activeTab === 'tiers'
                ? 'text-ghoul-red border-b-2 border-ghoul-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Award size={20} />
            <span>Tiers</span>
          </button>
        </div>

        {/* Classement Global */}
        {activeTab === 'global' && (
          <div className="space-y-4">
            {/* Filtres de temps */}
            <div className="flex justify-end space-x-2 mb-4">
              <button
                onClick={() => setTimeframe('all')}
                className={`px-4 py-2 rounded-lg ${
                  timeframe === 'all'
                    ? 'bg-ghoul-red text-white'
                    : 'bg-ghoul-dark text-gray-400 hover:text-white'
                }`}
              >
                Tout le temps
              </button>
              <button
                onClick={() => setTimeframe('month')}
                className={`px-4 py-2 rounded-lg ${
                  timeframe === 'month'
                    ? 'bg-ghoul-red text-white'
                    : 'bg-ghoul-dark text-gray-400 hover:text-white'
                }`}
              >
                Ce mois
              </button>
              <button
                onClick={() => setTimeframe('week')}
                className={`px-4 py-2 rounded-lg ${
                  timeframe === 'week'
                    ? 'bg-ghoul-red text-white'
                    : 'bg-ghoul-dark text-gray-400 hover:text-white'
                }`}
              >
                Cette semaine
              </button>
            </div>

            {/* Top 3 */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {rankings.slice(0, 3).map((player, index) => {
                const medals = ['🥇', '🥈', '🥉']
                const colors = ['#ffd700', '#c0c0c0', '#cd7f32']
                return (
                  <div 
                    key={player.userId}
                    className="bg-ghoul-gray p-6 rounded-lg border-2"
                    style={{ borderColor: colors[index] }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-3">{medals[index]}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{player.username}</h3>
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <span className="text-2xl">{player.tier.icon}</span>
                        <span className="font-bold" style={{ color: player.tier.color }}>
                          {player.tier.tier}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-ghoul-red mb-1">
                        {player.rankingPoints} pts
                      </div>
                      <div className="text-sm text-gray-400">
                        {player.wins}V - {player.losses}D ({player.winRate}%)
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Reste du classement */}
            <div className="bg-ghoul-gray rounded-lg border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-ghoul-dark">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Rang</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Joueur</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Tier</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Points</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">V/D</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Taux</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {rankings.slice(3).map((player) => (
                      <tr 
                        key={player.userId}
                        className={`hover:bg-ghoul-dark/50 transition-colors ${
                          player.userId === user?.id ? 'bg-blue-900/20' : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-white font-bold">#{player.rank}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-white">{player.username}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{player.tier.icon}</span>
                            <span style={{ color: player.tier.color }}>{player.tier.tier}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-ghoul-red font-bold">{player.rankingPoints}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-gray-300">{player.wins} / {player.losses}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-blue-400">{player.winRate}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Mes Statistiques */}
        {activeTab === 'stats' && myStats && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Stats générales */}
            <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Target size={20} className="mr-2 text-ghoul-red" />
                Statistiques Générales
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-ghoul-dark rounded-lg">
                  <span className="text-gray-400">Combats totaux</span>
                  <span className="text-2xl font-bold text-white">{myStats.totalBattles}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-ghoul-dark rounded-lg">
                  <span className="text-gray-400">Victoires</span>
                  <span className="text-2xl font-bold text-green-400">{myStats.wins}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-ghoul-dark rounded-lg">
                  <span className="text-gray-400">Défaites</span>
                  <span className="text-2xl font-bold text-red-400">{myStats.losses}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-ghoul-dark rounded-lg">
                  <span className="text-gray-400">Taux de victoire</span>
                  <span className="text-2xl font-bold text-blue-400">{myStats.winRate}%</span>
                </div>
              </div>
            </div>

            {/* Séries */}
            <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Flame size={20} className="mr-2 text-orange-400" />
                Séries
              </h3>
              <div className="space-y-4">
                <div className="text-center p-6 bg-ghoul-dark rounded-lg">
                  <div className="text-5xl mb-2">🔥</div>
                  <div className="text-3xl font-bold text-orange-400 mb-1">
                    {myStats.currentStreak}
                  </div>
                  <div className="text-sm text-gray-400">Série actuelle</div>
                </div>
                <div className="text-center p-6 bg-ghoul-dark rounded-lg">
                  <div className="text-5xl mb-2">⭐</div>
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {myStats.bestStreak}
                  </div>
                  <div className="text-sm text-gray-400">Meilleure série</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tiers */}
        {activeTab === 'tiers' && (
          <div className="space-y-4">
            <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Système de Tiers</h3>
              <p className="text-gray-400 mb-4">
                Gagnez des points de classement en remportant des combats classés. 
                Montez dans les tiers pour débloquer des récompenses exclusives !
              </p>
            </div>

            {RANKING_TIERS.map((tier, index) => (
              <div 
                key={tier.tier}
                className={`bg-ghoul-gray p-6 rounded-lg border-2 transition-all ${
                  tierProgress && tierProgress.tier.tier === tier.tier
                    ? 'border-ghoul-red shadow-lg'
                    : 'border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-5xl">{tier.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: tier.color }}>
                        {tier.tier}
                      </h3>
                      <p className="text-gray-400">
                        {tier.minPoints} - {tier.maxPoints === Infinity ? '∞' : tier.maxPoints} points
                      </p>
                    </div>
                  </div>
                  {tierProgress && tierProgress.tier.tier === tier.tier && (
                    <div className="text-ghoul-red font-bold text-lg">
                      VOTRE TIER
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Ranking
