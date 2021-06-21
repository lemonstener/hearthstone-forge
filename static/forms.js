let test

function showLoginForm() {
    resetContent()
    if (userInSession.isLoggedIn === false) {
        const form = document.createElement('form')
        form.id = 'user-form'

        // For whatever reason CSS won't let me simply center the form,
        // so I'm doing it bootstrap-style.

        const div1 = document.createElement('div')
        const div2 = document.createElement('div')
        div1.classList.add('push-zone')
        div2.classList.add('push-zone')

        const username = document.createElement('input')
        const password = document.createElement('input')
        password.setAttribute('type', 'password')

        username.id = 'username'
        password.id = 'password'

        const labelUsername = document.createElement('label')
        const labelPassword = document.createElement('label')

        labelUsername.htmlFor = 'username'
        labelUsername.innerText = 'Username'
        labelPassword.htmlFor = 'password'
        labelPassword.innerText = 'Password'
        labelUsername.append(username)
        labelPassword.append(password)

        const loginBTN = document.createElement('input')
        loginBTN.setAttribute('type', 'submit')
        loginBTN.setAttribute('value', 'Login')
        loginBTN.classList.add('form-btn')
        loginBTN.id = 'login-btn'

        const regLink = document.createElement('a')
        const linkText = document.createTextNode("No account? Register here")
        regLink.href = ''
        regLink.style.color = 'white'
        regLink.append(linkText)

        const errorDisplay = document.createElement('div')
        const span = document.createElement('span')
        span.classList.add('error-msg')
        errorDisplay.append(span)

        form.append(labelUsername, labelPassword, errorDisplay, loginBTN, regLink)
        content.style.backgroundImage = 'url(https://pngimage.net/wp-content/uploads/2018/06/png-hearthstone-2.png)'
        content.innerHTML = ''
        content.id = 'form-holder'
        content.append(div1)
        content.append(form)
        content.append(div2)

        loginBTN.addEventListener('click', function(e) {
            e.preventDefault()
            loginUser()
        })
        regLink.addEventListener('click', showRegistrationForm)
    }
}

function showRegistrationForm(e) {
    e.preventDefault()

    if (userInSession.isLoggedIn === false) {
        content.innerHTML = ''
        const form = document.createElement('form')
        form.id = 'user-form'

        // For whatever reason CSS won't let me simply center the form,
        // so I'm doing it bootstrap-style.

        const div1 = document.createElement('div')
        const div2 = document.createElement('div')
        div1.classList.add('push-zone')
        div2.classList.add('push-zone')

        const username = document.createElement('input')
        const email = document.createElement('input')
        const password = document.createElement('input')
        password.setAttribute('type', 'password')
        email.setAttribute('type', 'email')

        username.id = 'username'
        password.id = 'password'
        email.id = 'email'

        const labelUsername = document.createElement('label')
        const labelPassword = document.createElement('label')
        const labelEmail = document.createElement('label')

        labelUsername.htmlFor = 'username'
        labelUsername.innerText = 'Username'
        labelPassword.htmlFor = 'password'
        labelPassword.innerText = 'Password'
        labelEmail.htmlFor = 'email'
        labelEmail.innerText = 'Email'
        labelUsername.append(username)
        labelPassword.append(password)
        labelEmail.append(email)

        const regBTN = document.createElement('input')
        regBTN.setAttribute('type', 'submit')
        regBTN.setAttribute('value', 'Register')
        regBTN.classList.add('form-btn')
        regBTN.id = 'reg-btn'

        const loginLink = document.createElement('a')
        const linkText = document.createTextNode("Already have an account? Login here")
        loginLink.href = ''
        loginLink.style.color = 'white'
        loginLink.append(linkText)

        const errorDisplay = document.createElement('div')
        const span = document.createElement('span')
        span.classList.add('error-msg')
        errorDisplay.append(span)

        form.append(labelUsername, labelEmail, labelPassword, errorDisplay, regBTN, loginLink)
        content.append(div1)
        content.append(form)
        content.append(div2)

        regBTN.addEventListener('click', function(e) {
            e.preventDefault()
            registerUser()
        })
        loginLink.addEventListener('click', function(e) {
            e.preventDefault()
            showLoginForm()
        })
    }
}



