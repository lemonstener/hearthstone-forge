const content = document.querySelector('.content')
const hsLogo = document.querySelector('#hs-logo')
const nav = document.querySelector('nav')
const forgeLink = document.querySelector('#forge')
const decksLink = document.querySelector('#decks')
const setsLink = document.querySelector('#sets')
const newsLink = document.querySelector('#news')
const loginLink = document.querySelector('#login')

const userInSession = {
    isLoggedIn: false
}


hsLogo.addEventListener('click', function() {
    if (!content.classList.contains('blur')) {
        content.classList.add('blur')
        nav.style.left = '0'
        content.style.marginLeft = '50vw'
    } else {
        content.classList.remove('blur')
        nav.style.left = '-9999px'
        content.style.marginLeft = '0'
    }
})

forgeLink.addEventListener('click', function(e) {
    e.preventDefault()
    createFormatPanels()
    content.classList.remove('blur')
    nav.style.left = '-9999px'
    content.style.marginLeft = '0'
})

setsLink.addEventListener('click', function(e) {
    e.preventDefault()
    allSets()
    content.classList.remove('blur')
    nav.style.left = '-9999px'
    content.style.marginLeft = '0'
})

loginLink.addEventListener('click', function(e) {
    e.preventDefault()
    showLoginForm()
    content.classList.remove('blur')
    nav.style.left = '-9999px'
    content.style.marginLeft = '0'
})