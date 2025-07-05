import { useState } from "react";
import { editarEmpleado } from "../utils/user_fetchs";

export default function ModalEditarEmpleado({ empleado, onClose, onSuccess }) {
  const [form, setForm] = useState({
    username: empleado.username || "",
    nombre: empleado.nombre || "",
    apellido: empleado.apellido || "",
    correo: empleado.correo || "",
    telefono: empleado.telefono || "",
    dni: empleado.dni || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const actualizado = await editarEmpleado(empleado._id, form);
      onSuccess(actualizado);
      onClose();
      alert("Los datos del empleado han sido actualizados correctamente.");
    } catch (err) {
      alert("Error al actualizar el empleado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
        <h2 className="text-xl font-bold mb-4">Editar Empleado</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label>
            Username
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </label>
          <label>
            Nombre
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </label>
          <label>
            Apellido
            <input
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </label>
          <label>
            Correo
            <input
              name="correo"
              type="email"
              value={form.correo}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </label>
          <label>
            Teléfono
            <input
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label>
            DNI
            <input
              name="dni"
              value={form.dni}
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