// ========================================
// SYSTÈME GOULE - Basé sur les Kagune et RC Cells
// ========================================

export const GHOUL_SYSTEM = {
  // Types de Kagune (remplace les grades CCG)
  kagune_types: [
    { type: 'Ukaku', rarity: 'C', description: 'Kagune ailé, rapide mais faible en endurance' },
    { type: 'Koukaku', rarity: 'B', description: 'Kagune défensif, haute résistance' },
    { type: 'Rinkaku', rarity: 'A', description: 'Kagune tentaculaire, force brute' },
    { type: 'Bikaku', rarity: 'B', description: 'Kagune équilibré, polyvalent' },
    { type: 'Chimera', rarity: 'S', description: 'Kagune hybride, deux types' },
    { type: 'Kakuja', rarity: 'SS', description: 'Kagune évolué, forme monstrueuse' },
    { type: 'Kakuja Complet', rarity: 'SS+', description: 'Maîtrise totale du Kakuja' }
  ],

  // Compétences spécifiques aux goules
  skills: [
    'Cellules RC élevées',
    'Régénération avancée',
    'Force décuplée',
    'Vitesse surhumaine',
    'Sens aiguisés',
    'Résistance à la douleur',
    'Chasse nocturne',
    'Camouflage humain'
  ],

  // Rangs de menace (équivalent des grades)
  threat_ranks: [
    { rank: 'C', name: 'Goule Mineure', scoreMin: 0, scoreMax: 14 },
    { rank: 'B', name: 'Goule Dangereuse', scoreMin: 15, scoreMax: 19 },
    { rank: 'A', name: 'Goule Redoutable', scoreMin: 20, scoreMax: 24 },
    { rank: 'S', name: 'Goule Dévastatrice', scoreMin: 25, scoreMax: 29 },
    { rank: 'SS', name: 'Goule Légendaire', scoreMin: 30, scoreMax: 35 },
    { rank: 'SS+', name: 'Goule Mythique', scoreMin: 36, scoreMax: 48 }
  ],

  // Types de goules (remplace inspecteur Terrain/Bureau)
  ghoul_types: [
    { type: 'Prédateur', description: 'Chasseur agressif, combat direct' },
    { type: 'Furtif', description: 'Discret, évite les confrontations' },
    { type: 'Territorial', description: 'Défend son territoire' },
    { type: 'Nomade', description: 'Se déplace constamment' }
  ],

  // Capacités spéciales (remplace les armes)
  special_abilities: [
    {
      name: 'Régénération éclair',
      kagune: 'Rinkaku',
      skills: ['Régénération avancée', 'Cellules RC élevées']
    },
    {
      name: 'Projectiles RC',
      kagune: 'Ukaku',
      skills: ['Vitesse surhumaine', 'Sens aiguisés']
    },
    {
      name: 'Bouclier kagune',
      kagune: 'Koukaku',
      skills: ['Résistance à la douleur', 'Force décuplée']
    },
    {
      name: 'Fouet tranchant',
      kagune: 'Bikaku',
      skills: ['Force décuplée', 'Vitesse surhumaine']
    },
    {
      name: 'Forme Kakuja',
      kagune: 'Kakuja',
      skills: ['Cellules RC élevées', 'Régénération avancée']
    }
  ],

  // Équipement de goule
  equipment: {
    masks: [
      { name: 'Masque simple', bonus: 'Camouflage +1' },
      { name: 'Masque renforcé', bonus: 'Protection +2' },
      { name: 'Masque personnalisé', bonus: 'Intimidation +2' },
      { name: 'Masque légendaire', bonus: 'Identité cachée +3' }
    ],
    accessories: [
      { name: 'Vêtements résistants', bonus: 'Durabilité +1' },
      { name: 'Gants anti-traces', bonus: 'Discrétion +2' },
      { name: 'Cape de camouflage', bonus: 'Furtivité +2' }
    ],
    supplies: [
      { name: 'Réserve de nourriture', bonus: 'Autonomie +1' },
      { name: 'Trousse médicale', bonus: 'Régénération +1' },
      { name: 'Kit de survie', bonus: 'Adaptabilité +1' }
    ]
  },

  // Territoires (remplace les divisions)
  territories: [
    { ward: '1er Arrondissement', area: 'Tokyo - Centre', danger: 'Élevé' },
    { ward: '4ème Arrondissement', area: 'Tokyo - Shinjuku', danger: 'Très élevé' },
    { ward: '11ème Arrondissement', area: 'Tokyo - Aogiri', danger: 'Extrême' },
    { ward: '13ème Arrondissement', area: 'Tokyo - Sud', danger: 'Modéré' },
    { ward: '20ème Arrondissement', area: 'Tokyo - Anteiku', danger: 'Faible' },
    { ward: '24ème Arrondissement', area: 'Tokyo - Souterrain', danger: 'Inconnu' }
  ],

  // Traits de personnalité spécifiques
  personalities: [
    { name: 'Sauvage', description: 'Instincts primaires dominants' },
    { name: 'Contrôlé', description: 'Maîtrise ses pulsions' },
    { name: 'Affamé', description: 'Constamment en quête de nourriture' },
    { name: 'Pacifique', description: 'Évite de tuer' },
    { name: 'Sadique', description: 'Prend plaisir à la chasse' },
    { name: 'Tourmenté', description: 'Lutte avec sa nature' },
    { name: 'Dominant', description: 'Cherche à régner' },
    { name: 'Survivant', description: 'Fait ce qu\'il faut pour vivre' }
  ]
}

