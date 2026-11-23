// Univers « les airs » : données pédagogiques (espèces, liens, sources) et réglages de l’univers.
window.RV_DONNEES = window.RV_DONNEES || {};
window.RV_DONNEES.airs = {
  "meta": {
    "id": "airs",
    "nom": "Le ciel d’Europe",
    "lieu": "dans le ciel d’Europe",
    "titre": "Réseau vivant — Qui mange qui dans le ciel d’Europe ?",
    "eyebrow": "🦅 Qui mange qui dans le ciel ?",
    "animalParDefaut": "hirondelle",
    "exemplesRecherche": "« faucon », « hibou » ou « insecte »",
    "couleurBarre": "#1d3557",
    "aideReseau": "Chaque animal est représenté par un émoji ou par une silhouette dessinée par un illustrateur (PhyloPic). Ce sont des symboles, pas des photos : ils ne montrent pas toujours la bonne espèce, parfois seulement un proche cousin.",
    "groupesProducteurs": [
      "Végétaux"
    ],
    "texteProducteur": "☀️ Une plante fabrique sa propre nourriture grâce à la lumière du Soleil, à l’eau et à l’air.",
    "texteRecyclage": "♻️ Cette matière vient d’êtres vivants morts. Elle sera recyclée et nourrira à nouveau le sol.",
    "filtres": [
      {
        "id": "",
        "label": "Tous",
        "type": "animal"
      },
      {
        "id": "rapaces",
        "label": "🦅 Rapaces",
        "groupes": [
          "Rapaces"
        ]
      },
      {
        "id": "oiseaux",
        "label": "🐦 Oiseaux (rapaces compris)",
        "groupes": [
          "Oiseaux",
          "Rapaces"
        ]
      },
      {
        "id": "insectivores",
        "label": "🦟 Mangeurs d’insectes",
        "type": "animal",
        "regimeContient": [
          "insectivore"
        ]
      },
      {
        "id": "insectes",
        "label": "🐝 Insectes",
        "groupes": [
          "Insectes"
        ]
      },
      {
        "id": "herbivores",
        "label": "🌿 Herbivores",
        "type": "animal",
        "regimeContient": [
          "herbivore"
        ]
      },
      {
        "id": "plantes",
        "label": "🌼 Plantes et restes",
        "type": "resource"
      }
    ],
    "regions": {
      "atlantique": {
        "nom": "Europe de l’Ouest (France, Espagne, îles Britanniques)",
        "dans": "en Europe de l’Ouest",
        "court": "Europe de l’Ouest"
      },
      "nord": {
        "nom": "Europe du Nord (Scandinavie, Baltique)",
        "dans": "en Europe du Nord",
        "court": "Europe du Nord"
      },
      "mediterranee": {
        "nom": "Pourtour méditerranéen",
        "dans": "autour de la Méditerranée",
        "court": "Méditerranée"
      },
      "est": {
        "nom": "Europe centrale et de l’Est",
        "dans": "en Europe centrale et de l’Est",
        "court": "Centre et Est"
      },
      "alpes": {
        "nom": "Montagnes (Alpes, Pyrénées)",
        "dans": "dans les montagnes (Alpes, Pyrénées)",
        "court": "Montagnes"
      },
      "afrique": {
        "nom": "Afrique (où ils passent l’hiver, sans plus de précision)",
        "dans": "en Afrique pendant l’hiver",
        "court": "Afrique (hiver)"
      }
    },
    "carte": {
      "fichier": "univers/airs/cartes.html",
      "avertissement": "Carte simplifiée : l’animal ne vit pas partout dans la zone colorée, seulement là où il trouve son milieu (prairies, forêts, falaises, villes…). L’Afrique n’est montrée qu’en partie : ces oiseaux passent l’hiver dans de nombreuses régions au sud du Sahara. Pour les oiseaux migrateurs, la zone Afrique montre où ils passent l’hiver."
    },
    "chaineHero": [
      "faucon_pelerin",
      "hirondelle",
      "abeille",
      "fleurs"
    ],
    "chaineHeroTexte": "Les flèches montrent le chemin de l’énergie : les fleurs nourrissent l’abeille, l’hirondelle attrape l’abeille en vol, et le faucon pèlerin chasse l’hirondelle à son tour.",
    "comprendre": {
      "cartes": [
        [
          "☀️",
          "Tout commence par le Soleil",
          "Les plantes utilisent sa lumière pour fabriquer leur nourriture. Fleurs, herbes et graines nourrissent les insectes, les rongeurs et les oiseaux."
        ],
        [
          "🕸️",
          "Chacun a plusieurs liens",
          "Un animal mange souvent plusieurs espèces, et peut être mangé par plusieurs prédateurs."
        ],
        [
          "♻️",
          "Rien ne se perd",
          "Vautours et gypaètes mangent les animaux morts. Ils nettoient la montagne et rendent la matière au sol."
        ],
        [
          "🌍",
          "Un réseau qui voyage",
          "Quand les insectes se font rares en hiver, des oiseaux comme l’hirondelle et le martinet partent vers l’Afrique : le réseau traverse les continents."
        ]
      ],
      "chaine": [
        {
          "emoji": "☀️",
          "nom": "Soleil",
          "role": "donne l’énergie"
        },
        {
          "id": "fleurs",
          "emoji": "🌼",
          "nom": "Fleurs",
          "role": "producteurs"
        },
        {
          "id": "abeille",
          "emoji": "🐝",
          "nom": "Abeille",
          "role": "butine le nectar"
        },
        {
          "id": "hirondelle",
          "emoji": "🐦",
          "nom": "Hirondelle",
          "role": "mange des insectes"
        },
        {
          "id": "faucon_pelerin",
          "emoji": "🦅",
          "nom": "Faucon pèlerin",
          "role": "carnivore"
        }
      ],
      "chaineTexte": "Les flèches montrent le chemin de l’énergie : le Soleil nourrit les fleurs, l’abeille butine leur nectar, l’hirondelle attrape l’abeille en vol et le faucon pèlerin chasse l’hirondelle. Touche un être vivant pour le retrouver dans le réseau."
    },
    "quiz": {
      "intro": "Trois quiz de 5 questions sur les habitants du ciel d’Europe. Les questions changent à chaque partie !",
      "expert": "Parfait ! Tu es un vrai expert du ciel d’Europe.",
      "motsHerbivore": "des plantes (herbes, feuilles, graines)",
      "groupeInvertebres": "Insectes",
      "leurresQuiMange": {
        "vertebre": {
          "ids": [
            "marmotte",
            "pigeon_ramier",
            "chardonneret"
          ],
          "pourquoi": "mangent surtout des plantes ou des graines, et ne chassent pas d’animaux."
        },
        "invertebre": {
          "ids": [
            "aigle_royal",
            "vautour_fauve",
            "gypaete",
            "grand_duc"
          ],
          "pourquoi": "se nourrissent de grosses proies ou de charognes, pas d’insectes."
        }
      },
      "grandsChasseurs": [
        "aigle_royal",
        "grand_duc",
        "faucon_pelerin",
        "buse"
      ],
      "petitesProies": [
        "moustique",
        "abeille"
      ],
      "petitesProiesPourquoi": "Les moustiques et les abeilles sont bien trop petits pour un si grand chasseur.",
      "grossesProies": [
        "aigle_royal",
        "vautour_fauve",
        "cigogne"
      ],
      "leurresQueMange": [
        "Mammifères",
        "Insectes"
      ],
      "region": {
        "mode": "presence",
        "region": "afrique",
        "oui": [
          "hirondelle",
          "martinet",
          "cigogne",
          "guepier",
          "faucon_hobereau"
        ],
        "non": [
          "marmotte",
          "campagnol",
          "grand_duc",
          "aigle_royal",
          "moineau",
          "chouette_effraie"
        ],
        "question": "Lequel de ces animaux part passer l’hiver en Afrique ?",
        "pourquoi": "{non} ne quittent pas l’Europe en hiver."
      },
      "curiosites": [
        {
          "emoji": "🦴",
          "q": "Que fait le gypaète avec les gros os ?",
          "options": [
            [
              "casse",
              "Il les lâche sur des pierriers pour les briser",
              "🪨"
            ],
            [
              "cache",
              "Il les cache sous la neige pour plus tard",
              "⛏️"
            ],
            [
              "nid",
              "Il les rapporte au nid pour s’amuser",
              "🪺"
            ]
          ],
          "correct": "casse",
          "why": "Il casse les plus gros os sur des pierriers, puis avale les morceaux.",
          "animal": "gypaete"
        },
        {
          "emoji": "🦅",
          "q": "Que fait la crécerelle quand elle pratique le « vol en Saint-Esprit » ?",
          "options": [
            [
              "place",
              "Elle reste sur place dans le vent",
              "🪁"
            ],
            [
              "dort",
              "Elle fait la sieste en plein vol",
              "😴"
            ],
            [
              "chante",
              "Elle appelle ses petits en chantant",
              "🎵"
            ]
          ],
          "correct": "place",
          "why": "Elle reste immobile dans le vent, ailes battant vite et queue en éventail, pour repérer ses proies au sol.",
          "animal": "faucon_crecerelle"
        },
        {
          "emoji": "📏",
          "q": "Pourquoi le mâle du faucon pèlerin s’appelle-t-il « tiercelet » ?",
          "options": [
            [
              "tiers",
              "Il est un tiers plus petit que la femelle",
              "📉"
            ],
            [
              "vite",
              "Il vole trois fois plus vite que la femelle",
              "💨"
            ],
            [
              "plumes",
              "Il porte trois plumes colorées sur la tête",
              "🪶"
            ]
          ],
          "correct": "tiers",
          "why": "Le mâle est environ un tiers plus petit que la femelle : « tiercelet » vient de « tiers ».",
          "animal": "faucon_pelerin"
        },
        {
          "emoji": "🌍",
          "q": "Comment beaucoup de cigognes blanches voyagent-elles jusqu’en Afrique ?",
          "options": [
            [
              "plane",
              "En planant sur les courants d’air chaud",
              "🌀"
            ],
            [
              "bat",
              "En battant des ailes sans jamais s’arrêter",
              "💪"
            ],
            [
              "nuit",
              "En volant seulement la nuit, à basse altitude",
              "🌙"
            ]
          ],
          "correct": "plane",
          "why": "Beaucoup de cigognes migrent vers l’Afrique en profitant des courants d’air chaud pour planer, ce qui leur évite de trop battre des ailes.",
          "animal": "cigogne"
        },
        {
          "emoji": "☁️",
          "q": "Que ne fait presque jamais le martinet noir ?",
          "options": [
            [
              "sol",
              "Se poser sur le sol",
              "🌱"
            ],
            [
              "chasse",
              "Chasser en vol",
              "💨"
            ],
            [
              "nid",
              "Dormir dans un nid",
              "🪺"
            ]
          ],
          "correct": "sol",
          "why": "Il passe presque toute sa vie en vol : il se pose surtout pour nicher et nourrir ses petits, et pendant des mois en Afrique il reste même en vol, nuit comprise.",
          "animal": "martinet"
        },
        {
          "emoji": "🪰",
          "q": "Avec quoi l’hirondelle rustique construit-elle son nid ?",
          "options": [
            [
              "boue",
              "Des boulettes de boue et de la paille",
              "🧱"
            ],
            [
              "branches",
              "De grosses branches",
              "🪵"
            ],
            [
              "sable",
              "Du sable creusé dans une berge",
              "🏖️"
            ]
          ],
          "correct": "boue",
          "why": "Elle façonne une petite coupe avec des boulettes de boue mêlées de brins de paille, souvent sous un toit ou dans une grange.",
          "animal": "hirondelle"
        },
        {
          "emoji": "🐛",
          "q": "Que mangent surtout les poussins de la mésange bleue ?",
          "options": [
            [
              "chenille",
              "Des chenilles"
            ],
            [
              "graines",
              "Des graines"
            ],
            [
              "fruits",
              "Des fruits"
            ]
          ],
          "correct": "chenille",
          "why": "Au printemps, les mésanges attrapent de très nombreuses chenilles pour nourrir leurs petits.",
          "animal": "mesange_bleue"
        },
        {
          "emoji": "🏖️",
          "q": "Où le guêpier d’Europe creuse-t-il son nid ?",
          "options": [
            [
              "berge",
              "Dans une berge de sable ou de terre",
              "🏞️"
            ],
            [
              "arbre",
              "Tout en haut d’un grand arbre",
              "🌳"
            ],
            [
              "toit",
              "Sous le toit d’une vieille maison",
              "🏠"
            ]
          ],
          "correct": "berge",
          "why": "Il creuse un tunnel dans le sol meuble d’une berge ou d’une falaise, souvent au sein d’une colonie.",
          "animal": "guepier"
        },
        {
          "emoji": "📡",
          "q": "Comment la pipistrelle repère-t-elle ses proies dans le noir ?",
          "options": [
            [
              "cris",
              "En criant et en écoutant l’écho",
              "📣"
            ],
            [
              "yeux",
              "Elle voit parfaitement dans le noir",
              "👀"
            ],
            [
              "odeur",
              "Elle sent leur odeur de très loin",
              "👃"
            ]
          ],
          "correct": "cris",
          "why": "Elle crie des ultrasons, trop aigus pour nos oreilles, et repère ses proies grâce à l’écho.",
          "animal": "pipistrelle"
        },
        {
          "emoji": "🚨",
          "q": "Que fait une marmotte quand elle voit un danger ?",
          "options": [
            [
              "siffle",
              "Elle siffle pour prévenir les autres",
              "📣"
            ],
            [
              "cache",
              "Elle se cache seule dans un coin",
              "🙈"
            ],
            [
              "attaque",
              "Elle attaque pour faire fuir le danger",
              "⚔️"
            ]
          ],
          "correct": "siffle",
          "why": "Une marmotte fait le guet et prévient la colonie d’un sifflement aigu.",
          "animal": "marmotte"
        },
        {
          "emoji": "🐀",
          "q": "Pourquoi y a-t-il plus de chouettes effraies quand les campagnols sont nombreux ?",
          "options": [
            [
              "mange",
              "Parce qu’elles trouvent plus à manger",
              "🍽️"
            ],
            [
              "protege",
              "Parce qu’elles les protègent des renards",
              "🛡️"
            ],
            [
              "terrier",
              "Parce qu’elles vivent dans leurs terriers",
              "🕳️"
            ]
          ],
          "correct": "mange",
          "why": "La chouette effraie mange surtout des campagnols : quand ils sont nombreux, elle a de quoi nourrir plus de petits.",
          "animal": "chouette_effraie"
        },
        {
          "emoji": "🌼",
          "q": "D’où vient le nom du chardonneret ?",
          "options": [
            [
              "chardon",
              "De sa plante préférée, le chardon",
              "🌱"
            ],
            [
              "charbon",
              "De ses plumes noires comme du charbon",
              "⚫"
            ],
            [
              "chant",
              "De son chant qui s’entend de loin",
              "🎶"
            ]
          ],
          "correct": "chardon",
          "why": "Son nom vient de la plante dont il raffole : le chardon.",
          "animal": "chardonneret"
        },
        {
          "emoji": "💃",
          "q": "Comment une abeille peut-elle dire aux autres où sont les fleurs ?",
          "options": [
            [
              "danse",
              "Grâce à une danse dans la ruche",
              "💃"
            ],
            [
              "cri",
              "Grâce à un cri très aigu",
              "📣"
            ],
            [
              "miel",
              "En laissant une trace de miel",
              "🍯"
            ]
          ],
          "correct": "danse",
          "why": "La danse de l’abeille indique la direction et la distance des fleurs éloignées.",
          "animal": "abeille"
        },
        {
          "emoji": "🪰",
          "q": "Que peut attraper le faucon hobereau en plein vol ?",
          "options": [
            [
              "libellule",
              "Une libellule"
            ],
            [
              "marmotte",
              "Une marmotte"
            ],
            [
              "lievre",
              "Un lièvre"
            ]
          ],
          "correct": "libellule",
          "why": "Ce chasseur acrobate attrape les libellules en plein vol, mais pas les animaux restés au sol.",
          "animal": "faucon_hobereau"
        },
        {
          "emoji": "🗣️",
          "q": "Que sait faire l’étourneau sansonnet ?",
          "options": [
            [
              "imite",
              "Imiter d’autres animaux",
              "🔊"
            ],
            [
              "recule",
              "Voler en marche arrière",
              "🔙"
            ],
            [
              "nage",
              "Plonger sous l’eau pour pêcher",
              "🐟"
            ]
          ],
          "correct": "imite",
          "why": "L’étourneau sansonnet imite d’autres oiseaux et même des bruits de machines.",
          "animal": "etourneau"
        }
      ]
    }
  },
  "version": "1.0.0",
  "validation": {
    "links": "78 relations ; chacune cite sa source dans le champ source (pages de référence, bases de données et articles scientifiques).",
    "scope": "illustrative_examples_for_european_airspace",
    "note": "Chaque relation est associée à une source ; certaines sources restent générales (par exemple « libellules », « hirondelles et martinets »).",
    "rangeMapping": "broad_regions_approximate_not_species_polygons"
  },
  "biome": "Ciel d’Europe",
  "species": [
    {
      "id": "faucon_pelerin",
      "name": "Faucon pèlerin",
      "scientific": "Falco peregrinus",
      "group": "Rapaces",
      "emoji": "🦅",
      "diet": "Carnivore",
      "habitat": "Falaises et côtes rocheuses, mais aussi carrières et grands bâtiments en ville, du bord de mer jusqu’en montagne.",
      "description": "Un faucon aux ailes pointues et au dos gris-bleu, qui chasse surtout des oiseaux en plein vol.",
      "role": "Super-chasseur du ciel : il capture en plein vol des pigeons, des étourneaux et d’autres oiseaux.",
      "fun": "Le mâle s’appelle le tiercelet, car il est environ un tiers plus petit que la femelle.",
      "protect": "Ne t’approche pas des falaises où il niche au printemps pour ne pas le déranger.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes"
      ],
      "short": "Faucon pèlerin",
      "source": "https://oiseaux.net/birds/peregrine.falcon.html",
      "noPredator": "Adulte, il est au sommet du réseau : presque aucun animal ne le chasse.",
      "keywords": "faucon rapace falaise oiseau"
    },
    {
      "id": "faucon_hobereau",
      "name": "Faucon hobereau",
      "scientific": "Falco subbuteo",
      "group": "Rapaces",
      "emoji": "🦅",
      "diet": "Carnivore et insectivore (oiseaux et insectes)",
      "habitat": "Campagne ouverte avec des bois, des landes et des prairies, souvent près de l’eau.",
      "description": "Un faucon élancé, aux ailes effilées, à la silhouette de grand martinet, qui revient d’Afrique au printemps.",
      "role": "Il chasse les libellules et les petits oiseaux en vol : un acrobate du ciel d’été.",
      "fun": "Il ne construit pas son nid : il s’installe dans un vieux nid de corneille.",
      "protect": "Si tu as un jardin, laisse un coin sauvage avec des fleurs et une mare, sans pesticides : c’est là que vivent les libellules qu’il chasse.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "afrique"
      ],
      "short": "Faucon hobereau",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/440974",
      "noPredator": "Adulte, il a très peu de prédateurs : c’est un chasseur rapide, au sommet de sa chaîne.",
      "keywords": "faucon rapace migrateur libellule"
    },
    {
      "id": "faucon_crecerelle",
      "name": "Faucon crécerelle",
      "scientific": "Falco tinnunculus",
      "group": "Rapaces",
      "emoji": "🦅",
      "diet": "Carnivore",
      "habitat": "Tous les milieux ouverts : champs, prairies, bords de route, villes et alpages.",
      "description": "Un petit faucon roux et tacheté, que l’on voit souvent immobile au-dessus d’un champ.",
      "role": "Il chasse surtout les campagnols et aide à limiter leur nombre dans les champs.",
      "fun": "Il fait du « Saint-Esprit » : il reste sur place dans le vent, comme suspendu à un fil, pour repérer ses proies.",
      "protect": "Installe un nichoir en hauteur et laisse des bandes d’herbe sauvage au bord des champs.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes"
      ],
      "short": "Faucon crécerelle",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/440970",
      "keywords": "faucon rapace saint-esprit campagnol"
    },
    {
      "id": "epervier",
      "name": "Épervier d’Europe",
      "scientific": "Accipiter nisus",
      "group": "Rapaces",
      "emoji": "🦅",
      "diet": "Carnivore",
      "habitat": "Bois, lisières et campagnes à haies ; en hiver, il s’approche des villages et des villes.",
      "description": "Un petit rapace aux ailes courtes et à la longue queue, très agile entre les arbres.",
      "role": "Il chasse de petits oiseaux en les surprenant entre les arbres et les haies.",
      "fun": "La femelle est plus grande que le mâle : elle chasse des proies plus lourdes, comme les grives ou les pigeons ramiers. Le couple se fait ainsi moins concurrence.",
      "protect": "Si tu as un jardin, plante une haie variée : les petits oiseaux s’y abritent, et l’épervier y trouve à manger.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est"
      ],
      "short": "Épervier",
      "source": "https://oiseaux.net/birds/eurasian.sparrowhawk.html",
      "elision": true,
      "noPredator": "Adulte, il a très peu de prédateurs : il est lui-même un chasseur d’oiseaux.",
      "keywords": "epervier d’europe rapace oiseau haie"
    },
    {
      "id": "buse",
      "name": "Buse variable",
      "scientific": "Buteo buteo",
      "group": "Rapaces",
      "emoji": "🦅",
      "diet": "Carnivore",
      "habitat": "Bois et plaines agricoles ; elle chasse en terrain ouvert et se pose souvent au bord des routes.",
      "description": "Un rapace brun qui plane en cercles au-dessus des champs ou se pose sur un poteau au bord de la route.",
      "role": "Elle chasse les petits rongeurs et mange aussi des animaux déjà morts : elle évite que les rongeurs deviennent trop nombreux dans les champs.",
      "fun": "Son plumage varie énormément d’un oiseau à l’autre, du brun foncé jusqu’au presque blanc.",
      "protect": "Préserve les prairies et les haies, et évite les poisons contre les rongeurs, qui l’intoxiquent aussi.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est"
      ],
      "short": "Buse variable",
      "source": "https://www.bio-scene.org/sites/default/files/fe-bbuteo-290321.pdf",
      "genre": "f",
      "keywords": "rapace buse variable"
    },
    {
      "id": "aigle_royal",
      "name": "Aigle royal",
      "scientific": "Aquila chrysaetos",
      "group": "Rapaces",
      "emoji": "🦅",
      "diet": "Carnivore",
      "habitat": "Montagnes rocheuses : il niche surtout sur des falaises, parfois dans un arbre.",
      "description": "Un très grand rapace brun doré, qui plane au-dessus des montagnes.",
      "role": "Un des grands chasseurs de la montagne : il chasse des marmottes et d’autres animaux, et mange parfois des charognes.",
      "fun": "Son nid est réutilisé pendant des dizaines d’années et peut devenir énorme.",
      "protect": "Au printemps, évite les falaises où il niche : pas de drone ni de bruit près de son nid.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes"
      ],
      "short": "Aigle royal",
      "source": "https://occitanie.lpo.fr/wp-content/uploads/2020/05/plaquette-aigles-LPO.pdf",
      "noPredator": "Un aigle royal adulte n’a presque pas de prédateur.",
      "keywords": "aigle rapace montagne marmotte"
    },
    {
      "id": "chouette_effraie",
      "name": "Chouette effraie",
      "scientific": "Tyto alba",
      "group": "Rapaces",
      "emoji": "🦉",
      "diet": "Carnivore",
      "habitat": "Campagnes ouvertes avec haies et prairies, près des granges, clochers et vieux bâtiments où elle niche.",
      "description": "Une chouette blanche à la face en forme de cœur, qui chasse la nuit.",
      "role": "Elle chasse surtout des campagnols : son nombre suit celui de ses proies.",
      "fun": "Son vol est si silencieux qu’on ne l’entend plus à plus de deux mètres.",
      "protect": "Si tu connais une grange où elle vit, demande aux adultes de laisser une ouverture ou de poser un nichoir.",
      "type": "animal",
      "regions": [
        "atlantique",
        "mediterranee",
        "est"
      ],
      "short": "Chouette effraie",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/440860",
      "genre": "f",
      "keywords": "chouette effraie hibou nuit nocturne dame blanche"
    },
    {
      "id": "grand_duc",
      "name": "Grand-duc d’Europe",
      "scientific": "Bubo bubo",
      "group": "Rapaces",
      "emoji": "🦉",
      "diet": "Carnivore",
      "habitat": "Falaises, carrières et forêts, des bois de conifères du nord aux garrigues du sud, jusqu’en montagne.",
      "description": "Le plus grand hibou d’Europe, avec deux aigrettes en forme d’oreilles, qui chasse la nuit.",
      "role": "Super-chasseur de la nuit : il mange des rongeurs, des oiseaux et même d’autres rapaces.",
      "fun": "En France, il a failli disparaître : en 1976, on connaissait moins de 100 couples. Grâce à la protection, il est revenu.",
      "protect": "Laisse-le tranquille près des falaises et des carrières où il niche.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes"
      ],
      "short": "Grand-duc",
      "source": "https://www.grand-est.developpement-durable.gouv.fr/IMG/pdf/hibou_grand-duc_cle25c532.pdf",
      "noPredator": "Un grand-duc adulte n’a presque pas de prédateur.",
      "keywords": "hibou grand-duc rapace nocturne nuit"
    },
    {
      "id": "vautour_fauve",
      "name": "Vautour fauve",
      "scientific": "Gyps fulvus",
      "group": "Rapaces",
      "emoji": "🦅",
      "diet": "Charognard (mange des animaux morts)",
      "habitat": "Falaises calcaires de moyenne montagne, vallées et causses où l’air chaud le fait planer.",
      "description": "Un grand vautour brun clair, à la tête et au long cou couverts d’un fin duvet blanc, qui plane en groupe au-dessus des falaises.",
      "role": "Il nettoie la nature : il mange les animaux morts, ce qui limite la propagation des maladies.",
      "fun": "Il peut avaler plus d’un kilo de viande en un repas, puis rester plusieurs jours sans manger.",
      "protect": "Reste à distance des falaises où il niche, et ne laisse jamais de déchets ou de nourriture traîner dans la nature.",
      "type": "animal",
      "regions": [
        "atlantique",
        "mediterranee",
        "alpes"
      ],
      "short": "Vautour fauve",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/441026",
      "noPredator": "Un vautour adulte n’a presque pas de prédateur.",
      "keywords": "vautour charognard rapace"
    },
    {
      "id": "gypaete",
      "name": "Gypaète barbu",
      "scientific": "Gypaetus barbatus",
      "group": "Rapaces",
      "emoji": "🦅",
      "diet": "Charognard (mange surtout des os)",
      "habitat": "Hautes montagnes abruptes, avec des falaises pour nicher et des pierriers pour casser les os.",
      "description": "Un grand rapace de montagne, reconnaissable à la petite barbe noire sous son bec.",
      "role": "Il mange les os des animaux morts : il nettoie la montagne et recycle la matière.",
      "fun": "Il lâche les gros os sur les rochers pour les briser, et se baigne dans des sources riches en fer, qui colorent en orange les plumes de son ventre.",
      "protect": "Garde tes distances avec les falaises où il fait son nid, et ne fais pas voler de drone dans la montagne.",
      "type": "animal",
      "regions": [
        "alpes",
        "mediterranee"
      ],
      "short": "Gypaète barbu",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/441085",
      "noPredator": "Un gypaète adulte n’a presque pas de prédateur.",
      "keywords": "gypaete barbu vautour os"
    },
    {
      "id": "hirondelle",
      "name": "Hirondelle rustique",
      "scientific": "Hirundo rustica",
      "group": "Oiseaux",
      "emoji": "🐦",
      "diet": "Insectivore (mange des insectes)",
      "habitat": "Campagne, fermes et villages : elle niche dans les granges et les écuries, et chasse au-dessus des prairies, des haies et des mares.",
      "description": "Une hirondelle à la queue en fourche et à la gorge rousse, qui vit près des fermes et des granges.",
      "role": "Elle attrape en vol des moustiques, des abeilles et d’autres insectes : elle limite leur nombre.",
      "fun": "Après son voyage depuis l’Afrique, elle revient souvent au même endroit et répare son ancien nid.",
      "protect": "Ne détruis jamais un nid d’hirondelle (c’est interdit) et laisse un passage ouvert vers la grange ou le garage au printemps.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes",
        "afrique"
      ],
      "short": "Hirondelle rustique",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/441119",
      "genre": "f",
      "elision": true,
      "keywords": "hirondelle de cheminée rustique oiseau migrateur insecte"
    },
    {
      "id": "martinet",
      "name": "Martinet noir",
      "scientific": "Apus apus",
      "group": "Oiseaux",
      "emoji": "🐦",
      "diet": "Insectivore (mange des insectes)",
      "habitat": "Il vit dans les villes et villages, niche sous les toits et dans les fissures des murs, et passe presque toute sa vie dans le ciel.",
      "description": "Un oiseau noir aux longues ailes en faucille, qui crie en groupe dans le ciel des villes l’été.",
      "role": "Il chasse en vol les petits insectes : un vrai nettoyeur du ciel.",
      "fun": "Il peut rester en l’air jusqu’à dix mois d’affilée, sans jamais se poser, en dehors de la saison de nidification.",
      "protect": "Si des travaux sont prévus sur un toit, demande qu’on garde les petits trous où nichent les martinets ou qu’on installe des nichoirs.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes",
        "afrique"
      ],
      "short": "Martinet noir",
      "source": "https://animaldiversity.org/accounts/Apus_apus/",
      "keywords": "martinet noir oiseau migrateur insecte ciel"
    },
    {
      "id": "mesange_bleue",
      "name": "Mésange bleue",
      "scientific": "Cyanistes caeruleus",
      "group": "Oiseaux",
      "emoji": "🐦",
      "diet": "Insectivore et granivore (insectes et graines)",
      "habitat": "Forêts de feuillus, bois, parcs et jardins ; on la trouve aussi en montagne jusqu’à environ 1 200 m.",
      "description": "Une petite mésange à la calotte bleue et aux joues blanches, fréquente dans les jardins.",
      "role": "Elle mange énormément d’insectes, surtout des chenilles : elle protège les arbres et les potagers.",
      "fun": "Après leur premier envol, les jeunes sont encore nourris par leurs parents pendant 10 à 15 jours.",
      "protect": "Installe un nichoir dans ton jardin et évite les produits contre les insectes, qui lui enlèvent sa nourriture.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes"
      ],
      "short": "Mésange bleue",
      "source": "https://paca.lpo.fr/images/mediatheque/fichiers/section_etudes/connaissance/observatoire_biodiversite_mont_ventoux/mesange_bleue.pdf",
      "genre": "f",
      "keywords": "mésange bleue oiseau jardin nichoir"
    },
    {
      "id": "moineau",
      "name": "Moineau domestique",
      "scientific": "Passer domesticus",
      "group": "Oiseaux",
      "emoji": "🐦",
      "diet": "Omnivore",
      "habitat": "Villes, villages et fermes : il vit tout près des humains et niche sous les toits et dans les fissures des bâtiments.",
      "description": "Un petit oiseau brun et gris qui vit tout près des humains, dans les villes, les villages et les fermes.",
      "role": "Il mange des graines et des insectes, et nourrit à son tour des rapaces comme l’épervier.",
      "fun": "Il défend avec énergie le petit territoire qui entoure son nid.",
      "protect": "Laisse un coin de buissons dans ton jardin et mets de l’eau propre : le moineau y trouvera un abri.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est"
      ],
      "short": "Moineau domestique",
      "source": "https://animaldiversity.org/accounts/Passer_domesticus/",
      "keywords": "moineau domestique oiseau ville pierrot"
    },
    {
      "id": "chardonneret",
      "name": "Chardonneret élégant",
      "scientific": "Carduelis carduelis",
      "group": "Oiseaux",
      "emoji": "🐦",
      "diet": "Granivore (et chenilles pour les jeunes)",
      "habitat": "Lisières de forêts, bois clairs, vergers, jardins et même grandes villes.",
      "description": "Un petit oiseau au masque rouge et aux ailes noires et jaunes, qui chante comme une clochette.",
      "role": "Il se nourrit surtout de graines de plantes sauvages, comme celles des chardons, et ses petits reçoivent aussi des chenilles.",
      "fun": "Son nom vient du chardon, la plante dont il raffole.",
      "protect": "Laisse pousser quelques chardons et fleurs sauvages dans un coin du jardin, et ne capture jamais cet oiseau protégé.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est"
      ],
      "short": "Chardonneret élégant",
      "source": "https://www.ofb.gouv.fr/sites/default/files/Fichiers/Plaquettes%20et%20rapports%20instit/plaquette-chardonneret-elegant.pdf",
      "keywords": "chardonneret élégant oiseau chardon graines"
    },
    {
      "id": "merle",
      "name": "Merle noir",
      "scientific": "Turdus merula",
      "group": "Oiseaux",
      "emoji": "🐦‍⬛",
      "diet": "Omnivore",
      "habitat": "Jardins, parcs et villes, mais aussi campagne avec haies et forêts ; il se trouve aussi en montagne.",
      "description": "Le mâle est noir avec un bec orange, la femelle est brune : c’est un oiseau très fréquent dans les jardins.",
      "role": "Il mange des fruits et des insectes, et il répand les graines des baies qu’il avale.",
      "fun": "Certains merles migrent sur plusieurs centaines de kilomètres, alors que beaucoup de merles de ville restent toute l’année au même endroit.",
      "protect": "Plante des haies avec des arbustes à baies et laisse des feuilles au sol : il y cherche des insectes.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes"
      ],
      "short": "Merle noir",
      "source": "https://animaldiversity.org/accounts/Turdus_merula/",
      "keywords": "merle noir oiseau jardin baies"
    },
    {
      "id": "etourneau",
      "name": "Étourneau sansonnet",
      "scientific": "Sturnus vulgaris",
      "group": "Oiseaux",
      "emoji": "🐦",
      "diet": "Omnivore",
      "habitat": "Prairies et champs pour se nourrir, trous d’arbres et cavités des bâtiments pour nicher ; il vit en grands groupes.",
      "description": "Un oiseau sombre tacheté de blanc qui vit en grandes bandes et fait des figures dans le ciel.",
      "role": "Il mange des insectes, des graines et des fruits, et il nourrit à son tour des rapaces.",
      "fun": "Il sait imiter d’autres animaux, et même des bruits de machines.",
      "protect": "Garde de vieux arbres à cavités et des prairies non traitées, et limite les pesticides pour lui laisser des insectes.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est"
      ],
      "short": "Étourneau sansonnet",
      "source": "https://www.biokids.umich.edu/critters/Sturnus_vulgaris/",
      "elision": true,
      "keywords": "étourneau sansonnet oiseau bande murmuration"
    },
    {
      "id": "pigeon_ramier",
      "name": "Pigeon ramier",
      "scientific": "Columba palumbus",
      "group": "Oiseaux",
      "emoji": "🕊️",
      "diet": "Granivore (mange des graines)",
      "habitat": "Lisières de forêts, parcs, jardins et champs, jusqu’en ville",
      "description": "Le plus grand pigeon d’Europe, gris avec une tache blanche sur le cou.",
      "role": "Il mange des graines, des feuilles et des fruits, et il est une proie du faucon pèlerin et du grand-duc.",
      "fun": "En Europe centrale, il s’est installé en ville dès le début des années 1800.",
      "protect": "Garde des arbres et des haies dans les jardins et les parcs pour qu’il puisse y nicher.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est"
      ],
      "short": "Pigeon ramier",
      "source": "https://www.allaboutbirds.org/guide/Common_Wood-Pigeon/lifehistory",
      "keywords": "pigeon ramier palombe oiseau"
    },
    {
      "id": "guepier",
      "name": "Guêpier d’Europe",
      "scientific": "Merops apiaster",
      "group": "Oiseaux",
      "emoji": "🐦",
      "diet": "Insectivore (mange des insectes)",
      "habitat": "Milieux ouverts près de l’eau, avec des berges de sable ou de terre où il creuse son terrier.",
      "description": "Un oiseau très coloré (jaune, bleu et marron) qui chasse les insectes en vol et revient d’Afrique au printemps.",
      "role": "Il attrape des abeilles, des libellules et d’autres insectes en vol.",
      "fun": "Il niche le plus souvent en colonies, et ses troupes migrent souvent très haut dans le ciel.",
      "protect": "Ne grimpe pas sur les berges de sable où il creuse son nid, et observe-le de loin.",
      "type": "animal",
      "regions": [
        "atlantique",
        "mediterranee",
        "est",
        "afrique"
      ],
      "short": "Guêpier d’Europe",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/441081",
      "keywords": "guêpier d’europe oiseau coloré abeille migrateur"
    },
    {
      "id": "cigogne",
      "name": "Cigogne blanche",
      "scientific": "Ciconia ciconia",
      "group": "Oiseaux",
      "emoji": "🐦",
      "diet": "Carnivore (campagnols, insectes, chenilles)",
      "habitat": "Prairies humides, marais et champs ; elle fait son nid sur un arbre, un toit ou une plateforme.",
      "description": "Un grand oiseau blanc et noir à longues pattes rouges, qui fait son nid sur un toit ou une plateforme.",
      "role": "Elle chasse des campagnols, des insectes et des chenilles dans les prairies.",
      "fun": "Son nid peut mesurer jusqu’à 2 mètres de large : chaque printemps, le mâle agrandit celui de l’année précédente.",
      "protect": "Protège les prairies humides et les marais, où elle trouve à manger, et laisse son nid tranquille.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "afrique"
      ],
      "short": "Cigogne blanche",
      "source": "https://animaldiversity.org/accounts/Ciconia_ciconia/",
      "genre": "f",
      "noPredator": "Une cigogne adulte a très peu de prédateurs.",
      "keywords": "cigogne blanche oiseau migrateur nid"
    },
    {
      "id": "moustique",
      "name": "Moustique commun",
      "scientific": "Culex pipiens",
      "group": "Insectes",
      "emoji": "🦟",
      "diet": "Nectar (et sang pour les femelles qui pondent)",
      "habitat": "Près des eaux calmes, des mares et des jardins",
      "description": "Un petit insecte volant, dont les larves vivent dans l’eau calme.",
      "role": "Il nourrit hirondelles, martinets, libellules et chauves-souris, et les mâles butinent le nectar des fleurs.",
      "fun": "Seules les femelles piquent : les mâles ne se nourrissent que de nectar.",
      "protect": "Vide les soucoupes d’eau stagnante plutôt que d’utiliser des produits qui tuent aussi les autres insectes.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est"
      ],
      "short": "Moustique commun",
      "source": "https://ohioline.osu.edu/factsheet/ent-89",
      "keywords": "moustique culex insecte"
    },
    {
      "id": "abeille",
      "name": "Abeille domestique",
      "scientific": "Apis mellifera",
      "group": "Insectes",
      "emoji": "🐝",
      "diet": "Nectar et pollen",
      "habitat": "Prairies, jardins et vergers fleuris",
      "description": "Un insecte rayé noir et jaune qui vit en colonie et butine les fleurs.",
      "role": "Elle butine les fleurs et transporte leur pollen : elle permet à beaucoup de plantes de se reproduire.",
      "fun": "Quand elle trouve de bonnes fleurs, elle peut le dire aux autres par une danse qui indique la direction et la distance.",
      "protect": "Sème des fleurs sauvages sur ton balcon ou dans ton jardin, et évite les insecticides.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes"
      ],
      "short": "Abeille domestique",
      "source": "https://animaldiversity.org/accounts/Apis_mellifera/",
      "genre": "f",
      "keywords": "abeille domestique miel pollinisateur ruche"
    },
    {
      "id": "papillon_nuit",
      "name": "Noctuelles (papillons de nuit)",
      "scientific": "Noctuidae",
      "group": "Insectes",
      "emoji": "🦋",
      "diet": "Nectar",
      "habitat": "Jardins, prairies et lisières, surtout la nuit",
      "description": "Des papillons au corps trapu et aux couleurs ternes qui volent surtout la nuit.",
      "role": "Ils butinent les fleurs de nuit, et nourrissent les chauves-souris et les oiseaux.",
      "fun": "Beaucoup de papillons de nuit entendent les ultrasons des chauves-souris : quand l’une approche, ils se mettent à voler en tous sens pour lui échapper.",
      "protect": "Éteins les lumières inutiles dehors la nuit : elles désorientent les papillons de nuit.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est"
      ],
      "short": "Papillons de nuit",
      "source": "https://mdc.mo.gov/discover-nature/field-guide/noctuid-moths",
      "pluriel": true,
      "keywords": "papillon de nuit noctuelle"
    },
    {
      "id": "libellule",
      "name": "Libellule empereur",
      "scientific": "Anax imperator",
      "group": "Insectes",
      "emoji": "🪰",
      "diet": "Carnivore et insectivore (moustiques et autres insectes)",
      "habitat": "Au-dessus des étangs, des mares et des rivières lentes",
      "description": "L’une des plus grandes libellules d’Europe, bleue et verte, qui chasse au-dessus des étangs.",
      "role": "Elle attrape en vol des moustiques et d’autres insectes, et nourrit à son tour des faucons.",
      "fun": "Ses ailes déployées peuvent mesurer jusqu’à 11 cm.",
      "protect": "Protège les mares et les étangs, et laisse des plantes sur leurs bords.",
      "type": "animal",
      "regions": [
        "atlantique",
        "mediterranee",
        "est"
      ],
      "short": "Libellule empereur",
      "source": "https://reserves-naturelles.strasbourg.eu/en/rohrschollen-island/discover/emperor-dragonfly/",
      "genre": "f",
      "elision": false,
      "keywords": "libellule empereur anax insecte étang"
    },
    {
      "id": "criquet",
      "name": "Criquets",
      "scientific": "Acrididae",
      "group": "Insectes",
      "emoji": "🦗",
      "diet": "Herbivore",
      "habitat": "Prairies et pelouses sèches",
      "description": "Des insectes sauteurs aux pattes arrière puissantes, qui vivent dans l’herbe et « chantent » en frottant leurs pattes contre leurs ailes.",
      "role": "Ils mangent des herbes et nourrissent des oiseaux comme la cigogne, l’étourneau ou le guêpier.",
      "fun": "Ses « oreilles » ne sont pas sur la tête : elles se trouvent sur les côtés de son ventre !",
      "protect": "Laisse un coin de pelouse non tondu : les criquets y trouvent à manger.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est"
      ],
      "short": "Criquets",
      "source": "https://biokids.umich.edu/critters/Acrididae",
      "pluriel": true,
      "keywords": "criquet sauterelle acridien orthoptère insecte"
    },
    {
      "id": "chenille",
      "name": "Chenilles (larves de papillons)",
      "scientific": "Lepidoptera (larves)",
      "group": "Insectes",
      "emoji": "🐛",
      "diet": "Herbivore",
      "habitat": "Sur les plantes et les arbres",
      "description": "Les larves des papillons, qui passent leur temps à manger des feuilles avant de se transformer.",
      "role": "Elles mangent des feuilles et nourrissent de nombreux oiseaux, comme la mésange bleue.",
      "fun": "",
      "protect": "Garde des plantes sauvages et des haies : elles nourrissent les chenilles, donc les oiseaux.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes"
      ],
      "short": "Chenilles",
      "source": "https://grasses.cfans.umn.edu/sites/grasses.umn.edu/files/files/native_grasses_benefit_butterflies_and_moths_0.pdf",
      "genre": "f",
      "pluriel": true,
      "keywords": "chenille larve papillon"
    },
    {
      "id": "pipistrelle",
      "name": "Pipistrelle commune",
      "scientific": "Pipistrellus pipistrellus",
      "group": "Mammifères",
      "emoji": "🦇",
      "diet": "Insectivore (mange des insectes)",
      "habitat": "Villes, jardins, parcs et forêts ; elle dort dans les fissures des bâtiments et derrière les volets.",
      "description": "Une très petite chauve-souris qui dort dans les fissures des bâtiments et chasse la nuit.",
      "role": "Elle mange surtout des moustiques et des moucherons, et parfois des papillons de nuit : un nettoyeur de la nuit.",
      "fun": "Elle crie des sons trop aigus pour nos oreilles, les ultrasons, et repère ses proies grâce à l’écho.",
      "protect": "Si des travaux sont prévus, demande qu’on laisse les fissures où elle dort, et laisse une mare dans le jardin pour qu’elle y trouve des insectes.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est"
      ],
      "short": "Pipistrelle commune",
      "source": "https://animaldiversity.org/accounts/Pipistrellus_pipistrellus/",
      "genre": "f",
      "keywords": "pipistrelle chauve-souris chauve souris nuit"
    },
    {
      "id": "campagnol",
      "name": "Campagnol des champs",
      "scientific": "Microtus arvalis",
      "group": "Mammifères",
      "emoji": "🐁",
      "diet": "Herbivore",
      "habitat": "Prairies, champs et lisières de forêts, où il creuse des terriers.",
      "description": "Un petit rongeur au pelage brun-gris qui creuse des galeries dans les prairies et les champs.",
      "role": "Il mange des graines et des herbes, et nourrit de nombreux rapaces.",
      "fun": "Pendant la belle saison, une femelle peut avoir une nouvelle portée environ toutes les trois à quatre semaines.",
      "protect": "Laisse des bandes d’herbe et des haies : elles abritent les campagnols, et les rapaces qui les chassent.",
      "type": "animal",
      "regions": [
        "atlantique",
        "nord",
        "est",
        "alpes"
      ],
      "short": "Campagnol des champs",
      "source": "https://animaldiversity.org/accounts/Microtus_arvalis/",
      "keywords": "campagnol des champs rongeur souris"
    },
    {
      "id": "marmotte",
      "name": "Marmotte des Alpes",
      "scientific": "Marmota marmota",
      "group": "Mammifères",
      "emoji": "🐿️",
      "diet": "Herbivore",
      "habitat": "Prairies de haute montagne, au-dessus de la limite des arbres, avec des terriers creusés dans le sol.",
      "description": "Un gros rongeur des prairies de montagne qui hiberne dans un terrier.",
      "role": "Elle mange herbes et fleurs, et nourrit des rapaces comme l’aigle royal.",
      "fun": "Une marmotte fait le guet et prévient sa famille par un sifflement aigu. L’hiver, la famille hiberne ensemble : en se serrant, les adultes réchauffent les jeunes.",
      "protect": "Reste sur les sentiers, garde tes distances et ne la nourris jamais.",
      "type": "animal",
      "regions": [
        "alpes"
      ],
      "short": "Marmotte des Alpes",
      "source": "https://animaldiversity.org/accounts/Marmota_marmota",
      "genre": "f",
      "keywords": "marmotte alpes rongeur montagne siffle"
    },
    {
      "id": "fleurs",
      "name": "Fleurs (nectar et pollen)",
      "scientific": "",
      "group": "Végétaux",
      "emoji": "🌼",
      "diet": "",
      "habitat": "Prairies, jardins et lisières",
      "description": "Les fleurs produisent du nectar et du pollen, qui nourrissent beaucoup d’insectes.",
      "role": "Producteurs : elles fabriquent leur nourriture avec la lumière du Soleil et nourrissent les insectes.",
      "fun": "Les fleurs sont colorées et parfumées pour attirer les insectes, qui transportent leur pollen.",
      "protect": "Sans fleurs, plus de nectar ni de pollen : abeilles, papillons et moustiques n’auraient rien à manger, ni les oiseaux qui les chassent.",
      "type": "resource",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes"
      ],
      "pluriel": true,
      "keywords": "fleur nectar pollen plante"
    },
    {
      "id": "graines",
      "name": "Graines",
      "scientific": "",
      "group": "Végétaux",
      "emoji": "🌾",
      "diet": "",
      "habitat": "Champs, prairies et jardins",
      "description": "Les graines de plantes sauvages et de céréales servent de nourriture à beaucoup d’oiseaux et de rongeurs.",
      "role": "Producteurs : elles stockent l’énergie d’une plante et nourrissent oiseaux et rongeurs.",
      "fun": "Une graine contient une future plante et sa réserve de nourriture.",
      "protect": "Une graine est un repas pour les oiseaux et les rongeurs, mais aussi le début d’une nouvelle plante.",
      "type": "resource",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes"
      ],
      "short": "Graines",
      "pluriel": true,
      "keywords": "graine céréale plante"
    },
    {
      "id": "fruits",
      "name": "Fruits et baies",
      "scientific": "",
      "group": "Végétaux",
      "emoji": "🍒",
      "diet": "",
      "habitat": "Haies, vergers et lisières",
      "description": "Les fruits et les baies nourrissent les oiseaux, qui en rejettent les graines un peu plus loin.",
      "role": "Producteurs : ils nourrissent les oiseaux, qui disséminent leurs graines.",
      "fun": "Le merle recrache les noyaux des cerises sauvages loin de l’arbre : c’est ainsi que de nouveaux cerisiers peuvent pousser.",
      "protect": "Quand les fruits et les baies manquent, des oiseaux comme le merle, le moineau ou l’étourneau perdent une partie de leur nourriture.",
      "type": "resource",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes"
      ],
      "short": "Fruits et baies",
      "pluriel": true,
      "keywords": "fruit baie plante"
    },
    {
      "id": "herbes",
      "name": "Herbes et feuilles",
      "scientific": "",
      "group": "Végétaux",
      "emoji": "🌿",
      "diet": "",
      "habitat": "Prairies d’Europe",
      "description": "Les herbes et les feuilles des prairies nourrissent les rongeurs, les criquets et les chenilles.",
      "role": "Producteurs : elles fabriquent leur nourriture avec la lumière du Soleil et nourrissent insectes et rongeurs.",
      "fun": "Les herbes repoussent par la base : c’est pourquoi une prairie broutée ou tondue repart.",
      "protect": "Les herbes nourrissent les criquets, les chenilles et les rongeurs : elles sont la base du réseau de la prairie.",
      "type": "resource",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes"
      ],
      "short": "Herbes et feuilles",
      "pluriel": true,
      "keywords": "herbe feuille prairie plante"
    },
    {
      "id": "charognes",
      "name": "Charognes (animaux morts)",
      "scientific": "",
      "group": "Matière organique",
      "emoji": "🦴",
      "diet": "",
      "habitat": "Montagnes et plateaux d’Europe",
      "description": "Les restes d’animaux déjà morts, que mangent vautours, gypaètes et aigles.",
      "role": "Matière recyclée : les charognards nettoient la montagne et rendent la matière au sol.",
      "fun": "Le gypaète mange presque uniquement les os que les autres charognards laissent.",
      "protect": "Sans elles, les vautours et les gypaètes n’auraient rien à manger. En les mangeant, ils nettoient la montagne.",
      "type": "resource",
      "regions": [
        "atlantique",
        "nord",
        "mediterranee",
        "est",
        "alpes"
      ],
      "pluriel": true,
      "keywords": "charogne carcasse animal mort"
    }
  ],
  "links": [
    {
      "eater": "faucon_pelerin",
      "food": "pigeon_ramier",
      "kind": "predation",
      "note": "",
      "source": "https://riviste.unimi.it/index.php/avocetta/article/download/31001/26972/99609"
    },
    {
      "eater": "faucon_pelerin",
      "food": "etourneau",
      "kind": "predation",
      "note": "",
      "source": "https://riviste.unimi.it/index.php/avocetta/article/download/31001/26972/99609"
    },
    {
      "eater": "faucon_pelerin",
      "food": "martinet",
      "kind": "predation",
      "note": "",
      "source": "https://riviste.unimi.it/index.php/avocetta/article/download/31001/26972/99609"
    },
    {
      "eater": "faucon_pelerin",
      "food": "hirondelle",
      "kind": "predation",
      "note": "",
      "source": "https://riviste.unimi.it/index.php/avocetta/article/download/31001/26972/99609"
    },
    {
      "eater": "faucon_pelerin",
      "food": "chardonneret",
      "kind": "predation",
      "note": "",
      "source": "https://riviste.unimi.it/index.php/avocetta/article/download/31001/26972/99609",
      "rare": true
    },
    {
      "eater": "faucon_pelerin",
      "food": "moineau",
      "kind": "predation",
      "note": "",
      "source": "https://riviste.unimi.it/index.php/avocetta/article/download/31001/26972/99609"
    },
    {
      "eater": "faucon_hobereau",
      "food": "libellule",
      "kind": "predation",
      "note": "",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/440974"
    },
    {
      "eater": "faucon_hobereau",
      "food": "martinet",
      "kind": "predation",
      "note": "",
      "source": "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/animals/birds/hobby/"
    },
    {
      "eater": "faucon_hobereau",
      "food": "hirondelle",
      "kind": "predation",
      "note": "",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/440974"
    },
    {
      "eater": "faucon_hobereau",
      "food": "pipistrelle",
      "kind": "predation",
      "note": "",
      "source": "https://www.eurekalert.org/news-releases/1130428",
      "rare": true
    },
    {
      "eater": "faucon_hobereau",
      "food": "criquet",
      "kind": "predation",
      "note": "",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/440974",
      "rare": true
    },
    {
      "eater": "faucon_crecerelle",
      "food": "campagnol",
      "kind": "predation",
      "note": "",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/440970"
    },
    {
      "eater": "faucon_crecerelle",
      "food": "criquet",
      "kind": "predation",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Falco_tinnunculus/"
    },
    {
      "eater": "epervier",
      "food": "mesange_bleue",
      "kind": "predation",
      "note": "",
      "source": "https://research.brighton.ac.uk/en/publications/sex-and-age-differences-in-the-diet-of-the-eurasian-sparrowhawk-a/"
    },
    {
      "eater": "epervier",
      "food": "moineau",
      "kind": "predation",
      "note": "",
      "source": "https://research.brighton.ac.uk/en/publications/sex-and-age-differences-in-the-diet-of-the-eurasian-sparrowhawk-a/"
    },
    {
      "eater": "epervier",
      "food": "chardonneret",
      "kind": "predation",
      "note": "",
      "source": "https://research.brighton.ac.uk/en/publications/sex-and-age-differences-in-the-diet-of-the-eurasian-sparrowhawk-a/"
    },
    {
      "eater": "epervier",
      "food": "merle",
      "kind": "predation",
      "note": "",
      "source": "https://research.brighton.ac.uk/en/publications/sex-and-age-differences-in-the-diet-of-the-eurasian-sparrowhawk-a/"
    },
    {
      "eater": "epervier",
      "food": "etourneau",
      "kind": "predation",
      "note": "",
      "source": "https://research.brighton.ac.uk/en/publications/sex-and-age-differences-in-the-diet-of-the-eurasian-sparrowhawk-a/"
    },
    {
      "eater": "epervier",
      "food": "pigeon_ramier",
      "kind": "predation",
      "note": "",
      "source": "https://research.brighton.ac.uk/en/publications/sex-and-age-differences-in-the-diet-of-the-eurasian-sparrowhawk-a/"
    },
    {
      "eater": "epervier",
      "food": "hirondelle",
      "kind": "predation",
      "note": "",
      "source": "https://oiseaux.net/birds/eurasian.sparrowhawk.html"
    },
    {
      "eater": "buse",
      "food": "campagnol",
      "kind": "predation",
      "note": "",
      "source": "https://doi.org/10.1515/srj-2016-0006"
    },
    {
      "eater": "buse",
      "food": "charognes",
      "kind": "charognage",
      "note": "",
      "source": "https://www.bio-scene.org/sites/default/files/fe-bbuteo-290321.pdf"
    },
    {
      "eater": "aigle_royal",
      "food": "marmotte",
      "kind": "predation",
      "note": "",
      "source": "https://www.pyrenees-parcnational.fr/sites/pyrenees-parcnational.fr/files/documents/downloads/resume_detude_aigle_mai_2013.pdf"
    },
    {
      "eater": "aigle_royal",
      "food": "charognes",
      "kind": "charognage",
      "note": "",
      "source": "https://paca.lpo.fr/images/mediatheque/fichiers/section_etudes/connaissance/observatoire_biodiversite_mont_ventoux/aigle_royal.pdf"
    },
    {
      "eater": "vautour_fauve",
      "food": "charognes",
      "kind": "charognage",
      "note": "",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/441026"
    },
    {
      "eater": "gypaete",
      "food": "charognes",
      "kind": "charognage",
      "note": "",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/441085"
    },
    {
      "eater": "chouette_effraie",
      "food": "campagnol",
      "kind": "predation",
      "note": "",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/440860"
    },
    {
      "eater": "chouette_effraie",
      "food": "moineau",
      "kind": "predation",
      "note": "",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/440860"
    },
    {
      "eater": "chouette_effraie",
      "food": "pipistrelle",
      "kind": "predation",
      "note": "",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/440860",
      "rare": true
    },
    {
      "eater": "grand_duc",
      "food": "campagnol",
      "kind": "predation",
      "note": "",
      "source": "https://www.grand-est.developpement-durable.gouv.fr/IMG/pdf/hibou_grand-duc_cle25c532.pdf"
    },
    {
      "eater": "grand_duc",
      "food": "pigeon_ramier",
      "kind": "predation",
      "note": "",
      "source": "https://www.parcduluberon.fr/wp-content/uploads/2020/08/cs_N_3_grand_duc_PENTERIANI_et_al.pdf"
    },
    {
      "eater": "grand_duc",
      "food": "buse",
      "kind": "predation",
      "note": "",
      "source": "https://www.parcduluberon.fr/wp-content/uploads/2020/08/cs_N_3_grand_duc_PENTERIANI_et_al.pdf",
      "rare": true
    },
    {
      "eater": "grand_duc",
      "food": "chouette_effraie",
      "kind": "predation",
      "note": "",
      "source": "https://www.parcduluberon.fr/wp-content/uploads/2020/08/cs_N_3_grand_duc_PENTERIANI_et_al.pdf"
    },
    {
      "eater": "grand_duc",
      "food": "faucon_crecerelle",
      "kind": "predation",
      "note": "",
      "source": "https://www.parcduluberon.fr/wp-content/uploads/2020/08/cs_N_3_grand_duc_PENTERIANI_et_al.pdf",
      "rare": true
    },
    {
      "eater": "pipistrelle",
      "food": "moustique",
      "kind": "predation",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Pipistrellus_pipistrellus/"
    },
    {
      "eater": "pipistrelle",
      "food": "papillon_nuit",
      "kind": "predation",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Pipistrellus_pipistrellus/"
    },
    {
      "eater": "campagnol",
      "food": "graines",
      "kind": "vegetaux",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Microtus_arvalis/"
    },
    {
      "eater": "campagnol",
      "food": "herbes",
      "kind": "broutage",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Microtus_arvalis/"
    },
    {
      "eater": "marmotte",
      "food": "herbes",
      "kind": "broutage",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Marmota_marmota"
    },
    {
      "eater": "marmotte",
      "food": "fleurs",
      "kind": "vegetaux",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Marmota_marmota"
    },
    {
      "eater": "cigogne",
      "food": "campagnol",
      "kind": "predation",
      "note": "",
      "source": "https://www.iop.krakow.pl/pobierz-publikacje,1645"
    },
    {
      "eater": "cigogne",
      "food": "criquet",
      "kind": "predation",
      "note": "",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/440861"
    },
    {
      "eater": "cigogne",
      "food": "chenille",
      "kind": "predation",
      "note": "",
      "source": "https://www.iop.krakow.pl/pobierz-publikacje,1645"
    },
    {
      "eater": "guepier",
      "food": "abeille",
      "kind": "predation",
      "note": "",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/441081"
    },
    {
      "eater": "guepier",
      "food": "libellule",
      "kind": "predation",
      "note": "",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/441081"
    },
    {
      "eater": "guepier",
      "food": "criquet",
      "kind": "predation",
      "note": "",
      "source": "https://birdsoftheworld.org/bow/species/eubeat1/cur/foodhabits"
    },
    {
      "eater": "guepier",
      "food": "papillon_nuit",
      "kind": "predation",
      "note": "",
      "source": "https://birdsoftheworld.org/bow/species/eubeat1/cur/foodhabits",
      "rare": true
    },
    {
      "eater": "pigeon_ramier",
      "food": "graines",
      "kind": "vegetaux",
      "note": "",
      "source": "https://www.allaboutbirds.org/guide/Common_Wood-Pigeon/lifehistory"
    },
    {
      "eater": "pigeon_ramier",
      "food": "herbes",
      "kind": "broutage",
      "note": "",
      "source": "https://www.allaboutbirds.org/guide/Common_Wood-Pigeon/lifehistory"
    },
    {
      "eater": "pigeon_ramier",
      "food": "fruits",
      "kind": "vegetaux",
      "note": "",
      "source": "https://www.allaboutbirds.org/guide/Common_Wood-Pigeon/lifehistory"
    },
    {
      "eater": "chouette_effraie",
      "food": "etourneau",
      "kind": "predation",
      "note": "",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/440860",
      "rare": true
    },
    {
      "eater": "chouette_effraie",
      "food": "hirondelle",
      "kind": "predation",
      "note": "",
      "source": "https://inpn.mnhn.fr/docs-web/docs/download/440860",
      "rare": true
    },
    {
      "eater": "hirondelle",
      "food": "moustique",
      "kind": "predation",
      "note": "",
      "source": "https://occitanie.lpo.fr/wp-content/uploads/2018/04/cahier_technique_hirondelles_LPO.pdf"
    },
    {
      "eater": "hirondelle",
      "food": "abeille",
      "kind": "predation",
      "note": "",
      "source": "https://www.allaboutbirds.org/guide/Barn_Swallow/food"
    },
    {
      "eater": "hirondelle",
      "food": "papillon_nuit",
      "kind": "predation",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Hirundo_rustica/",
      "rare": true
    },
    {
      "eater": "hirondelle",
      "food": "libellule",
      "kind": "predation",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Hirundo_rustica/",
      "rare": true
    },
    {
      "eater": "martinet",
      "food": "moustique",
      "kind": "predation",
      "note": "",
      "source": "https://occitanie.lpo.fr/wp-content/uploads/2025/01/guide_conseil_concilier-martinets-et-bati_lpo.pdf"
    },
    {
      "eater": "martinet",
      "food": "abeille",
      "kind": "predation",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Apus_apus/"
    },
    {
      "eater": "mesange_bleue",
      "food": "chenille",
      "kind": "predation",
      "note": "",
      "source": "https://paca.lpo.fr/images/mediatheque/fichiers/section_etudes/connaissance/observatoire_biodiversite_mont_ventoux/mesange_bleue.pdf"
    },
    {
      "eater": "mesange_bleue",
      "food": "graines",
      "kind": "vegetaux",
      "note": "",
      "source": "https://paca.lpo.fr/images/mediatheque/fichiers/section_etudes/connaissance/observatoire_biodiversite_mont_ventoux/mesange_bleue.pdf"
    },
    {
      "eater": "moineau",
      "food": "graines",
      "kind": "vegetaux",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Passer_domesticus/"
    },
    {
      "eater": "moineau",
      "food": "chenille",
      "kind": "predation",
      "note": "",
      "source": "https://www.gwct.org.uk/media/732765/House-Sparrow.pdf"
    },
    {
      "eater": "moineau",
      "food": "fruits",
      "kind": "vegetaux",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Passer_domesticus/"
    },
    {
      "eater": "chardonneret",
      "food": "graines",
      "kind": "vegetaux",
      "note": "",
      "source": "https://www.ofb.gouv.fr/sites/default/files/Fichiers/Plaquettes%20et%20rapports%20instit/plaquette-chardonneret-elegant.pdf"
    },
    {
      "eater": "merle",
      "food": "fruits",
      "kind": "vegetaux",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Turdus_merula/"
    },
    {
      "eater": "merle",
      "food": "chenille",
      "kind": "predation",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Turdus_merula/"
    },
    {
      "eater": "etourneau",
      "food": "fruits",
      "kind": "vegetaux",
      "note": "",
      "source": "https://www.biokids.umich.edu/critters/Sturnus_vulgaris/"
    },
    {
      "eater": "etourneau",
      "food": "criquet",
      "kind": "predation",
      "note": "",
      "source": "https://www.allaboutbirds.org/guide/European_Starling/food"
    },
    {
      "eater": "etourneau",
      "food": "chenille",
      "kind": "predation",
      "note": "",
      "source": "https://www.biokids.umich.edu/critters/Sturnus_vulgaris/"
    },
    {
      "eater": "etourneau",
      "food": "graines",
      "kind": "vegetaux",
      "note": "",
      "source": "https://www.biokids.umich.edu/critters/Sturnus_vulgaris/"
    },
    {
      "eater": "merle",
      "food": "criquet",
      "kind": "predation",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Turdus_merula/"
    },
    {
      "eater": "moustique",
      "food": "fleurs",
      "kind": "vegetaux",
      "note": "",
      "source": "https://ohioline.osu.edu/factsheet/ent-89"
    },
    {
      "eater": "abeille",
      "food": "fleurs",
      "kind": "vegetaux",
      "note": "",
      "source": "https://animaldiversity.org/accounts/Apis_mellifera/"
    },
    {
      "eater": "papillon_nuit",
      "food": "fleurs",
      "kind": "vegetaux",
      "note": "",
      "source": "https://mdc.mo.gov/discover-nature/field-guide/noctuid-moths"
    },
    {
      "eater": "criquet",
      "food": "herbes",
      "kind": "broutage",
      "note": "",
      "source": "https://biokids.umich.edu/critters/Acrididae"
    },
    {
      "eater": "chenille",
      "food": "herbes",
      "kind": "broutage",
      "note": "",
      "source": "https://grasses.cfans.umn.edu/sites/grasses.umn.edu/files/files/native_grasses_benefit_butterflies_and_moths_0.pdf"
    },
    {
      "eater": "libellule",
      "food": "moustique",
      "kind": "predation",
      "note": "",
      "source": "https://british-dragonflies.org.uk/odonata/frequently-asked-questions/"
    },
    {
      "eater": "libellule",
      "food": "papillon_nuit",
      "kind": "predation",
      "note": "",
      "source": "https://british-dragonflies.org.uk/odonata/frequently-asked-questions/",
      "rare": true
    }
  ],
  "sources": [
    {
      "name": "PhyloPic — silhouettes d’animaux (domaine public)",
      "url": "https://www.phylopic.org/"
    },
    {
      "name": "Animal Diversity Web (Université du Michigan) — fiches espèces",
      "url": "https://animaldiversity.org/"
    },
    {
      "name": "INPN — Inventaire national du patrimoine naturel (MNHN) — fiches d’oiseaux",
      "url": "https://inpn.mnhn.fr/"
    },
    {
      "name": "Ligue pour la protection des oiseaux (LPO) — fiches espèces et conseils",
      "url": "https://www.lpo.fr/"
    },
    {
      "name": "Office français de la biodiversité (OFB)",
      "url": "https://www.ofb.gouv.fr/"
    },
    {
      "name": "Cornell Lab of Ornithology — All About Birds",
      "url": "https://www.allaboutbirds.org/"
    },
    {
      "name": "Birds of the World (Cornell Lab of Ornithology)",
      "url": "https://birdsoftheworld.org/"
    },
    {
      "name": "British Dragonfly Society — questions fréquentes",
      "url": "https://british-dragonflies.org.uk/"
    },
    {
      "name": "Commission européenne — néonicotinoïdes",
      "url": "https://food.ec.europa.eu/plants/pesticides/approval-active-substances-safeners-and-synergists/renewal-approval/neonicotinoids_en"
    },
    {
      "name": "Natural Earth — fonds de carte (domaine public)",
      "url": "https://www.naturalearthdata.com/"
    }
  ],
  "humanInteractions": [
    {
      "species": "faucon_pelerin",
      "title": "Le faucon pèlerin avait disparu des Vosges du Nord",
      "region": "Vosges du Nord (Grand Est, France)",
      "note": "Au début des années 1970, le faucon pèlerin a disparu des Vosges du Nord. Les causes : le DDT, un insecticide utilisé en agriculture, mais aussi le braconnage et le vol de jeunes dans les nids. Après l’interdiction du DDT, et grâce à des associations qui surveillaient les sites de reproduction, les faucons s’y sont de nouveau reproduits dans les années 1980.",
      "sourceUrl": "https://www.grand-est.developpement-durable.gouv.fr/IMG/pdf/PNRVN_Faucon_pelerin_cle7185ed.pdf",
      "langue": "fr"
    },
    {
      "species": "gypaete",
      "title": "Le gypaète revient dans le Vercors",
      "region": "Parc naturel régional du Vercors (Drôme/Isère, Alpes, France)",
      "note": "Le gypaète barbu avait disparu de tout l’arc alpin au début du XXe siècle : le dernier oiseau connu a été abattu en 1913. Depuis 2010, le Parc du Vercors lâche de jeunes gypaètes nés en élevage. En 2022, un poussin né dans la nature s’est envolé : c’était la première reproduction sur le Vercors depuis plus de 140 ans.",
      "sourceUrl": "https://www.parc-du-vercors.fr/gypaetes-barbus",
      "langue": "fr"
    },
    {
      "species": "abeille",
      "title": "L’Europe protège les abeilles",
      "region": "Union européenne",
      "note": "Certains insecticides, les néonicotinoïdes, sont dangereux pour les abeilles. En 2018, l’Union européenne a interdit trois d’entre eux en plein air. Ils ne peuvent plus être utilisés que dans des serres fermées en permanence.",
      "sourceUrl": "https://food.ec.europa.eu/plants/pesticides/approval-active-substances-safeners-and-synergists/renewal-approval/neonicotinoids_en"
    },
    {
      "species": "hirondelle",
      "title": "Des nids d’hirondelles détruits",
      "region": "France",
      "note": "Des nids d’hirondelles sont détruits ou déplacés, pour des travaux ou pour éviter les crottes. Or les hirondelles ont tendance à revenir dans les mêmes nids après leur migration. La Ligue pour la protection des oiseaux (LPO) explique que c’est un facteur important de leur déclin. C’est aussi interdit : les hirondelles et leurs nids sont protégés par la loi.",
      "sourceUrl": "https://www.lpo.fr/decouvrir-la-nature/conseils-biodiversite/conseils-biodiv-fiches-juridiques/protection-juridique-des-hirondelles-et-martinets",
      "langue": "fr"
    },
    {
      "species": "vautour_fauve",
      "title": "Les vautours, nettoyeurs de la nature",
      "region": "France",
      "note": "Les vautours avaient presque disparu de France, notamment à cause de leur mauvaise réputation. Grâce à plus de quarante ans de programmes de protection, ils sont revenus. Ils mangent les animaux morts, et de nombreux éleveurs font appel à ce service gratuit.",
      "sourceUrl": "https://www.lpo.fr/qui-sommes-nous/espace-presse/communiques/cp-2025/le-retour-des-vautours-en-france-une-reussite-collective-fragile",
      "langue": "fr"
    }
  ]
};
