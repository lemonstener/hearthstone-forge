// deckArr keeps track of the length of the deck. Maximum of 30 cards allowed.

// tableArr keeps track of how many rows are in the table and
// helps keeping it organized.
const content = document.querySelector('.content')
const deckArr = []
const tableArr = []
const formatToPull = 'wild'
const classToPull = 'hunter'

function prepareDeckBuilder() {
    content.classList.add('fade-out')
    setTimeout(() => {
        content.id = 'dashboard'
        content.style.backgroundImage = 'none'
        content.innerHTML = `
        <div id="filter-dashboard">
            <div id="filter-panel">
                <div><span id="back-filter-button">&#10232;</span><br></div>
                <div id="cardset" class="toggle-filter">Sets<br></div>
                <div id='type' class="toggle-filter">Type<br></div>
                <div id='rarity' class="toggle-filter">Rarity<br></div>
                <div id="cost" class="toggle-filter">Cost<br></div>
                <div id="attack" class="toggle-filter">Attack</div>
                <div id="health" class="toggle-filter">Health</div>
            </div>
            <div id="filter-display" hidden=true></div>
        </div>
        <div id="filter-icon"></div>
        <div id="card-picker"></div>
        <div id="deck-holder">
            <div id="deck-icon">
                <span id="card-counter">0</span>/30
            </div>
            <button id="forge-button" hidden=true>Forge!</button>
        </div>
        <div id="deck-display">
            <div><span id="back-deck-button">&#10233;</span></div>	
                
                <table>
                    <tbody id="cards-in-deck"></tbody>
                </table>
            </div>
        `
        const deckDisplay = document.querySelector('#deck-display')
        const deckIcon = document.querySelector('#deck-icon')
        const backFromDeck = document.querySelector('#back-deck-button')
        const deckHolder = document.querySelector('#deck-holder')

        const filterDashboard = document.querySelector('#filter-dashboard')
        const filterDisplay = document.querySelector('#filter-display')
        const filterIcon = document.querySelector('#filter-icon')
        const backFromFilter = document.querySelector('#back-filter-button')

        filterIcon.addEventListener('click', function() {
            this.style.left = '-40vw'
            filterDashboard.style.left = '0'
        })

        backFromFilter.addEventListener('click', function() {
            filterDashboard.style.left = '-40vw'
            filterIcon.style.left = '0'
            filterDisplay.innerHTML = ''
            filterDisplay.hidden = true
        })

        backFromFilter.addEventListener('mouseover', function() {
            filterDisplay.innerHTML = ''
            filterDisplay.hidden = true
        })

        const togglers = document.querySelectorAll('.toggle-filter')
        togglers.forEach(toggle => {
            toggle.addEventListener('mouseover', reveal)
            toggle.addEventListener('mouseout', hoverAwayCategory)
            toggle.addEventListener('click', hide)
        })

        function reveal() {
            this.classList.add('hover-over-category')
            createFilters(this.id)
            currentFilterColumn = this.id
        }

        function hoverAwayCategory() {
            this.classList.remove('hover-over-category')
        }

        function hide() {
            filterDisplay.innerHTML = ''
            filterDisplay.hidden = true
        }

        deckIcon.addEventListener('click', function() {
            deckHolder.style.right = '-40vw'
            deckDisplay.style.right = '0'
        })
        backFromDeck.addEventListener('click', function() {
            deckDisplay.style.right = '-40vw'
            deckHolder.style.right = '0'
        })

        getCardsByFormat(formatToPull, classToPull)
        content.classList.remove('fade-out')
    }, 500);
}
// Adding some event listeners to pre-existing elements.


// Get all viable cards from the API.

async function getCardsByFormat(format, playerClass) {
    const cardPicker = document.querySelector('#card-picker')
    const res = await axios.get(`${BASE_URL}/cards/${format}/${playerClass}`);
    const classCards = res.data.c
    const neutralCards = res.data.n

    for (card of classCards) {
        cardPicker.append(createCardElement(card))
    }
    for (card of neutralCards) {
        cardPicker.append(createCardElement(card))
    }
}



// Create the card elements, append to the page.

