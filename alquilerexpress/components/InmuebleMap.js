"use client";

import { useEffect, useState } from "react";

export default function InmuebleMap({direccion}) {
  const [coords, setCoords] = useState(null);
  console.log("direccion", direccion);
  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`
        );
        const data = await response.json();
        if (data.length > 0) {
          setCoords({ lat: data[0].lat, lon: data[0].lon });
        } else {
          console.warn("No se encontraron coordenadas para la dirección.");
        }
      } catch (error) {
        console.error("Error al obtener coordenadas:", error);
      }
    };

    fetchCoords();
  }, []);

  if (!coords) return <p>Cargando mapa...</p>;

  const lat = parseFloat(coords.lat);
  const lon = parseFloat(coords.lon);
  const bbox = `${lon - 0.01},${lat - 0.01},${lon + 0.01},${lat + 0.01}`;

  return (
    <iframe
      width="100%"
      height="100%"
      frameBorder="0"
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`}
      style={{ border: 0, minHeight: 240 }}
      allowFullScreen
      aria-hidden="false"
      tabIndex="0"
      title="Ubicación en mapa"
    ></iframe>
  );
}
