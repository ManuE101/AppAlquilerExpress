"use client";

import { useState } from "react";
import { getMontoEntreFetch } from "../../../../utils/stats_fetch";

export default function DineroEstadistica() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBuscar = async () => {
    if (!fechaInicio || !fechaFin) {
      alert("Debe ingresar ambas fechas");
      return;
    }

    if (fechaFin < fechaInicio) {
    alert("La fecha final no puede ser anterior a la fecha de inicio.");
    return;
    }

    setLoading(true);
    const resultado = await getMontoEntreFetch(fechaInicio, fechaFin);
    setTotal(resultado);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">Dinero recaudado entre fechas</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <div>
          <label className="block font-semibold mb-1">Desde</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Hasta</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleBuscar}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-4 md:mt-6"
        >
          Calcular
        </button>
      </div>

      {loading && <p className="text-center">Calculando...</p>}

      {total !== null && !loading && (
        <div className="text-center mt-6 text-xl font-semibold">
          Total recaudado: <span className="text-green-700">${total}</span>
        </div>
      )}
    </div>
  );
}