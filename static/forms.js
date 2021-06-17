function showLoginForm() {
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

        const regLink = document.createElement('a')
        const linkText = document.createTextNode("No account? Register here")
        regLink.href = ''
        regLink.style.color = 'white'
        regLink.append(linkText)

        form.append(labelUsername, labelPassword, loginBTN, regLink)
        body.style.backgroundImage = 'url(https://images4.alphacoders.com/102/1028991.jpg)'
        content.innerHTML = ''
        content.id = 'form-holder'
        content.append(div1)
        content.append(form)
        content.append(div2)

        // loginBTN.addEventListener('submit', loginUser)
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

        const loginLink = document.createElement('a')
        const linkText = document.createTextNode("Already have an account? Login here")
        loginLink.href = ''
        loginLink.style.color = 'white'
        loginLink.append(linkText)

        form.append(labelUsername, labelEmail, labelPassword, regBTN, loginLink)
        content.append(div1)
        content.append(form)
        content.append(div2)

        // loginBTN.addEventListener('submit', loginUser)
        // loginLink.addEventListener('click', showRegistrationForm)
    }
}