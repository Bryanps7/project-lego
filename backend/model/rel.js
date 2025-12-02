const Adress = require('./Adress');
const Cart_item = require('./Cart_item');
const Cart = require('./Cart');
const Category = require('./Category');
const Product = require('./Product');
const Sale = require('./Sale');
const Sale_item = require('./Sale_item');
const User = require('./User');

// ===========================================
// |             ROTA DA COMPRA              |
// |  USER -> SALE -> SALE_ITEM -> PRODUCT   |
// ===========================================

// User 1 : N Sale
User.hasMany(Sale, {
    foreignKey: 'user_id',
    as: 'saleUser'
})

Sale.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'userSale',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
// -------------------------------------------

// Sale 1 : N Sale_item
Sale.hasMany(Sale_item, {
    foreignKey: {
        name: 'sale_id',
        allowNull: false
    },
    as: 'sale_itemSale',

})

Sale_item.belongsTo(Sale, {
    foreignKey: {
        name: 'sale_id',
        allowNull: false
    },
    as: 'saleSale_item'
})
// -------------------------------------------

// Sale_item N : 1 Product
Sale_item.belongsTo(Product, {
    foreignKey: {
        name: 'product_id',
        allowNull: false
    },
    as: 'productSale_item'
})

Product.hasMany(Sale_item, {
    foreignKey: {
        name: 'product_id',
        allowNull: false
    },
    as: 'sale_itemProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
// -------------------------------------------
// ===========================================

// ===========================================
// |            ROTA DO CARRINHO             |
// |  USER -> CART -> CART_ITEM -> PRODUCT   |
// ===========================================

// User 1 : 1 Cart
User.hasOne(Cart, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'cartUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Cart.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'userCart'
})
// -------------------------------------------

// Cart 1 : N Cart_item
Cart.hasMany(Cart_item, {
    foreignKey: {
        name: 'cart_id',
        allowNull: false
    },
    as: 'cart_itemCart',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

// -------------------------------------------

// Cart_item N : 1 Product
Cart_item.belongsTo(Product, {
    foreignKey: {
        name: 'product_id',
        allowNull: false
    },
    as: 'productCart_item'
})

Product.hasMany(Cart_item, {
    foreignKey: {
        name: 'product_id',
        allowNull: false
    },
    as: 'cart_itemProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

// -------------------------------------------

//User 1 : N Adress
User.hasMany(Adress, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'adressUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Adress.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'userAdress'
})
// -------------------------------------------
module.exports = { Product, Sale_item, Sale, User }

