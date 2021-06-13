// Format and class picker functions

const panels = document.querySelectorAll('.format-panel')
const portraits = document.querySelectorAll('.class-portrait')
const classPanel = document.querySelector('#class-panel')
const className = document.querySelector('#class-name')
const classQuote = document.querySelector('#class-quote')

panels.forEach(panel => {
    panel.addEventListener('mouseover', (e) => {
        activate(panel)
    })
    panel.addEventListener('mouseout', (e) => {
        deactivate(panel)
    })
})

function activate(panel) {
    panel.children[0].style.visibility = 'visible'
    panel.children[0].style.opacity = '1';
    panel.children[2].style.visibility = 'visible'
    panel.children[2].style.opacity = '1';
    panel.classList.add('active');
    panel.classList.remove('grayscale')
}

function deactivate(panel) {
    panel.classList.remove('active');
    panel.classList.add('grayscale')
    panel.children[0].style.visibility = 'hidden'
    panel.children[0].style.opacity = '0';
    panel.children[2].style.visibility = 'hidden'
    panel.children[2].style.opacity = '0';
}

portraits.forEach(portrait => {
    portrait.addEventListener('mouseover', (e) => {
        e.target.classList.remove('grayscale');
        changeImg(e.target.id)
    })
    portrait.addEventListener('mouseout', (e) => {
        e.target.classList.add('grayscale');
    })
})

function changeImg(id) {
    const el = document.querySelector(`#${id}`)
    const urlStr = id.substring(0, id.length - 2)
    classPanel.style.backgroundImage = `url(/static/images/classes/${urlStr}.jpeg)`
    className.innerText = el.getAttribute('data-name')
}