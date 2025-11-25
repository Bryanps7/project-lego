const Product = require('../model/Product')

async function createProduct(dados) {

    const { name, description, price, status, slug } = dados

    if (!name || !price || !status || !slug) {
        throw new Error('nome e preço são obrigatórios')
    }

    const newProduct = await Product.create(dados)

    return newProduct
}

async function listProducts() {
    const products = await Product.findAll()

    return products
}

async function updateProduct(id, dados) {

    const product = await Product.findByPk(id)

    if (!product) {
        throw new Error('Produto não encontrado')
    }

    await product.update(dados)

    return product
}

async function deleteProduct(id) {
    
    const product = await Product.findByPk(id)

    if (!product) {
        throw new Error('Produto não encontrado')
    }

    await product.destroy()

    return true
}

module.exports = {
    createProduct,
    listProducts,
    updateProduct,
    deleteProduct
}