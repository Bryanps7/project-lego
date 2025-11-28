const entrar = document.getElementById('entrar')

window.addEventListener('load', (e) => {
    e.preventDefault()

    if (localStorage.getItem('nome')) {
        const logout = document.getElementById('logout')

        logout.innerHTML = `
            Olá, ${localStorage.getItem('nome')}
            |
            Pontos: ${localStorage.getItem('coin')}
        `
    }
})

entrar.addEventListener('click', (e) => {
    e.preventDefault()

    if (document.getElementById('login').style.display == 'flex') {
        document.getElementById('login').style.display = 'none'
    } else {
        document.getElementById('login').style.display = 'flex'
        document.getElementById('div-cadastrar').style.display = 'none'
    }
})

const logar = document.getElementById('logar')

logar.addEventListener('click', (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const dados = {
        email,
        password
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(resp => resp.json())
        .then(valores => {
            alert(valores.message)
            console.log(valores);

            localStorage.setItem('token', valores.token)
            localStorage.setItem('nome', valores.user.name)
            localStorage.setItem('coin', valores.user.coin_points)

            const logout = document.getElementById('logout')



            logout.innerHTML = `
            Olá, ${valores.user.name}
            |
            Pontos: ${valores.user.coin_points}
        `
        })

})

const cadastrar = document.getElementById('cadastrar')

cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    document.getElementById('login').style.display = 'none'
    document.getElementById('div-cadastrar').style.display = 'flex'
})

const logarr = document.getElementById('logarr')

logarr.addEventListener('click', (e) => {
    e.preventDefault()

    document.getElementById('login').style.display = 'flex'
    document.getElementById('div-cadastrar').style.display = 'none'
})

const cadastrao = document.getElementById('cadastrao')

cadastrao.addEventListener('click', (e) => {
    e.preventDefault()


    const name = document.getElementById('nameC').value
    const email = document.getElementById('emailC').value
    const password = document.getElementById('passwordC').value
    const phone = document.getElementById('phoneC').value
    const cpf = document.getElementById('cpfC').value


    const dados = {
        name,
        email,
        password,
        phone,
        cpf
    }

    fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(resp => resp.json())
        .then(valores => {
            alert(valores.message)
            console.log(valores);

            // localStorage.setItem('token', valores.token)
            // localStorage.setItem('nome', valores.user.name)

            // const logout = document.getElementById('logout')



            // logout.innerHTML = `
            //     Olá, ${valores.user.name}
            //     |
            //     Pontos: ${valores.user.coin_points}
            // `
        })

})