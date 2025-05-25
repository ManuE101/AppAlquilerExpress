"use client";
import Image from "next/image";
import FilterPanel from "../../components/FilterPanel";
import Card from "../../components/Card";
import { useState, useEffect } from "react";
import { getInmuebles, getFiltrados } from "../../utils/inmuebles_fetch";

export default function Home() {
  const [inmuebles, setInmuebles] = useState([]);

  useEffect(() => {
    getInmuebles().then(async (res) => setInmuebles(res));
  }, []);

  const handleFiltrar = async (filtros) => {
    const data = await getFiltrados(filtros);
    console.log("Data filtrada:", data);
    setInmuebles(data);
  };

 

  return (
    <div className="mx-2 flex justify-start flex-col gap-4">
      <FilterPanel onFiltrar={handleFiltrar} />
      <div className="flex justify-between">
        <h2 className="text-xl text-black"> Resultados:</h2>
        <h2 className="text-xl text-black">
          {" "}
          Ordenar por
          <button className="border-2 border-black text-sm hover:text-cyan-700">
            X
          </button>
        </h2>
      </div>
      <Card inmuebles={inmuebles}  />
    </div>
  );
}