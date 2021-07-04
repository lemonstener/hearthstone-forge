// ***************************************************
// Create a menu displaying all card sets.
// When clicking on a panel request the appropriate cards from the server and append to the page.
// Change the way the background looks based on which set the user is browsing.
// Clicking on a card showcases the card.
// Clicking on the back button resets everything and returns the user back to the menu.
// ***************************************************

function allSets() {
    resetDeckBuilder()
    resetContent()
    content.id = 'card-sets-panel'
    for (year of years) {
        const yearPanel = document.createElement('div')
        const title = document.createElement('div')
        const titleText = document.createElement('h1')
        const setHolder = document.createElement('div')
        setHolder.classList.add('set-holder')

        titleText.innerText = year.name
        titleText.style.textAlign = 'center'
        title.append(titleText)
        yearPanel.append(title)
        yearPanel.append(setHolder)

        for (s of year.sets) {
            const setPanel = document.createElement('div')
            setPanel.id = s.code
            setPanel.style.backgroundImage = `url(${s.wallpaper})`
            setPanel.classList.add('set-panel')

            const setLogo = document.createElement('div')
            setLogo.style.backgroundImage = `url(${s.imgSrc})`
            setLogo.classList.add('set-logo')

            setPanel.append(setLogo)
            setHolder.append(setPanel)

            setPanel.addEventListener('click', getCardsBySet)
            setPanel.addEventListener('mouseover', brightnessUp)
            setPanel.addEventListener('mouseout', brightnessDown)
        }
        yearPanel.classList.add('year-panel')
        content.append(yearPanel)
    }
}

// A very subtle 'light up' effect on hover.

function brightnessUp() {
    this.style.filter = 'brightness(100%)'
}

function brightnessDown() {
    this.style.filter = 'brightness(90%)'
}

async function getCardsBySet() {
    const yearPanels = document.querySelectorAll('.year-panel')
    yearPanels.forEach(panel => {
        panel.style.opacity = '0'
        panel.remove()
    })

    const backButton = document.createElement('div')
    const setDesc = document.createElement('div')
    const setLogo = document.createElement('div')
    const setQuote = document.createElement('div')
    const setInfo = document.createElement('div')

    backButton.innerHTML = '<span id="back-set-button">&#10232;</span>'
    setDesc.id = 'showcase-set'
    setLogo.id = 'showcase-logo'
    setQuote.id = 'showcase-quote'
    setInfo.id = 'showcase-info'

    backButton.addEventListener('click', allSets)

    setLogo.style.backgroundImage = `url(${sets[this.id].imgSrc})`
    setQuote.innerText = sets[this.id].info.subtitle
    setInfo.innerText = sets[this.id].info.info

    setDesc.append(backButton, setLogo, setQuote, setInfo)
    body.style.backgroundImage = `url(${sets[this.id].wallpaper})`
    content.append(setDesc)

    const res = await axios.get(`${BASE_URL}/api/cards/${this.id}`)
    displaySetCards(res.data)
}

function displaySetCards(data) {
    const showcaseCards = document.createElement('div')
    showcaseCards.id = 'showcase-cards'
    content.append(showcaseCards)
    for (el of data) {
        const card = createCardElement(el)
        card.removeEventListener('click', handleCard)
        card.addEventListener('click', showcaseCard)
        showcaseCards.append(card)
    }
}