let test

function showLoginForm() {
    body.style.backgroundImage = `url(/static/images/paper-background.jpeg)`
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
    console.log(res)
    if (res.data.error) {
        errorMsg.innerText = res.data.error
        console.log(res.data.error)
        return
    } else {
        userInSession.isLoggedIn = true
        userInSession.username = res.data.user.username,
            userInSession.bio = res.data.user.bio,
            userInSession.isAdmin = res.data.user.is_admin,
            userInSession.isMod = res.data.user.is_mod,
            userInSession.favorites = res.data.user.favorites,
            userInSession.ownDecks = res.data.user.own_decks

        if (userInSession.deckBuilder.deckArr.length === 30) {
            validateDeck()
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
        userInSession.username = res.data.user.username,
            userInSession.bio = res.data.user.bio,
            userInSession.isAdmin = res.data.user.is_admin,
            userInSession.isMod = res.data.user.is_mod,
            userInSession.favorites = res.data.user.favorites,
            userInSession.ownDecks = res.data.user.own_decks

        if (userInSession.deckBuilder.deckArr.length === 30) {
            validateDeck()
        }
    }
}

function showDeckSubmissionForm() {
    if (!userInSession.deckBuilder.deckArr.length === 30) {
        return
    }
    content.style.backgroundImage = 'url(/static/images/tyrion.png)'
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

    submitBTN.addEventListener('click', async function(e) {
        e.preventDefault()
        console.log({
            "title": `${deckName.value}`,
            "playerClass": `${classes[userInSession.deckBuilder.playerClass].params}`,
            "cards": userInSession.deckBuilder.deckArr,
            "format": `${userInSession.deckBuilder.format}`
        })
        const res = await axios.post(`${BASE_URL}/api/decks`, {
            "title": `${deckName.value}`,
            "playerClass": `${userInSession.deckBuilder.playerClass}`,
            "cards": userInSession.deckBuilder.deckArr,
            "format": `${userInSession.deckBuilder.format}`
        })
        console.log(res)
    })

    label.append(deckName)
    form.append(label, submitBTN)
    content.append(div1, form, div2)

}