const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Category = db.define('Category', {
    id: { // Identificador único da Categoria
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { // Nome da categoria
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: { // Descrição da categoria
        type: DataTypes.TEXT,
        allowNull: true,
    },
    slug: { // Slug da categoria para URLs amigáveis
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'categories',
    timestamps: true,
});

module.exports = Category;