// ========================================
// SYSTÈME ANTEIKU - Organisation pacifiste
// ========================================

export const ANTEIKU_SYSTEM = {
  // Rôles au sein d'Anteiku (remplace les grades)
  roles: [
    { role: 'Apprenti', rarity: 'C', description: 'Nouveau membre en formation' },
    { role: 'Serveur', rarity: 'B', description: 'Membre actif du café' },
    { role: 'Protecteur', rarity: 'A', description: 'Défenseur de l\'organisation' },
    { role: 'Mentor', rarity: 'S', description: 'Guide les nouveaux' },
    { role: 'Gardien', rarity: 'SS', description: 'Pilier d\'Anteiku' },
    { role: 'Manager', rarity: 'SS+', description: 'Leader de l\'organisation' }
  ],

  // Compétences Anteiku
  skills: [
    'Contrôle du kagune',
    'Empathie humaine',
    'Cuisine et service',
    'Médiation de conflits',
    'Protection des faibles',
    'Collecte éthique',
    'Discrétion sociale',
    'Sagesse et patience'
  ],

  // Niveaux d'expérience (remplace les rangs)
  experience_levels: [
    { level: 'Novice', name: 'Nouveau venu', scoreMin: 0, scoreMax: 14 },
    { level: 'Initié', name: 'Membre accepté', scoreMin: 15, scoreMax: 19 },
    { level: 'Confirmé', name: 'Membre de confiance', scoreMin: 20, scoreMax: 24 },
    { level: 'Vétéran', name: 'Pilier du groupe', scoreMin: 25, scoreMax: 29 },
    { level: 'Sage', name: 'Conseiller respecté', scoreMin: 30, scoreMax: 35 },
    { level: 'Légende', name: 'Figure emblématique', scoreMin: 36, scoreMax: 48 }
  ],

  // Spécialisations (remplace Terrain/Bureau)
  specializations: [
    { type: 'Barista', description: 'Expert en service et relations' },
    { type: 'Collecteur', description: 'Recherche de nourriture éthique' },
    { type: 'Protecteur', description: 'Défense du café et des membres' },
    { type: 'Médiateur', description: 'Résolution de conflits' }
  ],

  // Capacités pacifistes (remplace les armes)
  peaceful_abilities: [
    {
      name: 'Kagune défensif',
      specialization: 'Protecteur',
      skills: ['Contrôle du kagune', 'Protection des faibles']
    },
    {
      name: 'Négociation',
      specialization: 'Médiateur',
      skills: ['Empathie humaine', 'Médiation de conflits']
    },
    {
      name: 'Collecte discrète',
      specialization: 'Collecteur',
      skills: ['Discrétion sociale', 'Collecte éthique']
    },
    {
      name: 'Service chaleureux',
      specialization: 'Barista',
      skills: ['Cuisine et service', 'Empathie humaine']
    },
    {
      name: 'Sagesse du manager',
      specialization: 'Protecteur',
      skills: ['Sagesse et patience', 'Protection des faibles']
    }
  ],

  // Équipement Anteiku
  equipment: {
    work_items: [
      { name: 'Tablier du café', bonus: 'Charisme +2' },
      { name: 'Carnet de notes', bonus: 'Organisation +1' },
      { name: 'Clés du café', bonus: 'Responsabilité +2' },
      { name: 'Badge de manager', bonus: 'Autorité +3' }
    ],
    protective_gear: [
      { name: 'Masque simple', bonus: 'Anonymat +1' },
      { name: 'Vêtements renforcés', bonus: 'Protection +1' },
      { name: 'Équipement de fuite', bonus: 'Évasion +2' }
    ],
    supplies: [
      { name: 'Café de qualité', bonus: 'Moral +1' },
      { name: 'Provisions d\'urgence', bonus: 'Survie +1' },
      { name: 'Trousse de premiers soins', bonus: 'Soin +2' }
    ]
  },

  // Zones d'opération
  areas: [
    { location: 'Café Anteiku', ward: '20ème', status: 'Base principale' },
    { location: 'Entrepôt secret', ward: '20ème', status: 'Stockage' },
    { location: 'Points de collecte', ward: '20ème', status: 'Zones sûres' },
    { location: 'Refuges', ward: '20ème', status: 'Abris d\'urgence' },
    { location: 'Réseau souterrain', ward: '24ème', status: 'Voies d\'évacuation' }
  ],

  // Traits de personnalité Anteiku
  personalities: [
    { name: 'Bienveillant', description: 'Aide naturellement les autres' },
    { name: 'Réservé', description: 'Discret et observateur' },
    { name: 'Dévoué', description: 'Loyal envers Anteiku' },
    { name: 'Optimiste', description: 'Croit en la coexistence' },
    { name: 'Protecteur', description: 'Défend les siens' },
    { name: 'Sage', description: 'Réfléchi et posé' },
    { name: 'Accueillant', description: 'Ouvert aux nouveaux' },
    { name: 'Résolu', description: 'Déterminé malgré les épreuves' }
  ]
}

