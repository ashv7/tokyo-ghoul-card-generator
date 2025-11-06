import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { MISSIONS, checkMissionProgress, claimMissionReward } from '../utils/experienceSystem'
import { Target, Trophy, Calendar, Clock, Gift, CheckCircle } from 'lucide-react'

function Missions() {
  const { token } = useAuth()
  const [activeTab, setActiveTab] = useState('daily')
  const [userStats, setUserStats] = useState({})
  const [completedMissions, setCompletedMissions] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (token) {
      fetchUserStats()
    }
  }, [token])

  const fetchUserStats = async () => {
    try {
      const response = await fetch('/api/user/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setUserStats(data.stats || {})
      setCompletedMissions(data.completedMissions || [])
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleClaimReward = async (mission) => {
    try {
      const response = await fetch('/api/missions/claim', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ missionId: mission.id })
      })

      if (response.ok) {
        setMessage(`Récompense réclamée : +${mission.reward.xp} XP, +${mission.reward.currency} 💰`)
        fetchUserStats()
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      console.error('Error claiming reward:', error)
    }
  }

  const renderMissionCard = (mission) => {
    const progress = checkMissionProgress(mission, userStats)
    const isCompleted = completedMissions.includes(mission.id)
    const canClaim = progress.completed && !isCompleted

    return (
      <div 
        key={mission.id}
        className={`bg-ghoul-gray p-4 rounded-lg border-2 transition-all ${
          canClaim 
            ? 'border-ghoul-red shadow-lg shadow-ghoul-red/20' 
            : isCompleted
            ? 'border-green-500/30 opacity-60'
            : 'border-gray-700'
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">{mission.name}</h3>
            <p className="text-sm text-gray-400">{mission.description}</p>
          </div>
          {isCompleted && (
            <CheckCircle size={24} className="text-green-500 ml-2" />
          )}
        </div>

        {/* Progression */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-400">Progression</span>
            <span className="text-white">
              {progress.progress} / {progress.required}
            </span>
          </div>
          <div className="w-full bg-ghoul-dark rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                progress.completed ? 'bg-green-500' : 'bg-ghoul-red'
              }`}
              style={{ width: `${Math.min(progress.percentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Récompenses */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-yellow-400 flex items-center">
              <Gift size={16} className="mr-1" />
              +{mission.reward.xp} XP
            </span>
            <span className="text-green-400 flex items-center">
              💰 +{mission.reward.currency}
            </span>
            {mission.reward.badge && (
              <span className="text-purple-400">🏆 Badge</span>
            )}
          </div>
          {canClaim && (
            <button
              onClick={() => handleClaimReward(mission)}
              className="btn-primary text-sm py-1 px-4"
            >
              Réclamer
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-ghoul-red mb-8">Missions & Achievements</h1>

        {message && (
          <div className="mb-6 p-4 bg-green-900/50 text-green-200 rounded-lg border border-green-500">
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-6 py-3 font-semibold transition-colors flex items-center space-x-2 ${
              activeTab === 'daily'
                ? 'text-ghoul-red border-b-2 border-ghoul-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Calendar size={20} />
            <span>Quotidiennes</span>
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-6 py-3 font-semibold transition-colors flex items-center space-x-2 ${
              activeTab === 'weekly'
                ? 'text-ghoul-red border-b-2 border-ghoul-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Clock size={20} />
            <span>Hebdomadaires</span>
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-3 font-semibold transition-colors flex items-center space-x-2 ${
              activeTab === 'achievements'
                ? 'text-ghoul-red border-b-2 border-ghoul-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Trophy size={20} />
            <span>Achievements</span>
          </button>
        </div>

        {/* Missions quotidiennes */}
        {activeTab === 'daily' && (
          <div className="space-y-4">
            <div className="bg-ghoul-gray p-4 rounded-lg border border-gray-700 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Target size={24} className="text-ghoul-red" />
                  <div>
                    <h2 className="text-lg font-bold text-white">Missions quotidiennes</h2>
                    <p className="text-sm text-gray-400">Se réinitialise dans 12h 34min</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-ghoul-red">
                    {MISSIONS.daily.filter(m => checkMissionProgress(m, userStats).completed).length}/{MISSIONS.daily.length}
                  </div>
                  <div className="text-xs text-gray-400">Complétées</div>
                </div>
              </div>
            </div>
            {MISSIONS.daily.map(renderMissionCard)}
          </div>
        )}

        {/* Missions hebdomadaires */}
        {activeTab === 'weekly' && (
          <div className="space-y-4">
            <div className="bg-ghoul-gray p-4 rounded-lg border border-gray-700 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock size={24} className="text-ghoul-red" />
                  <div>
                    <h2 className="text-lg font-bold text-white">Missions hebdomadaires</h2>
                    <p className="text-sm text-gray-400">Se réinitialise dans 4 jours</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-ghoul-red">
                    {MISSIONS.weekly.filter(m => checkMissionProgress(m, userStats).completed).length}/{MISSIONS.weekly.length}
                  </div>
                  <div className="text-xs text-gray-400">Complétées</div>
                </div>
              </div>
            </div>
            {MISSIONS.weekly.map(renderMissionCard)}
          </div>
        )}

        {/* Achievements */}
        {activeTab === 'achievements' && (
          <div className="space-y-4">
            <div className="bg-ghoul-gray p-4 rounded-lg border border-gray-700 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Trophy size={24} className="text-ghoul-red" />
                  <div>
                    <h2 className="text-lg font-bold text-white">Achievements</h2>
                    <p className="text-sm text-gray-400">Défis permanents</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-ghoul-red">
                    {MISSIONS.achievements.filter(m => completedMissions.includes(m.id)).length}/{MISSIONS.achievements.length}
                  </div>
                  <div className="text-xs text-gray-400">Débloqués</div>
                </div>
              </div>
            </div>
            {MISSIONS.achievements.map(renderMissionCard)}
          </div>
        )}
      </div>
    </div>
  )
}

export default Missions
