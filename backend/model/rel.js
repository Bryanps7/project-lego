const Product = require('./Product');
const Sale = require('./Sale');
const Sale_item = require('./Sale_item');
const User = require('./User');

// User : Sale
User.hasMany(Sale, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'saleUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Sale.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'userSale'
})

// Sale : Sale_item
Sale.hasMany(Sale_item, {
    foreignKey: {
        name: 'sale_id',
        allowNull: false
    },
    as: 'sale_itemSale',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Sale_item.belongsTo(Sale, {
    foreignKey: {
        name: 'sale_id',
        allowNull: false
    },
    as: 'saleSale_item'
})

// Product : Sale_item
Product.hasMany(Sale_item, {
    foreignKey: {
        name: 'product_id',
        allowNull: false
    },
    as: 'sale_itemProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Sale_item.belongsTo(Product, {
    foreignKey: {
        name: 'product_id',
        allowNull: false
    },
    as: 'productSale_item'
})

module.exports = { Product, Sale_item, Sale, User }