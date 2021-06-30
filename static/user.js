function userPage() {
    resetContent()
    resetDeckBuilder()
    content.id = 'user-page'
    currentDecks.currentPage = userPage

    const info = document.createElement('div')
    const username = document.createElement('h1')
    info.style.width = '100%'
    username.innerText = userInSession.username
    const up = document.createElement('p')
    up.innerText = "Your username. It's kind of stupid."


    info.append(username, up)

    const yourDecksPanel = document.createElement('div')
    const yourTitle = document.createElement('h2')
    const yourDecks = document.createElement('div')
    yourDecks.id = 'your-decks'
    yourDecks.style.display = 'flex'
    yourDecks.style.flexWrap = 'wrap'
    yourDecks.style.flexDirection = 'row'
    yourTitle.innerText = 'Your Decks'
    yourDecksPanel.append(yourTitle, yourDecks)
    yourDecksPanel.classList.add('user-decks-holder')

    for (el of userInSession.ownDecks) {
        getSingleDeck(el)
    }

    const favPanel = document.createElement('div')
    const favTitle = document.createElement('h2')
    const favDecks = document.createElement('div')
    favDecks.id = 'fav-decks'
    favDecks.style.display = 'flex'
    favDecks.style.flexWrap = 'wrap'
    favDecks.style.flexDirection = 'row'
    favTitle.innerText = 'Favorites'
    favPanel.append(favTitle, favDecks)
    favPanel.classList.add('user-decks-holder')

    if (userInSession.ownDecks.length === 0) {
        const p = document.createElement('p')
        p.innerText = 'You have not created any decks yet. Head over to the deck builder and try it out.'
        yourDecksPanel.append(p)
    }

    if (userInSession.favorites.length === 0) {
        const p = document.createElement('p')
        p.innerText = 'You have not favorited any decks. Go browse some decks and click the heart button... or else.'
        favPanel.append(p)
    }

    for (el of userInSession.favorites) {
        getSingleDeck(el)
    }

    content.prepend(info, yourDecksPanel, favPanel)
}

async function getSingleDeck(id) {
    const res = await axios.get(`${BASE_URL}/api/decks/${id}`)
    const deck = res.data.deck
    currentDecks[deck.id] = deck
    const banner = createBanner(deck)

    if (userInSession.ownDecks.indexOf(deck.id) > -1) {
        const yourDecks = document.querySelector('#your-decks')
        yourDecks.append(banner)
    } else if (userInSession.favorites.indexOf(deck.id) > -1) {
        const favDecks = document.querySelector('#fav-decks')
        favDecks.append(banner)
    }
}