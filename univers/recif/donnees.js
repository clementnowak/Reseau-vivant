// Univers « récif corallien » : données pédagogiques (espèces, liens, sources) et réglages de l’univers.
window.RV_DONNEES = window.RV_DONNEES || {};
window.RV_DONNEES.recif = {
  "meta": {
    "id": "recif",
    "nom": "Le récif corallien",
    "lieu": "sur le récif corallien",
    "titre": "Réseau vivant — Qui mange qui sur le récif corallien ?",
    "eyebrow": "🪸 Le récif corallien",
    "animalParDefaut": "poisson_clown",
    "decor": [
      "🐟",
      "🪸",
      "🐢",
      "🐠",
      "🌿"
    ],
    "exemplesRecherche": "« requin », « tortue » ou « poisson »",
    "aideReseau": "Les émojis sont des symboles : il n’en existe pas pour chaque espèce (🐟 = un poisson, 🐴 = l’hippocampe, 🪽 = la raie manta, 🐄 = le dugong, la « vache marine »).",
    "groupesProducteurs": [
      "Plancton",
      "Algues et plantes"
    ],
    "texteProducteur": "☀️ Comme une plante, il fabrique sa propre nourriture grâce à la lumière du Soleil.",
    "texteRecyclage": "♻️ Cette matière vient d’êtres vivants morts. Elle sera recyclée et nourrira à nouveau le plancton.",
    "filtres": [
      {
        "id": "",
        "label": "Tous",
        "type": "animal"
      },
      {
        "id": "chasseurs",
        "label": "🦈 Chasseurs",
        "type": "animal",
        "regimeDebut": [
          "carnivore"
        ]
      },
      {
        "id": "brouteurs",
        "label": "🌿 Mangeurs d’algues et de plantes",
        "type": "animal",
        "regimeContient": [
          "herbivore"
        ]
      },
      {
        "id": "plancton",
        "label": "🦐 Mangeurs de plancton",
        "type": "animal",
        "regimeContient": [
          "plancton"
        ]
      },
      {
        "id": "invertebres",
        "label": "🐚 Invertébrés",
        "type": "animal",
        "groupes": [
          "Invertébrés"
        ]
      },
      {
        "id": "tortues",
        "label": "🐢 Tortues et mammifères",
        "groupes": [
          "Reptiles",
          "Mammifères"
        ]
      },
      {
        "id": "plantes",
        "label": "🌊 Plancton, algues et restes",
        "type": "resource"
      }
    ],
    "regions": {
      "mer_rouge": {
        "nom": "Mer Rouge",
        "dans": "en mer Rouge",
        "court": "Mer Rouge"
      },
      "indien": {
        "nom": "Océan Indien",
        "dans": "dans l’océan Indien",
        "court": "Océan Indien"
      },
      "triangle": {
        "nom": "Triangle de corail (Indonésie, Philippines)",
        "dans": "dans le Triangle de corail (Indonésie, Philippines)",
        "court": "Triangle de corail"
      },
      "australie": {
        "nom": "Australie (Grande Barrière)",
        "dans": "autour de l’Australie (Grande Barrière)",
        "court": "Australie"
      },
      "pacifique": {
        "nom": "Îles du Pacifique",
        "dans": "autour des îles du Pacifique",
        "court": "Pacifique"
      },
      "caraibes": {
        "nom": "Caraïbes",
        "dans": "dans les Caraïbes",
        "court": "Caraïbes"
      }
    },
    "carte": {
      "fichier": "univers/recif/cartes.html",
      "avertissement": "Carte simplifiée : l’animal ne vit pas partout dans la zone colorée, seulement près des récifs, dans les eaux chaudes et peu profondes."
    },
    "comprendre": {
      "cartes": [
        [
          "☀️",
          "Tout commence par la lumière",
          "Dans l’eau, le plancton végétal et les algues utilisent la lumière du Soleil pour fabriquer leur nourriture. Ils sont la base du réseau."
        ],
        [
          "🕸️",
          "Chacun a plusieurs liens",
          "Un animal mange souvent plusieurs espèces, et peut être mangé par plusieurs prédateurs."
        ],
        [
          "♻️",
          "Rien ne se perd",
          "Crabes, holothuries et bactéries recyclent les restes qui tombent au fond. La matière nourrit à nouveau le plancton."
        ],
        [
          "🪸",
          "Le corail, une maison vivante",
          "Le récif est construit par de petits animaux, les polypes de corail. Si le corail meurt, des centaines d’espèces perdent leur abri."
        ]
      ],
      "chaine": [
        {
          "emoji": "☀️",
          "nom": "Soleil",
          "role": "donne l’énergie"
        },
        {
          "id": "phytoplancton",
          "emoji": "🦠",
          "nom": "Plancton végétal",
          "role": "producteur"
        },
        {
          "id": "zooplancton",
          "emoji": "🦐",
          "nom": "Plancton animal",
          "role": "mange le plancton végétal"
        },
        {
          "id": "demoiselle",
          "emoji": "🐟",
          "nom": "Demoiselle",
          "role": "mange le plancton animal"
        },
        {
          "id": "merou",
          "emoji": "🐟",
          "nom": "Mérou",
          "role": "carnivore"
        }
      ],
      "chaineTexte": "Les flèches montrent le chemin de l’énergie : le Soleil nourrit le plancton végétal, mangé par le plancton animal, lui-même mangé par la demoiselle, qui est chassée par le mérou. Touche un être vivant pour le retrouver dans le réseau."
    },
    "quiz": {
      "intro": "Trois quiz de 5 questions sur les habitants du récif corallien. Les questions changent à chaque partie !",
      "expert": "Parfait ! Tu es un vrai expert du récif.",
      "motsHerbivore": "des plantes ou des algues",
      "groupeInvertebres": "Invertébrés",
      "leurresQuiMange": {
        "vertebre": {
          "ids": [
            "dugong",
            "oursin",
            "holothurie"
          ],
          "pourquoi": "mangent des herbiers, des algues ou des restes, pas d’animaux."
        },
        "invertebre": {
          "ids": [
            "dugong",
            "oursin",
            "holothurie"
          ],
          "pourquoi": "mangent des herbiers, des algues ou des restes, pas d’animaux."
        }
      },
      "grandsChasseurs": [
        "requin_tigre",
        "requin_pb",
        "merou",
        "napoleon"
      ],
      "petitesProies": [
        "corail",
        "eponge"
      ],
      "petitesProiesPourquoi": "Le corail et les éponges ne sont pas au menu d’un si grand chasseur.",
      "grossesProies": [
        "dugong",
        "tortue_verte",
        "raie_manta"
      ],
      "leurresQueMange": [
        "Poissons",
        "Requins et raies"
      ],
      "region": {
        "mode": "presence",
        "region": "caraibes",
        "oui": [
          "poisson_lion",
          "tortue_verte",
          "tortue_imbriquee",
          "requin_tigre",
          "perroquet",
          "hippocampe"
        ],
        "non": [
          "dugong",
          "acanthaster",
          "napoleon",
          "chirurgien_bleu",
          "poisson_clown",
          "baliste",
          "requin_pb"
        ],
        "question": "Lequel de ces animaux peut-on voir dans les Caraïbes ?",
        "pourquoi": "{non} vivent seulement du côté de l’océan Indien et du Pacifique."
      },
      "curiosites": [
        {
          "emoji": "🪸",
          "q": "Le corail, c’est…",
          "options": [
            [
              "animal",
              "Un animal",
              "🐾"
            ],
            [
              "plante",
              "Une plante",
              "🌱"
            ],
            [
              "caillou",
              "Un caillou",
              "🪨"
            ]
          ],
          "correct": "animal",
          "why": "Le corail est fait de milliers de petits animaux, les polypes, qui construisent ensemble un squelette de calcaire.",
          "animal": "corail"
        },
        {
          "emoji": "🐠",
          "q": "Comment le poisson-clown vit-il dans l’anémone sans se faire piquer ?",
          "options": [
            [
              "mucus",
              "Une couche de mucus le protège",
              "🛡️"
            ],
            [
              "vite",
              "Il est trop rapide pour elle",
              "💨"
            ],
            [
              "dort",
              "L’anémone dort le jour",
              "😴"
            ]
          ],
          "correct": "mucus",
          "why": "Le mucus qui recouvre sa peau l’empêche d’être piqué. Il vit ainsi à l’abri de ses prédateurs.",
          "animal": "poisson_clown"
        },
        {
          "emoji": "🏖️",
          "q": "D’où vient une partie du sable blanc des plages tropicales ?",
          "options": [
            [
              "perroquet",
              "Du poisson-perroquet"
            ],
            [
              "tortue_verte",
              "Des tortues"
            ],
            [
              "requin_tigre",
              "Des requins"
            ]
          ],
          "correct": "perroquet",
          "why": "En broutant les algues, le poisson-perroquet croque du corail. Il le broie et le rejette sous forme de sable fin.",
          "animal": "perroquet"
        },
        {
          "emoji": "👨‍🍼",
          "q": "Chez l’hippocampe, qui porte les œufs ?",
          "options": [
            [
              "papa",
              "Le papa",
              "👨"
            ],
            [
              "maman",
              "La maman",
              "👩"
            ],
            [
              "personne",
              "Personne : ils flottent",
              "🫧"
            ]
          ],
          "correct": "papa",
          "why": "La femelle dépose ses œufs dans une poche sur le ventre du mâle. C’est lui qui les garde jusqu’à la naissance.",
          "animal": "hippocampe"
        },
        {
          "emoji": "🐙",
          "q": "Combien de cœurs a le poulpe ?",
          "options": [
            [
              "3",
              "Trois",
              "3️⃣"
            ],
            [
              "1",
              "Un seul",
              "1️⃣"
            ],
            [
              "8",
              "Huit, un par bras",
              "8️⃣"
            ]
          ],
          "correct": "3",
          "why": "Le poulpe a trois cœurs et du sang bleu !",
          "animal": "poulpe"
        },
        {
          "emoji": "⭐",
          "q": "Qui ose manger l’étoile couronne d’épines, couverte d’épines venimeuses ?",
          "options": [
            [
              "triton",
              "Le triton géant"
            ],
            [
              "dugong",
              "Le dugong"
            ],
            [
              "raie_manta",
              "La raie manta"
            ]
          ],
          "correct": "triton",
          "why": "Le triton géant, un très grand escargot de mer, fait partie des rares animaux qui la mangent.",
          "animal": "triton"
        },
        {
          "emoji": "🐢",
          "q": "Que mange surtout la tortue imbriquée ?",
          "options": [
            [
              "eponge",
              "Des éponges"
            ],
            [
              "herbiers",
              "Des herbiers"
            ],
            [
              "requin_pb",
              "Des requins"
            ]
          ],
          "correct": "eponge",
          "why": "C’est la seule tortue marine qui peut vivre en mangeant surtout des éponges.",
          "animal": "tortue_imbriquee"
        },
        {
          "emoji": "🦈",
          "q": "Que fait le requin à pointes blanches pendant la journée ?",
          "options": [
            [
              "repos",
              "Il se repose au fond",
              "😴"
            ],
            [
              "chasse",
              "Il chasse sans arrêt",
              "🎯"
            ],
            [
              "air",
              "Il saute hors de l’eau",
              "🌊"
            ]
          ],
          "correct": "repos",
          "why": "Il passe la journée posé au fond, souvent dans une grotte, et chasse la nuit.",
          "animal": "requin_pb"
        },
        {
          "emoji": "🔪",
          "q": "Pourquoi le chirurgien bleu s’appelle-t-il ainsi ?",
          "options": [
            [
              "lame",
              "Il cache une lame près de sa queue",
              "🔪"
            ],
            [
              "soigne",
              "Il soigne les autres poissons",
              "🩹"
            ],
            [
              "blanc",
              "Il porte une blouse blanche",
              "🥼"
            ]
          ],
          "correct": "lame",
          "why": "Comme un chirurgien avec son scalpel, il a une petite lame tranchante près de la queue.",
          "animal": "chirurgien_bleu"
        },
        {
          "emoji": "🚢",
          "q": "Comment le poisson-lion est-il arrivé dans les Caraïbes ?",
          "options": [
            [
              "humain",
              "Relâché par des humains",
              "🧑"
            ],
            [
              "nage",
              "En nageant depuis l’Afrique",
              "🏊"
            ],
            [
              "toujours",
              "Il y a toujours vécu",
              "⏳"
            ]
          ],
          "correct": "humain",
          "why": "Il vient de l’océan Indien et du Pacifique. Des poissons d’aquarium relâchés par des humains l’ont très probablement amené dans l’Atlantique.",
          "animal": "poisson_lion"
        },
        {
          "emoji": "🐄",
          "q": "Pourquoi appelle-t-on le dugong « vache marine » ?",
          "options": [
            [
              "broute",
              "Il broute les herbiers",
              "🌾"
            ],
            [
              "meuh",
              "Il fait « meuh »",
              "🔊"
            ],
            [
              "taches",
              "Il a des taches noires",
              "⚫"
            ]
          ],
          "correct": "broute",
          "why": "Il broute les herbiers au fond de l’eau, comme une vache dans un pré.",
          "animal": "dugong"
        },
        {
          "emoji": "🌬️",
          "q": "D’où vient environ la moitié de l’oxygène que nous respirons ?",
          "options": [
            [
              "phytoplancton",
              "Du plancton végétal des océans"
            ],
            [
              "volcans",
              "Des volcans",
              "🌋"
            ],
            [
              "sable",
              "Du sable des plages",
              "🏖️"
            ]
          ],
          "correct": "phytoplancton",
          "why": "Le plancton végétal fabrique sa nourriture avec la lumière et rejette de l’oxygène, comme les plantes.",
          "animal": "phytoplancton"
        },
        {
          "emoji": "🫧",
          "q": "La murène ouvre et ferme sans cesse la bouche. Pourquoi ?",
          "options": [
            [
              "respire",
              "Pour respirer",
              "🫁"
            ],
            [
              "menace",
              "Pour menacer",
              "😠"
            ],
            [
              "chante",
              "Pour chanter",
              "🎵"
            ]
          ],
          "correct": "respire",
          "why": "Elle fait passer l’eau sur ses branchies pour respirer. Ce n’est pas une menace !",
          "animal": "murene"
        },
        {
          "emoji": "👑",
          "q": "Chez les poissons-clowns, qui devient la femelle du groupe ?",
          "options": [
            [
              "gros",
              "Le plus gros",
              "🏆"
            ],
            [
              "petit",
              "Le plus petit",
              "🐣"
            ],
            [
              "orange",
              "Le plus orange",
              "🟠"
            ]
          ],
          "correct": "gros",
          "why": "Ils naissent tous mâles. Le plus gros du groupe devient la femelle.",
          "animal": "poisson_clown"
        }
      ]
    }
  },
  "version": "3.0.0",
  "validation": {
    "links": "Relations issues d’ouvrages de référence généraux ; les relations surprenantes ont une source dédiée (champ source).",
    "rangeMapping": "grandes régions de récifs, approximatives, pas d’aires de répartition précises"
  },
  "biome": "Récif corallien",
  "species": [
    {
      "id": "phytoplancton",
      "name": "Plancton végétal (phytoplancton)",
      "scientific": "",
      "group": "Plancton",
      "emoji": "🦠",
      "diet": "",
      "habitat": "Eau de mer, près de la surface",
      "description": "Des algues minuscules, souvent invisibles à l’œil nu, qui flottent dans l’eau par milliards.",
      "role": "Il fabrique sa nourriture avec la lumière du Soleil. C’est le premier maillon de presque tout le réseau marin.",
      "fun": "Le plancton végétal des océans produit environ la moitié de l’oxygène que nous respirons.",
      "protect": "Limiter la pollution des rivières qui se jettent dans la mer.",
      "type": "resource",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "short": "Plancton végétal",
      "keywords": "phytoplancton algue microscopique"
    },
    {
      "id": "zooplancton",
      "name": "Plancton animal (zooplancton)",
      "scientific": "",
      "group": "Plancton",
      "emoji": "🦐",
      "diet": "",
      "habitat": "Eau de mer, près de la surface",
      "description": "De tout petits animaux qui flottent au gré des courants : minuscules crevettes, larves de poissons et de crabes…",
      "role": "Il mange le plancton végétal et sert de repas à beaucoup d’habitants du récif, du corail à la raie manta.",
      "fun": "Beaucoup de poissons du récif commencent leur vie dans le plancton, sous forme de larves.",
      "protect": "Protéger la qualité de l’eau de mer.",
      "type": "resource",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "short": "Plancton animal",
      "keywords": "zooplancton larve krill copépode"
    },
    {
      "id": "algues",
      "name": "Algues du récif",
      "scientific": "",
      "group": "Algues et plantes",
      "emoji": "🌿",
      "diet": "",
      "habitat": "Récif corallien",
      "description": "Elles poussent sur les rochers et sur le corail mort, en fins gazons ou en touffes.",
      "role": "Elles nourrissent les brouteurs. Si personne ne les mange, elles peuvent recouvrir et étouffer le corail.",
      "fun": "Les algues n’ont pas de vraies racines : elles s’accrochent aux rochers avec une sorte de ventouse.",
      "protect": "Protéger les poissons brouteurs, comme le poisson-perroquet, qui les gardent à la bonne taille.",
      "type": "resource",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "short": "Algues",
      "genre": "f",
      "pluriel": true,
      "keywords": "algue gazon"
    },
    {
      "id": "herbiers",
      "name": "Herbiers marins",
      "scientific": "",
      "group": "Algues et plantes",
      "emoji": "🌾",
      "diet": "",
      "habitat": "Récif corallien",
      "description": "De vraies plantes à fleurs qui poussent sous l’eau, sur le sable, près des récifs.",
      "role": "Ils nourrissent tortues vertes et dugongs, et servent d’abri aux jeunes poissons.",
      "fun": "Les herbiers servent de « nurserie » : beaucoup de jeunes poissons s’y cachent avant de rejoindre le récif.",
      "protect": "Ne pas arracher les herbiers avec les ancres des bateaux.",
      "type": "resource",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "short": "Herbiers",
      "pluriel": true,
      "keywords": "plante herbe posidonie"
    },
    {
      "id": "detritus",
      "name": "Débris et restes",
      "scientific": "",
      "group": "Matière organique",
      "emoji": "♻️",
      "diet": "",
      "habitat": "Récif corallien",
      "description": "Des restes d’animaux et d’algues morts qui tombent au fond de l’eau.",
      "role": "Recyclés par les décomposeurs et les bactéries, ils redonnent à l’eau des éléments utiles au plancton.",
      "fun": "Au fond du récif, rien ne se perd : chaque reste devient le repas de quelqu’un.",
      "protect": "Ne rien jeter à la mer : les déchets humains, eux, ne se recyclent pas.",
      "type": "resource",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "short": "Débris et restes",
      "pluriel": true,
      "keywords": "détritus cadavre reste"
    },
    {
      "id": "corail",
      "name": "Corail dur",
      "scientific": "Scleractinia",
      "group": "Invertébrés",
      "emoji": "🪸",
      "diet": "Mange du plancton",
      "habitat": "Récif corallien",
      "description": "Le corail dur est formé de milliers de petits animaux, les polypes. Ensemble, ils construisent un squelette de calcaire : le récif.",
      "role": "Il construit la maison de tout le récif. De minuscules algues vivent dans ses tissus et lui donnent du sucre grâce à la lumière.",
      "fun": "La nuit, les polypes sortent leurs tentacules pour attraper le plancton qui passe.",
      "protect": "Lutter contre le réchauffement climatique : dans une eau trop chaude, le corail blanchit et peut mourir.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "short": "Corail",
      "keywords": "polype madrépore récif"
    },
    {
      "id": "eponge",
      "name": "Éponge de mer",
      "scientific": "Porifera",
      "group": "Invertébrés",
      "emoji": "🧽",
      "diet": "Mange du plancton (en filtrant l’eau)",
      "habitat": "Récif corallien",
      "description": "L’éponge est un animal très simple, sans bouche ni cerveau. Elle filtre l’eau à travers les milliers de petits trous de son corps.",
      "role": "Elle nettoie l’eau du récif en retenant de minuscules particules.",
      "fun": "Les éponges existent depuis plus de 500 millions d’années : ce sont parmi les plus anciens animaux de la Terre.",
      "protect": "Ne pas les arracher : beaucoup grandissent très lentement.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "short": "Éponge",
      "genre": "f",
      "keywords": "porifère filtreur"
    },
    {
      "id": "anemone",
      "name": "Anémone de mer",
      "scientific": "Heteractis magnifica",
      "group": "Invertébrés",
      "emoji": "🌸",
      "diet": "Carnivore (petits animaux du plancton)",
      "habitat": "Récif corallien",
      "description": "Elle ressemble à une fleur, mais c’est un animal ! Ses tentacules piquent pour paralyser les petites proies.",
      "role": "Elle sert de maison au poisson-clown, qui la protège en retour de certains poissons qui la grignotent.",
      "fun": "Le poisson-clown vit entre ses tentacules piquants sans se faire piquer : une couche de mucus le protège.",
      "protect": "Ne pas la toucher : elle est fragile et peut piquer.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique"
      ],
      "short": "Anémone",
      "genre": "f",
      "noPredator": "Ses tentacules piquants la protègent : peu d’animaux osent la manger.",
      "keywords": "actinie fleur"
    },
    {
      "id": "poulpe",
      "name": "Poulpe de récif",
      "scientific": "Octopus cyanea",
      "group": "Invertébrés",
      "emoji": "🐙",
      "diet": "Carnivore",
      "habitat": "Récif corallien",
      "description": "Ce mollusque à huit bras chasse le jour sur le récif et se cache dans les trous du corail.",
      "role": "Chasseur malin, il mange beaucoup de crabes et sert lui-même de repas aux grands poissons.",
      "fun": "Il a trois cœurs, du sang bleu, et peut changer de couleur en un instant pour se camoufler.",
      "protect": "Ne pas le déranger dans son abri.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique"
      ],
      "short": "Poulpe",
      "culture": "Comme Hank dans « Le Monde de Dory ».",
      "keywords": "pieuvre octopus mollusque"
    },
    {
      "id": "crabe",
      "name": "Crabe de récif",
      "scientific": "Brachyura",
      "group": "Invertébrés",
      "emoji": "🦀",
      "diet": "Omnivore",
      "habitat": "Récif corallien",
      "description": "Les crabes du récif vivent cachés dans les fentes du corail et sortent surtout la nuit.",
      "role": "Ils grignotent algues et restes : ce sont de petits nettoyeurs du récif.",
      "fun": "Pour grandir, le crabe doit abandonner sa vieille carapace et en fabriquer une nouvelle.",
      "protect": "Ne pas les ramasser sur le récif.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "short": "Crabe",
      "keywords": "crustacé"
    },
    {
      "id": "acanthaster",
      "name": "Étoile de mer couronne d’épines",
      "scientific": "Acanthaster planci",
      "group": "Invertébrés",
      "emoji": "⭐",
      "diet": "Mange du corail",
      "habitat": "Récif corallien",
      "description": "Une grande étoile de mer couverte d’épines venimeuses, qui peut avoir jusqu’à 21 bras.",
      "role": "Elle se nourrit de corail. Quand elles deviennent trop nombreuses, elles détruisent de grandes surfaces de récif.",
      "fun": "Une seule étoile couronne d’épines peut manger jusqu’à 10 m² de corail en un an.",
      "protect": "Protéger ses prédateurs, comme le triton géant et le napoléon, pour éviter qu’elle ne pullule.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique"
      ],
      "short": "Étoile couronne d’épines",
      "genre": "f",
      "source": "https://www.aims.gov.au/cots",
      "keywords": "étoile de mer acanthaster épine"
    },
    {
      "id": "triton",
      "name": "Triton géant",
      "scientific": "Charonia tritonis",
      "group": "Invertébrés",
      "emoji": "🐚",
      "diet": "Carnivore",
      "habitat": "Récif corallien",
      "description": "Un très grand escargot de mer, dont la coquille peut dépasser 40 cm.",
      "role": "Il fait partie des rares animaux capables de manger l’étoile couronne d’épines : il aide à protéger le corail.",
      "fun": "Il attaque lentement l’étoile de mer couronne d’épines, sans craindre ses épines venimeuses.",
      "protect": "Ne jamais ramasser ni acheter sa coquille : la collecte l’a rendu rare.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique"
      ],
      "source": "https://www.aims.gov.au/cots",
      "noPredator": "Sa grosse coquille le protège bien. Son plus grand danger, c’est l’humain qui le ramasse.",
      "keywords": "escargot coquillage conque gastéropode"
    },
    {
      "id": "oursin",
      "name": "Oursin diadème",
      "scientific": "Diadema",
      "group": "Invertébrés",
      "emoji": "✴️",
      "diet": "Herbivore",
      "habitat": "Récif corallien",
      "description": "Un oursin hérissé de piquants très longs et très fins, qui broute les algues la nuit.",
      "role": "En broutant les algues, il laisse de la place pour que le jeune corail puisse pousser.",
      "fun": "Ses piquants sont souvent plus longs que son corps : attention aux pieds !",
      "protect": "Ne pas le marcher dessus : porter des chaussons dans l’eau protège aussi le récif.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "short": "Oursin",
      "keywords": "piquant échinoderme"
    },
    {
      "id": "holothurie",
      "name": "Holothurie (concombre de mer)",
      "scientific": "Holothuria",
      "group": "Invertébrés",
      "emoji": "🥒",
      "diet": "Détritivore",
      "habitat": "Récif corallien",
      "description": "Un animal mou en forme de concombre, qui rampe lentement sur le sable.",
      "role": "Elle avale le sable, digère les restes qu’il contient et rejette du sable propre : c’est une décomposeuse.",
      "fun": "Pour se défendre, certaines holothuries projettent des filaments collants sur leurs ennemis.",
      "protect": "Éviter la pêche excessive : on en ramasse beaucoup pour les vendre.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "short": "Holothurie",
      "genre": "f",
      "elision": true,
      "noPredator": "Beaucoup d’holothuries sont toxiques : peu d’animaux les mangent.",
      "keywords": "concombre de mer bêche"
    },
    {
      "id": "poisson_clown",
      "name": "Poisson-clown à trois bandes",
      "scientific": "Amphiprion ocellaris",
      "group": "Poissons",
      "emoji": "🐠",
      "diet": "Omnivore",
      "habitat": "Récif corallien",
      "description": "Un petit poisson orange à bandes blanches qui vit toujours près de son anémone.",
      "role": "Il nettoie son anémone et la défend contre certains poissons ; en échange, elle l’abrite.",
      "fun": "Tous les poissons-clowns naissent mâles. Le plus gros du groupe devient la femelle.",
      "protect": "Ne pas en acheter pour un aquarium s’il a été pêché dans la nature.",
      "type": "animal",
      "regions": [
        "indien",
        "triangle",
        "australie"
      ],
      "short": "Poisson-clown",
      "culture": "Comme Marin et Nemo dans « Le Monde de Nemo ».",
      "keywords": "nemo amphiprion"
    },
    {
      "id": "chirurgien_bleu",
      "name": "Chirurgien bleu",
      "scientific": "Paracanthurus hepatus",
      "group": "Poissons",
      "emoji": "🐟",
      "diet": "Omnivore",
      "habitat": "Récif corallien",
      "description": "Un poisson bleu vif à queue jaune, qui se cache dans les branches du corail.",
      "role": "Il mange du plancton et des algues, et aide ainsi à garder le récif propre.",
      "fun": "Près de sa queue, il cache une petite lame tranchante, comme le scalpel d’un chirurgien.",
      "protect": "Ne pas en acheter pour un aquarium : la plupart sont pêchés dans la nature.",
      "type": "animal",
      "regions": [
        "indien",
        "triangle",
        "australie",
        "pacifique"
      ],
      "culture": "Comme Dory dans « Le Monde de Nemo ».",
      "keywords": "dory poisson bleu"
    },
    {
      "id": "perroquet",
      "name": "Poisson-perroquet",
      "scientific": "Scaridae",
      "group": "Poissons",
      "emoji": "🐠",
      "diet": "Herbivore",
      "habitat": "Récif corallien",
      "description": "Un poisson très coloré dont les dents soudées forment un bec, comme celui d’un perroquet.",
      "role": "En broutant les algues sur le corail, il empêche qu’elles n’étouffent le récif.",
      "fun": "En broutant, il croque aussi du corail et rejette du sable blanc : une partie du sable des plages tropicales vient de lui !",
      "protect": "Ne pas le pêcher : sans lui, les algues envahissent le corail.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "source": "https://www.nhm.ac.uk/discover/parrotfish-and-sand.html",
      "keywords": "perroquet sable bec"
    },
    {
      "id": "papillon",
      "name": "Poisson-papillon",
      "scientific": "Chaetodontidae",
      "group": "Poissons",
      "emoji": "🐠",
      "diet": "Mange du corail",
      "habitat": "Récif corallien",
      "description": "Un poisson plat, jaune et noir, qui nage souvent en couple.",
      "role": "Il grignote les polypes du corail : là où il est nombreux, c’est souvent que le corail est en bonne santé.",
      "fun": "Chez beaucoup de poissons-papillons, une fausse tache en forme d’œil près de la queue trompe les prédateurs.",
      "protect": "Protéger le corail, sa principale nourriture.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "keywords": "papillon jaune"
    },
    {
      "id": "ange",
      "name": "Poisson-ange empereur",
      "scientific": "Pomacanthus imperator",
      "group": "Poissons",
      "emoji": "🐠",
      "diet": "Omnivore (surtout des éponges)",
      "habitat": "Récif corallien",
      "description": "Un poisson rayé de bleu et de jaune, l’un des plus beaux du récif.",
      "role": "Il mange des éponges et des algues, et aide à garder l’équilibre entre les habitants du récif.",
      "fun": "Les jeunes ont des cercles bleus et blancs ; en grandissant, ils changent complètement de couleurs.",
      "protect": "Ne pas en acheter pour un aquarium s’il a été pêché dans la nature.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique"
      ],
      "short": "Poisson-ange",
      "keywords": "ange empereur"
    },
    {
      "id": "demoiselle",
      "name": "Demoiselle verte",
      "scientific": "Chromis viridis",
      "group": "Poissons",
      "emoji": "🐟",
      "diet": "Mange du plancton",
      "habitat": "Récif corallien",
      "description": "Un petit poisson vert-bleu qui vit en bancs au-dessus des coraux branchus.",
      "role": "Très nombreuse, elle transforme le plancton en repas pour les poissons chasseurs.",
      "fun": "Au moindre danger, tout le banc plonge en même temps se cacher dans les branches du corail.",
      "protect": "Protéger les coraux branchus, son abri.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique"
      ],
      "short": "Demoiselle",
      "genre": "f",
      "keywords": "chromis banc"
    },
    {
      "id": "poisson_lion",
      "name": "Poisson-lion",
      "scientific": "Pterois volitans",
      "group": "Poissons",
      "emoji": "🐟",
      "diet": "Carnivore",
      "habitat": "Récif corallien",
      "description": "Un poisson aux longues nageoires en éventail, rayé de rouge et de blanc.",
      "role": "Chasseur de petits poissons et de crevettes. Dans l’Atlantique, où il a été introduit, il en mange tellement qu’il menace les récifs.",
      "fun": "Ses longues épines sont venimeuses. Venu de l’océan Indien et du Pacifique, il envahit aujourd’hui les Caraïbes, sans doute après avoir été relâché d’aquariums.",
      "protect": "Ne jamais relâcher un poisson d’aquarium dans la nature.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "source": "https://oceanservice.noaa.gov/facts/lionfish.html",
      "keywords": "rascasse volante lion venimeux"
    },
    {
      "id": "murene",
      "name": "Murène géante",
      "scientific": "Gymnothorax javanicus",
      "group": "Poissons",
      "emoji": "🐟",
      "diet": "Carnivore",
      "habitat": "Récif corallien",
      "description": "Un poisson très long, sans écailles, qui vit caché dans les trous du récif.",
      "role": "Chasseuse de nuit, elle mange des poissons, des poulpes et des crabes qui se cachent dans le corail.",
      "fun": "Elle ouvre et ferme sans cesse la bouche : ce n’est pas pour menacer, c’est pour respirer !",
      "protect": "Ne pas mettre la main dans les trous du récif : elle pourrait mordre pour se défendre.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique"
      ],
      "short": "Murène",
      "genre": "f",
      "noPredator": "Adulte, elle a peu de prédateurs. Les jeunes peuvent être mangés par de grands poissons.",
      "keywords": "anguille serpent"
    },
    {
      "id": "merou",
      "name": "Mérou",
      "scientific": "Epinephelus",
      "group": "Poissons",
      "emoji": "🐟",
      "diet": "Carnivore",
      "habitat": "Récif corallien",
      "description": "Un gros poisson trapu à grande bouche, qui guette ses proies près de son abri.",
      "role": "Grand chasseur du récif, il garde l’équilibre entre les petits poissons.",
      "fun": "Certains mérous chassent en équipe avec la murène : l’un bloque la sortie, l’autre fouille les trous du récif.",
      "protect": "Respecter les tailles et les périodes de pêche, et les réserves marines.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "source": "https://doi.org/10.1371/journal.pbio.0040431",
      "noPredator": "Un gros mérou a peu de prédateurs, à part les grands requins et l’humain.",
      "keywords": "loche"
    },
    {
      "id": "napoleon",
      "name": "Napoléon (labre géant)",
      "scientific": "Cheilinus undulatus",
      "group": "Poissons",
      "emoji": "🐟",
      "diet": "Carnivore",
      "habitat": "Récif corallien",
      "description": "Un poisson énorme, qui peut dépasser 2 m de long, avec une bosse sur le front.",
      "role": "Il mange des animaux que peu d’autres osent attaquer, comme l’étoile couronne d’épines et les oursins.",
      "fun": "Sa grosse bosse sur le front ferait penser au chapeau de l’empereur Napoléon : ce serait l’origine de son nom.",
      "protect": "Ne pas l’acheter : il est menacé par la pêche.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique"
      ],
      "short": "Napoléon",
      "source": "https://www.aims.gov.au/cots",
      "noPredator": "Adulte, il est si grand qu’il a peu de prédateurs. Sa plus grande menace : la pêche.",
      "keywords": "labre bosse"
    },
    {
      "id": "baliste",
      "name": "Baliste titan",
      "scientific": "Balistoides viridescens",
      "group": "Poissons",
      "emoji": "🐟",
      "diet": "Carnivore",
      "habitat": "Récif corallien",
      "description": "Un grand poisson aux dents puissantes, capable de croquer oursins et coquillages.",
      "role": "Il mange des oursins et des étoiles de mer, ce qui aide à protéger le corail.",
      "fun": "Il défend son nid avec énergie et n’hésite pas à mordre les plongeurs qui s’approchent trop.",
      "protect": "Garder ses distances quand on nage près de lui.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique"
      ],
      "source": "https://www.aims.gov.au/cots",
      "noPredator": "Il a peu de prédateurs : caché dans un trou, il bloque une épine de son dos pour qu’on ne puisse pas le sortir.",
      "keywords": "baliste titan"
    },
    {
      "id": "hippocampe",
      "name": "Hippocampe",
      "scientific": "Hippocampus",
      "group": "Poissons",
      "emoji": "🐴",
      "diet": "Mange du plancton",
      "habitat": "Récif corallien",
      "description": "Un drôle de petit poisson à tête de cheval, qui nage debout et s’accroche avec sa queue.",
      "role": "Il aspire de minuscules crevettes du plancton, comme avec une paille.",
      "fun": "Chez l’hippocampe, c’est le papa qui porte les œufs dans une poche sur son ventre !",
      "protect": "Ne pas en acheter, même séché : on en pêche beaucoup trop.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "elision": true,
      "culture": "Comme Sheldon dans « Le Monde de Nemo ».",
      "keywords": "cheval de mer"
    },
    {
      "id": "requin_pb",
      "name": "Requin à pointes blanches du récif",
      "scientific": "Triaenodon obesus",
      "group": "Requins et raies",
      "emoji": "🦈",
      "diet": "Carnivore",
      "habitat": "Récif corallien",
      "description": "Un requin mince, avec le bout des nageoires blanc, qui vit près du corail.",
      "role": "Chasseur de nuit, il se faufile dans les trous du récif pour attraper poissons, poulpes et crabes.",
      "fun": "Le jour, il se repose au fond, souvent dans une grotte. Il peut rester immobile car il respire sans nager.",
      "protect": "Ne pas le pêcher : il se reproduit lentement.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique"
      ],
      "short": "Requin à pointes blanches",
      "keywords": "requin pointe blanche"
    },
    {
      "id": "requin_tigre",
      "name": "Requin-tigre",
      "scientific": "Galeocerdo cuvier",
      "group": "Requins et raies",
      "emoji": "🦈",
      "diet": "Carnivore",
      "habitat": "Récif corallien",
      "description": "Un grand requin rayé quand il est jeune, qui peut dépasser 4 m de long.",
      "role": "Super-prédateur : il régule les populations de tortues, de dugongs et de poissons.",
      "fun": "Il mange presque de tout : tortues, poissons, oiseaux de mer… et même parfois des objets tombés à l’eau !",
      "protect": "Ne pas le pêcher pour ses ailerons.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "source": "https://researchdata.edu.au/size-sex-geographic-australian-waters/3915165",
      "noPredator": "Adulte, il est au sommet du réseau : presque aucun animal ne le chasse.",
      "keywords": "requin tigre"
    },
    {
      "id": "raie_manta",
      "name": "Raie manta de récif",
      "scientific": "Mobula alfredi",
      "group": "Requins et raies",
      "emoji": "🪽",
      "diet": "Mange du plancton",
      "habitat": "Récif corallien",
      "description": "Une immense raie qui « vole » dans l’eau en battant ses grandes nageoires.",
      "role": "Malgré sa taille, elle filtre l’eau pour manger du plancton, comme une baleine.",
      "fun": "Elle vient régulièrement se faire nettoyer par de petits poissons, comme à une station de lavage.",
      "protect": "Ne pas la toucher : cela abîme le mucus qui protège sa peau.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique"
      ],
      "short": "Raie manta",
      "genre": "f",
      "keywords": "manta raie"
    },
    {
      "id": "tortue_verte",
      "name": "Tortue verte",
      "scientific": "Chelonia mydas",
      "group": "Reptiles",
      "emoji": "🐢",
      "diet": "Herbivore",
      "habitat": "Récif corallien",
      "description": "Une grande tortue marine qui broute les herbiers et les algues.",
      "role": "En broutant, elle entretient les herbiers, comme une tondeuse.",
      "fun": "Elle doit son nom à la couleur verte de sa graisse, qui vient des plantes qu’elle mange.",
      "protect": "Ne jamais jeter de plastique en mer : elle peut confondre un sac avec une méduse.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "genre": "f",
      "culture": "Comme Crush dans « Le Monde de Nemo ».",
      "keywords": "tortue marine"
    },
    {
      "id": "tortue_imbriquee",
      "name": "Tortue imbriquée",
      "scientific": "Eretmochelys imbricata",
      "group": "Reptiles",
      "emoji": "🐢",
      "diet": "Omnivore (surtout des éponges)",
      "habitat": "Récif corallien",
      "description": "Une tortue marine au bec pointu, qui fouille les trous du récif.",
      "role": "En mangeant des éponges, elle laisse de la place au corail pour pousser.",
      "fun": "C’est la seule tortue marine qui peut vivre en mangeant surtout des éponges.",
      "protect": "Ne jamais acheter d’objets en écaille de tortue : c’est interdit.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie",
        "pacifique",
        "caraibes"
      ],
      "genre": "f",
      "source": "https://www.fisheries.noaa.gov/species/hawksbill-turtle",
      "keywords": "tortue marine écaille"
    },
    {
      "id": "dugong",
      "name": "Dugong",
      "scientific": "Dugong dugon",
      "group": "Mammifères",
      "emoji": "🐄",
      "diet": "Herbivore",
      "habitat": "Récif corallien",
      "description": "Un gros mammifère marin tranquille, cousin du lamantin, qui respire à la surface.",
      "role": "En broutant les herbiers, il les aide à rester jeunes et à repousser.",
      "fun": "On l’appelle « vache marine » : il broute les herbiers au fond de l’eau, comme une vache dans un pré.",
      "protect": "Protéger les herbiers et éviter qu’il ne se prenne dans les filets de pêche.",
      "type": "animal",
      "regions": [
        "mer_rouge",
        "indien",
        "triangle",
        "australie"
      ],
      "keywords": "vache marine sirénien lamantin"
    }
  ],
  "links": [
    {
      "eater": "zooplancton",
      "food": "phytoplancton",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "corail",
      "food": "zooplancton",
      "kind": "predation",
      "note": "attrapé la nuit avec ses tentacules"
    },
    {
      "eater": "eponge",
      "food": "phytoplancton",
      "kind": "vegetaux",
      "note": "filtré dans l’eau"
    },
    {
      "eater": "anemone",
      "food": "zooplancton",
      "kind": "predation",
      "note": "piqué par ses tentacules"
    },
    {
      "eater": "poulpe",
      "food": "crabe",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "crabe",
      "food": "algues",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "crabe",
      "food": "detritus",
      "kind": "detritivore",
      "note": ""
    },
    {
      "eater": "crabe",
      "food": "hippocampe",
      "kind": "predation",
      "note": "parfois"
    },
    {
      "eater": "acanthaster",
      "food": "corail",
      "kind": "broutage",
      "note": "",
      "source": "https://www.aims.gov.au/cots"
    },
    {
      "eater": "triton",
      "food": "acanthaster",
      "kind": "predation",
      "note": "",
      "source": "https://www.aims.gov.au/cots"
    },
    {
      "eater": "oursin",
      "food": "algues",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "holothurie",
      "food": "detritus",
      "kind": "detritivore",
      "note": "trié dans le sable"
    },
    {
      "eater": "poisson_clown",
      "food": "zooplancton",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "poisson_clown",
      "food": "algues",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "chirurgien_bleu",
      "food": "zooplancton",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "chirurgien_bleu",
      "food": "algues",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "perroquet",
      "food": "algues",
      "kind": "vegetaux",
      "note": "raclées sur le corail"
    },
    {
      "eater": "perroquet",
      "food": "corail",
      "kind": "broutage",
      "note": "parfois",
      "source": "https://www.nhm.ac.uk/discover/parrotfish-and-sand.html"
    },
    {
      "eater": "papillon",
      "food": "corail",
      "kind": "broutage",
      "note": "grignote les polypes"
    },
    {
      "eater": "ange",
      "food": "eponge",
      "kind": "broutage",
      "note": ""
    },
    {
      "eater": "ange",
      "food": "algues",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "demoiselle",
      "food": "zooplancton",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "poisson_lion",
      "food": "demoiselle",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "poisson_lion",
      "food": "crabe",
      "kind": "predation",
      "note": "les petits"
    },
    {
      "eater": "murene",
      "food": "poulpe",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "murene",
      "food": "crabe",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "murene",
      "food": "perroquet",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "murene",
      "food": "papillon",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "merou",
      "food": "poisson_clown",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "merou",
      "food": "chirurgien_bleu",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "merou",
      "food": "papillon",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "merou",
      "food": "ange",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "merou",
      "food": "demoiselle",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "merou",
      "food": "poulpe",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "merou",
      "food": "crabe",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "merou",
      "food": "poisson_lion",
      "kind": "predation",
      "note": "rarement",
      "rare": true,
      "source": "https://www.wri.org/research/reefs-risk-revisited/atlantic-and-caribbean-lionfish-invasion-threatens-reefs"
    },
    {
      "eater": "napoleon",
      "food": "acanthaster",
      "kind": "predation",
      "note": "",
      "source": "https://www.aims.gov.au/cots"
    },
    {
      "eater": "napoleon",
      "food": "oursin",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "napoleon",
      "food": "crabe",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "baliste",
      "food": "oursin",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "baliste",
      "food": "crabe",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "baliste",
      "food": "acanthaster",
      "kind": "predation",
      "note": "",
      "source": "https://www.aims.gov.au/cots"
    },
    {
      "eater": "hippocampe",
      "food": "zooplancton",
      "kind": "predation",
      "note": "de minuscules crevettes"
    },
    {
      "eater": "requin_pb",
      "food": "perroquet",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "requin_pb",
      "food": "ange",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "requin_pb",
      "food": "poulpe",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "requin_pb",
      "food": "crabe",
      "kind": "predation",
      "note": ""
    },
    {
      "eater": "requin_tigre",
      "food": "tortue_verte",
      "kind": "predation",
      "note": "",
      "source": "https://researchdata.edu.au/size-sex-geographic-australian-waters/3915165"
    },
    {
      "eater": "requin_tigre",
      "food": "tortue_imbriquee",
      "kind": "predation",
      "note": "",
      "source": "https://researchdata.edu.au/size-sex-geographic-australian-waters/3915165"
    },
    {
      "eater": "requin_tigre",
      "food": "dugong",
      "kind": "predation",
      "note": "",
      "source": "https://researchdata.edu.au/size-sex-geographic-australian-waters/3915165"
    },
    {
      "eater": "requin_tigre",
      "food": "raie_manta",
      "kind": "predation",
      "note": "parfois"
    },
    {
      "eater": "requin_tigre",
      "food": "requin_pb",
      "kind": "predation",
      "note": "parfois"
    },
    {
      "eater": "raie_manta",
      "food": "zooplancton",
      "kind": "predation",
      "note": "filtré dans l’eau"
    },
    {
      "eater": "tortue_verte",
      "food": "herbiers",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "tortue_verte",
      "food": "algues",
      "kind": "vegetaux",
      "note": ""
    },
    {
      "eater": "tortue_imbriquee",
      "food": "eponge",
      "kind": "broutage",
      "note": "",
      "source": "https://www.fisheries.noaa.gov/species/hawksbill-turtle"
    },
    {
      "eater": "dugong",
      "food": "herbiers",
      "kind": "vegetaux",
      "note": ""
    }
  ],
  "sources": [
    {
      "name": "Institut australien des sciences marines (AIMS) — étoile couronne d’épines",
      "url": "https://www.aims.gov.au/cots"
    },
    {
      "name": "NOAA Fisheries — tortue imbriquée",
      "url": "https://www.fisheries.noaa.gov/species/hawksbill-turtle"
    },
    {
      "name": "NOAA — le poisson-lion, espèce introduite dans l’Atlantique",
      "url": "https://oceanservice.noaa.gov/facts/lionfish.html"
    },
    {
      "name": "Muséum d’histoire naturelle de Londres — le poisson-perroquet et le sable",
      "url": "https://www.nhm.ac.uk/discover/parrotfish-and-sand.html"
    },
    {
      "name": "Régime alimentaire du requin-tigre en Australie-Occidentale (données)",
      "url": "https://researchdata.edu.au/size-sex-geographic-australian-waters/3915165"
    },
    {
      "name": "Bshary et al. 2006 — chasse en équipe du mérou et de la murène",
      "url": "https://doi.org/10.1371/journal.pbio.0040431"
    },
    {
      "name": "FishBase — fiches des poissons",
      "url": "https://www.fishbase.se/"
    },
    {
      "name": "Liste rouge de l’UICN — statuts et aires de répartition",
      "url": "https://www.iucnredlist.org/"
    },
    {
      "name": "Natural Earth — fonds de carte (domaine public)",
      "url": "https://www.naturalearthdata.com/"
    }
  ],
  "humanInteractions": [
    {
      "species": "poisson_lion",
      "title": "Introduit par l’humain",
      "region": "Caraïbes et Atlantique",
      "note": "Venu de l’océan Indien et du Pacifique, il a très probablement été relâché depuis des aquariums. Dans l’Atlantique, il n’a presque pas de prédateurs et mange beaucoup de petits poissons du récif.",
      "sourceUrl": "https://oceanservice.noaa.gov/facts/lionfish.html"
    },
    {
      "species": "tortue_imbriquee",
      "title": "Chassée pour son écaille",
      "region": "mers tropicales du monde entier",
      "note": "Son écaille sert à fabriquer bijoux et peignes. Ce commerce est interdit entre les pays, mais le braconnage continue.",
      "sourceUrl": "https://www.fisheries.noaa.gov/species/hawksbill-turtle"
    },
    {
      "species": "acanthaster",
      "title": "Ses invasions sont surveillées",
      "region": "Grande Barrière de corail (Australie)",
      "note": "Quand les étoiles deviennent trop nombreuses, des plongeurs les éliminent une à une pour protéger le corail.",
      "sourceUrl": "https://www.aims.gov.au/cots"
    }
  ]
};