function createCardElement(card) {
    const div = document.createElement('div')

    div.setAttribute('data-tilt', '')
    div.setAttribute('data-tilt-scale', '1.1')
    div.setAttribute('data-tilt-speed', '400')
    div.setAttribute('data-tilt-easing', 'cubic-bezier(.03,.98,.52,.99)')
    div.setAttribute('data-tilt-max', '30')
    div.classList.add('card')
    div.setAttribute('playerclass', card.player_class)
    div.style.backgroundImage = `url(${card.img})`
    div.setAttribute('img', card.img)
    div.setAttribute('c-id', card.id)
    div.setAttribute('cost', card.cost)
    div.setAttribute('cardSet', card.card_set)
    div.setAttribute('name', card.name)
    div.setAttribute('flavor', card.flavor)
    div.setAttribute('howToGet', card.how_to_get)
    div.setAttribute('type', card.type)
    div.setAttribute('rarity', card.rarity)
    div.setAttribute('artist', card.artist)
    div.setAttribute('mechanics', card.mechanics)

    if (card.type === 'min') {
        div.setAttribute('attack', card.attack)
        div.setAttribute('health', card.health)
        div.setAttribute('minionType', card.minion_type)
    } else if (card.type === 'spl') {
        div.setAttribute('school', card.school)
    } else if (card.type === 'wpn') {
        div.setAttribute('attack', card.attack)
        div.setAttribute('durabillity', card.durability)
    } else {
        div.setAttribute('attack', card.attack)
        div.setAttribute('armor', card.armor)
        div.setAttribute('health', card.health)
    }

    const icon = document.createElement('div')
    icon.innerHTML = '<span>&#8505;</span>'
    icon.classList.add('info-icon')
    div.append(icon)

    icon.addEventListener('click', showcaseCard)

    div.addEventListener('click', handleCard)
    div.addEventListener('mouseover', showInfoIcon)
    div.addEventListener('mouseout', hideInfoIcon)

    VanillaTilt.init(div)

    return div
}

function showInfoIcon() {
    const icon = this.firstElementChild
    icon.style.visibility = 'visible'
    icon.style.opacity = '1'
}

function hideInfoIcon() {
    const icon = this.firstElementChild
    icon.style.visibility = 'hidden'
    icon.style.opacity = '0'
}

function showcaseCard() {
    let card
    if (this.classList.contains('card')) {
        card = this.cloneNode(true)
    } else {
        card = this.parentElement.cloneNode(true)
        card.lastElementChild.remove()
    }

    const showcase = document.createElement('div')
    showcase.id = 'showcase'

    VanillaTilt.init(card)

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

    showcase.append(card)
    showcase.append(info)
    content.append(showcase)

    showcase.addEventListener('click', function() {
        this.remove()

        // This part down here is to prevent an annoying bug from triggering.
        // Without this piece of code here, everytime you click the info button
        // a value of 'null' will get pushed into the two arrays which messes up
        // the flow. I've tried fixing the issues in multiple ways that should've worked
        // but for whatever reason it just keeps doing it. Will come back later with
        // a better solution that doesn't look so choppy.

        const deckIndex = deckArr.indexOf(null)
        deckArr.splice(deckIndex, 1)
        const tableIndex = tableArr.indexOf(null)
        tableArr.splice(tableIndex, 1)
    })
}

// Maximum of 2 copies of a card per deck.
// Copies of legendary cards are limited to 1.
// We gray out cards that have reached the limit for better user experience.

function handleCard(e) {
    const cardCounter = document.querySelector('#card-counter')
    const button = document.querySelector('#forge-button')
    const card = e.target
    const cardId = card.getAttribute('c-id')
    const cardRarity = card.getAttribute('rarity')
    const cardCost = card.getAttribute('cost')

    const permission = checkForPermission(cardId, cardRarity)
    if (!permission) {
        return
    }

    const duplicate = checkForDuplicate(cardId)

    if (duplicate) {
        deckArr.push(cardId)
        card.classList.add('grayscale')
        addDuplicateCardToDeck(cardId)
        cardCounter.innerText = parseInt(deckArr.length)
    } else {
        deckArr.push(cardId)
        tableArr.push(cardCost)
        tableArr.sort(function(a, b) {
            return a - b
        });
        addSingleCardToDeck(card)
        cardCounter.innerText = parseInt(deckArr.length)
    }

    // Gray out all cards if deck limit has been reached.

    if (deckArr.length === 30) {
        cards = document.querySelectorAll('.card')
        cards.forEach(card => {
            card.classList.add('grayscale-all')
        })
        button.hidden = false
    }
}

