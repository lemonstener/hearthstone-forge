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
    for (el of res.data.all_decks) {
        currentDecks[el.id] = el
        const appendTo = document.querySelector(`#${el.player_class}`)
        appendTo.append(createBanner(el))
    }
}

function createBanner(deck) {
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

    if (deck.format === 'stnd') {
        format.innerText = 'standard'
    } else if (deck.format === 'clsc') {
        format.innerText = 'classic'
    } else {
        format.innerText = deck.format
    }

    if (deck.player_class === 'pst' ||
        deck.player_class === 'pal' ||
        deck.player_class === 'dhn' ||
        deck.player_class === 'shm') {
        title.style.color = 'black'
        byUser.style.color = 'black'
        format.style.color = 'black'
    }

    info.append(title, byUser, format)

    const stats = document.createElement('div')
    stats.classList.add('stats')

    const heart = document.createElement('div')
    heart.classList.add('heart')
    const heartCounter = document.createElement('div')
    heart.innerHTML = '<span>♡</span>'
    heart.style.color = 'red'
    heartCounter.innerText = deck.favorite_count
    heartCounter.classList.add('heart-counter')

    const bubble = document.createElement('div')
    bubble.innerHTML = '<span>&#x1F5E8;</span>'
    bubble.classList.add('bubble')
    const bubbleCounter = document.createElement('div')
    bubbleCounter.innerText = deck.comment_count
    bubbleCounter.classList.add('bubble-counter')

    if (deck.player_class === 'pst' ||
        deck.player_class === 'pal' ||
        deck.player_class === 'dhn' ||
        deck.player_class === 'shm') {
        heartCounter.style.color = 'black'
        bubbleCounter.style.color = 'black'
    }

    const top = document.createElement('div')
    top.classList.add('stats-field')
    const bottom = document.createElement('div')
    bottom.classList.add('stats-field')

    top.append(heart, bubble)
    bottom.append(heartCounter, bubbleCounter)
    stats.append(top, bottom)

    deckHolder.append(portrait, info, stats)

    deckHolder.addEventListener('click', function() {
        displayDeck(this.id)
    })

    return deckHolder
}

function displayDeck(num) {
    content.classList.add('fade-out')
    setTimeout(() => {
        resetContent()
        content.id = 'showcase-deck'

        const deck = currentDecks[num]
        const deckWallpaper = document.createElement('div')
        deckWallpaper.classList.add('deck-wallpaper')
        deckWallpaper.style.backgroundImage = `url(${classes[currentDecks[deck.id].player_class].figure})`

        const info = document.createElement('div')
        info.id = 'deck-desc'
        info.setAttribute('deck-id', deck.id)

        const backButton = document.createElement('div')
        backButton.innerHTML = '<span id="back-set-button">&#10232;</span>'
        backButton.addEventListener('click', prepareAllDecksPanel)

        const heading = document.createElement('div')
        heading.innerHTML = `<h2>${deck.title}</h2>by ${deck.author}`
        heading.style.fontSize = '2rem'

        const buttons = document.createElement('div')
        buttons.style.fontSize = '2em'
        buttons.style.cursor = 'pointer'

        if (userInSession.isLoggedIn && deck.author_id !== userInSession.id) {
            const favorites = userInSession.favorites
            if (favorites.indexOf(deck.id) > -1) {
                buttons.innerHTML = `<span>♥︎</span>`
                buttons.style.color = 'red'
            } else {
                buttons.innerHTML = `<span>♥</span>`
                buttons.style.color = 'rgba(60, 179, 113,.7)'
            }
            buttons.addEventListener('click', favUnfav)
        } else if (userInSession.isLoggedIn && deck.author_id === userInSession.id) {
            const editDeckBTN = document.createElement('button')
            const editGuideBTN = document.createElement('button')

            editDeckBTN.innerText = 'Edit Deck'
            editDeckBTN.setAttribute('deck', deck.id)
            editGuideBTN.innerText = 'Edit Guide'
            editGuideBTN.setAttribute('deck', deck.id)

            editDeckBTN.addEventListener('click', editDeck)
                // Will come back to add this function some other time,
                // right now I just want to wrap this up.
                // editGuide.addEventListener('click', editGuide)

            buttons.append(editDeckBTN, editGuideBTN)
        }

        const guide = document.createElement('div')
        guide.innerText = deck.guide
        guide.style.backgroundColor = 'rgba(0, 0, 0, .3)'

        info.append(backButton, heading, guide)
        if (buttons.innerHTML !== '') {
            info.insertBefore(buttons, info.childNodes[2])
        }
        body.append(info)

        const table = document.createElement('table')
        table.style.zIndex = '9999'
        table.style.position = 'fixed'
        table.style.right = '50px'

        content.append(deckWallpaper, table)

        for (card of currentDecks[deck.id].cards) {
            const duplicateCard = checkForDuplicate(card.id)
            if (duplicateCard) {
                userInSession.deckBuilder.deckArr.push(card.id)
                duplicate(card)
            } else {
                userInSession.deckBuilder.deckArr.push(card.id)
                userInSession.deckBuilder.tableArr.push(card.cost)
                userInSession.deckBuilder.tableArr.sort(function(a, b) {
                    return a - b
                });
                single(card)
            }
        }
        content.classList.remove('fade-out')
    }, 500);
}

