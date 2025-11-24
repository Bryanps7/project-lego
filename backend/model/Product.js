const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Product = db.define('Product', {
    id: { // Identificador único do produto
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { // Nome do produto
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: { // Descrição do produto
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: { // Preço do produto
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.01 // Preço deve ser maior que 0
        }
    },
    status: { // Status do produto (ativo, inativo) - Definido como inativo quando o produto não está mais disponível para venda.
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    slug: { // Slug do produto para URLs amigáveis
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    // category_id: { // ID da categoria do produto
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'categories',
    //         key: 'id'
    //     },
    // },

}, {
    tableName: 'products',
    timestamps: true,
});

module.exports = Product;