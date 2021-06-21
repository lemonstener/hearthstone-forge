# Storing a bunch of variables to be used later in the back and front end

classes = {
    'Demon Hunter': {
        'code': 'dhn',
        'params': f'demon%20hunter',
        'name': 'Demon Hunter',
        'quote': 'You are not prepared!'
    },
    'Druid': {
        'code': 'dru',
        'params': 'druid',
        'name': 'Druid',
        'quote': 'Nature will rise against you!'
    },
    'Hunter': {
        'code': 'hun',
        'params': 'hunter',
        'name': 'Hunter',
        'quote': 'Let the hunt begin!'
    },
    'Mage': {
        'code': 'mag',
        'params': 'mage',
        'name': 'Mage',
        'quote': 'My magic will tear you apart!'
    },
    'Paladin': {
        'code': 'pal',
        'params':'paladin',
        'name': 'Paladin',
        'quote': 'The Light protects those who wield it.'
    },
    'Priest': {
        'code': 'pst',
        'params': 'priest',
        'name': 'Priest',
        'quote': 'Light smiles upon the just!'
    },
    'Rogue': {
        'code': 'rog',
        'params': 'rogue',
        'name': 'Rogue',
        'quote': 'Watch your back!'
    },
    'Shaman': {
        'code': 'shm',
        'params': 'shaman',
        'name': 'Shaman',
        'quote': 'Storm, earth and fire, heed my call!'
    },
    'Warlock': {
        'code': 'wal',
        'params': 'warlock',
        'name': 'Warlock',
        'quote': 'I am your nightmare!'
    },
    'Warrior': {
        'code': 'war',
        'params': 'warrior',
        'name': 'Warrior',
        'quote': 'Victory or death!'
    },
    'Neutral': {
        'code': 'neu',
        'params': 'neutral',
        'name': 'Neutral'
    }
}


rarity = {
    'Free': {
        'code': 'free',
        'name': 'Free',
        'craft': None
    },
    'Common': {
        'code': 'comm',
        'name': 'Common',
        'craft': 40,
        'craft_golden': 400
    },
    'Rare': {
        'code': 'rare',
        'name': 'Rare',
        'craft': 100,
        'craft_golden': 800
    },
    'Epic': {
        'code': 'epic',
        'name': 'Epic',
        'craft': 400,
        'craft_golden': 1600
    },
    'Legendary': {
        'code': 'lgnd',
        'name': 'Legendary',
        'craft': 1600,
        'craft_golden': 3200
    }
}


card_types = {
    'Minion': {
        'code': 'min',
        'name': 'Minion'
    },
    'Spell': {
        'code': 'spl',
        'name': 'Spell'
    },
    'Hero': {
        'code': 'hero',
        'name': 'Hero'
    },
    'Weapon': {
        'code': 'wpn',
        'name': 'Weapon'
    }
}


minion_types = {
    'All': {
        'code': 'all',
        'name': 'All'
    },
    'Beast': {
        'code': 'bst',
        'name': 'Beast'
    },
    'Demon': {
        'code': 'dmn',
        'name': 'Demon'
    },
    'Dragon': {
        'code': 'drg',
        'name': 'Dragon'
    },
    'Elemental': {
        'code': 'elmn',
        'name': 'Elemental'
    },
    'Mech': {
        'code': 'mech',
        'name': 'Mech'
    },
    'Murloc': {
        'code': 'mrlc',
        'name': 'Murloc'
    },
    'Pirate': {
        'code': 'prt',
        'name': 'Pirate'
    },
    'Quilboar': {
        'code': 'qlbr',
        'name': 'Quilboar'
    },
    'Totem': {
        'code': 'tot',
        'name': 'Totem'
    }
}


factions = {
    'Alliance':{
        'code': 'alnc',
        'name': 'Alliance'
    },
    'Horde': {
        'code': 'hrd',
        'name': 'Horde'
    },
    'Neutral': {
        'code': 'neu',
        'name': 'Neutral'
    }
}


schools_of_magic = {
    'Arcane': {
        'code': 'arc',
        'name': 'Arcane'
    },
    'Fel': {
        'code': 'fel',
        'name': 'Fel'
    },
    'Fire': {
        'code': 'fire',
        'name': 'Fire'
    },
    'Frost': {
        'code': 'frst',
        'name': 'Frost'
    },
    'Holy': {
        'code': 'holy',
        'name': 'Holy'
    },
    'Nature': {
        'code': 'nat',
        'name': 'Nature'
    },
    'Shadow': {
        'code': 'shdw',
        'name': 'Shadow'
    }, 
}


