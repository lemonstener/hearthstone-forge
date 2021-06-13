// Here we create the filter for the cards as well as any related functions.
const filterDashboard = document.querySelector('#filter-dashboard')
const filterPanel = document.querySelector('#filter-panel')
const filterDisplay = document.querySelector('#filter-display')
const filterIcon = document.querySelector('#filter-icon')
const backFromFilter = document.querySelector('#back-filter-button')

let currentFilterColumn
const activeFilters = {
    cardset: [],
    cost: [],
    type: [],
    rarity: [],
    attack: [],
    health: []
}

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

function createFilters(id) {
    if (id === 'cardset') {
        // format = userInSession.format
        format = 'wild'
        filterDisplay.innerHTML = ''
        for (cardSet of formats[format].sets) {
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

function hoverOverValue() {
    this.classList.add('hover-over-value')
}

function hoverAwayValue() {
    this.classList.remove('hover-over-value')
}

function applyRemove() {
    const dataType = currentFilterColumn
    const value = this.id

    if (!this.classList.contains('scratched')) {
        this.classList.add('scratched')

        if (value === '10+') {
            cards = document.querySelectorAll('.card')
            cards.forEach(card => {
                if (card.getAttribute(dataType) > 9) {
                    card.hidden = true
                }
            })
        } else {
            cards = document.querySelectorAll(`[${dataType}='${value}']`)
            cards.forEach(card => {
                card.hidden = true
            })
        }
        activeFilters[dataType].push(value)
        return
    } else {
        this.classList.remove('scratched')

        if (value === '10+') {
            cards = document.querySelectorAll('.card')
            cards.forEach(card => {
                if (card.getAttribute(dataType) > 9) {
                    card.hidden = false
                }
            })
        } else {
            cards = document.querySelectorAll(`[${dataType}='${value}']`)
            cards.forEach(card => {
                card.hidden = false
            })
        }
        const index = activeFilters[dataType]
        activeFilters[dataType].splice(index, 1)
        return
    }
}