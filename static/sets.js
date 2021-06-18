function allSets() {
    body.style.backgroundImage = `url(/static/images/paper-background.jpeg)`
    content.style.backgroundImage = 'none'
    content.innerHTML = ''
    content.id = 'card-sets-panel'
    body.style.backgroundImage = `url(/static/images/paper-background.jpeg)`
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
        card.lastElementChild.remove()
        card.removeEventListener('click', handleCard)
        card.removeEventListener('mouseover', showInfoIcon)
        card.removeEventListener('mouseout', hideInfoIcon)
        card.addEventListener('click', showcaseCard)
        showcaseCards.append(card)
    }
}

function createTiltingCard(card) {
    const tiltBoxWrap = document.createElement('div')
    tiltBoxWrap.classList.add('tilt-box-wrap')

    tiltBoxWrap.setAttribute('name', card.name)
    tiltBoxWrap.setAttribute('flavor', card.flavor)
    tiltBoxWrap.setAttribute('type', card.type)
    tiltBoxWrap.setAttribute('rarity', card.rarity)
    tiltBoxWrap.setAttribute('cardset', card.card_set)
    tiltBoxWrap.setAttribute('playerclass', card.player_class)
    tiltBoxWrap.setAttribute('artist', card.artist)
    tiltBoxWrap.setAttribute('howtoget', card.how_to_get)

    tiltBoxWrap.innerHTML = `
    <span class="t_over"></span>
    <span class="t_over"></span>
    <span class="t_over"></span>
    <span class="t_over"></span>
    <span class="t_over"></span>
    <span class="t_over"></span>
    <span class="t_over"></span>
    <span class="t_over"></span>
    <span class="t_over"></span>
    `

    tiltBoxWrap.addEventListener('click', showcaseTiltedCard)

    const tiltBox = document.createElement('div')
    tiltBox.classList.add('tilt-box')
    tiltBox.style.backgroundImage = `url(${card.img})`

    tiltBoxWrap.append(tiltBox)
    return tiltBoxWrap
}

function showcaseTiltedCard() {
    const card = this.cloneNode(true)

    showcase.hidden = false
    showcase.style.top = '0'

    showcase.append(card)

    const info = document.createElement('div')
    info.style.width = '300px'

    const cardName = document.createElement('h3')
    const cardFlavor = document.createElement('p')

    cardName.innerText = card.getAttribute('name')
    cardFlavor.innerHTML = `<i>${card.getAttribute('flavor')}</i>`
    cardFlavor.style.color = 'gray'

    const list = document.createElement('ul')
    const cardType = document.createElement('li')
    const cardRarity = document.createElement('li')
    const cardSet = document.createElement('li')
    const cardClass = document.createElement('li')
    const cardCost = document.createElement('li')
    const cardArtist = document.createElement('li')

    cardType.innerHTML = '<span class="showcase-category">Type: </span>' + cardTypes[card.getAttribute('type')].name
    cardRarity.innerHTML = '<span class="showcase-category">Rarity: </span>' + rarity[card.getAttribute('rarity')].name
    cardSet.innerHTML = '<span class="showcase-category">Set: </span>' + sets[card.getAttribute('cardset')].name
    cardCost.innerHTML = '<span class="showcase-category">Cost to craft: </span>' + `${rarity[card.getAttribute('rarity')].cost}`
    cardArtist.innerHTML = '<span class="showcase-category">Artist: </span>' + card.getAttribute('artist')

    if (card.getAttribute('playerclass').indexOf(',') > -1) {
        let str = ''
        for (c of card.getAttribute('playerclass').split(',')) {
            str += `${classes[c].name}` + ', '
        }
        cardClass.innerHTML = '<span class="showcase-category">Class: </span>' + str.substring(0, str.length - 2)
    } else {
        cardClass.innerHTML = '<span class="showcase-category">Class: </span>' + classes[card.getAttribute('playerclass')].name
    }

    list.append(cardType)
    list.append(cardRarity)
    list.append(cardSet)
    list.append(cardClass)
    list.append(cardCost)
    list.append(cardArtist)
    list.style.textAlign = 'left'
    if (card.getAttribute('howtoget') !== 'null') {
        const howToGet = document.createElement('li')
        howToGet.innerHTML = '<span class="showcase-category">How to Get: </span>' + card.getAttribute('howtoget')
        list.append(howToGet)
    }

    info.append(cardName)
    info.append(cardFlavor)
    info.append(list)

    showcase.append(info)

    showcase.addEventListener('click', function() {
        this.hidden = true
        this.style.top = '-9999px'
        this.innerHTML = ''
    })
}