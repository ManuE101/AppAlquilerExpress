import Image from "next/image";
import Card from "../../../../components/Card";
import { getInmuebleById } from "../../../../utils/inmuebles_fetch";
import { getUser } from "../../../../utils/user_fetchs";
import ReservaButton from "../../../../components/ReservaButton";
import InmuebleMap from "../../../../components/InmuebleMap";
import CommentSection from "../../../../components/commentSeccion";
import { cookies } from "next/headers";

export default async function Page({ params }) {
  const { id } = await params;
  const inmueble = await getInmuebleById(id);
  const cookieStore = await cookies();
  const accessToken = await cookieStore.get("access_token")?.value;
  const user = await getUser(accessToken);
  

  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto p-4 gap-6 bg-white text-black rounded shadow">
      {/* Columna principal */}
      <div className="flex-1 px-2">
        <img
          src={inmueble.imagen}
          alt="Imagen del inmueble"
          className="w-full h-72 object-cover rounded"
        />
        <div className="flex flex-row flex-wrap md:flex-nowrap">
          <div className=" flex flex-col w-full">
            <h1 className="text-2xl font-bold mt-4">{inmueble.domicilio}</h1>
            <h2 className="text-lg text-neutral-700 mb-2">{inmueble.titulo}</h2>
            <h3 className="text-xl font-semibold text-green-700 mb-2">{`Por semana  $${inmueble.precio}`}</h3>
            <div className="my-2">
              <p className="font-bold">Descripción:</p>
              <p className="text-neutral-600">{inmueble.descripcion}</p>
            </div>
            <span className={inmueble.disponible
              ? "py-1.5 px-2 text-green-700 w-max text-xs bg-green-300 font-semibold rounded"
              : "py-1.5 px-2 w-max text-xs text-red-700 bg-red-300 font-semibold rounded"}>
              {inmueble.disponible ? "Disponible" : "En Refacción"}
            </span>
            <div className="mt-4">
              <ReservaButton id_inmueble={id} rol={user?.rol} />
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 items-end w-full">
            <div className="w-full md:w-2/3  flex flex-col gap-4 ">
              <div className="h-60 w-full rounded overflow-hidden border">
                <InmuebleMap direccion={inmueble.domicilio} />
              </div>
            </div>
          </div>
        </div>
      <CommentSection inmuebleId={id} />
      </div>
    </div>
  );
}