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
    sha: {
        code: 'sha',
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
        clsc: {
            code: 'clsc',
            name: 'Classic',
            imgSrc: '/static/images/formats/classic.png'
        },
        nax: {
            code: 'nax',
            name: 'Curse of Naxxramas',
            imgSrc: '/static/images/logos/nax.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2014/04/curse-naxxramas001-1680x945.jpg'
        },
        gvg: {
            code: 'gvg',
            name: 'Goblins vs Gnomes',
            imgSrc: '/static/images/logos/gvg.png',
            wallpaper: 'https://s1.1zoom.me/big0/546/Hearthstone_Heroes_of_510918.jpg'
        },
        brm: {
            code: 'brm',
            name: 'Blackrock Mountain',
            imgSrc: '/static/images/logos/brm.png',
            wallpaper: 'https://i.pinimg.com/originals/be/e2/7c/bee27c9ed269e2c41ce598069cad0f80.jpg'
        },
        tgt: {
            code: 'tgt',
            name: 'The Grand Tournament',
            imgSrc: '/static/images/logos/tgt.png',
            wallpaper: 'https://cdn.vox-cdn.com/thumbor/xZBnExSQT91jlJz6nWe-EVt1nPc=/0x0:1280x720/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/47021362/hearthstone_grand_tournament.0.0.jpg'
        },
        loe: {
            code: 'loe',
            name: 'The League of Explorers',
            imgSrc: '/static/images/logos/loe.png',
            wallpaper: 'https://cdn.gamer-network.net/2015/usgamer/explorers.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/the-first-league-of-explorers-wing-is-great-even-if-the-rewards-are-more-mixed.jpg'
        },
        wog: {
            code: 'wog',
            name: 'Whispers of the Old Gods',
            imgSrc: '/static/images/logos/wog.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2016/03/key-art-1920x1080.jpg'
        },
        krzn: {
            code: 'krzn',
            name: 'One Night in Karazhan',
            imgSrc: '/static/images/logos/krzn.png',
            wallpaper: 'https://assets.vg247.com/current//2016/08/hearthstone_big_face.jpg'
        },
        msg: {
            code: 'msg',
            name: 'Mean Streets of Gadgetzan',
            imgSrc: '/static/images/logos/msg.png',
            wallpaper: 'https://images6.alphacoders.com/886/886164.png'
        },
        goro: {
            code: 'goro',
            name: "Journey to Un'Goro",
            imgSrc: '/static/images/logos/goro.png',
            wallpaper: 'https://www.iamag.co/wp-content/uploads/2017/02/cover-ungoro.jpg'
        },
        kft: {
            code: 'kft',
            name: 'Knights of the Frozen Throne',
            imgSrc: '/static/images/logos/kft.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2017/07/knightsofthefrozenthronewallpaper001.jpg'
        },
        knc: {
            code: 'knc',
            name: 'Kobolds and Catacombs',
            imgSrc: '/static/images/logos/knc.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2017/11/kobolds-and-catacombs-keyart-wallpaper.jpg'
        },
        wtch: {
            code: 'wtch',
            name: 'The Witchwood',
            imgSrc: '/static/images/logos/wtch.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2018/03/the-witchwood-wallpaper006.jpg'
        },
        bmp: {
            code: 'bmp',
            name: 'The Boomsday Project',
            imgSrc: '/static/images/logos/bmp.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2018/07/desktop-key-art-wallpaper.jpg'
        },
        rsr: {
            code: 'rsr',
            name: "Rastakhan's Rumble",
            imgSrc: '/static/images/logos/rsr.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2018/11/desktop-wallpaper-rastakhans-rumble098.jpg'
        },
        ros: {
            code: 'ros',
            name: 'Rise of Shadows',
            imgSrc: '/static/images/logos/ros.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2019/04/ros-wallpaper-30.jpg'
        },
        sou: {
            code: 'sou',
            name: 'Saviors of Uldum',
            imgSrc: '/static/images/logos/sou.png',
            wallpaper: 'https://cdn.gamer-network.net/2019/usgamer/suldum-hearthstone-graphic.jpg'
        },
        dod: {
            code: 'dod',
            name: 'Descent of Dragons',
            imgSrc: '/static/images/logos/dod.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2019/08/wallpaper-dod-pc-35-1024x576.jpg'
        },
        gka: {
            code: 'gka',
            name: "Galakrond's Awakening",
            imgSrc: '/static/images/logos/gka.png',
            wallpaper: 'https://cdn.hearthstonetopdecks.com/wp-content/uploads/2019/08/wallpaper-dod-pc-35-1024x576.jpg'
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
            wallpaper: 'https://cdn.mos.cms.futurecdn.net/FYgZW7fPKuEa67cwrM5t2Z.jpg'
        },
        schl: {
            code: 'schl',
            name: 'Scholomance Academy',
            imgSrc: '/static/images/logos/schl.png',
            wallpaper: 'https://sm.ign.com/t/ign_za/news/h/hearthston/hearthstone-unveils-scholomance-academy_sd4k.1200.jpg'
        },
        mad: {
            code: 'mad',
            name: 'Madness at the Darkmoon Faire',
            imgSrc: '/static/images/logos/mad.png',
            wallpaper: 'https://media.pocketgamer.com/artwork/na-20784-1603442646/hearthstone-madness-darkmoon-faire-header.jpg'
        },
        bar: {
            code: 'bar',
            name: 'Forged in the Barrens',
            imgSrc: '/static/images/logos/bar.png',
            wallpaper: 'https://cdn.mos.cms.futurecdn.net/BQUuqP4S8c2DAEhnZDsaA5.jpg'
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
    classic: { sets: [sets.clsc] }
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