async function loginUser() {
    const errorMsg = document.querySelector('.error-msg')
    const user = document.querySelector('#username')
    const password = document.querySelector('#password')
    const res = await axios.post(`${BASE_URL}/login`, {
        "username": `${user.value}`,
        "password": `${password.value}`
    })
    if (res.data.error) {
        errorMsg.innerText = res.data.error
        return
    } else {
        userInSession.isLoggedIn = true
        userInSession.id = res.data.user.id
        userInSession.username = res.data.user.username
        userInSession.bio = res.data.user.bio
        userInSession.isAdmin = res.data.user.is_admin
        userInSession.isMod = res.data.user.is_mod
        userInSession.favorites = res.data.user.favorites
        userInSession.ownDecks = res.data.user.own_decks

        if (userInSession.deckBuilder.deckArr.length === 30 &&
            userInSession.deckBuilder.format !== '' &&
            userInSession.deckBuilder.playerClass !== '') {
            validateDeck()
        } else {
            resetDeckBuilder()
            resetContent()
            userPage()
        }
    }
}

async function registerUser() {
    const errorMsg = document.querySelector('.error-msg')
    const user = document.querySelector('#username')
    const password = document.querySelector('#password')
    const email = document.querySelector('#email')
    const res = await axios.post(`${BASE_URL}/register`, {
        "username": `${user.value}`,
        "email": `${email.value}`,
        "password": `${password.value}`
    })
    if (res.data.error) {
        errorMsg.innerText = res.data.error
        return
    } else {
        console.log(res.data)
        userInSession.isLoggedIn = true
        userInSession.id = res.data.user.id
        userInSession.username = res.data.user.username
        userInSession.bio = res.data.user.bio
        userInSession.isAdmin = res.data.user.is_admin
        userInSession.isMod = res.data.user.is_mod
        userInSession.favorites = res.data.user.favorites
        userInSession.ownDecks = res.data.user.own_decks

        if (userInSession.deckBuilder.deckArr.length === 30 &&
            userInSession.deckBuilder.format !== '' &&
            userInSession.deckBuilder.playerClass !== '') {
            validateDeck()
        } else {
            resetDeckBuilder()
            resetContent()
            userPage()
        }
    }
}

function showDeckSubmissionForm() {
    if (!userInSession.deckBuilder.deckArr.length === 30) {
        return
    }
    resetContent()
    content.style.backgroundImage = 'url(/static/images/tyrion.png)'
    content.style.backgroundSize = 'contain'
    const form = document.createElement('form')
    form.id = 'user-form'

    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    div1.classList.add('push-zone')
    div2.classList.add('push-zone')

    const deckName = document.createElement('input')
    const label = document.createElement('label')

    deckName.value = 'Unnamed Deck'

    deckName.id = 'deck-name'
    label.htmlFor = 'deck-name'
    label.innerText = 'Deck Name'

    const submitBTN = document.createElement('input')
    submitBTN.setAttribute('type', 'submit')
    submitBTN.setAttribute('value', 'Submit')
    submitBTN.classList.add('form-btn')
    submitBTN.id = 'submit-btn'

    if (userInSession.deckBuilder.editMode) {
        submitBTN.addEventListener('click', function(e) {
            e.preventDefault()
            patchDeck()
        })
    } else {
        submitBTN.addEventListener('click', function(e) {
            e.preventDefault()
            postDeck()
        })
    }

    label.append(deckName)
    form.append(label, submitBTN)
    content.append(div1, form, div2)
}

async function postDeck() {
    const deckName = document.querySelector('#deck-name')
    const res = await axios.post(`${BASE_URL}/api/decks`, {
        "title": `${deckName.value}`,
        "playerClass": `${userInSession.deckBuilder.playerClass}`,
        "cards": userInSession.deckBuilder.deckArr,
        "format": `${userInSession.deckBuilder.format}`
    })
    currentDecks[res.data.id] = res.data
    resetDeckBuilder()
    displayDeck(res.data.id)
}

async function patchDeck() {
    const deckName = document.querySelector('#deck-name')
    const id = userInSession.deckBuilder.deckToEdit
    const res = await axios.patch(`${BASE_URL}/api/decks/${id}`, {
        "title": `${deckName.value}`,
        "cards": userInSession.deckBuilder.deckArr
    })
    currentDecks[res.data.id] = res.data
    resetDeckBuilder()
    displayDeck(res.data.id)
}