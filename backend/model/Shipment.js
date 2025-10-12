const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Shipment = db.define('Shipment', {
    id: { // Identificador único da Entrega
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sale_id: { // Identificador da Venda associada
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sales',
            key: 'id'
        }
    },
    address_id: { // Identificador do Endereço de Entrega
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'addresses',
            key: 'id'
        }
    },
    delivery_id: { // Identificador do Entregador
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'deliveries',
            key: 'id'
        }
    },
    status: { // Status da entrega (e.g., 'pendente', 'enviado', 'entregue')
        type: DataTypes.ENUM('pending', 'shipped', 'delivered'),
        allowNull: false,
        defaultValue: 'pending'
    },
    tracking_number: { // Número de rastreamento da entrega
        type: DataTypes.STRING,
        allowNull: false
    },
    shipped_at: { // Data e hora do envio
        type: DataTypes.DATE,
        allowNull: true
    },
    delivered_at: { // Data e hora da entrega
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'shipments',
    timestamps: true,
});

module.exports = Shipment;