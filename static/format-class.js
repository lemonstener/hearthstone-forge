// ***************************************************
// Format and class picker functions.
// Selections are stored in the userInSession variable and then used 
// to get the appropriate data from the server.
// ***************************************************

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

    // Timeout added for a fade-out transition.

    setTimeout(() => {
        content.innerHTML = ''
        content.id = 'class-picker'

        const row1 = document.createElement('div')
        const row2 = document.createElement('div')
        const row3 = document.createElement('div')

        const ph1 = document.createElement('div')
        const ph2 = document.createElement('div')
        const ph3 = document.createElement('div')
        const ph4 = document.createElement('div')
        const ph5 = document.createElement('div')
        const ph6 = document.createElement('div')
        const ph7 = document.createElement('div')
        const ph8 = document.createElement('div')
        const ph9 = document.createElement('div')
        const ph10 = document.createElement('div')

        const phs = [ph1, ph2, ph3, ph4, ph5, ph6, ph7, ph8, ph9, ph10]
        phs.forEach(panel => {
            panel.classList.add('portrait-holder')
        })

        const dru = document.createElement('div')
        const hun = document.createElement('div')
        const mag = document.createElement('div')
        const pal = document.createElement('div')
        const pst = document.createElement('div')
        const rog = document.createElement('div')
        const shm = document.createElement('div')
        const wal = document.createElement('div')
        const war = document.createElement('div')
        const dhn = document.createElement('div')

        const portraits = [dhn, dru, hun, mag, pal, pst, rog, shm, wal, war]

        dru.id = 'dru-p'
        dru.classList.add('class-portrait')
        dru.classList.add('grayscale')
        ph1.append(dru)

        hun.id = 'hun-p'
        hun.classList.add('class-portrait')
        hun.classList.add('grayscale')
        ph2.append(hun)

        mag.id = 'mag-p'
        mag.classList.add('class-portrait')
        mag.classList.add('grayscale')
        ph3.append(mag)

        pal.id = 'pal-p'
        pal.classList.add('class-portrait')
        pal.classList.add('grayscale')
        ph4.append(pal)

        pst.id = 'pst-p'
        pst.classList.add('class-portrait')
        pst.classList.add('grayscale')
        ph5.append(pst)

        rog.id = 'rog-p'
        rog.classList.add('class-portrait')
        rog.classList.add('grayscale')
        ph6.append(rog)

        shm.id = 'shm-p'
        shm.classList.add('class-portrait')
        shm.classList.add('grayscale')
        ph7.append(shm)

        wal.id = 'wal-p'
        wal.classList.add('class-portrait')
        wal.classList.add('grayscale')
        ph8.append(wal)

        war.id = 'war-p'
        war.classList.add('class-portrait')
        war.classList.add('grayscale')
        ph9.append(war)

        dhn.id = 'dhn-p'
        dhn.classList.add('class-portrait')
        dhn.classList.add('grayscale')
        ph10.append(dhn)

        row1.append(ph10, ph1, ph2)
        row2.append(ph3, ph4, ph5, ph6)
        row3.append(ph7, ph8, ph9)

        portraits.forEach(portrait => {
            portrait.addEventListener('mouseover', removeGrayscale)
            portrait.addEventListener('mouseout', addGrayscale)
                // Code logic continues in deck-builder.js
            portrait.addEventListener('click', selectClass)
        })

        // The Demon Hunter class is not allowed in Classic Mode.

        if (userInSession.deckBuilder.format === 'classic') {
            const mark = document.createElement('div')
            mark.classList.add('mark')
            ph10.append(mark)
            dhn.removeEventListener('mouseover', removeGrayscale)
            dhn.removeEventListener('mouseout', addGrayscale)
            dhn.removeEventListener('click', selectClass)
            ph10.style.cursor = 'mouse'
        }

        content.append(row1, row2, row3)
    }, 500);
}

function addGrayscale() {
    this.classList.add('grayscale');
}

function removeGrayscale() {
    this.classList.remove('grayscale');
}

function selectClass() {
    const portraits = document.querySelectorAll('.class-portrait')
    portraits.forEach(portrait => {
        portrait.removeEventListener('mouseover', removeGrayscale)
        portrait.removeEventListener('mouseout', addGrayscale)
        portrait.removeEventListener('click', selectClass)
    })
    this.classList.remove('grayscale')
    userInSession.deckBuilder.playerClass = this.id.substring(0, this.id.length - 2)
    prepareDeckBuilder()
}