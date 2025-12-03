const token = window.localStorage.getItem('token')

window.addEventListener('load', (e) => { e.preventDefault(), read() })

async function read() {
    fetch('http://localhost:3000/user', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(resp => resp.json())
        .then(valores => {
            console.log(valores);

            const tbody = document.getElementById('listaUsuarios-list')
            tbody.innerHTML = ''
            for (const i of valores) {
                let status = ''

                if (i.status) {
                    status = 'ATIVO'
                } else {
                    status = 'INATIVO'
                }

                tbody.innerHTML += `
                    <tr>
                        <td>${i.id}</td>
                        <td>${i.name}</td>
                        <td>${i.email}</td>
                        <td>${i.phone}</td>
                        <td>${i.cpf}</td>
                        <td>${i.access_level}</td>
                        <td>${status}</td>
                        <td>${i.coin_points}</td>
                        <td>${i.avatar_id}</td>
                    </tr>
                `
            }
        })
}

const search = document.getElementById('search')

search.addEventListener('click', (e) => {
    e.preventDefault()

    const campo = document.getElementById('campoS').value

    fetch('http://localhost:3000/user/search?s=' + campo, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(resp => resp.json())
        .then(valores => {
            console.log(valores);
            const tbody = document.getElementById('listaUsuarios-search')

            tbody.innerHTML = ''
            for (const i of valores) {
                let status = ''

                if (i.status) {
                    status = 'ATIVO'
                } else {
                    status = 'INATIVO'
                }

                console.log(i.name)

                tbody.innerHTML += `
                   <tr>
                        <td>${i.id}</td>
                        <td>${i.name}</td>
                        <td>${i.email}</td>
                        <td>${i.phone}</td>
                        <td>${i.cpf}</td>
                        <td>${i.access_level}</td>
                        <td>${status}</td>
                        <td>${i.coin_points}</td>
                        <td>${i.avatar_id}</td>
                    </tr>
                `
            }

        })
})