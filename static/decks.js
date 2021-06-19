const currentDecks = {}

function prepareAllDecksPanel() {
    resetDeckBuilder()
    resetContent()
    content.id = 'all-decks'
    for (c in classes) {
        if (classes[c].name !== 'Neutral') {
            const div = document.createElement('div')
            div.classList.add('deck-class')

            const titleHolder = document.createElement('div')
            titleHolder.style.width = '80%'
            titleHolder.style.textAlign = 'center'
            titleHolder.style.backgroundColor = classes[c].color

            const title = document.createElement('h3')
            title.style.color = 'white'
            title.style.fontSize = '1.4rem'
            title.style.webkitTextStrokeWidth = '.1px'
            title.style.webkitTextStrokeColor = 'black'
            title.innerText = `${classes[c].name}`

            const decksShowcase = document.createElement('div')
            decksShowcase.id = classes[c].code
            decksShowcase.classList.add('all-class-decks')

            titleHolder.append(title)
            content.append(titleHolder, decksShowcase)
        }
    }
    getDecksFromAPI()
}

async function getDecksFromAPI() {
    const res = await axios.get(`${BASE_URL}/api/decks`)
    for (deck of res.data.all_decks) {
        currentDecks[deck.id] = deck
        const deckHolder = document.createElement('div')
        deckHolder.classList.add('deck')
        deckHolder.style.backgroundColor = `${classes[deck.player_class].color}`
        deckHolder.id = deck.id

        const portrait = document.createElement('div')
        portrait.classList.add('deck-portrait')
        portrait.style.backgroundImage = `url(${classes[deck.player_class].face})`

        const info = document.createElement('div')
        info.classList.add('deck-info')

        const title = document.createElement('div')
        title.innerText = deck.title
        const byUser = document.createElement('div')
        byUser.innerText = `by ${deck.author}`
        const format = document.createElement('div')
        format.innerText = deck.format

        info.append(title, byUser, format)

        const stats = document.createElement('div')
        stats.classList.add('stats')

        const heart = document.createElement('div')
        heart.classList.add('heart')
        const heartCounter = document.createElement('div')
        heart.innerHTML = '<span>&#9825;</span>'
        heartCounter.innerText = deck.favorite_count
        heartCounter.classList.add('heart-counter')

        const bubble = document.createElement('div')
        bubble.innerHTML = '<span>&#x1F5E8;</span>'
        bubble.classList.add('bubble')
        const bubbleCounter = document.createElement('div')
        bubbleCounter.innerText = deck.comment_count
        bubbleCounter.classList.add('bubble-counter')

        const top = document.createElement('div')
        top.classList.add('stats-field')
        const bottom = document.createElement('div')
        bottom.classList.add('stats-field')

        top.append(heart, bubble)
        bottom.append(heartCounter, bubbleCounter)
        stats.append(top, bottom)

        deckHolder.append(portrait, info, stats)
        const appendTo = document.querySelector(`#${deck.player_class}`)
        appendTo.append(deckHolder)

        deckHolder.addEventListener('click', displayDeck)
    }
}

function displayDeck() {
    resetContent()
    content.id = 'showcase-deck'

    for (card of currentDecks[this.id].cards) {
        userInSession.deckBuilder.deckArr.push(card.id)
    }

    const deckWallpaper = document.createElement('div')
    deckWallpaper.classList.add('deck-wallpaper')
    deckWallpaper.style.backgroundImage = `url(${classes[currentDecks[this.id].player_class].figure})`

    const table = document.createElement('table')
    table.style.zIndex = '9000'

    for (card of currentDecks[this.id].cards) {
        const tr = document.createElement('tr')
        let count = 0
        for (num of userInSession.deckBuilder.deckArr) {
            if (num === card.id) {
                count++;
                if (count === 1 && card.rarity === 'lgnd') {
                    table.append(legendary(card))
                } else if (count === 2) {
                    table.append(duplicate(card))
                } else {
                    table.append(single(card))
                }
            }
        }
    }



    content.append(deckWallpaper, table)
}

function single(card) {
    const tr = document.createElement('tr')
    const cost = document.createElement('td')
    const name = document.createElement('td')

    cost.innerText = card.cost
    cost.style.color = 'white'
    name.innerText = card.name
    name.style.color = rarity[card.rarity].color

    tr.append(cost, name)
    return tr
}

function duplicate(card) {
    console.log(card)
}

function legendary(card) {
    console.log(card)
}