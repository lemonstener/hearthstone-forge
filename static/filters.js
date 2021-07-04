// ***************************************************
// Filters.
// ***************************************************

// Keep track of what is currently filtered.
const activeFilters = {
    cardset: [],
    cost: [],
    type: [],
    rarity: [],
    attack: [],
    health: []
}

// ***************************************************
// Filter options are created dynamically based on where in the menu the user has moused over.
// ***************************************************

function createFilters(id) {
    const filterDisplay = document.querySelector('#filter-display')
    if (id === 'cardset') {
        filterDisplay.innerHTML = ''
        for (cardSet of formats[userInSession.deckBuilder.format].sets) {
            const div = document.createElement('div')

            div.style.border = '.1px solid black'
            div.style.padding = '2px'
            div.classList.add('filter')
            div.id = cardSet.code
            div.innerText = cardSet.name

            filterDisplay.append(div)
        }
    } else if (id === 'cost' || id === 'attack' || id === 'health') {
        filterDisplay.innerHTML = ''
        for (let i = 0; i <= 10; i++) {
            const div = document.createElement('div')

            div.style.border = '.1px solid black'
            div.style.padding = '2px'
            div.classList.add('filter')

            div.id = `${i}`
            div.innerText = `${i}`

            filterDisplay.append(div)
            if (i === 10) {
                div.id = '10+'
                div.innerText = '10+'
            }
        }
    } else if (id === 'type') {
        filterDisplay.innerHTML = ''
        for (type in cardTypes) {
            const div = document.createElement('div')

            div.style.border = '.1px solid black'
            div.style.padding = '2px'
            div.classList.add('filter')

            div.id = `${cardTypes[type].code}`
            div.innerText = cardTypes[type].name

            filterDisplay.append(div)
        }
    } else if (id === 'rarity') {
        filterDisplay.innerHTML = ''
        for (r in rarity) {
            const div = document.createElement('div')

            div.style.border = '.1px solid black'
            div.style.padding = '2px'
            div.classList.add('filter')

            div.id = rarity[r].code
            div.innerText = rarity[r].name

            filterDisplay.append(div)
        }
    }

    const filters = document.querySelectorAll('.filter')

    filters.forEach(filter => {
        filter.addEventListener('click', applyRemove)
        filter.addEventListener('mouseover', hoverOverValue)
        filter.addEventListener('mouseout', hoverAwayValue)
        if (activeFilters[id].indexOf(`${filter.id}`) > -1) {
            filter.classList.add('scratched')
        }
    })
    filterDisplay.hidden = false
}

// Simple event listeners used for styling.

function hoverOverValue() {
    this.classList.add('hover-over-value')
}

function hoverAwayValue() {
    this.classList.remove('hover-over-value')
}

// Trigger the filter function with a click.

function applyRemove() {
    const dataType = currentFilterColumn
    const value = this.id

    if (!this.classList.contains('scratched')) {
        this.classList.add('scratched')

        if (value === '10+') {
            cards = document.querySelectorAll('.card:not(.row)')
            cards.forEach(card => {
                if (card.getAttribute(dataType) > 9) {
                    card.hidden = true
                }
            })
        } else {
            cards = document.querySelectorAll(`[${dataType}='${value}']:not(.row)`)
            cards.forEach(card => {
                card.hidden = true
            })
        }
        activeFilters[dataType].push(value)
        return
    } else {
        this.classList.remove('scratched')

        if (value === '10+') {
            cards = document.querySelectorAll('.card:not(.row)')
            cards.forEach(card => {
                if (card.getAttribute(dataType) > 9) {
                    card.hidden = false
                }
            })
        } else {
            cards = document.querySelectorAll(`[${dataType}='${value}']:not(.row)`)
            cards.forEach(card => {
                card.hidden = false
            })
        }
        const index = activeFilters[dataType]
        activeFilters[dataType].splice(index, 1)
        return
    }
}