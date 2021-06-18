const body = document.querySelector('body')
const content = document.querySelector('.content')
const hsLogo = document.querySelector('#hs-logo')
const nav = document.querySelector('nav')
const forgeLink = document.querySelector('#forge')
const decksLink = document.querySelector('#decks')
const setsLink = document.querySelector('#sets')
const newsLink = document.querySelector('#news')

const BASE_URL = 'http://127.0.0.1:5000'

const userInSession = {
    isLoggedIn: false,
    username: '',
    bio: '',
    favorites: '',
    ownDecks: '',
    isMod: '',
    isAdmin: '',
    deckBuilder: {
        format: '',
        playerClass: '',
        deckArr: [],
        tableArr: []
            // deckArr keeps track of the length of the deck. Maximum of 30 cards allowed.
            // tableArr keeps track of how many rows are in the table and
            // helps keeping it organized.
    }
}


hsLogo.addEventListener('click', function() {
    if (!content.classList.contains('blur')) {
        const forgeLink = document.createElement('a')
        const forgeText = document.createTextNode("Forge a Deck")
        forgeLink.id = 'forge'
        forgeLink.href = ''
        forgeLink.style.color = 'white'
        forgeLink.append(forgeText)

        forgeLink.addEventListener('click', function(e) {
            e.preventDefault()
            nav.innerHTML = ''
            createFormatPanels()
            content.classList.remove('blur')
            nav.style.left = '-9999px'
            content.style.marginLeft = '0'
        })

        const decksLink = document.createElement('a')
        const decksText = document.createTextNode("Browse Decks")
        decksLink.id = 'decks'
        decksLink.href = ''
        decksLink.style.color = 'white'
        decksLink.append(decksText)

        const setsLink = document.createElement('a')
        const setsText = document.createTextNode("Browse Cards by Set")
        setsLink.id = 'sets'
        setsLink.href = ''
        setsLink.style.color = 'white'
        setsLink.append(setsText)

        setsLink.addEventListener('click', function(e) {
            e.preventDefault()
            nav.innerHTML = ''
            allSets()
            content.classList.remove('blur')
            nav.style.left = '-9999px'
            content.style.marginLeft = '0'
        })

        const newsLink = document.createElement('a')
        const newsText = document.createTextNode("News")
        newsLink.id = 'news'
        newsLink.href = ''
        newsLink.style.color = 'white'
        newsLink.append(newsText)

        nav.append(forgeLink, decksLink, setsLink, newsLink)
        if (!userInSession.isLoggedIn) {
            const loginLink = document.createElement('a')
            const loginText = document.createTextNode("Login")
            loginLink.id = 'login'
            loginLink.href = ''
            loginLink.style.color = 'white'
            loginLink.append(loginText)

            loginLink.addEventListener('click', function(e) {
                e.preventDefault()
                nav.innerHTML = ''
                showLoginForm()
                content.classList.remove('blur')
                nav.style.left = '-9999px'
                content.style.marginLeft = '0'
            })

            nav.append(loginLink)
        } else {
            const userLink = document.createElement('a')
            const userText = document.createTextNode(`${userInSession.username}`)
            userLink.id = 'user'
            userLink.href = ''
            userLink.style.color = 'gold'
            userLink.append(userText)

            nav.prepend(userLink)

            const logoutLink = document.createElement('a')
            const logoutText = document.createTextNode(`Logout`)
            logoutLink.id = 'logout'
            logoutLink.href = ''
            logoutLink.style.color = 'white'
            logoutLink.append(logoutText)

            nav.append(logoutLink)
        }
        content.classList.add('blur')
        nav.style.left = '0'
        content.style.marginLeft = '50vw'
    } else {
        content.classList.remove('blur')
        nav.style.left = '-9999px'
        content.style.marginLeft = '0'
        nav.innerHTML = ''
    }
})