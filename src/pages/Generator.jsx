import { useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { generateCardByFaction, CARD_THEMES } from '../utils/cardGeneratorUnified'
import Card from '../components/Card'
import CardID from '../components/CardID'
import CardGhoul from '../components/CardGhoul'
import CardAnteiku from '../components/CardAnteiku'
import CardAogiri from '../components/CardAogiri'
import html2canvas from 'html2canvas'
import { Sparkles, Download, Save, RefreshCw, Upload, Share2, CreditCard, FileText } from 'lucide-react'

function Generator() {
  const { token } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    photo: null,
  })
  const [selectedTheme, setSelectedTheme] = useState('ccg')
  const [exportFormat, setExportFormat] = useState('card') // 'card' ou 'id'
  const [cardData, setCardData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const cardRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = () => {
    if (!formData.name || !formData.birthdate) {
      setMessage('Veuillez remplir tous les champs obligatoires')
      return
    }

    setLoading(true)
    setMessage('')

    // Simulate generation delay for effect
    setTimeout(() => {
      const newCard = generateCardByFaction(formData, { theme: selectedTheme })
      setCardData(newCard)
      setLoading(false)
    }, 1000)
  }

  const handleRegenerate = () => {
    if (cardData) {
      setLoading(true)
      setTimeout(() => {
        const newCard = generateCardByFaction(formData, { theme: selectedTheme })
        setCardData(newCard)
        setLoading(false)
      }, 1000)
    }
  }

  const handleShare = async () => {
    if (!cardData) return

    const shareData = {
      title: `Carte CCG - ${cardData.name}`,
      text: `Découvrez ma carte d'inspecteur CCG : ${cardData.name} - Grade ${cardData.rank} (${cardData.rarity})`,
      url: window.location.href
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setMessage('Carte partagée avec succès !')
      } else {
        // Fallback: copier dans le presse-papier
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`)
        setMessage('Lien copié dans le presse-papier !')
      }
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Share error:', error)
    }
  }

  const handleExport = async () => {
    if (!cardRef.current) return

    try {
      const theme = cardData.theme || { colors: { background: '#0a0a0a' } }
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: theme.colors.background,
        scale: 2,
      })

      const formatSuffix = exportFormat === 'id' ? 'id-card' : 'card'
      const link = document.createElement('a')
      link.download = `tokyo-ghoul-${formatSuffix}-${cardData.name.replace(/\s+/g, '-')}.png`
      link.href = canvas.toDataURL()
      link.click()

      setMessage(`Carte exportée en format ${exportFormat === 'id' ? "carte d'identité" : 'carte'} !`)
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Export error:', error)
      setMessage('Erreur lors de l\'export')
    }
  }

  const handleSave = async () => {
    if (!cardData) return

    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/.netlify/functions/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(cardData),
      })

      if (response.ok) {
        setMessage('Carte sauvegardée dans votre collection !')
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error('Failed to save card')
      }
    } catch (error) {
      console.error('Save error:', error)
      setMessage('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-ghoul-red mb-8 text-center">
          Générateur de Cartes Multi-Factions
        </h1>
        <p className="text-center text-gray-400 mb-8">
          CCG • Goule • Anteiku • Aogiri Tree
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Informations personnelles</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nom complet *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="birthdate" className="block text-sm font-medium text-gray-300 mb-2">
                    Date de naissance *
                  </label>
                  <input
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Photo de profil (optionnel)
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <Upload size={20} />
                      <span>Choisir une photo</span>
                    </button>
                    {formData.photo && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-ghoul-red">
                        <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

                {/* Sélecteur de thème */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Thème de la carte
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {CARD_THEMES.map(theme => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTheme === theme.id
                            ? 'border-ghoul-red bg-ghoul-red/20'
                            : 'border-gray-700 bg-ghoul-dark hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: theme.colors.primary }}
                          />
                          <span className="text-sm text-white">{theme.name}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{theme.style}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format d'export */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Format d'export
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setExportFormat('card')}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                        exportFormat === 'card'
                          ? 'border-ghoul-red bg-ghoul-red/20'
                          : 'border-gray-700 bg-ghoul-dark hover:border-gray-600'
                      }`}
                    >
                      <CreditCard size={20} />
                      <span className="text-sm text-white">Carte complète</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setExportFormat('id')}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                        exportFormat === 'id'
                          ? 'border-ghoul-red bg-ghoul-red/20'
                          : 'border-gray-700 bg-ghoul-dark hover:border-gray-600'
                      }`}
                    >
                      <FileText size={20} />
                      <span className="text-sm text-white">Carte d'identité</span>
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full mt-6 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Sparkles size={20} />
                <span>{loading ? 'Génération...' : 'Générer ma carte'}</span>
              </button>

              {message && (
                <div className={`mt-4 p-3 rounded-lg text-center ${
                  message.includes('Erreur') 
                    ? 'bg-red-900/50 text-red-200' 
                    : 'bg-green-900/50 text-green-200'
                }`}>
                  {message}
                </div>
              )}
            </div>

            {cardData && (
              <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleRegenerate}
                    disabled={loading}
                    className="btn-secondary flex flex-col items-center justify-center space-y-2 py-4"
                  >
                    <RefreshCw size={24} />
                    <span className="text-xs">Régénérer</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="btn-secondary flex flex-col items-center justify-center space-y-2 py-4"
                  >
                    <Share2 size={24} />
                    <span className="text-xs">Partager</span>
                  </button>
                  <button
                    onClick={handleExport}
                    className="btn-secondary flex flex-col items-center justify-center space-y-2 py-4"
                  >
                    <Download size={24} />
                    <span className="text-xs">Exporter</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary flex flex-col items-center justify-center space-y-2 py-4"
                  >
                    <Save size={24} />
                    <span className="text-xs">Sauvegarder</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Card Preview Section */}
          <div>
            {cardData ? (
              <div ref={cardRef} className="animate-fade-in">
                {exportFormat === 'id' ? (
                  <CardID cardData={cardData} />
                ) : (
                  <>
                    {selectedTheme === 'ghoul' && <CardGhoul cardData={cardData} />}
                    {selectedTheme === 'anteiku' && <CardAnteiku cardData={cardData} />}
                    {selectedTheme === 'aogiri' && <CardAogiri cardData={cardData} />}
                    {selectedTheme === 'ccg' && <Card cardData={cardData} />}
                  </>
                )}
              </div>
            ) : (
              <div className="bg-ghoul-gray rounded-lg border border-gray-700 p-12 flex items-center justify-center min-h-[600px]">
                <div className="text-center text-gray-500">
                  <Sparkles size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Remplissez le formulaire pour générer votre carte</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Generator
