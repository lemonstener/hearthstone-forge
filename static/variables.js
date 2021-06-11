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
            imgSrc: '/static/images/logos/nax.png'
        },
        gvg: {
            code: 'gvg',
            name: 'Goblins vs Gnomes',
            imgSrc: '/static/images/logos/gvg.png'
        },
        brm: {
            code: 'brm',
            name: 'Blackrock Mountain',
            imgSrc: '/static/images/logos/brm.png'
        },
        tgt: {
            code: 'tgt',
            name: 'The Grand Tournament',
            imgSrc: '/static/images/logos/tgt.png'
        },
        loe: {
            code: 'loe',
            name: 'The League of Explorers',
            imgSrc: '/static/images/logos/loe.png'
        },
        wog: {
            code: 'wog',
            name: 'Whispers of the Old Gods',
            imgSrc: '/static/images/logos/wog.png'
        },
        krzn: {
            code: 'krzn',
            name: 'One Night in Karazhan',
            imgSrc: '/static/images/logos/krzn.png'
        },
        msg: {
            code: 'msg',
            name: 'Mean Streets of Gadgetzan',
            imgSrc: '/static/images/logos/msg.png'
        },
        goro: {
            code: 'goro',
            name: "Journey to Un'Goro",
            imgSrc: '/static/images/logos/goro.png'
        },
        kft: {
            code: 'kft',
            name: 'Knights of the Frozen Throne',
            imgSrc: '/static/images/logos/kft.png'
        },
        knc: {
            code: 'knc',
            name: 'Kobolds and Catacombs',
            imgSrc: '/static/images/logos/knc.png'
        },
        wtch: {
            code: 'wtch',
            name: 'The Witchwood',
            imgSrc: '/static/images/logos/wtch.png'
        },
        bmp: {
            code: 'bmp',
            name: 'The Boomsday Project',
            imgSrc: '/static/images/logos/bmp.png'
        },
        rsr: {
            code: 'rsr',
            name: "Rastakhan's Rumble",
            imgSrc: '/static/images/logos/rsr.png'
        },
        ros: {
            code: 'ros',
            name: 'Rise of Shadows',
            imgSrc: '/static/images/logos/ros.png'
        },
        sou: {
            code: 'sou',
            name: 'Saviors of Uldum',
            imgSrc: '/static/images/logos/sou.png'
        },
        dod: {
            code: 'dod',
            name: 'Descent of Dragons',
            imgSrc: '/static/images/logos/dod.png'
        },
        gka: {
            code: 'gka',
            name: "Galakrond's Awakening",
            imgSrc: '/static/images/logos/gka.png'
        },
        dhi: {
            code: 'dhi',
            name: 'Demon Hunter Initiate',
            imgSrc: '/static/images/logos/dhi.jpeg'
        },
        aou: {
            code: 'aou',
            name: 'Ashes of Outland',
            imgSrc: '/static/images/logos/aou.png'
        },
        schl: {
            code: 'schl',
            name: 'Scholomance Academy',
            imgSrc: '/static/images/logos/schl.png'
        },
        mad: {
            code: 'mad',
            name: 'Madness at the Darkmoon Faire',
            imgSrc: '/static/images/logos/mad.png'
        },
        bar: {
            code: 'bar',
            name: 'Forged in the Barrens',
            imgSrc: '/static/images/logos/bar.png'
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