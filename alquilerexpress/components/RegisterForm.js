"use client";

import { useState } from "react";
import { registerFetch } from "../utils/auth_fetchs";

export default function RegisterForm({tagBoton}) {
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
    const nacimiento = formData.get("nacimiento");
    const birth = new Date(nacimiento);
    const today = new Date();
    const isOver18 = today >= new Date(birth.setFullYear(birth.getFullYear() + 18));

    if (!isOver18) {
      setFieldErrors({ nacimiento: "La fecha ingresada no corresponde a alguien mayor de 18 años" });
      return;
    }

    const data = Object.fromEntries(formData.entries());
    try {
      await registerFetch(data);
      alert("Usuario registrado con exito!");
      event.target.reset();
    } catch (err) {
      setFieldErrors(parseZodErrors(err.message));
    }
  }

  // Helper para resaltar el input con error
  function inputClass(field) {
    return `border p-2 ${fieldErrors[field] ? "border-red-500" : ""}`;
  }

  return (
 
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

      <label className="text-md">Fecha de nacimiento</label>
      <input type="date" name="nacimiento" className={inputClass("nacimiento")} required />
      {fieldErrors.nacimiento && <span className="text-red-500 text-xs ">{fieldErrors.nacimiento}</span>}

      <input type="hidden" name="rol" value="cliente" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {tagBoton || "Registrarse"}
      </button>
    </form>
  );
}