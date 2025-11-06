import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { calculateLevel, BADGES } from '../utils/experienceSystem'
import { Trophy, Star, Award, TrendingUp, Target, Zap } from 'lucide-react'

function Profile() {
  const { user, token } = useAuth()
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      fetchProfileData()
    }
  }, [token])

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setProfileData(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-white">Chargement...</div>
      </div>
    )
  }

  const levelData = calculateLevel(profileData?.totalXp || 0)
  const userBadges = profileData?.badges || []

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-ghoul-red mb-8">Profil</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Colonne gauche - Infos principales */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carte de niveau */}
            <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
                  <p className="text-ghoul-red font-semibold">{levelData.title}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-ghoul-red">
                    Niv. {levelData.level}
                  </div>
                  <p className="text-sm text-gray-400">{levelData.totalXp} XP</p>
                </div>
              </div>

              {/* Barre de progression */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Progression</span>
                  <span className="text-white">
                    {levelData.xpProgress} / {levelData.xpNeeded} XP
                  </span>
                </div>
                <div className="w-full bg-ghoul-dark rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-ghoul-red to-red-600 h-full transition-all duration-500"
                    style={{ width: `${levelData.progressPercent}%` }}
                  />
                </div>
                {levelData.nextLevel && (
                  <p className="text-xs text-gray-500 text-center">
                    Prochain niveau : {levelData.nextLevel}
                  </p>
                )}
              </div>

              {/* Bonus de niveau */}
              {levelData.bonus && Object.keys(levelData.bonus).length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h3 className="text-sm font-bold text-ghoul-red mb-2 flex items-center">
                    <Zap size={16} className="mr-2" />
                    Bonus actifs
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {levelData.bonus.statsBoost && (
                      <span className="px-3 py-1 bg-ghoul-red/20 text-ghoul-red rounded-full text-xs">
                        +{levelData.bonus.statsBoost} Stats
                      </span>
                    )}
                    {levelData.bonus.unlockCustomization && (
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                        Personnalisation débloquée
                      </span>
                    )}
                    {levelData.bonus.unlockLegendary && (
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                        Légendaires débloqués
                      </span>
                    )}
                    {levelData.bonus.unlockMythic && (
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                        Mythiques débloqués
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Statistiques */}
            <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <TrendingUp size={20} className="mr-2 text-ghoul-red" />
                Statistiques
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-ghoul-dark rounded-lg">
                  <div className="text-2xl font-bold text-ghoul-red">
                    {profileData?.stats?.cardsGenerated || 0}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Cartes générées</div>
                </div>
                <div className="text-center p-4 bg-ghoul-dark rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">
                    {profileData?.stats?.cardsSaved || 0}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Cartes sauvegardées</div>
                </div>
                <div className="text-center p-4 bg-ghoul-dark rounded-lg">
                  <div className="text-2xl font-bold text-green-400">
                    {profileData?.stats?.cardsShared || 0}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Cartes partagées</div>
                </div>
                <div className="text-center p-4 bg-ghoul-dark rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">
                    {profileData?.currency || 0}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Monnaie</div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Award size={20} className="mr-2 text-ghoul-red" />
                Badges ({userBadges.length})
              </h3>
              {userBadges.length > 0 ? (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  {userBadges.map(badgeId => {
                    const badge = BADGES[badgeId]
                    if (!badge) return null
                    return (
                      <div 
                        key={badgeId}
                        className="flex flex-col items-center p-3 bg-ghoul-dark rounded-lg hover:bg-ghoul-dark/70 transition-colors"
                        title={badge.description}
                      >
                        <div className="text-4xl mb-2">{badge.icon}</div>
                        <div className="text-xs text-center text-gray-300">{badge.name}</div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  Aucun badge débloqué pour le moment
                </p>
              )}
            </div>
          </div>

          {/* Colonne droite - Missions rapides */}
          <div className="space-y-6">
            <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Target size={20} className="mr-2 text-ghoul-red" />
                Missions du jour
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-ghoul-dark rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white">Générer 3 cartes</span>
                    <span className="text-xs text-ghoul-red">+100 XP</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-ghoul-red h-full rounded-full" style={{ width: '66%' }} />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">2/3</div>
                </div>
                <div className="p-3 bg-ghoul-dark rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white">Sauvegarder 2 cartes</span>
                    <span className="text-xs text-ghoul-red">+75 XP</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-ghoul-red h-full rounded-full" style={{ width: '50%' }} />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">1/2</div>
                </div>
              </div>
              <button className="w-full mt-4 btn-secondary text-sm">
                Voir toutes les missions
              </button>
            </div>

            <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Trophy size={20} className="mr-2 text-ghoul-red" />
                Achievements
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-ghoul-dark rounded">
                  <span className="text-gray-300">Première carte</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-ghoul-dark rounded">
                  <span className="text-gray-300">10 cartes</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-ghoul-dark/50 rounded">
                  <span className="text-gray-500">50 cartes</span>
                  <span className="text-gray-600">✗</span>
                </div>
              </div>
              <button className="w-full mt-4 btn-secondary text-sm">
                Voir tous les achievements
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
