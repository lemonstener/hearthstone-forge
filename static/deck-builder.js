const setPicker = document.querySelector('#set-picker')
const cardPicker = document.querySelector('#card-picker')
const deckDisplay = document.querySelector('#deck-display')
const cardsInDeck = document.querySelector('#cards-in-deck')

const BASE_URL = 'http://127.0.0.1:5000/api'

async function getCardsByFormat(format, playerClass) {
    const res = await axios.get(`${BASE_URL}/cards/${format}/${playerClass}`);
    console.log(res.data.n)
    console.log(res.data.c)
    const classCards = res.data.c
    const neutralCards = res.data.n

    for (card of classCards) {
        cardPicker.append(createCardElement(card))
    }
    for (card of neutralCards) {
        cardPicker.append(createCardElement(card))
    }
}

function createCardElement(card) {
    const div = document.createElement('div')
    div.classList.add('card')
    div.style.backgroundImage = `url(${card.img})`
    div.setAttribute('id', card.id)
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

    div.addEventListener('click', handleCard)

    return div
}

const deckArr = []

function handleCard(e) {
    const index = parseInt(e.target.getAttribute('id'))
    const cardRarity = e.target.getAttribute('rarity')
    const data = findInDeck(index, cardRarity)
    if (data.permission && deckArr.length !== 30) {
        deckArr.push(index)

        if (data.count === 1 && cardRarity !== 'lgnd') {
            const row = document.querySelector(`[t-id='${index}']`)
            const tdSymbol = document.createElement('td')
            tdSymbol.innerText = 'x2'
            tdSymbol.style.textAlign = 'center'
            tdSymbol.style.color = 'gold'
            row.append(tdSymbol)
            console.log(row)
            return
        }

        const cardName = e.target.getAttribute('name')

        const cardSet = e.target.getAttribute('cardset')

        const trCard = document.createElement('tr')
        const tdLogo = document.createElement('td')
        const tdName = document.createElement('td')

        tdName.innerText = cardName
        tdName.style.color = `${rarity[cardRarity].color}`
        trCard.setAttribute('t-id', index)
        trCard.addEventListener('click', removeCard)

        tdLogo.style.backgroundImage = `url(${sets[cardSet].imgSrc})`
        tdLogo.classList.add('logo')

        if (cardRarity === 'lgnd') {
            const tdSymbol = document.createElement('td')
            tdSymbol.innerHTML = '<span>&#9733;</span>'
            tdSymbol.style.textAlign = 'center'
            tdSymbol.style.color = 'gold'
            trCard.append(tdLogo)
            trCard.append(tdName)
            trCard.append(tdSymbol)
            cardsInDeck.append(trCard)
            return
        }

        trCard.append(tdLogo)
        trCard.append(tdName)
        cardsInDeck.append(trCard)
    }
}

function findInDeck(index, rarity) {
    console.log(index, rarity)
    const data = {
        count: 0,
        permission: true
    }


    for (num of deckArr) {
        if (index === num) {
            data.count++
                if (rarity === 'lgnd') {
                    data.permission = false
                } else
            if (data.count > 1) {
                data.permission = false
            }
        }
    }

    const card = document.querySelector(`[id='${index}']`)

    if (rarity === 'lgnd' || data.count === 1) {
        card.classList.add('grayscale')
    }
    return data
}

function removeCard(e) {

    console.log(e.target)

}


getCardsByFormat('standard', 'warrior')