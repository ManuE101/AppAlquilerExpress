import Image from "next/image";
import Card from "../../../../components/Card";
import { getInmuebleById } from "../../../../utils/inmuebles_fetch";
import  ReservaButton  from "../../../../components/ReservaButton";

export default async function Page({params}) {
  const {id} =  await params;
  const inmueble = await getInmuebleById(id);


  return (
    <div className="flex flex-col pt-2.5 md:p-5 items-center justify-center h-auto text-black">
      <div className="flex flex-col sm:flex-row w-full h-full">
        <div className="w-3/5 flex flex-col p-2.5 md:p-5 space-y-2.5">
          <div className="flex flex-col md:flex-row w-full items-start md:items-center sm:justify-between gap-2">
            <h1 className="text-[24px] font-bold">{inmueble.domicilio}</h1>
            <h2 className="text-[18px] font-semibold text-neutral-700">{`USD ${inmueble.precio}`}</h2>

          </div>
          <div className="flex flex-col space-y-2 mt-2.5">
            <p className="text-xs text-neutral-600">{inmueble.titulo}</p>
            <p className="text-sm text-neutral-600">{inmueble.descripcion}</p>
            <p className="text-sm font-bold text-neutral-800">{`Habitaciones: ${inmueble.habitaciones}`}</p>
            <p className={inmueble.reservado ? "py-1.5 px-2 w-max text-xs text-red-700 bg-red-300 font-semibold rounded" : "py-1.5 px-2 text-green-700 w-max text-xs bg-green-300 font-semibold rounded"}>{
              inmueble.reservado ? "Reservado" : "Disponible"
              }</p>
          </div>
        </div>
        <div className="h-[250px] w-2/5 relative">
          <img 
            src={inmueble.imagen}
            className="object-cover w-full h-full"
            alt="Imagen del inmueble"
          />
        </div>
            <ReservaButton id_inmueble={inmueble._id} />
      </div>
    </div>
  );
}