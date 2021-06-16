const BASE_URL = 'http://127.0.0.1:5000/api'

const classes = {
    dhn: {
        code: 'dhn',
        name: 'Demon Hunter',
        params: 'demon%20hunter',
        portrait: '/static/images/classes/demon-hunter-p.png'
    },
    dru: {
        code: 'dru',
        name: 'Druid',
        params: 'druid',
        portrait: '/static/images/classes/druid-p.png'
    },
    hun: {
        code: 'hun',
        name: 'Hunter',
        params: 'hunter',
        portrait: '/static/images/classes/hunter-p.png'
    },
    mag: {
        code: 'mag',
        name: 'Mage',
        params: 'mage',
        portrait: '/static/images/classes/mage-p.png'
    },
    pal: {
        code: 'pal',
        name: 'Paladin',
        params: 'paladin',
        portrait: '/static/images/classes/paladin-p.png'
    },
    pst: {
        code: 'pst',
        name: 'Priest',
        params: 'priest',
        portrait: '/static/images/classes/priest-p.png'
    },
    rog: {
        code: 'rog',
        name: 'Rogue',
        params: 'rogue',
        portrait: '/static/images/classes/rogue-p.png'
    },
    shm: {
        code: 'shm',
        name: 'Shaman',
        params: 'shaman',
        portrait: '/static/images/classes/shaman-p.png'
    },
    wal: {
        code: 'wal',
        name: 'Warlock',
        params: 'warlock',
        portrait: '/static/images/classes/warlock-p.png'
    },
    war: {
        code: 'war',
        name: 'Warrior',
        params: 'warrior',
        portrait: '/static/images/classes/warrior-p.png'
    },
    neu: {
        code: 'neu',
        name: 'Neutral'
    }
}

const rarity = {
    free: {
        cost: 0,
        color: 'white',
        code: 'free',
        name: 'Free'
    },
    comm: {
        cost: 20,
        color: '#EEF5DB',
        code: 'comm',
        name: 'Common'
    },
    rare: {
        cost: 100,
        color: '#54DEFD',
        code: 'rare',
        name: 'Rare'
    },
    epic: {
        cost: 400,
        color: '#D67AB1',
        code: 'epic',
        name: 'Epic'
    },
    lgnd: {
        cost: 1600,
        color: '#F4A259',
        code: 'lgnd',
        name: 'Legendary'
    }
}

