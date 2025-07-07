"use client";

import { useState } from "react";
import { empleadoRegisterFetch } from "../../utils/auth_fetchs";
import Link from "next/link";

export default function EmpleadoForm() {
  const [fieldErrors, setFieldErrors] = useState({});

  function parseZodErrors(errorString) {
    try {
      const errorObj = JSON.parse(errorString);
      const errors = {};
      for (const key in errorObj) {
        if (Array.isArray(errorObj[key]._errors) && errorObj[key]._errors.length > 0) {
          errors[key] = errorObj[key]._errors.join(", ");
        }
      }
      return errors;
    } catch {
      return {};
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFieldErrors({}); // Limpia errores previos

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    try {
      await empleadoRegisterFetch(data);
      alert("Empleado registrado con exito!");
      event.target.reset();
    } catch (err) {
      alert("Error al registrar el empleado: " + err.message);
      event.target.reset();
      setFieldErrors(parseZodErrors(err.message));
    }
  }

  // Helper para resaltar el input con error
  function inputClass(field) {
    return `border p-2 ${fieldErrors[field] ? "border-red-500" : ""}`;
  }

  return (
    <>
    <div className="w-full">
    <Link href={"/user/profile"} className="flex justify-start text-white font-medium bg-red-500 px-2 py-1 w-fit">Volver</Link>
    </div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
      <input type="text" name="username" placeholder="Usuario" className={inputClass("username")} required />
      {fieldErrors.username && <span className="text-red-500 text-xs">{fieldErrors.username}</span>}

      <input type="password" name="password" placeholder="Contraseña" className={inputClass("password")} required />
      {fieldErrors.password && <span className="text-red-500 text-xs">{fieldErrors.password}</span>}

      <input type="text" name="nombre" placeholder="Nombre" className={inputClass("nombre")} required />
      {fieldErrors.nombre && <span className="text-red-500 text-xs">{fieldErrors.nombre}</span>}

      <input type="text" name="apellido" placeholder="Apellido" className={inputClass("apellido")} required />
      {fieldErrors.apellido && <span className="text-red-500 text-xs">{fieldErrors.apellido}</span>}

      <input type="email" name="correo" placeholder="Correo" className={inputClass("correo")} required />
      {fieldErrors.correo && <span className="text-red-500 text-xs">{fieldErrors.correo}</span>}

      <input type="text" name="dni" placeholder="DNI" className={inputClass("dni")} required />
      {fieldErrors.dni && <span className="text-red-500 text-xs">{fieldErrors.dni}</span>}

      <input type="text" name="telefono" placeholder="Teléfono" className={inputClass("telefono")} required />
      {fieldErrors.telefono && <span className="text-red-500 text-xs">{fieldErrors.telefono}</span>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Registrar
      </button>
    </form>
    </>
  );
}