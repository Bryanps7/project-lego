const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Address = db.define('Address', {
    id: { // Identificador único do Endereço
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: { // ID do usuário ao qual o endereço pertence
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
    },
    cep: { // Código de Endereçamento Postal
        type: DataTypes.INT(8),
        allowNull: false,
        validate: {
            len: [8, 8] // CEP deve ter exatamente 8 dígitos
        }
    },
    street: { // logradouro
        type: DataTypes.STRING(100),
        allowNull: false
    },
    number: { // Número da residência
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    complement: { // Complemento do endereço (opcional)
        type: DataTypes.STRING(100),
        allowNull: true
    },
    neighborhood: { // Bairro
        type: DataTypes.STRING(100),
        allowNull: false
    },
    city: { // Cidade
        type: DataTypes.STRING(100),
        allowNull: false
    },
    state: { // Estado
        type: DataTypes.STRING(2),
        allowNull: false,
        validate: {
            len: [2, 2] // Estado deve ter exatamente 2 caracteres (sigla)
        }
    },
    country: { // País
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'Brasil'
    },
    is_primary: { // Indica se o endereço é o principal do usuário
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    tableName: 'addresses',
    timestamps: true,
});

module.exports = Address;