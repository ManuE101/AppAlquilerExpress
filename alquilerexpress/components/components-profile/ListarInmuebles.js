"use client";
import { useState, useEffect } from "react";
import { getInmuebles } from "../../utils/inmuebles_fetch";
import CardInmuebleSimple from "../CardInmuebleSimple";
import ModalEditarInmueble from "../ModalEditarInmueble";

export default function ListarInmuebles() {
  const [inmuebles, setInmuebles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inmuebleEdit, setInmuebleEdit] = useState(null);

  // Carga inicial de inmuebles
  useEffect(() => {
    getInmuebles()
      .then((data) => setInmuebles(data))
      .catch(() => setInmuebles([]))
      .finally(() => setLoading(false));
  }, []);

  // Eliminar inmueble de la lista
  const onEliminar = (id) => {
    setInmuebles((prev) => prev.filter((inmueble) => inmueble.id !== id));
  };

  // Guardar el inmueble seleccionado para editar
  const onEditar = (inmueble) => {
    setInmuebleEdit(inmueble);
  };

  // Actualizar la lista tras editar
  const handleSuccessEdicion = (inmuebleActualizado) => {
    setInmuebles((prev) =>
      prev.map((i) => (i.id === inmuebleActualizado.id ? inmuebleActualizado : i))
    );
    setInmuebleEdit(null);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-2 w-4/6 h-auto text-black">
      <h1 className="text-2xl font-bold mb-4">Lista de inmuebles</h1>
      <p className="text-lg">Aquí puedes ver todos los inmuebles</p>

      <div className="gap-2 mt-2 w-full flex flex-col items-center justify-center">
        {loading ? (
          <p>Cargando inmuebles...</p>
        ) : inmuebles && inmuebles.length > 0 ? (
          inmuebles.map((inmueble) => (
            <CardInmuebleSimple
              key={inmueble._id}
              inmueble={inmueble}
              onEliminar={onEliminar}
              onEditar={() => onEditar(inmueble)}
            />
          ))
        ) : (
          <p>No hay inmuebles registrados.</p>
        )}

        {inmuebleEdit && (
          <ModalEditarInmueble
            inmueble={inmuebleEdit}
            onClose={() => setInmuebleEdit(null)}
            onSuccess={handleSuccessEdicion}
          />
        )}
      </div>
    </div>
  );
}
