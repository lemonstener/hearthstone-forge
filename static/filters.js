// Here we create the filter for the cards as well as any related functions.
const filterDashboard = document.querySelector('#filter-dashboard')
const filterPanel = document.querySelector('#filter-panel')
const filterDisplay = document.querySelector('#filter-display')
const filterIcon = document.querySelector('#filter-icon')
const backFromFilter = document.querySelector('#back-filter-button')

const format = 'wild'
const activeSets = []
let currentFilterColumn
const activeFilters = []

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
    toggle.addEventListener('click', hide)
})

function reveal() {
    createFilters(this.id)
    currentFilterColumn = this.id
}

function hide() {
    filterDisplay.innerHTML = ''
    filterDisplay.hidden = true
}

function createFilters(id) {
    if (id === 'cardset') {
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
    } else if (id === 'cost') {
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
        filter.addEventListener('mouseover', hoverOver)
        filter.addEventListener('mouseout', hoverAway)
    })
    filterDisplay.hidden = false

    for (f in activeFilters) {
        console.log(f)
    }
}

function hoverOver() {
    this.classList.add('hover-over')
}

function hoverAway() {
    this.classList.remove('hover-over')
}

function applyRemove() {
    const dataType = currentFilterColumn
    const value = this.id

    const parameter = `[${dataType} = '${value}']`

    if (activeFilters.indexOf(parameter) === -1) {
        if (dataType === 'cardset') {
            activeSets.push(parameter)
        } else {
            activeFilters.push(parameter)
        }

        const element = document.getElementById(value)
        element.style.backgroundColor = 'black'
        element.style.color = 'white'
        element.innerText = element.innerText + ' ✓'

        const hiddenCards = document.querySelectorAll('.card')
        hiddenCards.forEach(card => {
            card.hidden = true
        })

        if (activeSets.length > 0) {
            for (s of activeSets) {
                console.log(s)
                const visibleCards = document.querySelectorAll(s, `${activeFilters.join('')}`)
                visibleCards.forEach(card => {
                    card.hidden = false
                })
            }
        } else {
            const visibleCards = document.querySelectorAll(`${activeFilters.join('')}`)
            visibleCards.forEach(card => {
                card.hidden = false
            })
        }
    }
}