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
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Sale.belongsTo(User, {
    foreignKey: 'user_id'
})

// Sale : Sale_item
Sale.hasMany(Sale_item, {
    foreignKey: {
        name: 'sale_id',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Sale_item.belongsTo(Sale, {
    foreignKey: {
        name: 'sale_id',
        allowNull: false
    }
})

// Product : Sale_item
Product.hasMany(Sale_item, {
    foreignKey: {
        name: 'product_id',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Sale_item.belongsTo(Product, {
    foreignKey: {
        name: 'product_id',
        allowNull: false
    }
})

module.exports = { Product, Sale_item, Sale, User }