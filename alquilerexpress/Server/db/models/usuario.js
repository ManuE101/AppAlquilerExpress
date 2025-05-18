const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

// Datos guardados de usuarios en la base de datos

class Usuario extends Model { }

Usuario.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    dni:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_nacimiento:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    contrasena:{
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios',
    timestamps: false,
});

module.exports = Usuario;