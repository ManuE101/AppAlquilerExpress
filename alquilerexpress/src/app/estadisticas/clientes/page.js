"use client";

import { useState } from "react";
import { getClientesEntreFetch } from "../../../../utils/stats_fetch";

export default function ClientesEstadistica() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [clientes, setClientes] = useState([]);

  const handleBuscar = async () => {
    if (!fechaInicio || !fechaFin) {
      alert("Debe ingresar ambas fechas");
      return;
    }
    
    if (fechaFin < fechaInicio) {
    alert("La fecha final no puede ser anterior a la fecha de inicio.");
    return;
    }

    const data = await getClientesEntreFetch(fechaInicio, fechaFin);
    setClientes(data);
  };

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-4">Clientes con reservas entre fechas</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div>
          <label>Desde: </label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label>Hasta: </label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleBuscar}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Buscar Clientes
        </button>
      </div>

      {clientes.length === 0 ? (
        <p>No hay clientes con reservas en ese rango.</p>
      ) : (
        <ul className="space-y-2">
          {clientes.map((cliente) => (
            <li key={cliente.id} className="p-4 bg-gray-100 rounded">
              <p><strong>Nombre:</strong> {cliente.nombre}</p>
              <p><strong>Apellido:</strong> {cliente.apellido}</p>
              <p><strong>DNI:</strong> {cliente.dni}</p>
              <p><strong>Email:</strong> {cliente.correo}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}