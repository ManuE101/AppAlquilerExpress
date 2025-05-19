"use client"
import { useState } from "react";

export default function() {
  const [isVisible, setIsVisible] = useState(false);

  const filterOptions = [
  "Opción 1", "Opción 2", "Opción 3", "Opción 4", "Opción 5",
  "Opción 6", "Opción 7", "Opción 8", "Opción 9", "Opción 10",
  "Opción 11", "Opción 12", "Opción 13", "Opción 14", "Opción 15"
];





  return (
    <div className=" w-auto max-h-2/4">
      {/* Botón para mostrar/ocultar el filtro */}
      <button 
        className="bg-red-600 text-white px-4 py-1 rounded mt-4"
        onClick={() => setIsVisible(!isVisible)}
      >  {isVisible ? "Ocultar filtros" : "Mostrar filtros"} {/*texto dentro del button*/}
      </button>

      {/* Contenedor del filtro, con animación de altura */}
      <div className={`overflow-hidden transition-all duration-300 ${
        isVisible ? "h-auto absolute mr-2" : "h-0 opacity-0"
      }`}>
        <div className="bg-amber-900 p-4 mt-2 rounded-xl shadow-md">
          <h2 className="text-lg font-bold">Filtros</h2>
        {/*Aca estaria haciendo un fetch de los filtros disponibles y poniendolos*/}
        <div className="flex w-full h-full flex-wrap">
            
        {filterOptions.map((option) => (
            <label key={option} className="block m-2">
                     <input type="checkbox" onChange={() => toggleFilter(option)} />
                    <span className="ml-2">{option}</span>
                 </label>
         ))}
         </div>
          <button className="mt-4 bg-amber-600 text-white px-4 py-2 rounded" onClick={() => setIsVisible(false)}>Aplicar Filtros</button>
        </div>
      </div>
    </div>
  );
};
