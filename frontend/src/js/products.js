const token = window.localStorage.getItem('token')

const create = document.getElementById('create')

create.addEventListener('click', (e) => {
    e.preventDefault()

    const name = document.getElementById('nomeC').value
    const description = document.getElementById('descricaoC').value
    const price = Number(document.getElementById('precoC').value)
    const blocks = Number(document.getElementById('pecasC').value)
    const age_min = Number(document.getElementById('idade_minimaC').value)
    const stock = Number(document.getElementById('estoqueC').value)
    const category_id = Number(document.getElementById('categoriaC').value)

    console.log(category_id);
    

    const dados = {
        name,
        description,
        price,
        blocks,
        age_min,
        stock,
        category_id
    }

    console.log(dados);

    fetch('http://localhost:3000/product', {
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
            // document.getElementById('table-create').style.display = 'flex'
            const tbody = document.getElementById('listaProdutos-create')
            let status = ''

            if (valores.product.status) {
                status = 'ATIVO'
            } else {
                status = 'INATIVO'
            }

            console.log(valores.product.name)

            tbody.innerHTML += `
            <tr>
                <td>${valores.product.id}</td>
                <td>${valores.product.name}</td>
                <td class="descricao">${valores.product.description}</td>
                <td class="preco">R$: ${valores.product.price.toFixed(2)}</td>
                <td>${status}</td>
                <td>${valores.product.slug}</td>
                <td class="blocos">${valores.product.blocks} Blocos</td>
                <td>+${valores.product.age_min}</td>
                <td>${valores.product.stock}</td>
                <td>${valores.product.reserved_stock}</td>
                <td>${valores.product.category_id}</td>
            </tr>
        `

        })

    read()
})

window.addEventListener('load', (e) => { e.preventDefault(), read() })

async function read() {
    fetch('http://localhost:3000/product/admin', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(resp => resp.json())
        .then(valores => {
            const tbody = document.getElementById('listaProdutos-read')
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
                <td class="descricao">${i.description}</td>
                <td class="preco">R$: ${i.price.toFixed(2)}</td>
                <td>${status}</td>
                <td>${i.slug}</td>
                <td class="blocos">${i.blocks} Blocos</td>
                <td>+${i.age_min}</td>
                <td>${i.stock}</td>
                <td>${i.reserved_stock}</td>
                <td>${i.category_id}</td>
            </tr>
        `
            }
        })
}

const search = document.getElementById('search')

search.addEventListener('click', (e) => {
    e.preventDefault()

    const campo = document.getElementById('campoS').value

    fetch('http://localhost:3000/product/search?s=' + campo, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(resp => resp.json())
        .then(valores => {
            console.log(valores);
            // document.getElementById('table-create').style.display = 'flex'
            const tbody = document.getElementById('listaProdutos-search')

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
                        <td class="descricao">${i.description}</td>
                        <td class="preco">R$: ${i.price.toFixed(2)}</td>
                        <td>${status}</td>
                        <td>${i.slug}</td>
                        <td class="blocos">${i.blocks} Blocos</td>
                        <td>+${i.age_min}</td>
                        <td>${i.stock}</td>
                        <td>${i.reserved_stock}</td>
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
    const price = Number(document.getElementById('precoU').value)
    const blocks = Number(document.getElementById('pecasU').value)
    const age_min = Number(document.getElementById('idade_minimaU').value)
    const status = Number(document.getElementById('statusU').checked)

    console.log(status);


    const dados = {
        name,
        description,
        price,
        blocks,
        age_min,
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

    fetch('http://localhost:3000/product/' + id, {
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
            const tbody = document.getElementById('listaProdutos-update')
            let status = ''

            if (valores.product.status) {
                status = 'ATIVO'
            } else {
                status = 'INATIVO'
            }

            console.log(valores.product.name)

            tbody.innerHTML += `
            <tr>
                <td>${valores.product.id}</td>
                <td>${valores.product.name}</td>
                <td class="descricao">${valores.product.description}</td>
                <td class="preco">R$: ${valores.product.price.toFixed(2)}</td>
                <td>${status}</td>
                <td>${valores.product.slug}</td>
                <td class="blocos">${valores.product.blocks} Blocos</td>
                <td>+${valores.product.age_min}</td>
                <td>${valores.product.stock}</td>
                <td>${valores.product.reserved_stock}</td>
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
        fetch('http://localhost:3000/product/' + id, {
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