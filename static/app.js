const body = document.querySelector('body')
const content = document.querySelector('.content')
const logoHolder = document.querySelector('#logo-holder')
const hsLogo = document.querySelector('#hs-logo')
const nav = document.querySelector('nav')
const forgeLink = document.querySelector('#forge')
const decksLink = document.querySelector('#decks')
const setsLink = document.querySelector('#sets')
const newsLink = document.querySelector('#news')

const BASE_URL = 'http://127.0.0.1:5000'

const currentDecks = {
    currentPage: ''
}

const userInSession = {
    isLoggedIn: false,
    id: '',
    username: '',
    bio: '',
    favorites: '',
    ownDecks: '',
    deckBuilder: {
        format: '',
        playerClass: '',
        deckArr: [],
        tableArr: [],
        editMode: false,
        deckToEdit: '',
        editCards: []
            // deckArr keeps track of the length of the deck. Maximum of 30 cards allowed.
            // tableArr keeps track of how many rows are in the table and
            // helps keeping it organized.
    }
}

hsLogo.addEventListener('click', function() {
    clearInterval(addShake)
    clearInterval(removeShake)
    if (!content.classList.contains('blur')) {
        const forgeLink = document.createElement('a')
        const forgeText = document.createTextNode("Forge a Deck")
        forgeLink.id = 'forge'
        forgeLink.href = ''
        forgeLink.style.color = 'white'
        forgeLink.append(forgeText)

        forgeLink.addEventListener('click', function(e) {
            e.preventDefault()
            resetNav()
            createFormatPanels()
        })

        const decksLink = document.createElement('a')
        const decksText = document.createTextNode("Browse Decks")
        decksLink.id = 'decks'
        decksLink.href = ''
        decksLink.style.color = 'white'
        decksLink.append(decksText)

        decksLink.addEventListener('click', function(e) {
            e.preventDefault()
            resetNav()
            prepareAllDecksPanel()
        })

        const setsLink = document.createElement('a')
        const setsText = document.createTextNode("Browse Cards by Set")
        setsLink.id = 'sets'
        setsLink.href = ''
        setsLink.style.color = 'white'
        setsLink.append(setsText)

        setsLink.addEventListener('click', function(e) {
            e.preventDefault()
            resetNav()
            allSets()
        })

        // I plan on adding a news section to the website at some point.

        // const newsLink = document.createElement('a')
        // const newsText = document.createTextNode("News")
        // newsLink.id = 'news'
        // newsLink.href = ''
        // newsLink.style.color = 'white'
        // newsLink.append(newsText)

        nav.append(forgeLink, decksLink, setsLink)
        if (!userInSession.isLoggedIn) {
            const loginLink = document.createElement('a')
            const loginText = document.createTextNode("Login")
            loginLink.id = 'login'
            loginLink.href = ''
            loginLink.style.color = 'white'
            loginLink.append(loginText)

            loginLink.addEventListener('click', function(e) {
                e.preventDefault()
                resetNav()
                showLoginForm()
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

            userLink.addEventListener('click', function(e) {
                e.preventDefault()
                resetContent()
                resetDeckBuilder()
                resetNav()
                userPage()
            })

            const logoutLink = document.createElement('a')
            const logoutText = document.createTextNode(`Logout`)
            logoutLink.id = 'logout'
            logoutLink.href = ''
            logoutLink.style.color = 'white'
            logoutLink.append(logoutText)

            nav.append(logoutLink)

            logoutLink.addEventListener('click', async function(e) {
                e.preventDefault()
                resetContent()
                resetDeckBuilder()
                resetNav()

                userInSession.isLoggedIn = false
                userInSession.id = ''
                userInSession.bio = ''
                userInSession.favorites = ''
                userInSession.ownDecks = ''

                const res = await axios.get(`${BASE_URL}/logout`)

                content.id = 'home'
                content.style.backgroundImage = 'url(/static/images/home.png)'

                logoHolder.classList.remove('logo-holder-active')
                logoHolder.style.backgroundColor = 'rgba(0, 0, 0, .5);'

            })
        }
        content.classList.add('blur')
        nav.style.left = '0'
        logoHolder.style.left = '76px'
        content.style.marginLeft = '50vw'
    } else {
        resetNav()
    }
})

// Helper functions

function resetDeckBuilder() {
    userInSession.deckBuilder.format = ''
    userInSession.deckBuilder.playerClass = ''
    userInSession.deckBuilder.deckArr = []
    userInSession.deckBuilder.tableArr = []
}

function resetContent() {
    body.style.backgroundImage = `url(/static/images/paper-background.jpeg)`
    content.style.backgroundImage = 'none'
    content.innerHTML = ''
    try {
        document.querySelector('#deck-desc').remove()
    } catch (error) {
        console.log('Nothing to remove')
    }
}

function resetNav() {
    content.classList.remove('blur')
    nav.style.left = '-9999px'
    content.style.marginLeft = '0'
    nav.innerHTML = ''
    logoHolder.style.left = '50px'
}

content.id = 'home'

const addShake = setInterval(() => {
    hsLogo.classList.add('shake-horizontal')
}, 1000);

const removeShake = setInterval(() => {
    hsLogo.classList.remove('shake-horizontal')
}, 2700);