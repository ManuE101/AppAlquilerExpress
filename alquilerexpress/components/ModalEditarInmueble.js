"use client";

import { useState } from "react";
import { editarInmueble } from "../utils/inmuebles_fetch"; // asumí que existe esta función

export default function ModalEditarInmueble({ inmueble, onClose, onSuccess }) {
  const [form, setForm] = useState({
    titulo: inmueble.titulo || "",
    desc: inmueble.descripcion || "",
    puntaje: inmueble.puntaje || 0,
    precio: inmueble.precio || 0,
    habitaciones: inmueble.habitaciones || 0,
    domicilio: inmueble.domicilio || "",
    imagen: inmueble.imagen || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const actualizado = await editarInmueble(inmueble.id, form);
      onSuccess(actualizado.inmueble || actualizado); // ajusta según lo que retorne tu backend
      onClose();
      alert("Inmueble actualizado con éxito.");
    } catch (err) {
      alert("Error al actualizar inmueble: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-2 max-h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Editar Inmueble</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            Título
            <input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </label>

          <label>
            Descripción
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </label>

          <label>
            Puntaje (0-5)
            <input
              type="number"
              name="puntaje"
              min="0"
              max="5"
              step="0.1"
              value={form.puntaje}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </label>

          <label>
            Precio (por día)
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </label>

          <label>
            Habitaciones
            <input
              type="number"
              name="habitaciones"
              value={form.habitaciones}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </label>

          <label>
            Domicilio
            <input
              name="domicilio"
              value={form.domicilio}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </label>

          <label>
            URL de la Imagen
            <input
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </label>

          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              Guardar
            </button>
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