function single(card) {
    const index = userInSession.deckBuilder.tableArr.indexOf(card.cost || 0)
    const table = document.querySelector('table')
    const tr = table.insertRow(index)
    tr.id = card.id
    const cost = document.createElement('td')
    const name = document.createElement('td')

    cost.innerText = card.cost
    cost.style.color = 'white'
    name.innerText = card.name
    name.style.color = rarity[card.rarity].color

    if (card.rarity === 'lgnd') {
        const star = document.createElement('td')
        star.innerHTML = '<span>&#9733;</span>'
        star.style.textAlign = 'center'
        star.style.color = 'gold'
        tr.append(star)
    }

    const img = document.createElement('img')
    img.src = card.img
    img.classList.add('snap-deck-showcase')

    tr.prepend(img, cost, name)
}

function duplicate(card) {
    const tr = document.getElementById(card.id)
    const symbol = document.createElement('td')

    symbol.innerText = 'x2'
    symbol.style.textAlign = 'center'
    symbol.style.color = 'gold'

    tr.append(symbol)
}

async function favUnfav() {
    const deck = this.parentElement.getAttribute('deck-id')
    const res = await axios.post(`${BASE_URL}/api/decks/${deck}/favorite`)
    const num = parseInt(deck)
    if (res.data === 'Deck added to favorites.') {
        this.innerHTML = '<span>♥︎</span>'
        this.style.color = 'red'
        userInSession.favorites.push(num)
    } else {
        this.innerHTML = '<span>♥︎</span>'
        this.style.color = 'rgba(60, 179, 113,.4)'
        const index = userInSession.favorites.indexOf(num)
        userInSession.favorites.splice(index, 1)
    }
}

function editDeck() {
    const deck = currentDecks[this.getAttribute('deck')]
    resetContent()
    userInSession.deckBuilder.editMode = true
    if (deck.format === 'stnd') {
        userInSession.deckBuilder.format = 'standard'
    } else if (deck.format === 'clsc') {
        userInSession.deckBuilder.format = 'classic'
    } else {
        userInSession.deckBuilder.format = deck.format
    }
    userInSession.deckBuilder.playerClass = deck.player_class
    userInSession.deckBuilder.deckToEdit = parseInt(deck.id)
    userInSession.deckBuilder.editCards = userInSession.deckBuilder.deckArr
    userInSession.deckBuilder.deckArr = []
    userInSession.deckBuilder.tableArr = []
    prepareDeckBuilder()
}