const sets = {
        c21: {
            code: 'c21',
            name: 'Core',
            imgSrc: 'static/images/logos/stnd.png'
        },
        leg: {
            code: 'leg',
            name: 'Legacy',
            imgSrc: '/static/images/formats/wild.png'
        },
        cls: {
            code: 'cls',
            name: 'Classic',
            imgSrc: '/static/images/formats/classic.png'
        },
        nax: {
            code: 'nax',
            name: 'Curse of Naxxramas',
            imgSrc: '/static/images/logos/nax.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2014/04/curse-naxxramas001-1680x945.jpg',
            info: {
                subtitle: 'Into the Necropolis',
                info: "A whole new game mode, thirty new cards for your collection, a brand-new board, and the chance to school some of the Scourge’s most infamous champions – all this and more awaits in Curse of Naxxramas!"
            }
        },
        gvg: {
            code: 'gvg',
            name: 'Goblins vs Gnomes',
            imgSrc: '/static/images/logos/gvg.png',
            wallpaper: 'https://s1.1zoom.me/big0/546/Hearthstone_Heroes_of_510918.jpg',
            info: {
                subtitle: 'Goblins and gnomes… goblins and gnomes! Both are super-brilliant - but you would never know!',
                info: "Welcome to Goblins vs Gnomes! It’s a Hearthstone expansion, which means you can expect stacks of fresh cards, oodles of unique minions, and countless new ways to play. Use gnomish ingenuity or goblin craftiness to create explosive new strategies, challenge your friends, and defeat your foes."
            }
        },
        brm: {
            code: 'brm',
            name: 'Blackrock Mountain',
            imgSrc: '/static/images/logos/brm.png',
            wallpaper: 'https://i.pinimg.com/originals/be/e2/7c/bee27c9ed269e2c41ce598069cad0f80.jpg',
            info: {
                subtitle: 'Hic Sunt Dracones',
                info: "Trouble stirs beneath Blackrock Mountain. Deep within the fiery cracks of the Molten Core, Ragnaros the Firelord is massing his elemental forces, posing a serious threat to the black dragon Nefarian’s mountaintop lair. Things are about to reach a flashpoint… better break out the cards and show these two how real heroes settle their differences: with a civilized game of Hearthstone!"
            }
        },
        tgt: {
            code: 'tgt',
            name: 'The Grand Tournament',
            imgSrc: '/static/images/logos/tgt.png',
            wallpaper: 'https://cdn.vox-cdn.com/thumbor/xZBnExSQT91jlJz6nWe-EVt1nPc=/0x0:1280x720/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/47021362/hearthstone_grand_tournament.0.0.jpg',
            info: {
                subtitle: "Raise Your Banners High!",
                info: "When the Lich King and his undead Scourge threatened the world, the Argent Crusade called upon Azeroth’s mightiest heroes to prove their mettle in a magnificent tournament. Knights of all races flocked to Northrend, vying for glory in epic battles against fearsome monsters. Though the Lich King’s evil has been vanquished, the Grand Tournament continues… the competitive atmosphere’s just a bit more playful than it used to be."
            }
        },
        loe: {
            code: 'loe',
            name: 'The League of Explorers',
            imgSrc: '/static/images/logos/loe.png',
            wallpaper: 'https://cdn.gamer-network.net/2015/usgamer/explorers.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/the-first-league-of-explorers-wing-is-great-even-if-the-rewards-are-more-mixed.jpg',
            info: {
                subtitle: 'Mysteries of the Past',
                info: "Join the League of Explorers and embark on the adventure of a lifetime. Explore Azeroth's most mysterious archaeological sites and discover ancient treasures! Travel alongside famous treasure hunter Brann Bronzebeard and his merry band of intrepid action-archeologists on a race to uncover the pieces of the Staff of Origination, a priceless, ancient artifact. But beware, for you are not the only one who's hunting the artifact. Others have picked up the scent as well, so you'll have to play your cards right to stay one step ahead of the competition and keep the Staff of Origination from falling into the wrong hands!"
            }
        },
        wog: {
            code: 'wog',
            name: 'Whispers of the Old Gods',
            imgSrc: '/static/images/logos/wog.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2016/03/key-art-1920x1080.jpg',
            info: {
                subtitle: "Now I've got a tale to tell you... of the ones from long ago...",
                info: "For countless millennia, the Old Gods have slept. Now, the time of their awakening draws near; their evil influence has crawled even into the tavern! Can you feel your cards trembling in their decks as the corruption spreads? Some of your old friends have already grown icky masses of tentacles and a downright frightening number of eyeballs!"
            }
        },
        krzn: {
            code: 'krzn',
            name: 'One Night in Karazhan',
            imgSrc: '/static/images/logos/krzn.png',
            wallpaper: 'https://cdn.hipwallpaper.com/i/13/67/uBypje.jpg',
            info: {
                subtitle: 'Can’t Stop The Magic',
                info: "Karazhan, long a potent nexus of arcane energies, is about to become the focal point of a very different kind of cosmic force. The wizard Medivh has used every bit of magic at his disposal to set up the most lavish and extravagant party of all time, and your name is on the guest list alongside the crème de la crème of Azeroth and beyond! With such an eclectic mix of attendees, it’s guaranteed that this party will be out of this world..."
            }
        },
        msg: {
            code: 'msg',
            name: 'Mean Streets of Gadgetzan',
            imgSrc: '/static/images/logos/msg.png',
            wallpaper: 'https://images6.alphacoders.com/886/886164.png',
            info: {
                subtitle: 'GADGETZAN WELCOMES ALL!',
                info: "If you pull up a chair outside Fizzgrimble’s Tavern and watch afternoon traffic flowing up and down Grimestreet, you may notice a few things about how our city has changed..."
            }
        },
        goro: {
            code: 'goro',
            name: "Journey to Un'Goro",
            imgSrc: '/static/images/logos/goro.png',
            wallpaper: 'https://www.iamag.co/wp-content/uploads/2017/02/cover-ungoro.jpg',
            info: {
                subtitle: 'The Land Where Monsters Live!',
                info: "Travel to the forbidding jungles of Un’Goro Crater, where primordial creatures from the dawn of time roam. Here, giant dinosaurs infused with raw magical power mercilessly hunt their prey, prehistoric fauna and flora abound, and unchained elementals run wild with primitive magic. Prepare your decks for the expedition of a lifetime!"
            }
        },
        kft: {
            code: 'kft',
            name: 'Knights of the Frozen Throne',
            imgSrc: '/static/images/logos/kft.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2017/07/knightsofthefrozenthronewallpaper001.jpg',
            info: {
                subtitle: 'All Shall Fall!',
                info: "An icy wind howls outside the inn's walls, but the chill you feel crawling up your spine has little to do with the bitter cold. No deck is safe from the Lich King's evil influence; even the most stalwart champions of the Light have been turned into wicked Death Knights. As the agents of the undead Scourge plague the land, it falls to you to gather your cards, face these vile abominations, and turn their dark powers against them."
            }
        },
        knc: {
            code: 'knc',
            name: 'Kobolds and Catacombs',
            imgSrc: '/static/images/logos/knc.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2017/11/kobolds-and-catacombs-keyart-wallpaper.jpg',
            info: {
                subtitle: 'Treasure Awaits in the Depths',
                info: "Drawn by tales of untold riches, you have gathered a party of bold adventurers to find fortune in the catacombs. Now, shadows dance as your torches flicker and you descend into the mines. Just then, a gust of wind snuffs out your light. In the sudden dark, you make out a faint glow ahead, coming closer. An all-too familiar cackle echoes through the gloom."
            }
        },
        wtch: {
            code: 'wtch',
            name: 'The Witchwood',
            imgSrc: '/static/images/logos/wtch.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2018/03/the-witchwood-wallpaper006.jpg',
            info: {
                subtitle: 'Something Wicked This Way Comes',
                info: "Hush, brave heroes, and take heed; you tread on dangerous ground. See how the light dims all around, and moving shadows creep? The Witchwood calls, but I implore: do not its treasures seek! Stay where it’s safe, pull up a chair, let’s play another round! I see, your minds are quite made up; please hear me importune: Keep your decks close, and your wits sharp…"
            }
        },
        bmp: {
            code: 'bmp',
            name: 'The Boomsday Project',
            imgSrc: '/static/images/logos/bmp.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2018/07/desktop-key-art-wallpaper.jpg',
            info: {
                subtitle: 'For Science!',
                info: "Can you feel it? That electric tension on the wind, the reek of ozone and Khorium, the distant rumble of explosions; there’s science in the air! Word around the inn is that Dr. Boom has returned to his secret laboratory in the Netherstorm. No one knows exactly what the mad genius will unleash, but a lot of very, VERY strange cards have found their way into decks around here lately: mechanical amalgamations, eerie crystals, revolting, lab-grown monstrosities… the good doctor and his esteemed colleagues are working on something big! Time to venture into the Netherstorm, find the lab, and uncover what these maniacs are up to."
            }
        },
        rsr: {
            code: 'rsr',
            name: "Rastakhan's Rumble",
            imgSrc: '/static/images/logos/rsr.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2018/11/desktop-wallpaper-rastakhans-rumble098.jpg',
            info: {
                subtitle: 'SOUND THE DRUMS!',
                info: "Rastakhan, king of the Zandalari, ruler of the great troll empire, is calling on trolls from all over Azeroth: come witness the greatest contest of skill, strength, and cunning the world has ever seen. You best bring your finest deck and your boldest plays when you join the rumble. The winner takes all; the loser? Finished."
            }
        },
        ros: {
            code: 'ros',
            name: 'Rise of Shadows',
            imgSrc: '/static/images/logos/ros.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2019/04/ros-wallpaper-30.jpg',
            info: {
                subtitle: "It’s Good To Be Bad",
                info: "Well, well, well, look who just walked into our lair. Aw, you should see your face right now: did you really think you had vanquished us? Fool! The League of E.V.I.L. will never be defeated! Just you wait until you see the true scope of our secret master plan! Come to think of it, we do have an opening for lackeys, and you seem… uniquely qualified. What do you say? Care to take a walk on the dark side?"
            }
        },
        sou: {
            code: 'sou',
            name: 'Saviors of Uldum',
            imgSrc: '/static/images/logos/sou.png',
            wallpaper: 'https://d2q63o9r0h0ohi.cloudfront.net/images/saviors-of-uldum/expansionBg-flat-7d0981e5817773ca153c92bd7bb882c9fe38cdd91acc3942a8b1bb5d607fca2a25f7236d526e81e2f1d288f2621765835f3069c3d9c4fcec4e74129693f9724b.jpg',
            info: {
                subtitle: "They’re Here to Save the Day",
                info: "Saddle up with the League of Explorers, stop Arch-Villain Rafaam and his band of bad guys from unleashing Uldum’s ancient secrets in the name of E.V.I.L., and help save the world!"
            }
        },
        dod: {
            code: 'dod',
            name: 'Descent of Dragons',
            imgSrc: '/static/images/logos/dod.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2019/08/wallpaper-dod-pc-35-1024x576.jpg',
            info: {
                subtitle: 'Here Be Dragons',
                info: "Galakrond, the father of all dragonkind, has awoken… and he HUNGERS! As the brave heroes of the League of Explorers clash with the villainous League of E.V.I.L. in the skies above, which side will you choose in this epic conclusion to the year-long story?"
            }
        },
        gka: {
            code: 'gka',
            name: "Galakrond's Awakening",
            imgSrc: '/static/images/logos/gka.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2019/08/wallpaper-dod-pc-35-1024x576.jpg',
            info: {
                subtitle: 'A Story of Good and E.V.I.L.',
                info: 'Do you feel that? A chill swirls across the frozen wastes, glints of sunlight reflecting off the ice crystals carried by rising winds. But these winds carry more than frost…there’s an ill portent in Northrend as Dalaran soars in the skies and the final phase of an evil master plan is set into motion. In Dragonblight, the bones of an ancient power stir, and good and evil prepare for a clash that will save the world…or one that could bring about its utter destruction. And it all hinges on one name: Galakrond.'
            }
        },
        dhi: {
            code: 'dhi',
            name: 'Demon Hunter Initiate',
            imgSrc: '/static/images/logos/dhi.jpeg'
        },
        aou: {
            code: 'aou',
            name: 'Ashes of Outland',
            imgSrc: '/static/images/logos/aou.png',
            wallpaper: 'https://cdn.mos.cms.futurecdn.net/FYgZW7fPKuEa67cwrM5t2Z.jpg',
            info: {
                subtitle: "Peer Through the Dark Portal",
                info: 'From the last bastion of civilization on a shattered world, Illidan Stormrage beckons. Join ranks with the fabled Illidari Demon Hunters while wielding powers forged from the surrounding chaos. Slay rampaging demons, crush the Rusted Legion, and rise from the Ashes of Outland!'
            }
        },
        schl: {
            code: 'schl',
            name: 'Scholomance Academy',
            imgSrc: '/static/images/logos/schl.png',
            wallpaper: 'https://sm.ign.com/t/ign_za/news/h/hearthston/hearthstone-unveils-scholomance-academy_sd4k.1200.jpg',
            info: {
                subtitle: "School's in Session",
                info: 'Within the lofty halls of the prestigious Scholomance Academy, the next generation of great fire flingers, axe swingers, and doom bringers study under the scrutinizing eye of Headmaster Kel’Thuzad. Whatever your martial or magical pursuit, the academy has the training grounds and study halls to transform you into the hero you’ve always known you could be. Just be sure you steer clear of what the Cult of the Damned may be meddling with beneath the campus grounds…'
            }
        },
        mad: {
            code: 'mad',
            name: 'Madness at the Darkmoon Faire',
            imgSrc: '/static/images/logos/mad.png',
            wallpaper: 'https://media.pocketgamer.com/artwork/na-20784-1603442646/hearthstone-madness-darkmoon-faire-header.jpg',
            info: {
                subtitle: 'Come One, Come All',
                info: 'Just beyond our auspicious arch, a fantastic festival filled with tantalizing sights, treats, and challenges awaits you. Though, heed not the many blinking horrors beckoning from shrouded alleyways, for these otherworldly terrors would have you miss the petting zoo! Welcome to the Madness at the Darkmoon Faire!'
            }
        },
        bar: {
            code: 'bar',
            name: 'Forged in the Barrens',
            imgSrc: '/static/images/logos/bar.png',
            wallpaper: 'https://cdn.mos.cms.futurecdn.net/BQUuqP4S8c2DAEhnZDsaA5.jpg',
            info: {
                subtitle: 'All roads lead to the Crossroads',
                info: 'Welcome to the Barrens, adventurer. The land where blistered terrain and battering sun form the anvil and hammer that shape the unbreakable Horde. Where Kalimdor’s most promising denizens test magic and muscle against furious centaur, soaring harpies, and bristling Quilboar. Here is the proving ground for warriors who would become legends--those who have been Forged in the Barrens!'
            }
        }
    }
    // Filters

