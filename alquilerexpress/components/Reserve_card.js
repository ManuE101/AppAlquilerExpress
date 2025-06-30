"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CancelButton from "./CancelButton";

export default function ReserveCard({ reserves = [], onCancelReserva }) {
  const router = useRouter();
  const [fadingIds, setFadingIds] = useState([]);

  const handleClickOnInmueble = (inmuebleId) => {
    router.push(`/inmueble/${inmuebleId}`);
  };

  const handleCancel = (id) => {
    setFadingIds((prev) => [...prev, id]);
    setTimeout(() => {
      if (onCancelReserva) onCancelReserva(id);
      setFadingIds((prev) => prev.filter((fid) => fid !== id));
    }, 300); // 300ms = duración de la transición
  };

  return (
    <div className="flex flex-col w-full gap-4 text-black">
      {reserves.map((item) => (
        <div
          key={item._id}
          className={`bg-gray-200 p-4 rounded shadow-md flex flex-col sm:flex-row sm:gap-4 items-center transition-all duration-500 ${
            fadingIds.includes(item._id) ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="flex flex-col w-full sm:w-1/3 px-2">
            <h2 className="font-bold text-lg">Reserva ID: {item._id}</h2>
            <p
              onClick={() => handleClickOnInmueble(item.inmueble_id)}
              className="text-blue-600 cursor-pointer hover:underline"
              title="Ver detalles del inmueble"
            >
              Inmueble ID: {item.inmueble_id}
            </p>
          </div>
          <div className="flex flex-col w-full sm:w-2/3 px-2">
            <p>Fecha Inicio: {item.fecha_inicio}</p>
            <p>Fecha Fin: {item.fecha_fin}</p>
            {item.estado === "activa" && (
              <CancelButton
                id_reserva={item._id}
                onCancel={() => handleCancel(item._id)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
