"use client";
import { getInmuebleById, hacerReserva,hacerReservaPresencial , checkReserva } from "../utils/inmuebles_fetch";
import { useState } from "react";
import { getUser } from "../utils/user_fetchs";

export default function ReservaButton({ id_inmueble , rol}) {

  async function handleClickCliente() {
     try {
    if (!form.desde || !form.hasta) {
      alert("Debes seleccionar ambas fechas.");
      return;
    }

    const fechaInicio = new Date(form.desde);
    const fechaFin = new Date(form.hasta);

    if (fechaInicio >= fechaFin) {
      alert("La fecha de fin debe ser posterior a la fecha de inicio.");
      return;
    }

    console.log("Fechas válidas:", form.desde, form.hasta);
  }
  catch (error) {
    console.error("Error al validar fechas:", error);
  }
  /////
  /////
    try {
      console.log("Haciendo reserva para el inmueble con ID:", id_inmueble);
      const reserva = await checkReserva(id_inmueble);

      if (reserva?.error) {
        console.error("Error al registrar la reserva:", reserva.error);
        alert("Hubo un problema al registrar la reserva.");
        return;
      }

      const pagoRes = await fetch("/api/pagar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productoId: id_inmueble }),
      });

      const pagoData = await pagoRes.json();

      if (pagoData.error) {
        console.error("Error al generar la preferencia de pago:", pagoData.error);
        alert("No se pudo generar el link de pago.");
        return;
      }

      // redirigir al init_point de mp
      window.location.href = pagoData.init_point;

    } catch (error) {
      console.error("Error en el proceso de reserva y pago:", error);
      alert("Ocurrió un error inesperado.");
    }
  }

  async function handleClickEmpleado() {
    try {
      const inmueble = await checkReserva(id_inmueble, form.desde, form.hasta);
      if (!inmueble) {
        alert("Inmueble no disponible para reserva.");
        return;
      }

      const user = await getUser(form.dni);
      if(inmueble.ok  && user) {
        const reserva = await hacerReservaPresencial(id_inmueble, form.desde, form.hasta, form.dni);
        if (reserva.error) {
          console.error("Error al registrar la reserva:", reserva.error);
          alert("Hubo un problema al registrar la reserva.");
          return;
        }
        alert("Reserva realizada con éxito.");
      }
    } catch (error) {
      console.error("Error al hacer la reserva:", error);
      alert("Ocurrió un error al hacer la reserva.");
    }
  }

const [form, setForm] = useState({
  desde: "",
  hasta: "",
  dni: "",
});
  
    const handleChange = e => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };


  if ([undefined,null].includes(rol)) return (
  <div>
    <p className="text-red-500">Iniciar sesion para reservar</p>
  </div> 
  );


  return (
    <div className="flex flex-row gap-2 items-center justify-start mt-2 h-auto text-black">
      
    <button
      {...rol === "cliente" ? { onClick: handleClickCliente } : { onClick: handleClickEmpleado }}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-3"
      >
      Reservar
    </button>
    <div className="flex flex-col justify-between">
         <div className="flex flex-row gap-2 ">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-center">Fecha Inicio</label>
            <input type="date" name="desde" required  className="border-1 p-1 rounded " onChange={handleChange}/>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-center">Fecha Fin</label>
           <input type="date" name="hasta" required className="border-1 p-1 rounded "  onChange={handleChange}/>
          </div>
         </div>
         {(rol === "admin" || rol === "empleado") && (
  <div className="flex flex-col mt-2">
    <label className="text-sm font-medium text-center">DNI del cliente</label>
    <input
      type="text"
      name="dni"
      className="border-1 p-1 rounded"
      onChange={handleChange}
      placeholder="Ingrese DNI"
    />
  </div>)}
    </div>
      </div>
    );
}