const formats = {
    standard: { sets: [sets.bar, sets.mad, sets.schl, sets.aou, sets.c21] },
    wild: {
        sets: [sets.bar, sets.mad, sets.schl, sets.aou, sets.dhi,
            sets.gka, sets.dod, sets.sou, sets.ros, sets.rsr, sets.bmp, sets.wtch,
            sets.knc, sets.kft, sets.goro, sets.msg, sets.krzn, sets.wog, sets.loe,
            sets.tgt, sets.brm, sets.gvg, sets.nax, sets.leg
        ]
    },
    classic: { sets: [sets.cls] }
}

const cardTypes = {
    min: {
        code: 'min',
        name: 'Minion'
    },
    spl: {
        code: 'spl',
        name: 'Spell'
    },
    wpn: {
        code: 'wpn',
        name: 'Weapon'
    },
    hero: {
        code: 'hero',
        name: 'Hero'
    }
}

const years = [
    gryphon = {
        name: 'Year of the Gryphon (2021)',
        sets: [sets.bar]
    },
    phoenix = {
        name: 'Year of the Phoenix (2020)',
        sets: [sets.aou, sets.schl, sets.mad]
    },
    dragon = {
        name: 'Year of the Dragon (2019)',
        sets: [sets.ros, sets.sou, sets.dod, sets.gka]
    },
    raven = {
        name: 'Year of the Raven (2018)',
        sets: [sets.wtch, sets.bmp, sets.rsr]
    },
    mammoth = {
        name: 'Year of the Mammoth (2017)',
        sets: [sets.goro, sets.kft, sets.knc]
    },
    kraken = {
        name: 'Year of the Kraken (2016)',
        sets: [sets.wog, sets.krzn, sets.msg]
    },
    oneAndTwo = {
        name: 'Years 1 & 2 (2014-2015)',
        sets: [sets.nax, sets.gvg, sets.brm, sets.tgt, sets.loe]
    }
]