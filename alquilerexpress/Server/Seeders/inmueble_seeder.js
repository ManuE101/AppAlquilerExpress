'use strict';

// Carga datos en la db, comando para ejecutarlo en el package.json

/**@type{import('sequelize-cli').Migration*/

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Inmuebles', [{
            categoria: 'casa',
            precio: 300000,
            cant_min_dias: 7,
            politica_reembolso: '100%',
            direccion: 'Calle 50 N1',
            localidad: 'La Plata',
            habitaciones: 5,
            capacidad: 6,
            imagen: "https://www.casasdeplaya.com.ar/images/portadaentreolas3.jpg",
    }],{});
        await queryInterface.bulkInsert('Inmuebles', [{
            categoria: 'casa',
            precio: 200000,
            cant_min_dias: 5,
            politica_reembolso: 'no tiene',
            direccion: 'Calle 55 N2',
            localidad: 'La Plata',
            habitaciones: 3,
            capacidad: 4,
            imagen: "https://www.casasdeplaya.com.ar/images/portadaentreolas3.jpg",
    }],{});
        await queryInterface.bulkInsert('Inmuebles', [{
            categoria: 'casa',
            precio: 400000,
            cant_min_dias: 7,
            politica_reembolso: '100%',
            direccion: 'Calle 46 N10',
            localidad: 'La Plata',
            habitaciones: 6,
            capacidad: 7,
            imagen: "https://geriatricos.portalgeriatrico.com.ar/wp-content/uploads/2021/05/jardin-1-scaled.jpg",
    }],{});
}
};