// If card does not exist in the deck, create a new row in the table.
// Rows display the card's cost and the card's name.
// Legendary cards get an extra 'star' symbol to indicate their rarity.

function addSingleCardToDeck(card) {
    const cardsInDeck = document.querySelector('#cards-in-deck')
    const cardId = card.getAttribute('c-id')
    const cost = card.getAttribute('cost')
    const index = tableArr.indexOf(cost || 0)
    const name = card.getAttribute('name')
    const cardRarity = card.getAttribute('rarity')

    const tr = cardsInDeck.insertRow(index)
    tr.id = `r-${cardId}`

    const tdCost = document.createElement('td')
    const tdName = document.createElement('td')
    const img = document.createElement('img')

    tdCost.innerText = cost
    tdCost.style.color = 'white'

    tdName.innerText = name
    tdName.style.color = `${rarity[cardRarity].color}`
    tdName.setAttribute('cost', cost)
    tdName.addEventListener('click', removeCard)


    img.src = card.getAttribute('img')
    img.classList.add('snap')
    tr.append(tdCost)
    tr.append(tdName)
    tr.append(img)
    if (cardRarity === 'lgnd') {
        card.classList.add('grayscale')
        const star = document.createElement('td')
        star.innerHTML = '<span>&#9733;</span>'
        star.style.textAlign = 'center'
        star.style.color = 'gold'
        tr.append(star)
    }
}

// If the card already exists in deck, simply add 'x2' next to it.

function addDuplicateCardToDeck(id) {
    const tr = document.getElementById(`r-${id}`)
    const symbol = document.createElement('td')

    symbol.innerText = 'x2'
    symbol.style.textAlign = 'center'
    symbol.style.color = 'gold'

    tr.append(symbol)
}

// Remove cards from the deck. 
// Style the table accordingly.
// Remove from tableArr and deckArr accordingly.
// If deck was full before card got removed all cards not currently in deck get their colors back.
// Cards which are still in the deck remain grayed out.

function removeCard(e) {
    const cardCounter = document.querySelector('#card-counter')
    const tr = this.parentElement
    const cardId = tr.id.substr(2)
    const card = document.querySelector(`[c-id='${cardId}']`)
    const childrenCount = tr.childElementCount

    if (childrenCount === 4) {
        if (tr.lastElementChild.innerText !== 'x2') {
            tr.remove()
            const rowToRemove = tableArr.indexOf(e.target.getAttribute('cost'))
            tableArr.splice(rowToRemove, 1)
        } else {
            tr.lastElementChild.remove()
        }
    } else {
        tr.remove()
        const rowToRemove = tableArr.indexOf(e.target.getAttribute('cost'))
        tableArr.splice(rowToRemove, 1)
    }
    const index = deckArr.indexOf(this.parentElement.id)
    deckArr.splice(index, 1)

    if (deckArr.length === 29) {
        cards = document.querySelectorAll('.card')
        cards.forEach(card => {
            card.classList.remove('grayscale-all')
        })
        button.hidden = true
    }

    card.classList.remove('grayscale')
    cardCounter.innerText = parseInt(deckArr.length)
}

// Function to determine whether a card can be added to the deck.

function checkForPermission(id, rarity) {
    if (deckArr.length === 30) {
        return false
    }
    let count = 0
    for (num of deckArr) {
        if (num === id) {
            count++;
            if (count === 1 && rarity === 'lgnd') {
                return false
            } else if (count === 2) {
                return false
            }
        }
    }
    return true
}

// Function to determine whether a card already exists in deck.
// Used for non-legendary cards.

function checkForDuplicate(id) {
    if (deckArr.indexOf(id) >= 0) {
        return true
    }
    return false
}