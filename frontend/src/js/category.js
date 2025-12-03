const token = window.localStorage.getItem('token')

const create = document.getElementById('create')

create.addEventListener('click', (e) => {
    e.preventDefault()

    const name = document.getElementById('nomeC').value
    const description = document.getElementById('descricaoC').value


    const dados = {
        name,
        description,
    }

    console.log(dados);

    fetch('http://localhost:3000/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(dados)
    })
        .then(resp => resp.json())
        .then(valores => {
            console.log(valores);
            const tbody = document.getElementById('listaCategorias-create')
            let status = ''

            if (valores.category.is_active) {
                status = 'ATIVO'
            } else {
                status = 'INATIVO'
            }

            console.log(valores.category.name)

            tbody.innerHTML += `
                <tr>
                    <td>${valores.category.id}</td>
                    <td>${valores.category.name}</td>
                    <td class="descricao">${valores.category.description}</td>
                    <td>${valores.category.slug}</td>
                    <td>${status}</td>
                </tr>
            `
        })

    read()
})

window.addEventListener('load', (e) => { e.preventDefault(), read() })

async function read() {
    fetch('http://localhost:3000/category', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(resp => resp.json())
        .then(valores => {
            const tbody = document.getElementById('listaCategorias-read')
            tbody.innerHTML = ''
            for (const i of valores) {
                let status = ''

                if (i.is_active) {
                    status = 'ATIVO'
                } else {
                    status = 'INATIVO'
                }

                tbody.innerHTML += `
            <tr>
                <td>${i.id}</td>
                <td>${i.name}</td>
                <td class="descricao">${i.description}</td>
                <td>${i.slug}</td>
                <td>${status}</td>
            </tr>
        `
            }
        })
}

const search = document.getElementById('search')

search.addEventListener('click', (e) => {
    e.preventDefault()

    const campo = document.getElementById('campoS').value

    fetch('http://localhost:3000/category/search?s=' + campo, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(resp => resp.json())
        .then(valores => {
            console.log(valores);
            const tbody = document.getElementById('listaCategorias-search')

            tbody.innerHTML = ''
            for (const i of valores) {
                let status = ''

                if (i.is_active) {
                    status = 'ATIVO'
                } else {
                    status = 'INATIVO'
                }

                console.log(i.name)

                tbody.innerHTML += `
                    <tr>
                        <td>${i.id}</td>
                        <td>${i.name}</td>
                        <td class="descricao">${i.description}</td>
                        <td>${i.slug}</td>
                        <td>${status}</td>
                    </tr>
                `
            }

        })
})

const update = document.getElementById('update')

update.addEventListener('click', (e) => {
    e.preventDefault()

    const id = Number(document.getElementById('idU').value)
    const name = document.getElementById('nomeU').value
    const description = document.getElementById('descricaoU').value
    const status = Number(document.getElementById('statusU').checked)

    console.log(status);


    const dados = {
        name,
        description,
        status
    }

    Object.keys(dados).forEach(key => {
        if (dados[key] === "" || dados[key] === null || dados[key] === 0) {
            if (key != 'status') {
                delete dados[key]
            }
        }
    })

    console.log(dados);

    fetch('http://localhost:3000/category/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(dados)
    })
        .then(resp => resp.json())
        .then(valores => {
            console.log(valores);

            if (valores.message) alert(valores.message)
            const tbody = document.getElementById('listaCategorias-update')
            let status = ''

            if (valores.category.is_active) {
                status = 'ATIVO'
            } else {
                status = 'INATIVO'
            }

            console.log(valores.category.name)

            tbody.innerHTML += `
            <tr>
                <td>${valores.category.id}</td>
                <td>${valores.category.name}</td>
                <td class="descricao">${valores.category.description}</td>
                <td>${valores.category.slug}</td>
                <td>${status}</td>
            </tr>
        `

        })

    read()
})

const delet = document.getElementById('delet')

delet.addEventListener('click', (e) => {
    e.preventDefault()

    const id = Number(document.getElementById('idD').value)

    const cofirm = confirm('Tem Certeza que desejá apagar esse Produto?')

    if (cofirm) {
        fetch('http://localhost:3000/category/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(resp => resp.json())
            .then(valores => {
                console.log(valores);

                if (valores.message) alert(valores.message)
                if (valores.messagem) alert(valores.messagem)
                if (valores.error) alert(valores.error)
                if (valores.erro) alert(valores.erro)
            })
    }

    read()
})