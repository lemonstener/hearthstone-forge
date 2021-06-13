const dashboard = document.querySelector('#dashboard')
const showcase = document.querySelector('#showcase')
const cardPicker = document.querySelector('#card-picker')
const deckDisplay = document.querySelector('#deck-display')
const cardsInDeck = document.querySelector('#cards-in-deck')
const cardCounter = document.querySelector('#card-counter')
const deckIcon = document.querySelector('#deck-icon')
const backFromDeck = document.querySelector('#back-deck-button')
const deckHolder = document.querySelector('#deck-holder')
const button = document.querySelector('#forge-button')

const BASE_URL = 'http://127.0.0.1:5000/api'

// Get all viable cards from the API.

deckIcon.addEventListener('click', function() {
    deckHolder.style.right = '-40vw'
    deckDisplay.style.right = '0'
})
backFromDeck.addEventListener('click', function() {
    deckDisplay.style.right = '-40vw'
    deckHolder.style.right = '0'
})

async function getCardsByFormat(format, playerClass) {
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

    return div
}

function showInfoIcon(e) {
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
    const card = this.parentElement
    showcase.hidden = false
    showcase.style.top = '0'

    const img = document.createElement('img')
    img.src = card.getAttribute('img')
    img.style.width = '190px'
    img.style.height = '250px'

    const info = document.createElement('div')
    info.style.width = '300px'

    const cardName = document.createElement('h3')
    const cardFlavor = document.createElement('p')
    const cardText = document.createElement('p')

    cardName.innerText = card.getAttribute('name')
    cardFlavor.innerHTML = `<i>${card.getAttribute('flavor')}</i>`
    cardText.innerText = card.getAttribute('text')

    const list = document.createElement('ul')
    const cardType = document.createElement('li')
    const cardRarity = document.createElement('li')
    const cardSet = document.createElement('li')
    const cardClass = document.createElement('li')
    const cardCost = document.createElement('li')
    const cardArtist = document.createElement('li')

    cardType.innerText = 'Type: ' + cardTypes[card.getAttribute('type')].name
    cardRarity.innerText = 'Rarity: ' + rarity[card.getAttribute('rarity')].name
    cardSet.innerText = 'Set: ' + sets[card.getAttribute('cardset')].name
    cardClass.innerText = 'Class: ' + `${classes[card.getAttribute('playerclass')].name}`
    cardCost.innerText = 'Cost to craft: ' + `${rarity[card.getAttribute('rarity')].cost}`
    cardArtist.innerText = 'Artist: ' + card.getAttribute('artist')

    list.append(cardType)
    list.append(cardRarity)
    list.append(cardSet)
    list.append(cardClass)
    list.append(cardCost)
    list.append(cardArtist)

    info.append(cardName)
    info.append(cardFlavor)
    info.append(cardText)
    info.append(list)

    showcase.append(img)
    showcase.append(info)

}

// deckArr keeps track of the length of the deck. Maximum of 30 cards allowed.

// tableArr keeps track of how many rows are in the table and
// helps keeping it organized.

const deckArr = []
const tableArr = []

// Maximum of 2 copies of a card per deck.
// Copies of legendary cards are limited to 1.
// We gray out cards that have reached the limit for better user experience.

function handleCard(e) {
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
    const tr = e.target.parentElement
    const cardId = tr.id.substr(2)
    const card = document.querySelector(`[c-id='${cardId}']`)
    const childrenCount = e.target.parentElement.childElementCount

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
    const index = deckArr.indexOf(e.target.parentElement.id)
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

getCardsByFormat('wild', 'warrior')