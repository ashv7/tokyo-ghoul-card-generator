import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { User, LogOut, Home, Sparkles, BookOpen, Target, ShoppingBag, Swords, Trophy } from 'lucide-react'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-ghoul-dark border-b border-ghoul-red shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-ghoul-red">
              Tokyo Ghoul
            </div>
            <div className="text-sm text-gray-400">Card Generator</div>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-ghoul-red transition-colors"
            >
              <Home size={20} />
              <span>Accueil</span>
            </Link>

            {user ? (
              <>
                <Link
                  to="/generator"
                  className="flex items-center space-x-2 text-gray-300 hover:text-ghoul-red transition-colors"
                >
                  <Sparkles size={20} />
                  <span>Générateur</span>
                </Link>

                <Link
                  to="/collection"
                  className="flex items-center space-x-2 text-gray-300 hover:text-ghoul-red transition-colors"
                >
                  <BookOpen size={20} />
                  <span>Collection</span>
                </Link>

                <Link
                  to="/missions"
                  className="flex items-center space-x-2 text-gray-300 hover:text-ghoul-red transition-colors"
                >
                  <Target size={20} />
                  <span>Missions</span>
                </Link>

                <Link
                  to="/shop"
                  className="flex items-center space-x-2 text-gray-300 hover:text-ghoul-red transition-colors"
                >
                  <ShoppingBag size={20} />
                  <span>Boutique</span>
                </Link>

                <Link
                  to="/battle"
                  className="flex items-center space-x-2 text-gray-300 hover:text-ghoul-red transition-colors"
                >
                  <Swords size={20} />
                  <span>Bataille</span>
                </Link>

                <Link
                  to="/ranking"
                  className="flex items-center space-x-2 text-gray-300 hover:text-ghoul-red transition-colors"
                >
                  <Trophy size={20} />
                  <span>Classement</span>
                </Link>

                <div className="flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-300 hover:text-ghoul-red transition-colors"
                  >
                    <User size={20} />
                    <span>{user.username}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-300 hover:text-ghoul-red transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-ghoul-red transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-ghoul-red hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
