// Here we create the filter for the cards as well as any related functions.

const filterPanel = document.querySelector('#filter-panel')
const filterIcon = document.querySelector('#filter-icon')
const backFromFilter = document.querySelector('#back-filter-button')
const setFilter = document.querySelector('#cardset')
const costFilter = document.querySelector('#cost')
const typeFilter = document.querySelector('#type')
const rarityFilter = document.querySelector('#rarity')

filterIcon.addEventListener('click', function() {
    this.style.left = '-40vw'
    filterPanel.style.left = '0'
})

backFromFilter.addEventListener('click', function() {
    filterPanel.style.left = '-40vw'
    filterIcon.style.left = '0'
})

function createFilters(format) {
    // Card set filters
    for (cardSet of formats[format].sets) {
        const checkBox = document.createElement('input')
        const label = document.createElement('label')
        const br = document.createElement('br')

        checkBox.setAttribute('type', 'checkbox')
        checkBox.setAttribute('checked', true)
        checkBox.id = cardSet.code

        label.htmlFor = checkBox.id
        label.append(checkBox)
        label.innerText = cardSet.name

        setFilter.append(label)
        setFilter.append(checkBox)
        setFilter.append(br)
    }
    // Cost filters
    for (let i = 0; i <= 10; i++) {
        const checkBox = document.createElement('input')
        const label = document.createElement('label')
        const br = document.createElement('br')

        checkBox.id = `${i}`
        checkBox.setAttribute('type', 'checkbox')
        checkBox.setAttribute('checked', true)

        label.htmlFor = checkBox.id
        label.append(checkBox)
        label.innerText = `${i}`

        costFilter.append(label)
        costFilter.append(checkBox)
        costFilter.append(br)
        if (i === 10) {
            checkBox.id = '10+'
            label.innerText = '10+'
        }
    }
    // Rarity filters
    for (r in rarity) {
        const checkBox = document.createElement('input')
        const label = document.createElement('label')
        const br = document.createElement('br')

        checkBox.id = rarity[r].code
        checkBox.setAttribute('type', 'checkbox')
        checkBox.setAttribute('checked', true)

        label.htmlFor = checkBox.id
        label.append(checkBox)
        label.innerText = rarity[r].name

        rarityFilter.append(label)
        rarityFilter.append(checkBox)
        rarityFilter.append(br)
    }

    for (type in cardTypes) {
        const checkBox = document.createElement('input')
        const label = document.createElement('label')
        const br = document.createElement('br')

        checkBox.id = `${cardTypes[type].code}`
        checkBox.setAttribute('type', 'checkbox')
        checkBox.setAttribute('checked', true)

        label.htmlFor = checkBox.id
        label.append(checkBox)
        label.innerText = cardTypes[type].name

        typeFilter.append(label)
        typeFilter.append(checkBox)
        typeFilter.append(br)
    }
    const togglers = document.querySelectorAll('.toggle-filter')
    const labels = document.querySelectorAll('label')
    togglers.forEach(toggle => {
        toggle.addEventListener('click', reveal)
    })

    const checkboxes = document.querySelectorAll('input[type=checkbox]')

    checkboxes.forEach(checkBox => {
        checkBox.addEventListener('change', checkUncheck)
    })

}

function reveal() {
    this.removeEventListener('click', reveal)
    this.addEventListener('click', hide)
    this.innerText = '▼'
    this.parentElement.lastElementChild.hidden = false
}

function hide() {
    this.removeEventListener('click', hide)
    this.addEventListener('click', reveal)
    this.innerText = '▲'
    this.parentElement.lastElementChild.hidden = true
}

function checkUncheck() {
    const dataType = this.parentElement.id
    const value = this.id
    if (this.checked === false) {
        if (value === '10+') {
            const tenCost = document.querySelectorAll(`[cost='10']`)
            const twelveCost = document.querySelectorAll(`[cost='12']`)
            const twentyFiveCost = document.querySelectorAll(`[cost='25']`)
            tenCost.forEach(card => {
                card.hidden = true
            })
            twelveCost.forEach(card => {
                card.hidden = true
            })
            twentyFiveCost.forEach(card => {
                card.hidden = true
            })
            return
        }
        const cards = document.querySelectorAll(`[${dataType}='${value}']`)
        cards.forEach(card => {
            card.hidden = true
        })
        return
    } else {
        if (value === '10+') {
            const tenCost = document.querySelectorAll(`[cost='10']`)
            const twelveCost = document.querySelectorAll(`[cost='12']`)
            const twentyFiveCost = document.querySelectorAll(`[cost='25']`)
            tenCost.forEach(card => {
                card.hidden = false
            })
            twelveCost.forEach(card => {
                card.hidden = false
            })
            twentyFiveCost.forEach(card => {
                card.hidden = false
            })
            return
        }
        const cards = document.querySelectorAll(`[${dataType}='${value}']`)
        cards.forEach(card => {
            card.hidden = false
        })
        return
    }
}