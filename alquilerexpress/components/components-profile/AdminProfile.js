"use client";
import Link from 'next/link';
import { useState } from "react";
import ListarEmpleados from './ListarEmpleados';
import ListarInmuebles from "./ListarInmuebles";
import Estadisticas from './Estadisticas';


export default function AdminProfile({user}) {
  const [mostrar, setMostrar] = useState(null); // "empleados" | "inmuebles" | null
  

  return (
    <div className="flex flex-col items-center justify-center mt-2 h-auto text-black">
      <h1 className="text-2xl font-bold mb-4">hola sos admin capo</h1>
      <p className="text-lg">Usa tus poderes para el mal</p>
        <Link className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" href="/user/funcionalidad-empleado"> Agregar Empleado</Link>
        <Link className="mt-4 px-4 py-2 bg-green-500 text-white rounded" href="/user/funcionalidad-inmueble"> Agregar Inmueble</Link>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setMostrar(mostrar === "empleados" ? null : "empleados")}
      >
        Listar Empleados
      </button>
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => setMostrar(mostrar === "inmuebles" ? null : "inmuebles")}
      >
        Listar Inmuebles
      </button>

      {mostrar === "empleados" && (
        <ListarEmpleados/>
      )}
      {mostrar === "inmuebles" && (
        <>
        <ListarInmuebles/>
        </>
      )}

      <button
      className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
      onClick={() => setMostrar(mostrar === "estadisticas" ? null : "estadisticas")}
      > 
        Ver Estadísticas
      </button>

      {mostrar === "estadisticas" && (
        <Estadisticas />
      )}
    </div>
  );
}