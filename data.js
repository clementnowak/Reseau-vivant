// Données pédagogiques, à compléter et vérifier lors des futures extensions.
window.ECO_DATA = {
  "title": "Réseau vivant — Savane",
  "version": "2.2.1",
  "validation": {
    "links": "149 relations issues d’ouvrages de référence généraux ; certaines relations rares ou surprenantes ont une source dédiée (champ source).",
    "scope": "illustrative_examples_across_multiple_savanna_contexts",
    "note": "Les relations sont illustratives et ne sont pas encore toutes vérifiées ni associées à une source individuelle.",
    "rangeMapping": "broad_regions_approximate_not_species_polygons",
    "new_species": "Fiches et régions indicatives; relations alimentaires non ajoutées tant qu’elles ne sont pas vérifiées individuellement",
    "human_interactions": "regional_trade_examples_from_TRAFFIC; distinguish legal hunting and illegal poaching"
  },
  "biome": "Savane africaine",
  "species": [
    {
      "id": "lion",
      "name": "Lion",
      "scientific": "Panthera leo",
      "group": "Mammifères",
      "emoji": "🦁",
      "diet": "Carnivore",
      "habitat": "Savane africaine",
      "description": "Le lion vit en groupes sociaux, souvent appelés troupes. Il chasse de grands herbivores, surtout dans des habitats ouverts.",
      "role": "Grand prédateur : il influence les populations d’herbivores et interagit avec d’autres carnivores.",
      "fun": "Son rugissement peut s’entendre à plusieurs kilomètres.",
      "protect": "Protéger les espaces naturels et limiter les conflits avec l’élevage.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ],
      "noPredator": "Un lion adulte n’a presque pas de prédateur. Ses petits, eux, peuvent être attaqués par des hyènes.",
      "keywords": "félin chat"
    },
    {
      "id": "hyene",
      "name": "Hyène tachetée",
      "scientific": "Crocuta crocuta",
      "group": "Mammifères",
      "emoji": "🐾",
      "diet": "Carnivore et charognard",
      "habitat": "Savane africaine",
      "description": "L’hyène tachetée est à la fois une chasseuse efficace et une consommatrice de carcasses.",
      "role": "Elle recycle une partie des restes animaux et rivalise avec les autres carnivores.",
      "fun": "Ses mâchoires très puissantes peuvent broyer des os.",
      "protect": "Éviter les empoisonnements et préserver ses habitats.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ],
      "noPredator": "Une hyène adulte a peu de prédateurs, mais les lions la tuent parfois."
    },
    {
      "id": "guepard",
      "name": "Guépard",
      "scientific": "Acinonyx jubatus",
      "group": "Mammifères",
      "emoji": "🐆",
      "diet": "Carnivore",
      "habitat": "Savane africaine",
      "description": "Spécialiste de la poursuite rapide sur de courtes distances, le guépard capture surtout des herbivores de taille modeste.",
      "role": "Il régule certaines populations de gazelles et d’antilopes.",
      "fun": "C’est l’animal terrestre le plus rapide, mais il s’épuise vite : ses sprints sont courts.",
      "protect": "Maintenir de grands espaces ouverts et des passages entre habitats.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "noPredator": "Les lions et les hyènes peuvent tuer des guépards, surtout les petits, et voler leurs proies.",
      "keywords": "félin chat"
    },
    {
      "id": "leopard",
      "name": "Léopard",
      "scientific": "Panthera pardus",
      "group": "Mammifères",
      "emoji": "🐆",
      "diet": "Carnivore",
      "habitat": "Savane africaine",
      "description": "Discret et solitaire, le léopard chasse des proies variées, puis peut les mettre à l’abri dans un arbre.",
      "role": "Prédateur polyvalent, il relie différents groupes d’animaux dans le réseau alimentaire.",
      "fun": "Il peut hisser sa proie en haut d’un arbre pour la mettre à l’abri des lions et des hyènes.",
      "protect": "Réduire la fragmentation de l’habitat et les conflits avec les humains.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ],
      "keywords": "félin chat"
    },
    {
      "id": "crocodile",
      "name": "Crocodile du Nil",
      "scientific": "Crocodylus niloticus",
      "group": "Reptiles",
      "emoji": "🐊",
      "diet": "Carnivore",
      "habitat": "Rivières et points d’eau",
      "description": "À proximité des cours d’eau, le crocodile du Nil peut capturer des animaux venus boire ou traverser.",
      "role": "Il relie les milieux aquatiques et terrestres.",
      "fun": "Il peut rester plusieurs mois sans manger.",
      "protect": "Préserver les rivières et leurs zones humides.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ],
      "noPredator": "Un grand crocodile adulte n’a presque pas de prédateur."
    },
    {
      "id": "zebre",
      "name": "Zèbre des plaines",
      "scientific": "Equus quagga",
      "group": "Mammifères",
      "emoji": "🦓",
      "diet": "Herbivore",
      "habitat": "Savane africaine",
      "description": "Le zèbre des plaines se nourrit principalement d’herbes. Il vit en groupes et se déplace pour trouver eau et pâturages.",
      "role": "Il transforme l’énergie des végétaux en nourriture pour de grands prédateurs.",
      "fun": "Ses rayures sont propres à chaque individu.",
      "protect": "Préserver les paysages et les voies de déplacement des troupeaux.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ]
    },
    {
      "id": "gnou",
      "name": "Gnou bleu",
      "scientific": "Connochaetes taurinus",
      "group": "Mammifères",
      "emoji": "🐃",
      "diet": "Herbivore",
      "habitat": "Savane africaine",
      "description": "Le gnou broute les herbes et effectue, dans certaines régions, d’importantes migrations saisonnières.",
      "role": "Il joue un rôle majeur dans la circulation des nutriments et nourrit plusieurs carnivores.",
      "fun": "En Afrique de l’Est, plus d’un million de gnous migrent chaque année pour suivre l’herbe fraîche.",
      "protect": "Préserver les corridors de migration et les pâturages.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "keywords": "antilope"
    },
    {
      "id": "gazelle",
      "name": "Gazelle de Thomson",
      "scientific": "Eudorcas thomsonii",
      "group": "Mammifères",
      "emoji": "🦌",
      "diet": "Herbivore",
      "habitat": "Plaines d’Afrique de l’Est",
      "description": "Petite antilope des plaines d’Afrique de l’Est, elle broute les herbes et reste attentive aux prédateurs.",
      "role": "Elle constitue une proie importante pour plusieurs chasseurs de la savane.",
      "fun": "Elle peut bondir très haut lorsqu’elle est en alerte.",
      "protect": "Limiter la perte des prairies naturelles.",
      "type": "animal",
      "regions": [
        "east"
      ],
      "keywords": "antilope"
    },
    {
      "id": "impala",
      "name": "Impala",
      "scientific": "Aepyceros melampus",
      "group": "Mammifères",
      "emoji": "🦌",
      "diet": "Herbivore",
      "habitat": "Savane africaine",
      "description": "L’impala mange des herbes et des feuilles selon la saison. C’est une antilope agile.",
      "role": "Il relie herbes et arbustes aux prédateurs.",
      "fun": "Ses bonds permettent de changer rapidement de direction.",
      "protect": "Conserver une mosaïque de prairies et de buissons.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "keywords": "antilope"
    },
    {
      "id": "phacochere",
      "name": "Phacochère commun",
      "scientific": "Phacochoerus africanus",
      "group": "Mammifères",
      "emoji": "🐗",
      "diet": "Principalement herbivore",
      "habitat": "Savane africaine",
      "description": "Le phacochère broute souvent à genoux et peut fouiller le sol à la recherche de racines.",
      "role": "Il consomme des végétaux et sert de proie à plusieurs carnivores.",
      "fun": "Il utilise volontiers les terriers creusés par d’autres animaux.",
      "protect": "Préserver les sols et limiter la chasse non durable.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ],
      "keywords": "cochon sanglier"
    },
    {
      "id": "buffle",
      "name": "Buffle d’Afrique",
      "scientific": "Syncerus caffer",
      "group": "Mammifères",
      "emoji": "🐃",
      "diet": "Herbivore",
      "habitat": "Savane africaine",
      "description": "Puissant herbivore grégaire, le buffle broute surtout des herbes. Les adultes peuvent se défendre collectivement.",
      "role": "Grand consommateur de végétation et proie possible des lions.",
      "fun": "Un troupeau peut repousser un prédateur venu attaquer l’un de ses membres.",
      "protect": "Protéger ses habitats et limiter les maladies transmises par le bétail.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ]
    },
    {
      "id": "chacal",
      "name": "Chacal à dos noir",
      "scientific": "Lupulella mesomelas",
      "group": "Mammifères",
      "emoji": "🦊",
      "diet": "Omnivore",
      "habitat": "Savane africaine",
      "description": "Le chacal à dos noir est opportuniste : il mange de petits animaux, des insectes et parfois des carcasses.",
      "role": "Il participe à la régulation des petits animaux et au recyclage des restes.",
      "fun": "Les couples de chacals restent souvent ensemble pendant des années.",
      "protect": "Limiter les empoisonnements visant les carnivores.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "keywords": "chien"
    },
    {
      "id": "orycterope",
      "name": "Oryctérope",
      "scientific": "Orycteropus afer",
      "group": "Mammifères",
      "emoji": "🦡",
      "diet": "Insectivore",
      "habitat": "Savane africaine",
      "description": "L’oryctérope fouille le sol avec ses puissantes griffes pour trouver fourmis et termites.",
      "role": "Il régule les insectes et ses terriers servent d’abris à d’autres espèces.",
      "fun": "Son nom anglais, « aardvark », veut dire « cochon de terre » en afrikaans.",
      "protect": "Préserver les sols et les populations d’insectes.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ],
      "keywords": "fourmi"
    },
    {
      "id": "termite",
      "name": "Termite",
      "scientific": "Groupe des termites",
      "group": "Invertébrés",
      "emoji": "🐜",
      "diet": "Détritivore",
      "habitat": "Savane africaine",
      "description": "De nombreuses espèces de termites vivent en colonies et consomment de la matière végétale, parfois morte.",
      "role": "Elles participent à la décomposition de la matière et à la fertilité des sols.",
      "fun": "Le termite n’est pas une fourmi : c’est un cousin des blattes ! Certaines termitières sont plus hautes qu’un adulte.",
      "protect": "Éviter les destructions inutiles des sols et des termitières.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south",
        "sahel"
      ],
      "keywords": "insecte"
    },
    {
      "id": "vautour",
      "name": "Vautour africain à dos blanc",
      "scientific": "Gyps africanus",
      "group": "Oiseaux",
      "emoji": "🦅",
      "diet": "Charognard",
      "habitat": "Savane africaine",
      "description": "Le vautour se nourrit surtout d’animaux déjà morts : il ne chasse pas ses carcasses.",
      "role": "Il élimine rapidement des restes et contribue à la santé des écosystèmes.",
      "fun": "Sa vue lui permet de repérer la nourriture à grande distance.",
      "protect": "Lutter contre l’empoisonnement des carcasses et protéger les sites de nidification.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ],
      "noPredator": "Un vautour adulte n’a presque pas de prédateur. Son plus grand danger, ce sont les poisons laissés par les humains.",
      "keywords": "oiseau"
    },
    {
      "id": "criquet",
      "name": "Criquet",
      "scientific": "Orthoptères (plusieurs espèces)",
      "group": "Invertébrés",
      "emoji": "🦗",
      "diet": "Herbivore",
      "habitat": "Savane africaine",
      "description": "Les criquets consomment des végétaux et constituent une ressource alimentaire pour de nombreux animaux.",
      "role": "Ils transmettent l’énergie des plantes aux insectivores.",
      "fun": "Ses « oreilles » se trouvent sur les côtés de son ventre !",
      "protect": "Maintenir des prairies riches en plantes et insectes.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south",
        "sahel"
      ],
      "keywords": "insecte"
    },
    {
      "id": "python",
      "name": "Python de Seba",
      "scientific": "Python sebae",
      "group": "Reptiles",
      "emoji": "🐍",
      "diet": "Carnivore",
      "habitat": "Savanes d’Afrique de l’Ouest, centrale et de l’Est (au sud vit un proche cousin, le python de Natal)",
      "description": "Ce grand serpent non venimeux immobilise ses proies par constriction.",
      "role": "Il peut réguler les populations de petits mammifères.",
      "fun": "C’est le plus grand serpent d’Afrique : il peut dépasser 5 mètres de long.",
      "protect": "Éviter de tuer les serpents par peur et protéger leurs habitats.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east"
      ],
      "noPredator": "Un grand python adulte a peu de prédateurs.",
      "keywords": "serpent"
    },
    {
      "id": "rongeur",
      "name": "Rat des herbes du Nil",
      "scientific": "Arvicanthis niloticus",
      "group": "Mammifères",
      "emoji": "🐁",
      "diet": "Principalement herbivore",
      "habitat": "Savane africaine",
      "description": "Petit rongeur qui mange notamment des graines et des parties de plantes.",
      "role": "Il sert de nourriture à plusieurs petits et grands prédateurs.",
      "fun": "Les rongeurs peuvent jouer un rôle important dans la dispersion des graines.",
      "protect": "Conserver les herbes hautes et des milieux diversifiés.",
      "type": "animal",
      "regions": [
        "west",
        "sahel",
        "central",
        "east"
      ],
      "keywords": "souris rat"
    },
    {
      "id": "aigle",
      "name": "Aigle martial",
      "scientific": "Polemaetus bellicosus",
      "group": "Oiseaux",
      "emoji": "🦅",
      "diet": "Carnivore",
      "habitat": "Savane africaine",
      "description": "Grand rapace africain qui capture différents animaux, dont des mammifères et des oiseaux.",
      "role": "Prédateur aérien contribuant aux équilibres de la savane.",
      "fun": "C’est le plus grand aigle d’Afrique.",
      "protect": "Préserver les grands arbres de nidification et réduire les persécutions.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ],
      "source": "https://animaldiversity.org/accounts/Polemaetus_bellicosus",
      "noPredator": "L’aigle martial adulte n’a presque pas de prédateur.",
      "keywords": "oiseau"
    },
    {
      "id": "autruche",
      "name": "Autruche",
      "scientific": "Struthio camelus",
      "group": "Oiseaux",
      "emoji": "🪶",
      "diet": "Omnivore à dominante végétale",
      "habitat": "Savane africaine",
      "description": "L’autruche se nourrit de végétaux et parfois de petits invertébrés.",
      "role": "Elle relie graines, plantes et insectes à de grands prédateurs.",
      "fun": "C’est le plus grand oiseau du monde. Elle ne vole pas, mais court très vite.",
      "protect": "Préserver les habitats ouverts et les sites de reproduction.",
      "type": "animal",
      "regions": [
        "central",
        "sahel",
        "east",
        "south"
      ],
      "keywords": "oiseau"
    },
    {
      "id": "herbes",
      "name": "Herbes de savane",
      "scientific": "",
      "group": "Végétaux",
      "emoji": "🌾",
      "diet": "",
      "habitat": "Savane africaine",
      "description": "Les graminées produisent de la matière organique grâce à l’énergie du soleil.",
      "role": "Producteurs primaires : base de nombreuses chaînes alimentaires.",
      "fun": "Broutées ou brûlées, les herbes de la savane repoussent grâce à leurs racines.",
      "protect": "Préserver les milieux naturels, c’est préserver la nourriture de nombreuses espèces.",
      "type": "resource",
      "regions": [
        "west",
        "central",
        "east",
        "south",
        "sahel"
      ],
      "keywords": "plante"
    },
    {
      "id": "feuilles",
      "name": "Feuilles d’arbustes",
      "scientific": "",
      "group": "Végétaux",
      "emoji": "🌿",
      "diet": "",
      "habitat": "Savane africaine",
      "description": "Feuilles consommées par certains herbivores, notamment en saison sèche.",
      "role": "Ressource végétale pour les consommateurs primaires.",
      "fun": "Beaucoup d’arbustes de la savane ont des épines pour se protéger des brouteurs.",
      "protect": "Préserver les milieux naturels, c’est préserver la nourriture de nombreuses espèces.",
      "type": "resource",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ],
      "keywords": "plante"
    },
    {
      "id": "detritus",
      "name": "Végétaux morts",
      "scientific": "",
      "group": "Matière organique",
      "emoji": "🍂",
      "diet": "",
      "habitat": "Savane africaine",
      "description": "Feuilles et bois morts sont transformés par une diversité d’organismes.",
      "role": "Cette matière alimente les détritivores, dont certains termites.",
      "fun": "Sans les décomposeurs, le sol de la savane serait couvert de feuilles et de bois morts !",
      "protect": "Préserver les milieux naturels, c’est préserver la nourriture de nombreuses espèces.",
      "type": "resource",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ]
    },
    {
      "id": "carcasses",
      "name": "Carcasses",
      "scientific": "",
      "group": "Matière organique",
      "emoji": "🦴",
      "diet": "",
      "habitat": "Savane africaine",
      "description": "Restes d’animaux déjà morts, consommés par les charognards.",
      "role": "Le recyclage de cette matière participe au fonctionnement de l’écosystème.",
      "fun": "Vautours, hyènes et chacals se partagent souvent une même carcasse.",
      "protect": "Préserver les milieux naturels, c’est préserver la nourriture de nombreuses espèces.",
      "type": "resource",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ]
    },
    {
      "id": "racines",
      "name": "Racines et bulbes",
      "scientific": "",
      "group": "Végétaux",
      "emoji": "🥕",
      "diet": "",
      "habitat": "Savane africaine",
      "description": "Certaines racines, tubercules et bulbes sont consommés par des herbivores fouisseurs.",
      "role": "Une réserve d’énergie végétale, même pendant les périodes sèches.",
      "fun": "Les racines gardent des réserves pour passer la saison sèche.",
      "protect": "La protection des sols préserve ces ressources et les animaux qui s’en nourrissent.",
      "type": "resource",
      "regions": [
        "west",
        "central",
        "east",
        "south",
        "sahel"
      ],
      "keywords": "plante"
    },
    {
      "id": "girafe",
      "name": "Girafe",
      "scientific": "Giraffa camelopardalis",
      "group": "Mammifères",
      "emoji": "🦒",
      "diet": "Herbivore",
      "habitat": "Savane boisée et plaines d’Afrique subsaharienne",
      "description": "La girafe broute surtout les feuilles et les jeunes pousses en hauteur.",
      "role": "Elle contribue à la circulation de matière entre les arbres et le sol.",
      "fun": "Sa langue mesure près d’un demi-mètre : pratique pour attraper les feuilles entre les épines.",
      "protect": "Préserver les savanes arborées et les couloirs entre habitats.",
      "type": "animal",
      "regions": [
        "west",
        "east",
        "south"
      ]
    },
    {
      "id": "elephant",
      "name": "Éléphant de savane d’Afrique",
      "scientific": "Loxodonta africana",
      "group": "Mammifères",
      "emoji": "🐘",
      "diet": "Herbivore",
      "habitat": "Savanes et mosaïques de milieux subsahariens",
      "description": "Il mange des herbes, des feuilles, de l’écorce et des fruits selon la saison.",
      "role": "En se déplaçant, il peut disperser des graines et modifier la végétation.",
      "fun": "Il passe une grande partie de la journée à manger : plus de 100 kg de végétaux par jour.",
      "protect": "Protéger les habitats et réduire les conflits avec les activités humaines.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ]
    },
    {
      "id": "rhino_noir",
      "name": "Rhinocéros noir",
      "scientific": "Diceros bicornis",
      "group": "Mammifères",
      "emoji": "🦏",
      "diet": "Herbivore (herbe et feuilles)",
      "habitat": "Milieux de savane et broussailles d’Afrique orientale et australe",
      "description": "Il broute et consomme aussi des feuilles, rameaux et arbustes.",
      "role": "Son alimentation relie la végétation basse aux grands herbivores.",
      "fun": "Noir ou blanc ? Les deux rhinocéros sont gris ! Le noir a une lèvre pointue pour attraper les feuilles.",
      "protect": "Lutter contre le braconnage et protéger les habitats.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "noPredator": "Un rhinocéros adulte n’a presque pas de prédateur. Son plus grand danger, c’est le braconnage."
    },
    {
      "id": "rhino_blanc",
      "name": "Rhinocéros blanc",
      "scientific": "Ceratotherium simum",
      "group": "Mammifères",
      "emoji": "🦏",
      "diet": "Herbivore (herbe)",
      "habitat": "Prairies et savanes d’Afrique australe et orientale",
      "description": "Il broute principalement des herbes.",
      "role": "Le pâturage contribue aux échanges de matière dans les prairies.",
      "fun": "Sa lèvre large et carrée coupe l’herbe comme une tondeuse.",
      "protect": "Protéger les populations et lutter contre le braconnage.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "noPredator": "Un rhinocéros adulte n’a presque pas de prédateur. Son plus grand danger, c’est le braconnage."
    },
    {
      "id": "lycaon",
      "name": "Lycaon",
      "scientific": "Lycaon pictus",
      "group": "Mammifères",
      "emoji": "🐕",
      "diet": "Carnivore",
      "habitat": "Grandes savanes et mosaïques ouvertes d’Afrique subsaharienne",
      "description": "Il chasse en meute des mammifères de taille petite à moyenne, souvent des antilopes.",
      "role": "Prédateur social, il dépend de vastes espaces connectés.",
      "fun": "Chaque individu a un pelage à motifs distinctifs.",
      "protect": "Préserver les corridors et limiter les conflits avec l’élevage.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "noPredator": "Les lions sont ses principaux ennemis : ils l’attaquent souvent, sans forcément le manger.",
      "keywords": "chien"
    },
    {
      "id": "blaireau_miel",
      "name": "Ratel (blaireau à miel)",
      "scientific": "Mellivora capensis",
      "group": "Mammifères",
      "emoji": "🦡",
      "diet": "Omnivore",
      "habitat": "Savanes, broussailles et milieux semi-arides d’Afrique",
      "description": "Il consomme des invertébrés, petits vertébrés, œufs et autres aliments disponibles.",
      "role": "Son régime varié le relie à plusieurs niveaux du réseau.",
      "fun": "Sa peau épaisse et souple l’aide à se défendre, même face à de plus gros animaux.",
      "protect": "Préserver les habitats et limiter les persécutions.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south",
        "sahel"
      ]
    },
    {
      "id": "suricate",
      "name": "Suricate",
      "scientific": "Suricata suricatta",
      "group": "Mammifères",
      "emoji": "🐾",
      "diet": "Insectivore et omnivore",
      "habitat": "Milieux secs d’Afrique australe",
      "description": "Il mange surtout des invertébrés et peut aussi consommer de petits vertébrés.",
      "role": "Il participe aux relations alimentaires du sol et des milieux secs.",
      "fun": "Un membre du groupe peut monter la garde pendant que les autres cherchent de la nourriture.",
      "protect": "Préserver les habitats semi-arides et éviter l’usage de poisons.",
      "type": "animal",
      "regions": [
        "south"
      ]
    },
    {
      "id": "serval",
      "name": "Serval",
      "scientific": "Leptailurus serval",
      "group": "Mammifères",
      "emoji": "🐈",
      "diet": "Carnivore",
      "habitat": "Prairies hautes et zones humides de savane subsaharienne",
      "description": "Il chasse surtout des rongeurs, mais peut capturer des oiseaux et d’autres petites proies.",
      "role": "Prédateur de petits animaux, il dépend d’habitats où ils peuvent vivre.",
      "fun": "Il peut faire de grands bonds pour attraper un oiseau qui s’envole.",
      "protect": "Conserver les prairies et zones humides.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ],
      "keywords": "félin chat"
    },
    {
      "id": "caracal",
      "name": "Caracal",
      "scientific": "Caracal caracal",
      "group": "Mammifères",
      "emoji": "🐈",
      "diet": "Carnivore",
      "habitat": "Savanes, broussailles et milieux semi-arides d’Afrique",
      "description": "Il chasse des oiseaux et des mammifères de petite ou moyenne taille.",
      "role": "Il relie plusieurs petites proies aux prédateurs.",
      "fun": "Il peut bondir pour capturer des oiseaux en vol.",
      "protect": "Maintenir des habitats naturels et réduire les persécutions.",
      "type": "animal",
      "regions": [
        "west",
        "east",
        "south",
        "sahel"
      ],
      "keywords": "félin chat"
    },
    {
      "id": "renard_oreilles",
      "name": "Otocyon (renard à oreilles de chauve-souris)",
      "scientific": "Otocyon megalotis",
      "group": "Mammifères",
      "emoji": "🦊",
      "diet": "Insectivore",
      "habitat": "Savanes ouvertes d’Afrique orientale et australe",
      "description": "Il consomme principalement des termites et d’autres insectes.",
      "role": "Il relie les colonies d’insectes aux petits carnivores.",
      "fun": "Ses grandes oreilles l’aident à entendre les insectes dans le sol.",
      "protect": "Préserver les sols et limiter les pesticides.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "keywords": "chien"
    },
    {
      "id": "proteles",
      "name": "Protèle (loup fouisseur)",
      "scientific": "Proteles cristata",
      "group": "Mammifères",
      "emoji": "🦊",
      "diet": "Insectivore",
      "habitat": "Savanes d’Afrique orientale et australe",
      "description": "Il se nourrit surtout de termites, qu’il récolte avec sa langue.",
      "role": "Il dépend des colonies de termites et contribue à leurs relations avec les prédateurs.",
      "fun": "Il peut avaler des centaines de milliers de termites en une seule nuit.",
      "protect": "Protéger les savanes et éviter les empoisonnements.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ]
    },
    {
      "id": "pangolin",
      "name": "Pangolin de Temminck",
      "scientific": "Smutsia temminckii",
      "group": "Mammifères",
      "emoji": "🐾",
      "diet": "Insectivore",
      "habitat": "Savanes et milieux boisés d’Afrique orientale et australe",
      "description": "Il mange surtout des fourmis et des termites.",
      "role": "Il relie les insectes sociaux aux grands prédateurs et aux humains qui le menacent.",
      "fun": "Les pangolins sont les seuls mammifères couverts d’écailles. En cas de danger, ils se roulent en boule.",
      "protect": "Lutter contre le braconnage et le trafic illégal.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "keywords": "fourmi"
    },
    {
      "id": "porc_epic",
      "name": "Porc-épic du Cap",
      "scientific": "Hystrix africaeaustralis",
      "group": "Mammifères",
      "emoji": "🐾",
      "diet": "Principalement herbivore",
      "habitat": "Savanes et broussailles d’Afrique australe",
      "description": "Il consomme des racines, tubercules, écorces et autres végétaux.",
      "role": "En fouillant le sol, il interagit avec les plantes et les sols.",
      "fun": "Ses piquants sont des poils modifiés.",
      "protect": "Préserver les habitats et éviter les persécutions inutiles.",
      "type": "animal",
      "regions": [
        "south"
      ],
      "keywords": "hérisson"
    },
    {
      "id": "lievre",
      "name": "Lièvre du Cap",
      "scientific": "Lepus capensis",
      "group": "Mammifères",
      "emoji": "🐇",
      "diet": "Herbivore",
      "habitat": "Prairies et milieux ouverts d’Afrique",
      "description": "Il mange des herbes et d’autres végétaux disponibles.",
      "role": "Il constitue une proie pour plusieurs carnivores.",
      "fun": "Ses oreilles l’aident à détecter les sons autour de lui.",
      "protect": "Maintenir des milieux ouverts diversifiés.",
      "type": "animal",
      "regions": [
        "west",
        "east",
        "south",
        "sahel"
      ],
      "keywords": "lapin"
    },
    {
      "id": "singe_vervet",
      "name": "Vervet",
      "scientific": "Chlorocebus pygerythrus",
      "group": "Mammifères",
      "emoji": "🐒",
      "diet": "Omnivore",
      "habitat": "Savanes boisées et zones riveraines d’Afrique orientale et australe",
      "description": "Il consomme des fruits, feuilles, graines et petits animaux selon les saisons.",
      "role": "Il relie les ressources végétales et animales au réseau alimentaire.",
      "fun": "Il pousse un cri d’alarme différent selon le danger : aigle, léopard ou serpent !",
      "protect": "Préserver les arbres et les habitats riverains.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "keywords": "singe primate"
    },
    {
      "id": "babouin",
      "name": "Babouin olive",
      "scientific": "Papio anubis",
      "group": "Mammifères",
      "emoji": "🐒",
      "diet": "Omnivore",
      "habitat": "Savanes et milieux boisés d’Afrique orientale et centrale",
      "description": "Il consomme des végétaux, fruits, graines et petits animaux.",
      "role": "Son régime varié crée de nombreuses relations alimentaires.",
      "fun": "Une troupe de babouins peut compter plus de cent individus.",
      "protect": "Protéger les habitats et limiter les conflits avec les cultures.",
      "type": "animal",
      "regions": [
        "west",
        "sahel",
        "central",
        "east"
      ],
      "keywords": "singe primate"
    },
    {
      "id": "grand_koudou",
      "name": "Grand koudou",
      "scientific": "Tragelaphus strepsiceros",
      "group": "Mammifères",
      "emoji": "🦌",
      "diet": "Herbivore (herbe et feuilles)",
      "habitat": "Savanes boisées d’Afrique orientale et australe",
      "description": "Il mange des feuilles, des pousses et parfois des herbes.",
      "role": "Il relie arbustes et grands prédateurs.",
      "fun": "Les mâles portent de longues cornes spiralées.",
      "protect": "Conserver les mosaïques de savane et de broussailles.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "keywords": "antilope"
    },
    {
      "id": "eland",
      "name": "Éland du Cap",
      "scientific": "Taurotragus oryx",
      "group": "Mammifères",
      "emoji": "🦌",
      "diet": "Herbivore",
      "habitat": "Savanes et prairies d’Afrique orientale et australe",
      "description": "Il broute et consomme aussi des feuilles selon les conditions.",
      "role": "Grand herbivore, il relie la végétation aux carnivores.",
      "fun": "Malgré sa taille, il peut effectuer de grands bonds.",
      "protect": "Préserver de vastes espaces connectés.",
      "type": "animal",
      "regions": [
        "central",
        "east",
        "south"
      ],
      "keywords": "antilope"
    },
    {
      "id": "springbok",
      "name": "Springbok",
      "scientific": "Antidorcas marsupialis",
      "group": "Mammifères",
      "emoji": "🦌",
      "diet": "Herbivore",
      "habitat": "Prairies et milieux semi-arides d’Afrique australe",
      "description": "Il broute et consomme des feuilles basses selon la saison.",
      "role": "Il constitue une proie pour plusieurs carnivores.",
      "fun": "Il réalise des bonds raides appelés pronking.",
      "protect": "Préserver les milieux ouverts et les migrations.",
      "type": "animal",
      "regions": [
        "south"
      ],
      "keywords": "antilope"
    },
    {
      "id": "bubale",
      "name": "Bubale roux",
      "scientific": "Alcelaphus buselaphus",
      "group": "Mammifères",
      "emoji": "🦬",
      "diet": "Herbivore (herbe)",
      "habitat": "Savanes d’Afrique occidentale et orientale",
      "description": "Il broute principalement des herbes.",
      "role": "Il transforme la végétation en biomasse accessible aux prédateurs.",
      "fun": "Sa tête allongée porte des cornes chez les deux sexes.",
      "protect": "Préserver les prairies et les populations locales.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south",
        "sahel"
      ],
      "keywords": "antilope"
    },
    {
      "id": "topi",
      "name": "Topi",
      "scientific": "Damaliscus lunatus",
      "group": "Mammifères",
      "emoji": "🦬",
      "diet": "Herbivore (herbe)",
      "habitat": "Plaines herbeuses d’Afrique orientale",
      "description": "Il broute des graminées dans les plaines ouvertes.",
      "role": "Il contribue aux relations entre prairies, herbivores et carnivores.",
      "fun": "Les topis se tiennent souvent sur des points élevés pour surveiller les alentours.",
      "protect": "Conserver les plaines et les corridors de migration.",
      "type": "animal",
      "regions": [
        "east"
      ],
      "keywords": "antilope"
    },
    {
      "id": "hippotrague_rouan",
      "name": "Hippotrague rouan",
      "scientific": "Hippotragus equinus",
      "group": "Mammifères",
      "emoji": "🦌",
      "diet": "Herbivore (herbe)",
      "habitat": "Savanes boisées d’Afrique occidentale, centrale et orientale",
      "description": "Il broute surtout des graminées.",
      "role": "Il relie la végétation des savanes aux grands prédateurs.",
      "fun": "Ses longues oreilles pointues se terminent par une touffe de poils.",
      "protect": "Préserver les savanes et limiter la fragmentation.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ],
      "keywords": "antilope"
    },
    {
      "id": "hippotrague_noir",
      "name": "Hippotrague noir",
      "scientific": "Hippotragus niger",
      "group": "Mammifères",
      "emoji": "🦌",
      "diet": "Herbivore",
      "habitat": "Savanes boisées d’Afrique orientale et australe",
      "description": "Il broute principalement des herbes et peut consommer des feuilles.",
      "role": "Il participe aux échanges de matière entre végétation et carnivores.",
      "fun": "Ses longues cornes recourbées sont présentes chez les mâles et les femelles.",
      "protect": "Protéger les habitats et les populations locales.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "keywords": "antilope"
    },
    {
      "id": "cobe_defassa",
      "name": "Cobe defassa",
      "scientific": "Kobus ellipsiprymnus",
      "group": "Mammifères",
      "emoji": "🦌",
      "diet": "Herbivore (herbe)",
      "habitat": "Prairies et savanes proches de l’eau en Afrique",
      "description": "Il broute principalement des herbes, souvent près des zones humides.",
      "role": "Il dépend du maintien de prairies et d’accès à l’eau.",
      "fun": "Les mâles adultes portent des cornes en forme de lyre.",
      "protect": "Protéger les zones humides et les plaines inondables.",
      "type": "animal",
      "regions": [
        "central",
        "east",
        "south"
      ],
      "keywords": "antilope"
    },
    {
      "id": "cobe_roseau",
      "name": "Cobe des roseaux",
      "scientific": "Redunca arundinum",
      "group": "Mammifères",
      "emoji": "🦌",
      "diet": "Herbivore (herbe)",
      "habitat": "Prairies humides d’Afrique orientale et australe",
      "description": "Il broute des herbes hautes, souvent près de l’eau.",
      "role": "Il relie les prairies humides aux prédateurs.",
      "fun": "Il émet des sifflements lorsqu’il est inquiet.",
      "protect": "Préserver les prairies et les zones humides.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "keywords": "antilope"
    },
    {
      "id": "cephalophe",
      "name": "Céphalophe de Grimm",
      "scientific": "Sylvicapra grimmia",
      "group": "Mammifères",
      "emoji": "🦌",
      "diet": "Omnivore à dominante végétale",
      "habitat": "Savanes boisées d’Afrique subsaharienne",
      "description": "Il mange des feuilles, fruits et parfois de petits animaux.",
      "role": "Il relie les ressources basses des sous-bois aux prédateurs.",
      "fun": "Il se cache souvent dans les herbes ou les buissons.",
      "protect": "Conserver des milieux en mosaïque.",
      "type": "animal",
      "regions": [
        "west",
        "central",
        "east",
        "south"
      ],
      "keywords": "antilope"
    },
    {
      "id": "dikdik",
      "name": "Dik-dik de Kirk",
      "scientific": "Madoqua kirkii",
      "group": "Mammifères",
      "emoji": "🦌",
      "diet": "Herbivore (herbe et feuilles)",
      "habitat": "Broussailles et savanes sèches d’Afrique orientale",
      "description": "Il mange des feuilles, fruits et pousses de buissons.",
      "role": "Petit herbivore, il est une proie possible pour plusieurs carnivores.",
      "fun": "Il marque son territoire avec des sécrétions odorantes.",
      "protect": "Préserver les broussailles et les habitats fragmentés.",
      "type": "animal",
      "regions": [
        "east"
      ],
      "keywords": "antilope"
    },
    {
      "id": "serpentaire",
      "name": "Serpentaire",
      "scientific": "Sagittarius serpentarius",
      "group": "Oiseaux",
      "emoji": "🦅",
      "diet": "Carnivore",
      "habitat": "Prairies ouvertes et savanes d’Afrique subsaharienne",
      "description": "Il chasse au sol des insectes, lézards, petits mammifères et serpents.",
      "role": "Il relie les animaux du sol aux grands oiseaux prédateurs.",
      "fun": "Ses longues pattes lui permettent de marcher et frapper ses proies.",
      "protect": "Préserver les prairies et les grands espaces ouverts.",
      "type": "animal",
      "regions": [
        "west",
        "east",
        "south",
        "sahel"
      ],
      "keywords": "oiseau"
    },
    {
      "id": "outarde_kori",
      "name": "Outarde kori",
      "scientific": "Ardeotis kori",
      "group": "Oiseaux",
      "emoji": "🪶",
      "diet": "Omnivore",
      "habitat": "Savanes d’Afrique orientale et australe",
      "description": "Elle consomme des graines, insectes et petits animaux.",
      "role": "Elle relie ressources végétales et proies animales.",
      "fun": "C’est l’un des plus lourds oiseaux capables de voler. Elle adore la gomme d’acacia.",
      "protect": "Protéger les prairies et limiter les dérangements.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "source": "https://animaldiversity.org/accounts/Ardeotis_kori/",
      "keywords": "oiseau"
    },
    {
      "id": "bucorve",
      "name": "Bucorve du Sud",
      "scientific": "Bucorvus leadbeateri",
      "group": "Oiseaux",
      "emoji": "🪶",
      "diet": "Omnivore à dominante carnivore",
      "habitat": "Savanes d’Afrique orientale et australe",
      "description": "Il consomme des invertébrés, petits vertébrés et parfois des fruits.",
      "role": "Il relie les animaux du sol à des oiseaux prédateurs.",
      "fun": "Il marche souvent en groupes familiaux.",
      "protect": "Conserver les savanes et les grands arbres de nidification.",
      "type": "animal",
      "regions": [
        "east",
        "south"
      ],
      "keywords": "oiseau"
    },
    {
      "id": "acacia",
      "name": "Acacia parasol",
      "scientific": "Vachellia tortilis",
      "group": "Végétaux",
      "emoji": "🌳",
      "diet": "",
      "habitat": "Savanes sèches d’Afrique",
      "description": "Arbre caractéristique de nombreuses savanes sèches, dont les graines et feuilles sont consommées par différents animaux.",
      "role": "Fournit nourriture et abris ; ses parties végétales entrent dans plusieurs relations alimentaires.",
      "fun": "Sa silhouette en parasol est reconnaissable dans les paysages ouverts.",
      "protect": "Préserver les arbres adultes et les sols.",
      "type": "resource",
      "regions": [
        "west",
        "east",
        "south",
        "sahel"
      ],
      "keywords": "arbre plante"
    },
    {
      "id": "baobab",
      "name": "Baobab africain",
      "scientific": "Adansonia digitata",
      "group": "Végétaux",
      "emoji": "🌳",
      "diet": "",
      "habitat": "Savanes sèches d’Afrique subsaharienne",
      "description": "Grand arbre dont les feuilles, fleurs et fruits sont utilisés par des animaux et des humains.",
      "role": "Offre nourriture et abri à de nombreux organismes.",
      "fun": "Son tronc peut stocker beaucoup d’eau.",
      "protect": "Maintenir les arbres anciens et les paysages où ils se régénèrent.",
      "type": "resource",
      "regions": [
        "west",
        "central",
        "east",
        "south",
        "sahel"
      ],
      "keywords": "arbre plante"
    },
    {
      "id": "mopane",
      "name": "Mopane",
      "scientific": "Colophospermum mopane",
      "group": "Végétaux",
      "emoji": "🍃",
      "diet": "",
      "habitat": "Savanes boisées d’Afrique australe et orientale",
      "description": "Arbre ou arbuste dominant de certains boisements chauds et secs.",
      "role": "Ses feuilles nourrissent notamment des herbivores et des insectes.",
      "fun": "Les chenilles du bombyx mopane en consomment les feuilles.",
      "protect": "Préserver les boisements et éviter leur surexploitation.",
      "type": "resource",
      "regions": [
        "east",
        "south"
      ],
      "keywords": "arbre plante"
    },
    {
      "id": "marula",
      "name": "Marula",
      "scientific": "Sclerocarya birrea",
      "group": "Végétaux",
      "emoji": "🍈",
      "diet": "",
      "habitat": "Savanes d’Afrique subsaharienne",
      "description": "Arbre fruitier des savanes, dont les fruits sont consommés par des animaux et des humains.",
      "role": "Ses fruits fournissent une ressource saisonnière.",
      "fun": "Les fruits mûrs tombent au sol et sont accessibles à de nombreux animaux.",
      "protect": "Conserver les arbres et la diversité des habitats.",
      "type": "resource",
      "regions": [
        "west",
        "east",
        "south",
        "sahel"
      ],
      "keywords": "arbre plante"
    },
    {
      "id": "fruits_graines",
      "name": "Fruits et graines sauvages",
      "scientific": "Ressource végétale (plusieurs espèces)",
      "group": "Végétaux",
      "emoji": "🌰",
      "diet": "",
      "habitat": "Savanes et boisements ouverts d’Afrique",
      "description": "Ressource produite par de nombreuses plantes de savane, disponible de façon variable selon les espèces et les saisons.",
      "role": "Nourrit des herbivores et omnivores et peut contribuer à la dispersion des graines.",
      "fun": "Certaines graines voyagent dans le ventre des animaux avant d’être rejetées plus loin.",
      "protect": "Préserver une diversité de plantes et les habitats qui les abritent.",
      "type": "resource",
      "regions": [
        "west",
        "central",
        "east",
        "south",
        "sahel"
      ],
      "keywords": "plante"
    }
  ],
  "links": [
    {
      "eater": "lion",
      "food": "gnou",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lion",
      "food": "zebre",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lion",
      "food": "buffle",
      "kind": "predation",
      "note": "chasse notamment les individus vulnérables"
    },
    {
      "eater": "lion",
      "food": "phacochere",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lion",
      "food": "impala",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lion",
      "food": "autruche",
      "kind": "predation",
      "note": "occasionnellement",
      "rare": true
    },
    {
      "eater": "hyene",
      "food": "gnou",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "hyene",
      "food": "zebre",
      "kind": "predation",
      "note": "souvent les plus jeunes ou affaiblis"
    },
    {
      "eater": "hyene",
      "food": "gazelle",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "hyene",
      "food": "impala",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "hyene",
      "food": "phacochere",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "hyene",
      "food": "carcasses",
      "kind": "charognage",
      "note": "consomme aussi des animaux déjà morts"
    },
    {
      "eater": "guepard",
      "food": "gazelle",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "guepard",
      "food": "impala",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "leopard",
      "food": "gazelle",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "leopard",
      "food": "impala",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "leopard",
      "food": "phacochere",
      "kind": "predation",
      "note": "surtout les plus jeunes"
    },
    {
      "eater": "leopard",
      "food": "rongeur",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "leopard",
      "food": "autruche",
      "kind": "predation",
      "note": "surtout les jeunes"
    },
    {
      "eater": "crocodile",
      "food": "gnou",
      "kind": "predation",
      "note": "à proximité des points d’eau"
    },
    {
      "eater": "crocodile",
      "food": "zebre",
      "kind": "predation",
      "note": "à proximité des points d’eau"
    },
    {
      "eater": "chacal",
      "food": "rongeur",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "chacal",
      "food": "criquet",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "chacal",
      "food": "termite",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "chacal",
      "food": "carcasses",
      "kind": "charognage",
      "note": "charognage opportuniste"
    },
    {
      "eater": "orycterope",
      "food": "termite",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "vautour",
      "food": "carcasses",
      "kind": "charognage",
      "note": "consomme des animaux déjà morts"
    },
    {
      "eater": "python",
      "food": "rongeur",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "python",
      "food": "impala",
      "kind": "predation",
      "note": "surtout les jeunes, rarement",
      "rare": true
    },
    {
      "eater": "aigle",
      "food": "rongeur",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "autruche",
      "food": "criquet",
      "kind": "predation",
      "note": "occasionnellement",
      "rare": true
    },
    {
      "eater": "zebre",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "gnou",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "gazelle",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "impala",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "phacochere",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "buffle",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "rongeur",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "autruche",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "criquet",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "impala",
      "food": "feuilles",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "autruche",
      "food": "feuilles",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "termite",
      "food": "detritus",
      "kind": "detritivore",
      "note": "matière végétale en décomposition",
      "foodSideOnly": true
    },
    {
      "eater": "leopard",
      "food": "orycterope",
      "kind": "predation",
      "note": "occasionnellement",
      "rare": true
    },
    {
      "eater": "phacochere",
      "food": "racines",
      "kind": "vegetaux",
      "note": "racines et bulbes",
      "foodSideOnly": true
    },
    {
      "eater": "lion",
      "food": "girafe",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lion",
      "food": "eland",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lion",
      "food": "bubale",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lion",
      "food": "topi",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lion",
      "food": "cobe_defassa",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lion",
      "food": "grand_koudou",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lion",
      "food": "hippotrague_rouan",
      "kind": "predation",
      "note": "occasionnellement",
      "rare": true
    },
    {
      "eater": "lion",
      "food": "hippotrague_noir",
      "kind": "predation",
      "note": "occasionnellement",
      "rare": true
    },
    {
      "eater": "lion",
      "food": "elephant",
      "kind": "predation",
      "note": "très rarement, surtout des jeunes, dans quelques régions",
      "source": "https://doi.org/10.3377/004.044.0104",
      "rare": true
    },
    {
      "eater": "lion",
      "food": "porc_epic",
      "kind": "predation",
      "note": "parfois, au risque de se blesser"
    },
    {
      "eater": "lion",
      "food": "carcasses",
      "kind": "charognage",
      "note": "vole aussi les proies d’autres prédateurs"
    },
    {
      "eater": "hyene",
      "food": "topi",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "guepard",
      "food": "springbok",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "guepard",
      "food": "lievre",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "leopard",
      "food": "babouin",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "leopard",
      "food": "singe_vervet",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "leopard",
      "food": "cephalophe",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "leopard",
      "food": "dikdik",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "leopard",
      "food": "chacal",
      "kind": "predation",
      "note": "occasionnellement",
      "rare": true
    },
    {
      "eater": "leopard",
      "food": "porc_epic",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "leopard",
      "food": "lievre",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lycaon",
      "food": "impala",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lycaon",
      "food": "gazelle",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lycaon",
      "food": "gnou",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lycaon",
      "food": "grand_koudou",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "lycaon",
      "food": "cobe_roseau",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "serval",
      "food": "rongeur",
      "kind": "predation",
      "note": "sa proie favorite",
      "foodSideOnly": true
    },
    {
      "eater": "serval",
      "food": "criquet",
      "kind": "predation",
      "note": "et d’autres insectes",
      "foodSideOnly": true
    },
    {
      "eater": "serval",
      "food": "lievre",
      "kind": "predation",
      "note": "surtout les jeunes"
    },
    {
      "eater": "caracal",
      "food": "lievre",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "caracal",
      "food": "rongeur",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "caracal",
      "food": "cephalophe",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "chacal",
      "food": "fruits_graines",
      "kind": "vegetaux",
      "note": "fruits tombés au sol",
      "foodSideOnly": true
    },
    {
      "eater": "chacal",
      "food": "gazelle",
      "kind": "predation",
      "note": "surtout les faons"
    },
    {
      "eater": "renard_oreilles",
      "food": "termite",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "renard_oreilles",
      "food": "criquet",
      "kind": "predation",
      "note": "et d’autres insectes",
      "foodSideOnly": true
    },
    {
      "eater": "proteles",
      "food": "termite",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "pangolin",
      "food": "termite",
      "kind": "predation",
      "note": "et des fourmis",
      "foodSideOnly": true
    },
    {
      "eater": "suricate",
      "food": "criquet",
      "kind": "predation",
      "note": "et d’autres insectes",
      "foodSideOnly": true
    },
    {
      "eater": "suricate",
      "food": "termite",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "blaireau_miel",
      "food": "rongeur",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "blaireau_miel",
      "food": "criquet",
      "kind": "predation",
      "note": "insectes et larves",
      "foodSideOnly": true
    },
    {
      "eater": "crocodile",
      "food": "impala",
      "kind": "predation",
      "note": "quand il vient boire"
    },
    {
      "eater": "crocodile",
      "food": "cobe_defassa",
      "kind": "predation",
      "note": "près de l’eau"
    },
    {
      "eater": "crocodile",
      "food": "buffle",
      "kind": "predation",
      "note": "près de l’eau"
    },
    {
      "eater": "aigle",
      "food": "singe_vervet",
      "kind": "predation",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Polemaetus_bellicosus"
    },
    {
      "eater": "aigle",
      "food": "dikdik",
      "kind": "predation",
      "note": "et d’autres petites antilopes",
      "foodSideOnly": true
    },
    {
      "eater": "aigle",
      "food": "lievre",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "serpentaire",
      "food": "rongeur",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "serpentaire",
      "food": "criquet",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "bucorve",
      "food": "criquet",
      "kind": "predation",
      "note": "et d’autres insectes",
      "foodSideOnly": true
    },
    {
      "eater": "bucorve",
      "food": "rongeur",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "outarde_kori",
      "food": "criquet",
      "kind": "predation",
      "note": "et d’autres insectes",
      "foodSideOnly": true
    },
    {
      "eater": "outarde_kori",
      "food": "rongeur",
      "kind": "predation",
      "note": "petits animaux",
      "foodSideOnly": true
    },
    {
      "eater": "outarde_kori",
      "food": "fruits_graines",
      "kind": "vegetaux",
      "note": "graines et baies",
      "foodSideOnly": true
    },
    {
      "eater": "outarde_kori",
      "food": "acacia",
      "kind": "vegetaux",
      "note": "elle adore la gomme d’acacia",
      "source": "https://animaldiversity.org/accounts/Ardeotis_kori/",
      "foodSideOnly": true
    },
    {
      "eater": "babouin",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "babouin",
      "food": "fruits_graines",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "babouin",
      "food": "racines",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "babouin",
      "food": "baobab",
      "kind": "vegetaux",
      "note": "fruits",
      "foodSideOnly": true
    },
    {
      "eater": "babouin",
      "food": "marula",
      "kind": "vegetaux",
      "note": "fruits",
      "foodSideOnly": true
    },
    {
      "eater": "babouin",
      "food": "criquet",
      "kind": "predation",
      "note": "insectes",
      "foodSideOnly": true
    },
    {
      "eater": "babouin",
      "food": "gazelle",
      "kind": "predation",
      "note": "faons, occasionnellement",
      "source": "https://mpala.org/field_guide/view/olive_baboon/",
      "rare": true
    },
    {
      "eater": "singe_vervet",
      "food": "fruits_graines",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "singe_vervet",
      "food": "feuilles",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "singe_vervet",
      "food": "acacia",
      "kind": "vegetaux",
      "note": "fleurs et graines",
      "foodSideOnly": true
    },
    {
      "eater": "singe_vervet",
      "food": "criquet",
      "kind": "predation",
      "note": "insectes",
      "foodSideOnly": true
    },
    {
      "eater": "autruche",
      "food": "fruits_graines",
      "kind": "vegetaux",
      "note": "graines",
      "foodSideOnly": true
    },
    {
      "eater": "elephant",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "elephant",
      "food": "feuilles",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "elephant",
      "food": "acacia",
      "kind": "vegetaux",
      "note": "feuilles et branches",
      "foodSideOnly": true
    },
    {
      "eater": "elephant",
      "food": "baobab",
      "kind": "vegetaux",
      "note": "écorce",
      "foodSideOnly": true
    },
    {
      "eater": "elephant",
      "food": "marula",
      "kind": "vegetaux",
      "note": "fruits",
      "foodSideOnly": true
    },
    {
      "eater": "elephant",
      "food": "mopane",
      "kind": "vegetaux",
      "note": "feuilles",
      "foodSideOnly": true
    },
    {
      "eater": "elephant",
      "food": "racines",
      "kind": "vegetaux",
      "note": "qu’il déterre",
      "foodSideOnly": true
    },
    {
      "eater": "girafe",
      "food": "acacia",
      "kind": "vegetaux",
      "note": "feuilles, malgré les épines",
      "foodSideOnly": true
    },
    {
      "eater": "girafe",
      "food": "feuilles",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "rhino_noir",
      "food": "feuilles",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "rhino_noir",
      "food": "acacia",
      "kind": "vegetaux",
      "note": "rameaux",
      "foodSideOnly": true
    },
    {
      "eater": "rhino_blanc",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "grand_koudou",
      "food": "feuilles",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "grand_koudou",
      "food": "acacia",
      "kind": "vegetaux",
      "note": "feuilles",
      "foodSideOnly": true
    },
    {
      "eater": "eland",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "eland",
      "food": "feuilles",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "springbok",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "springbok",
      "food": "feuilles",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "bubale",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "topi",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "hippotrague_rouan",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "hippotrague_noir",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "hippotrague_noir",
      "food": "feuilles",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "cobe_defassa",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "cobe_roseau",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "cephalophe",
      "food": "feuilles",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "cephalophe",
      "food": "fruits_graines",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "dikdik",
      "food": "feuilles",
      "kind": "vegetaux",
      "note": "feuilles et pousses",
      "foodSideOnly": true
    },
    {
      "eater": "dikdik",
      "food": "fruits_graines",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "lievre",
      "food": "herbes",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "porc_epic",
      "food": "racines",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "porc_epic",
      "food": "fruits_graines",
      "kind": "vegetaux",
      "note": "fruits tombés",
      "foodSideOnly": true
    },
    {
      "eater": "rongeur",
      "food": "fruits_graines",
      "kind": "vegetaux",
      "note": "graines",
      "foodSideOnly": true
    },
    {
      "eater": "termite",
      "food": "herbes",
      "kind": "vegetaux",
      "note": "herbes sèches, pour certaines espèces",
      "foodSideOnly": true
    },
    {
      "eater": "impala",
      "food": "acacia",
      "kind": "vegetaux",
      "note": "gousses et feuilles",
      "foodSideOnly": true
    },
    {
      "eater": "phacochere",
      "food": "marula",
      "kind": "vegetaux",
      "note": "fruits tombés",
      "foodSideOnly": true
    }
  ],
  "sources": [
    {
      "name": "Animal Diversity Web (Université du Michigan) — fiches espèces",
      "url": "https://animaldiversity.org/"
    },
    {
      "name": "Liste rouge de l’UICN — statuts et aires de répartition",
      "url": "https://www.iucnredlist.org/"
    },
    {
      "name": "National Geographic Education — écosystème de savane",
      "url": "https://media.nationalgeographic.org/assets/file/866_african_savanna_illustration_1.pdf"
    },
    {
      "name": "TRAFFIC — chasse pour la viande en Tanzanie",
      "url": "https://www.traffic.org/publications/reports/from-bush-to-butchery/"
    },
    {
      "name": "Natural Earth — fonds de carte (domaine public)",
      "url": "https://www.naturalearthdata.com/"
    }
  ],
  "humanInteractions": [
    {
      "species": "zebre",
      "title": "Chassé pour sa viande",
      "region": "plusieurs villes de Tanzanie",
      "note": "Dans des villes de Tanzanie, on vend de la viande de cet animal chassé dans la nature, parfois illégalement (c’est alors du braconnage).",
      "sourceUrl": "https://www.traffic.org/publications/reports/bushmeat-trade-in-urban-centres-in-tanzania-an-analysis-from-dar-es-salaam-morogoro-mbeya-arusha-and-manyara/"
    },
    {
      "species": "gnou",
      "title": "Chassé pour sa viande",
      "region": "nord de la Tanzanie",
      "note": "Dans le nord de la Tanzanie, de la viande de cet animal chassé dans la nature est vendue. Une partie de cette chasse est autorisée et encadrée ; une autre est du braconnage, qui est interdit.",
      "sourceUrl": "https://www.traffic.org/publications/reports/from-bush-to-butchery/"
    },
    {
      "species": "gazelle",
      "title": "Chassé pour sa viande",
      "region": "plusieurs villes de Tanzanie",
      "note": "Dans des villes de Tanzanie, on vend de la viande de cet animal chassé dans la nature, parfois illégalement (c’est alors du braconnage).",
      "sourceUrl": "https://www.traffic.org/publications/reports/bushmeat-trade-in-urban-centres-in-tanzania-an-analysis-from-dar-es-salaam-morogoro-mbeya-arusha-and-manyara/"
    },
    {
      "species": "impala",
      "title": "Chassé pour sa viande",
      "region": "nord de la Tanzanie",
      "note": "Dans le nord de la Tanzanie, de la viande de cet animal chassé dans la nature est vendue. Une partie de cette chasse est autorisée et encadrée ; une autre est du braconnage, qui est interdit.",
      "sourceUrl": "https://www.traffic.org/publications/reports/from-bush-to-butchery/"
    },
    {
      "species": "phacochere",
      "title": "Chassé pour sa viande",
      "region": "plusieurs villes de Tanzanie",
      "note": "Dans des villes de Tanzanie, on vend de la viande de cet animal chassé dans la nature, parfois illégalement (c’est alors du braconnage).",
      "sourceUrl": "https://www.traffic.org/publications/reports/bushmeat-trade-in-urban-centres-in-tanzania-an-analysis-from-dar-es-salaam-morogoro-mbeya-arusha-and-manyara/"
    },
    {
      "species": "buffle",
      "title": "Chassé pour sa viande",
      "region": "nord de la Tanzanie",
      "note": "Dans le nord de la Tanzanie, de la viande de cet animal chassé dans la nature est vendue. Une partie de cette chasse est autorisée et encadrée ; une autre est du braconnage, qui est interdit.",
      "sourceUrl": "https://www.traffic.org/publications/reports/from-bush-to-butchery/"
    }
  ]
};
