import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Sparkles, Shield, Users, Trophy } from 'lucide-react'

function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center animate-fade-in">
          <h1 className="text-6xl font-bold text-ghoul-red mb-6">
            Tokyo Ghoul Card Generator
          </h1>
          <p className="text-2xl text-gray-300 mb-12">
            Créez votre carte d'inspecteur CCG personnalisée
          </p>

          {user ? (
            <Link
              to="/generator"
              className="inline-flex items-center space-x-2 bg-ghoul-red hover:bg-red-700 text-white text-xl font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 pulse-glow"
            >
              <Sparkles size={24} />
              <span>Générer ma carte</span>
            </Link>
          ) : (
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 bg-ghoul-red hover:bg-red-700 text-white text-xl font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>Commencer</span>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 bg-ghoul-gray hover:bg-gray-700 text-white text-xl font-bold py-4 px-8 rounded-lg transition-all duration-300"
              >
                <span>Se connecter</span>
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700 hover:border-ghoul-red transition-colors">
            <div className="text-ghoul-red mb-4">
              <Sparkles size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">Génération unique</h3>
            <p className="text-gray-400">
              Chaque carte est unique avec des compétences et attributs générés aléatoirement
            </p>
          </div>

          <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700 hover:border-ghoul-red transition-colors">
            <div className="text-ghoul-red mb-4">
              <Shield size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">Système de grades</h3>
            <p className="text-gray-400">
              Du simple inspecteur au directeur, gravissez les échelons du CCG
            </p>
          </div>

          <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700 hover:border-ghoul-red transition-colors">
            <div className="text-ghoul-red mb-4">
              <Users size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">Collection</h3>
            <p className="text-gray-400">
              Sauvegardez vos cartes et constituez votre collection personnelle
            </p>
          </div>

          <div className="bg-ghoul-gray p-6 rounded-lg border border-gray-700 hover:border-ghoul-red transition-colors">
            <div className="text-ghoul-red mb-4">
              <Trophy size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">Rareté</h3>
            <p className="text-gray-400">
              Système de rareté de D à SS+ pour des cartes légendaires
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-20 bg-ghoul-gray p-8 rounded-lg border border-gray-700">
          <h2 className="text-3xl font-bold text-ghoul-red mb-6">
            À propos du générateur
          </h2>
          <div className="text-gray-300 space-y-4">
            <p>
              Plongez dans l'univers de Tokyo Ghoul et créez votre propre carte d'inspecteur du CCG.
              Notre système intelligent génère des personnages uniques avec :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>8 compétences différentes avec des scores aléatoires</li>
              <li>Un grade CCG calculé selon vos performances</li>
              <li>Une arme adaptée à votre profil de combattant</li>
              <li>Un type d'inspecteur (Terrain ou Bureau)</li>
              <li>Un identifiant unique avec QR code</li>
              <li>Une description immersive de votre personnage</li>
            </ul>
            <p className="mt-4">
              Exportez vos cartes, partagez-les avec vos amis et constituez votre collection !
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
