import { get } from "http";
import { getInmuebleById, hacerReserva } from "../../../utils/inmuebles_fetch";



export default async function ConfirmacionPage({ searchParams }) {
  const id = searchParams?.id;
  console.log("ID de inmueble recibido:", id);
  const reserva = await hacerReserva(id);
  const inmueble = await getInmuebleById(id);
 
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-green-400 mb-4">¡Felicitaciones!</h1>
      <p className="text-lg text-gray-700 mb-6">
       Reserva del inmueble {inmueble.titulo} confirmada con exito!!!
      </p>
      <a
        href="http://localhost:3000"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
      >
        Seguir navegando
      </a>
    </div>
    )
}
