const setPicker = document.querySelector('#set-picker')
const cardPicker = document.querySelector('#card-picker')
const deckDisplay = document.querySelector('#deck-display')

const BASE_URL = 'http://127.0.0.1:5000/api'

async function getCardsByFormat(format, playerClass) {
    const res = await axios.get(`${BASE_URL}/cards/${format}/${playerClass}`);
    console.log(res.data.n)
    console.log(res.data.c)
    const classCards = res.data.c
    const neutralCards = res.data.n

    for (card of classCards) {
        const div = document.createElement('div')
        div.classList.add('card')
        div.style.backgroundImage = `url(${card.img})`
        div.id = card.id
        cardPicker.append(div)
    }
    for (card of neutralCards) {
        const div = document.createElement('div')
        div.classList.add('card')
        div.style.backgroundImage = `url(${card.img})`
        div.id = card.id
        cardPicker.append(div)
    }
}

async function cardSet(cardSet) {
    const res = await axios.get(`${BASE_URL}/cards/${cardSet}`)
    console.log(res.data)
}