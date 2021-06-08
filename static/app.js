// Format and class picker functions

const panels = document.querySelectorAll('.format-panel')
const portraits = document.querySelectorAll('.class-portrait')

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
}

function deactivate(panel) {
    panel.classList.remove('active');
    panel.children[0].style.visibility = 'hidden'
    panel.children[0].style.opacity = '0';
    panel.children[2].style.visibility = 'hidden'
    panel.children[2].style.opacity = '0';
}

portraits.forEach(portrait => {
    portrait.addEventListener('mouseover', (e) => {
        e.target.classList.remove('grayscale');
    })
    portrait.addEventListener('mouseout', (e) => {
        e.target.classList.add('grayscale');
    })
})