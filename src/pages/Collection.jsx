import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'
import html2canvas from 'html2canvas'
import { Trash2, Download, Loader, BookOpen } from 'lucide-react'

function Collection() {
  const { token } = useAuth()
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCard, setSelectedCard] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const cardRef = useRef(null)

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    try {
      const response = await fetch('/.netlify/functions/cards', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setCards(data.cards || [])
      }
    } catch (error) {
      console.error('Fetch cards error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (cardId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      return
    }

    setDeleting(cardId)

    try {
      const response = await fetch('/.netlify/functions/cards', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ cardId }),
      })

      if (response.ok) {
        setCards(cards.filter(c => c.id !== cardId))
        if (selectedCard?.id === cardId) {
          setSelectedCard(null)
        }
      }
    } catch (error) {
      console.error('Delete error:', error)
    } finally {
      setDeleting(null)
    }
  }

  const handleExport = async (card) => {
    setSelectedCard(card)
    
    // Wait for card to render
    setTimeout(async () => {
      if (!cardRef.current) return

      try {
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: '#0a0a0a',
          scale: 2,
        })

        const link = document.createElement('a')
        link.download = `tokyo-ghoul-card-${card.name.replace(/\s+/g, '-')}.png`
        link.href = canvas.toDataURL()
        link.click()
      } catch (error) {
        console.error('Export error:', error)
      }
    }, 100)
  }

  const getRarityColor = (rarity) => {
    const colors = {
      'D': 'border-gray-500',
      'C': 'border-green-500',
      'B': 'border-blue-500',
      'A': 'border-purple-500',
      'S': 'border-yellow-500',
      'SS': 'border-orange-500',
      'SS+': 'border-red-500',
    }
    return colors[rarity] || 'border-gray-500'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3 text-ghoul-red">
          <Loader className="animate-spin" size={32} />
          <span className="text-xl">Chargement de votre collection...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <BookOpen size={32} className="text-ghoul-red" />
            <h1 className="text-4xl font-bold text-ghoul-red">Ma Collection</h1>
          </div>
          <div className="text-gray-400">
            {cards.length} carte{cards.length > 1 ? 's' : ''}
          </div>
        </div>

        {cards.length === 0 ? (
          <div className="bg-ghoul-gray rounded-lg border border-gray-700 p-12 text-center">
            <BookOpen size={64} className="mx-auto mb-4 text-gray-600" />
            <p className="text-xl text-gray-400 mb-4">Votre collection est vide</p>
            <p className="text-gray-500 mb-6">
              Générez votre première carte pour commencer votre collection !
            </p>
            <a
              href="/generator"
              className="inline-block bg-ghoul-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Générer une carte
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`bg-ghoul-gray rounded-lg border-2 ${getRarityColor(card.rarity)} overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer`}
                onClick={() => setSelectedCard(card)}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white truncate">{card.name}</h3>
                    <span className="text-sm font-bold text-ghoul-red">{card.rarity}</span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>Grade:</span>
                      <span className="text-gray-300">{card.rank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="text-gray-300">{card.inspectorType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Arme:</span>
                      <span className="text-gray-300">{card.weapon}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Score:</span>
                      <span className="text-ghoul-red font-bold">{card.totalScore}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleExport(card)
                      }}
                      className="flex-1 bg-ccg-blue hover:bg-blue-700 text-white py-2 rounded transition-colors flex items-center justify-center space-x-2"
                    >
                      <Download size={16} />
                      <span className="text-xs">Export</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(card.id)
                      }}
                      disabled={deleting === card.id}
                      className="bg-red-900 hover:bg-red-800 text-white py-2 px-3 rounded transition-colors disabled:opacity-50"
                    >
                      {deleting === card.id ? (
                        <Loader className="animate-spin" size={16} />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for card preview */}
        {selectedCard && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCard(null)}
          >
            <div
              className="max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex justify-end">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="bg-ghoul-red hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Fermer
                </button>
              </div>
              <div ref={cardRef}>
                <Card cardData={selectedCard} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection
