function Footer() {
  return (
    <footer className="bg-ghoul-dark border-t border-gray-800 py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">
            Développé par
          </p>
          <p 
            className="text-2xl font-bold bg-gradient-to-r from-ghoul-red via-purple-500 to-ghoul-red bg-clip-text text-transparent"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Ashvii & Le Seigneur des Cendres
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
