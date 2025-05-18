'use strict';

// Carga datos en la db, comando para ejecutarlo en el package.json

/**@type{import('sequelize-cli').Migration*/

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Usuarios', [{
        nombre: 'Juan',
        apellido: 'Pablo',
        email: 'juan@gmail.com',
        dni: 11111111,
        telefono: '221-9998888',
        fecha_nacimiento: new Date('2025-01-01'),
        contrasena: 'contra1111',
    }],{});
        await queryInterface.bulkInsert('Usuarios', [{
        nombre: 'Jorge',
        apellido: 'Palo',
        email: 'jorge@gmail.com',
        dni: 22222222,
        telefono: '221-1112222',
        fecha_nacimiento: new Date('2025-05-02'),
        contrasena: 'contra2222',
    }],{});
        await queryInterface.bulkInsert('Usuarios', [{
        nombre: 'Bambino',
        apellido: 'Pons',
        email: 'bambino@gmail.com',
        dni: 33333333,
        telefono: '221-3334444',
        fecha_nacimiento: new Date('2025-10-03'),
        contrasena: 'contra3333',
    }],{});
    }
};