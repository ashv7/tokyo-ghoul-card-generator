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
            Créez votre carte personnalisée : Inspecteur CCG, Goule, Anteiku ou Aogiri Tree
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
              Plongez dans l'univers de Tokyo Ghoul et créez votre propre carte personnalisée.
              Choisissez votre faction et notre système intelligent génère des personnages uniques avec :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>CCG (Commission Contre les Goules)</strong> : Inspecteurs avec grades, quinques et divisions officielles</li>
              <li><strong>Goule</strong> : Créatures avec kagune, types RC et capacités de prédation</li>
              <li><strong>Anteiku</strong> : Membres du café pacifiste avec rôles et philosophie de coexistence</li>
              <li><strong>Aogiri Tree</strong> : Organisation militante avec rangs, objectifs et pouvoirs destructeurs</li>
              <li>8 compétences uniques par faction avec scores aléatoires</li>
              <li>Système de rareté de D à SS+ pour chaque faction</li>
              <li>Armes et capacités adaptées à votre profil</li>
              <li>Identifiant unique avec QR code</li>
              <li>Description immersive de votre personnage</li>
            </ul>
            <p className="mt-4">
              Exportez vos cartes en format carte complète ou carte d'identité, partagez-les avec vos amis et constituez votre collection multi-factions !
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
