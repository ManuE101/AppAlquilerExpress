"use client";

import { useState } from "react";
import { agregarInmueble } from "../../utils/inmuebles_fetch";
import Link from "next/link";

export default function InmuebleForm() {
  const [fieldErrors, setFieldErrors] = useState({});

function parseZodErrors(errorString) {
  try {
    const errorObj = JSON.parse(errorString);
    const errors = {};
    for (const key in errorObj) {
      if (Array.isArray(errorObj[key]?._errors)) {
        errors[key] = errorObj[key]._errors.join(", ");
      }
    }
    return errors;
  } catch {
    // Si no es JSON válido, lo devolvemos como error general
    return { general: errorString };
  }
}


  async function handleSubmit(event) {
    event.preventDefault();
    setFieldErrors({});

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.puntaje = Number(data.puntaje);
    data.precio = Number(data.precio);
    data.habitaciones = Number(data.habitaciones);


    try {
        console.log("Datos del formulario:", data);
      await agregarInmueble(data);
      alert("Inmueble registrado con éxito!");
      event.target.reset();
    } catch (err) {
      alert("Error al registrar el inmueble: " + err.message);
      setFieldErrors(parseZodErrors(err.message));
    }
  }

  function inputClass(field) {
    return `border p-2 rounded ${fieldErrors[field] ? "border-red-500" : "border-gray-300"}`;
  }

  return (
    <>
      <div className="w-full mb-4">
        <Link
          href={"/user/profile"}
          className="flex justify-start text-white font-medium bg-red-500 px-2 py-1 w-fit"
        >
          Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium">Título</label>
          <input name="titulo" type="text" className={inputClass("titulo")} required />
          {fieldErrors.titulo && <span className="text-red-500 text-xs">{fieldErrors.titulo}</span>}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea name="desc" type="text" className={inputClass("desc")} required />
          {fieldErrors.desc && <span className="text-red-500 text-xs">{fieldErrors.desc}</span>}
        </div>

        {/* Puntaje */}
        <div>
          <label className="block text-sm font-medium">Puntaje (maximo 5)</label>
          <input type="number"  name="puntaje" className={inputClass("puntaje")} required />
          {fieldErrors.puntaje && <span className="text-red-500 text-xs">{fieldErrors.puntaje}</span>}
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium">Precio (por dia)</label>
          <input type="number" name="precio" className={inputClass("precio")} required />
          {fieldErrors.precio && <span className="text-red-500 text-xs">{fieldErrors.precio}</span>}
        </div>

        {/* Habitaciones */}
        <div>
          <label className="block text-sm font-medium">Cantidad de habitaciones</label>
          <input type="number"  name="habitaciones" className={inputClass("habitaciones")} required />
          {fieldErrors.habitaciones && <span className="text-red-500 text-xs">{fieldErrors.habitaciones}</span>}
        </div>

        {/* Domicilio */}
        <div>
          <label className="block text-sm font-medium">Domicilio completo</label>
          <input name="domicilio" type="text" className={inputClass("domicilio")} required />
          {fieldErrors.domicilio && <span className="text-red-500 text-xs">{fieldErrors.domicilio}</span>}
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-medium">URL de la imagen</label>
          <input name="imagen" type="text" className={inputClass("imagen")} required />
          {fieldErrors.imagen && <span className="text-red-500 text-xs">{fieldErrors.imagen}</span>}
        </div>

        {fieldErrors.general && (
  <div className="text-red-500 text-sm bg-red-100 p-2 rounded">
    {fieldErrors.general}
  </div>
)}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Registrar Inmueble
        </button>
      </form>
    </>
  );
}
