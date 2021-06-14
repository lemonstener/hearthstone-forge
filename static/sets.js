const cardSetPanel = document.querySelector('#card-sets-panel')

allSets()

function allSets() {
    for (year of years) {
        const yearPanel = document.createElement('div')
        const title = document.createElement('div')
        const titleText = document.createElement('h2')
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
        cardSetPanel.append(yearPanel)
    }
}

function brightnessUp() {
    this.style.filter = 'brightness(100%)'
}

function brightnessDown() {
    this.style.filter = 'brightness(85%)'
}

async function getCardsBySet() {
    const res = await axios.get(`${BASE_URL}/cards/${this.id}`)
    displaySet(res.data)
}

function displaySet(data) {
    const yearPanels = document.querySelectorAll('.year-panel')
    yearPanels.forEach(panel => {
        panel.style.opacity = '0'
    })
    console.log(data)
}