// ========================================
// SYSTÈME AOGIRI TREE - Organisation terroriste
// ========================================

export const AOGIRI_SYSTEM = {
  // Rangs hiérarchiques (remplace les grades CCG)
  ranks: [
    { rank: 'Recrue', rarity: 'C', description: 'Nouveau membre sans expérience' },
    { rank: 'Soldat', rarity: 'B', description: 'Combattant de base' },
    { rank: 'Exécuteur', rarity: 'A', description: 'Membre d\'élite' },
    { rank: 'Commandant', rarity: 'S', description: 'Leader d\'escouade' },
    { rank: 'Exécutif', rarity: 'SS', description: 'Haut commandement' },
    { rank: 'Subordonné direct', rarity: 'SS+', description: 'Bras droit du Roi' }
  ],

  // Compétences Aogiri
  skills: [
    'Combat brutal',
    'Tactiques de guérilla',
    'Intimidation',
    'Coordination d\'attaque',
    'Résistance extrême',
    'Cruauté calculée',
    'Loyauté absolue',
    'Domination territoriale'
  ],

  // Niveaux de puissance (remplace les rangs)
  power_levels: [
    { level: 'Faible', name: 'Chair à canon', scoreMin: 0, scoreMax: 14 },
    { level: 'Moyen', name: 'Combattant fiable', scoreMin: 15, scoreMax: 19 },
    { level: 'Fort', name: 'Guerrier redoutable', scoreMin: 20, scoreMax: 24 },
    { level: 'Très fort', name: 'Élite d\'Aogiri', scoreMin: 25, scoreMax: 29 },
    { level: 'Extrême', name: 'Légende vivante', scoreMin: 30, scoreMax: 35 },
    { level: 'Absolu', name: 'Force de la nature', scoreMin: 36, scoreMax: 48 }
  ],

  // Rôles de combat (remplace Terrain/Bureau)
  combat_roles: [
    { type: 'Assaillant', description: 'Attaque frontale, force brute' },
    { type: 'Assassin', description: 'Éliminations ciblées, furtivité' },
    { type: 'Tacticien', description: 'Planification et coordination' },
    { type: 'Berserker', description: 'Destruction massive, sans retenue' }
  ],

  // Techniques de combat (remplace les armes)
  combat_techniques: [
    {
      name: 'Assaut Kagune',
      role: 'Assaillant',
      skills: ['Combat brutal', 'Résistance extrême']
    },
    {
      name: 'Frappe silencieuse',
      role: 'Assassin',
      skills: ['Tactiques de guérilla', 'Cruauté calculée']
    },
    {
      name: 'Commandement de terrain',
      role: 'Tacticien',
      skills: ['Coordination d\'attaque', 'Domination territoriale']
    },
    {
      name: 'Déchaînement Kakuja',
      role: 'Berserker',
      skills: ['Combat brutal', 'Résistance extrême']
    },
    {
      name: 'Terreur psychologique',
      role: 'Assaillant',
      skills: ['Intimidation', 'Cruauté calculée']
    }
  ],

  // Équipement Aogiri
  equipment: {
    combat_gear: [
      { name: 'Masque Aogiri', bonus: 'Intimidation +2' },
      { name: 'Armure de combat', bonus: 'Défense +3' },
      { name: 'Tenue tactique', bonus: 'Mobilité +2' },
      { name: 'Insigne d\'exécutif', bonus: 'Autorité +3' }
    ],
    weapons: [
      { name: 'Lames kagune renforcées', bonus: 'Attaque +2' },
      { name: 'Griffes acérées', bonus: 'Vitesse +2' },
      { name: 'Projectiles RC', bonus: 'Portée +2' }
    ],
    tactical: [
      { name: 'Communicateur crypté', bonus: 'Coordination +2' },
      { name: 'Fumigènes', bonus: 'Évasion +1' },
      { name: 'Explosifs RC', bonus: 'Destruction +3' }
    ]
  },

  // Bases d'opération
  bases: [
    { location: '11ème Arrondissement', area: 'Base principale', control: 'Total' },
    { location: '18ème Arrondissement', area: 'Avant-poste', control: 'Élevé' },
    { location: 'Île de Rushima', area: 'Forteresse', control: 'Absolu' },
    { location: '6ème Arrondissement', area: 'Cellule cachée', control: 'Secret' },
    { location: '24ème Arrondissement', area: 'Laboratoire', control: 'Sécurisé' }
  ],

  // Traits de personnalité Aogiri
  personalities: [
    { name: 'Impitoyable', description: 'Aucune pitié pour les ennemis' },
    { name: 'Fanatique', description: 'Dévoué à la cause' },
    { name: 'Ambitieux', description: 'Cherche le pouvoir' },
    { name: 'Sadique', description: 'Prend plaisir au combat' },
    { name: 'Loyal', description: 'Fidèle à Aogiri' },
    { name: 'Calculateur', description: 'Stratège froid' },
    { name: 'Rebelle', description: 'Défie l\'ordre établi' },
    { name: 'Vengeur', description: 'Haine du CCG' }
  ]
}

