// Format and class picker functions

function createFormatPanels() {
    resetDeckBuilder()
    resetContent()
    content.id = 'format-picker'
    const standard = document.createElement('div')

    standard.id = 'standard-w'
    standard.classList.add('format-panel')
    standard.classList.add('grayscale')

    const standardTitleHolder = document.createElement('div')
    standardTitleHolder.classList.add('format-title')
    const standardTitle = document.createElement('h2')
    standardTitle.innerText = 'Standard'
    standardTitleHolder.append(standardTitle)

    const standardLogoHolder = document.createElement('div')
    standardLogoHolder.id = 'standard'
    standardLogoHolder.style.backgroundImage = 'url(/static/images/formats/standard.png)'
    standardLogoHolder.classList.add('format-logo')

    standard.append(standardTitleHolder, standardLogoHolder)
    content.append(standard)


    const wild = document.createElement('div')

    wild.id = 'wild-w'
    wild.classList.add('format-panel')
    wild.classList.add('grayscale')

    const wildTitleHolder = document.createElement('div')
    wildTitleHolder.classList.add('format-title')
    const wildTitle = document.createElement('h1')
    wildTitle.innerText = 'Wild'
    wildTitleHolder.append(wildTitle)

    const wildLogoHolder = document.createElement('div')
    wildLogoHolder.id = 'wild'
    wildLogoHolder.style.backgroundImage = 'url(/static/images/formats/wild.png)'
    wildLogoHolder.classList.add('format-logo')

    wild.append(wildTitleHolder, wildLogoHolder)
    content.append(wild)


    const classic = document.createElement('div')

    classic.id = 'classic-w'
    classic.classList.add('format-panel')
    classic.classList.add('grayscale')

    const classicTitleHolder = document.createElement('div')
    classicTitleHolder.classList.add('format-title')
    const classicTitle = document.createElement('h1')
    classicTitle.innerText = 'Classic'
    classicTitleHolder.append(classicTitle)

    const classicLogoHolder = document.createElement('div')
    classicLogoHolder.id = 'classic'
    classicLogoHolder.style.backgroundImage = 'url(/static/images/formats/classic.png)'
    classicLogoHolder.classList.add('format-logo')

    classic.append(classicTitleHolder, classicLogoHolder)
    content.append(classic)

    const panels = document.querySelectorAll('.format-panel')
    panels.forEach(panel => {
        panel.addEventListener('mouseover', () => {
            activate(panel)
        })
        panel.addEventListener('mouseout', () => {
            deactivate(panel)
        })
    })

    const logos = document.querySelectorAll('.format-logo')
    logos.forEach(logo => {
        logo.addEventListener('click', selectFormat)
    })

    content.style.opacity = '1'
    content.style.top = '0'
}

function activate(panel) {
    panel.children[0].style.visibility = 'visible'
    panel.children[0].style.opacity = '1';
    panel.classList.add('active');
    panel.classList.remove('grayscale')
}

function deactivate(panel) {
    panel.classList.remove('active');
    panel.classList.add('grayscale')
    panel.children[0].style.visibility = 'hidden'
    panel.children[0].style.opacity = '0';
}

function selectFormat() {
    userInSession.deckBuilder.format = this.id
    content.classList.add('fade-out')

    setTimeout(() => {
        content.id = 'class-panel'
        content.innerHTML = `
    <div id="push-down">
            <div id='class-name'></div>
        </div>
        <div id="class-picker">
            <div class="portrait-holder">
                <div id="dhn-p" class="class-portrait grayscale" data-name="Demon Hunter"></div>
            </div>
            <div class="portrait-holder">
                <div id="dru-p" class="class-portrait grayscale" data-name="Druid"></div>
            </div>
            <div class="portrait-holder">
                <div id="hun-p" class="class-portrait grayscale" data-name="Hunter"></div>
            </div>
            <div class="portrait-holder">
                <div id="mag-p" class="class-portrait grayscale" data-name="Mage"></div>
            </div>
            <div class="portrait-holder">
                <div id="pal-p" class="class-portrait grayscale" data-name="Paladin"></div>
            </div>
            <div class="portrait-holder">
                <div id="pst-p" class="class-portrait grayscale" data-name="Priest"></div>
            </div>
            <div class="portrait-holder">
                <div id="rog-p" class="class-portrait grayscale" data-name="Rogue"></div>
            </div>
            <div class="portrait-holder">
                <div id="shm-p" class="class-portrait grayscale" data-name="Shaman"></div>
            </div>
            <div class="portrait-holder">
                <div id="wal-p" class="class-portrait grayscale" data-name="Warlock"></div>
            </div>
            <div class="portrait-holder">
                <div id="war-p" class="class-portrait grayscale" data-name="Warrior"></div>
            </div>
        </div>
    `
        if (userInSession.deckBuilder.format === 'classic') {
            document.querySelector('#class-picker').firstElementChild.remove()
        }
        const portraits = document.querySelectorAll('.class-portrait')
        const className = document.querySelector('#class-name')

        portraits.forEach(portrait => {
            portrait.addEventListener('mouseover', (e) => {
                e.target.classList.remove('grayscale');
                changeImg(e.target.id)
            })
            portrait.addEventListener('mouseout', (e) => {
                    e.target.classList.add('grayscale');
                })
                // Code logic continues in deck-builder.js
            portrait.addEventListener('click', prepareDeckBuilder)
        })

        function changeImg(id) {
            const el = document.querySelector(`#${id}`)
            const urlStr = id.substring(0, id.length - 2)
            content.style.backgroundImage = `url(${classes[urlStr].figure})`
            className.innerText = el.getAttribute('data-name')
        }
        content.classList.remove('fade-out')
    }, 500);

}