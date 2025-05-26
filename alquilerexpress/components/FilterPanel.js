"use client"
import { type } from "os";
import { useState } from "react";
import { getFiltrados } from "../utils/inmuebles_fetch";

export default function FilterPanel({ onFiltrar }) {
  const [isVisible, setIsVisible] = useState(false);
  // Un solo objeto para todos los filtros
  const [filtros, setFiltros] = useState({});
  // Opciones de filtro dinámicas
  const filterOptions = [
    { key: "habitaciones", label: "Habitaciones", min: 0, max: 10 , type: "range" },
    { key: "precio", label: "Precio", min: 0, max: 1000000, type: "number" },
    { key: "puntaje", label: "Puntaje", min: 0, max: 10, type: "range" },
    { key: "cochera", label: "Cochera", type: "checkbox" },
    { key: "local", label: "Local", type: "checkbox" },
    { key: "vivienda", label: "Vivienda", type: "checkbox" },
  ];

  // Actualiza solo el filtro correspondiente
  const handleChange = (key, value) => {
   if (["cochera", "local", "vivienda"].includes(key)) {
    setFiltros(prev => ({
      ...prev,
      cochera: key === "cochera" ? value : false,
      local: key === "local" ? value : false,
      vivienda: key === "vivienda" ? value : false,
    }));
  } else {
    setFiltros(prev => ({
      ...prev,
      [key]: value === "" ? undefined : Number(value)
    }));
  }
  }


  const handleSubmit = () => {
    setIsVisible(false);
    const filtrosLimpiados = Object.fromEntries(
      Object.entries(filtros).filter(([_, v]) => v !== undefined && v !== "" && v !== false)
    );
     const tipoLabel = Object.entries(filtrosLimpiados).find(([key, value]) => { 
      if(value === true) {
        return key
      }
     })
    if (tipoLabel) {
      filtrosLimpiados.tipo = tipoLabel[0];
      
    }
    
    onFiltrar(filtrosLimpiados);
  };

  return (
    <div className="w-auto max-h-2/4">
      <button
        className="bg-red-600 text-white px-4 py-1 rounded mt-4"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Ocultar filtros" : "Mostrar filtros"}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${
        isVisible ? "h-auto absolute mr-2" : "h-0 opacity-0"
      }`}>
        <div className="bg-amber-900 p-4 mt-2 rounded-xl shadow-md">
          <h2 className="text-lg font-bold">Filtros</h2>
          <div className="flex w-full h-full flex-wrap">
            {filterOptions.map(opt => (
  <label key={opt.key} className="block m-2">
    {opt.label}:
    {opt.type === "checkbox" ? (
      <input
        type="checkbox"
        checked={filtros[opt.key] ?? false}
        onChange={e => handleChange(opt.key, e.target.checked)}
        className="ml-2"
      />
    ) : (
      <input
        type={opt.type}
        min={opt.min}
        max={opt.max}
        value={filtros[opt.key] ?? ""}
        onChange={e => handleChange(opt.key, e.target.value)}
        className="text-black bg-amber-50 border border-gray-300 rounded"
      />
    )}
    {opt.type === "range" && (
      <div className="text-xs text-white mt-1">
        Valor: {filtros[opt.key] ?? opt.min}
      </div>
    )}
  </label>
))}
          </div>
          <button
            className="mt-4 bg-amber-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
}