// ========================================
// SYSTÈME CCG - Commission of Counter Ghoul
// ========================================

export const CCG_SYSTEM = {
  // Grades CCG (original)
  ranks: [
    { rank: 'Rang 3', rarity: 'D', description: 'Débutant' },
    { rank: 'Rang 2', rarity: 'C', description: 'Inspecteur junior' },
    { rank: 'Rang 1', rarity: 'B', description: 'Inspecteur confirmé' },
    { rank: 'Première Classe', rarity: 'A', description: 'Inspecteur d\'élite' },
    { rank: 'Classe Spéciale', rarity: 'S', description: 'Inspecteur légendaire' },
    { rank: 'Classe Spéciale S3', rarity: 'SS', description: 'Inspecteur exceptionnel' },
    { rank: 'Classe Spéciale S1', rarity: 'SS+', description: 'Inspecteur mythique' }
  ],

  // Compétences CCG (original)
  skills: [
    'Force surhumaine',
    'Régénération rapide',
    'Analyse tactique',
    'Discrétion',
    'Résistance mentale',
    'Adaptabilité',
    'Détection des goules',
    'Prédateur nocturne'
  ],

  // Types d'inspecteurs (original)
  inspector_types: [
    { type: 'Terrain', description: 'Combat direct, force' },
    { type: 'Bureau', description: 'Analyse, stratégie' }
  ],

  // Divisions (original)
  divisions: [
    { name: '1ère Division', area: 'Tokyo - Centre' },
    { name: '2ème Division', area: 'Tokyo - Est' },
    { name: '11ème Division', area: 'Tokyo - Nord' },
    { name: '13ème Division', area: 'Tokyo - Sud' },
    { name: '20ème Division', area: 'Tokyo - Nerima' }
  ]
}