sets = {
  'Classic': {
      'code': 'cls',
      'name': 'Classic',
      'img': None
      },
  'Curse of Naxxramas': {
      'code': 'nax',
      'name': 'Curse of Naxxramas',
      'img': 'sample',
      'type': 'Adventure'
      },
  'Goblins vs Gnomes': {
      'code': 'gvg',
      'name': 'Goblins vs Gnomes',
      'img': 'sample',
      'type': 'Expansion'
      },
  'Blackrock Mountain': {
      'code': 'brm',
      'name': 'Blackrock Mountain',
      'img': 'sample',
      'type': 'Adventure'
      },
  'The Grand Tournament': {
      'code': 'tgt',
      'name': 'The Grand Tournament',
      'img': 'sample',
      'type': 'Expansion'
      },
  'The League of Explorers': {
      'code': 'loe',
      'name': 'The League of Explorers',
      'img': 'sample',
      'type': 'Adventure'
      },
  'Whispers of the Old Gods': {
      'code': 'wog',
      'name': 'Whispers of the Old Gods',
      'img': 'sample',
      'type': 'Expansion'
      },
  'One Night in Karazhan': {
      'code': 'krzn',
      'name': 'One Night in Karazhan',
      'img': 'sample',
      'type': 'Adventure'
      },
  'Mean Streets of Gadgetzan': {
      'code': 'msg',
      'name': 'Mean Street of Gadgetzan',
      'img': 'sample',
      'type': 'Expansion'
      },
  "Journey to Un'Goro": {
      'code': 'goro',
      'name': "Journey to Un'Goro",
      'img': 'sample',
      'type': 'Expansion'
      },
  'Knights of the Frozen Throne': {
      'code': 'kft',
      'name': 'Knights of the Frozen Throne',
      'img': 'sample',
      'type': 'Expansion'
      },
  'Kobolds & Catacombs': {
      'code': 'knc',
      'name': 'Kobolds & Catacombs',
      'img': 'sample',
      'type': 'Expansion'
      },
  'The Witchwood': {
      'code': 'wtch',
      'name': 'The Witchwood',
      'img': 'sample',
      'type': 'Expansion'
      },
  'The Boomsday Project': {
      'code': 'bmp',
      'name': 'The Boomsday Project',
      'img': 'sample',
      'type': 'Expansion'
      },
  "Rastakhan's Rumble": {
      'code': 'rsr',
      'name': "Rastakhan's Rumble",
      'img': 'sample',
      'type': 'Expansion'
      },
  'Rise of Shadows': {
      'code': 'ros',
      'name': 'Rise of Shadows',
      'img': 'sample',
      'type': 'Expansion'
      },
  'Saviors of Uldum': {
      'code': 'sou',
      'name': 'Saviors of Uldum',
      'img': 'sample',
      'type': 'Expansion'
      },
  'Descent of Dragons': {
      'code': 'dod',
      'name': 'Descent of Dragons',
      'img': 'sample',
      'type': 'Expansion'
      },
  "Galakrond's Awakening": {
      'code': 'gka',
      'name': "Galakrond's Awakening",
      'img': 'sample',
      'type': 'Adventure'
      },
  'Demon Hunter Initiate': {
      'code': 'dhi',
      'name': 'Demon Hunter Initiate',
      'img': None
      },
  'Ashes of Outland': {
      'code': 'aou',
      'name': 'Ashes of Outland',
      'img': 'sample',
      'type': 'Expansion'
      },
  'Scholomance Academy': {
      'code': 'schl',
      'name': 'Scholomance Academy',
      'img': 'sample',
      'type': 'Expansion'
      },
  'Madness At The Darkmoon Faire': {
      'code': 'mad',
      'name': 'Madness At the Darkmoon Faire',
      'img': 'sample',
      'type': 'Expansion'
      },
  'Forged in the Barrens': {
      'code': 'bar',
      'name': 'Forged in the Barrens',
      'img': 'sample',
      'type': 'Expansion'
      },
  'Legacy': {
      'code': 'leg',
      'name': 'Legacy',
      'img': None
      },
  'Core 2021': {
      'code': 'c21',
      'name': 'Core',
      'img': None
      }
  }

years = {
    'grph': {
        'name': 'Year of the Gryphon',
        'sets': ['bar']
        },
    'phnx': {
        'name': 'Year of the Phoenix',
        'sets': ['aou','schl','mad']},
    'drgn': {
        'name': 'Year of the Dragon',
        'sets': ['ros','sou','dod','gka']},
    'rvn': {
        'name': 'Year of the Raven',
        'sets': ['wtch','bmp','rsr']},
    'mamt': {
        'name': 'Year of the Mammoth',
        'sets': ['goro','kft','knc']},
    'krkn': {
        'name': 'Year of the Kraken',
        'sets': ['wog','krzn','msg']},
    'ontwo': {
        'name': 'Years 1 & 2 (2014-2015)',
        'sets': ['nax','gvg','brm','tgt','loe']}
}

formats = {
    'standard': {
        'code': 'stnd',
        'name': 'Standard',
        'sets': ['c21','aou','schl','mad','bar']
    },
    'wild': {
        'code': 'wild',
        'name': 'Wild',
        'sets': ['leg','nax','gvg','brm','tgt','loe','wog','krzn','msg','goro',
        'kft','knc','wtch','bmp','rsr','ros','sou','dod','gka','aou','schl','mad',
        'bar']
    },
    'classic': {
        'code': 'clsc',
        'name': 'Classic',
        'sets': ['cls']
    }
}

