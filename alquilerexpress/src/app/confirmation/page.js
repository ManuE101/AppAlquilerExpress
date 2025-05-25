import { InmuebleRepository } from "../../lib/InmuebleRepository";
import { getInmuebleById } from "../utils/inmuebles_fetch";


export default async function ConfirmacionPage({ searchParams }) {
  const id = searchParams?.id;

  if (!id) {
    return <p>ID de inmueble no válido.</p>;
  }

  try {
    const inmueble = await getInmuebleById(id);

    if (!inmueble) {
      return <p>Inmueble no encontrado.</p>;
    }

    // Marcar como reservado
    inmueble.reservado = true;
    await inmueble.save();

    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-green-700">
          ¡Reserva confirmada!
        </h1>
        <p className="mt-4">El inmueble ha sido marcado como reservado.</p>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <p>Error al confirmar la reserva.</p>;
  }
}
