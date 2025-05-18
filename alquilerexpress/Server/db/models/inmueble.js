const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

 // Datos guardados de inmuebles en la base de datos

class Inmueble extends Model { }

Inmueble.init({
    categoria:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    cant_min_dias:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    politica_reembolso:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Localidad:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    habitaciones:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    capacidad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imagen:{
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    sequelize,
    modelName: 'Inmueble',
    tableName: 'Inmuebles',
    timestamps: false,
});

module.exports = Inmueble;