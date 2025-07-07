"use client";

import { useState } from "react";
import { getReservasEntreFetch } from "../../../../utils/stats_fetch";

export default function EstadisticasReservas() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [reservas, setReservas] = useState([]);

  async function buscarReservas() {
    if (!fechaInicio || !fechaFin) {
        alert("Por favor, completá ambas fechas.");
        return;
    }
    if (fechaFin < fechaInicio) {
    alert("La fecha final no puede ser anterior a la fecha de inicio.");
    return;
  }
    const data = await getReservasEntreFetch(fechaInicio, fechaFin);
    setReservas(data);
  }

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-4">Estadísticas de Reservas</h1>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div>
          <label>Desde: </label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>

        <div>
          <label>Hasta: </label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={buscarReservas}
        >
          Buscar Reservas
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Resultados:</h2>
        {reservas.length === 0 ? (
          <p>No hay reservas en ese rango.</p>
        ) : (
          <ul className="space-y-2">
            {reservas.map((reserva, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded">
                <p><strong>ID:</strong> {reserva._id}</p>
                <p><strong>Fecha:</strong> {reserva.fecha_inicio}</p>
                <p><strong>Inmueble:</strong> {reserva.inmueble_id}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}