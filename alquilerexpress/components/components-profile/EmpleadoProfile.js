"use client"
import Link from 'next/link';
import { useState } from "react";
import RegisterForm from '../RegisterForm';

export default function EmpleadoProfile({user}) {


  const [vista, setVista] = useState(false);



  return (
    <div className="flex flex-col items-center justify-center mt-2 h-auto text-black">
      <h1 className="text-2xl font-bold mb-4">KIKIRIKI GIL LABURANTE</h1>
      <p className="text-lg">A LABURAAAAAAAAAAAAAAAAAAAAR</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" target="_blank" onClick={() => setVista(!vista)}>
        {vista ? "Ocultar Formulario" : "Registrar Cliente"}
      </button>
      {vista && (
        <div className="mt-4">
          <RegisterForm tagBoton={"Crear Cliente"}/>
        </div>
      )}
    </div>
  );
}