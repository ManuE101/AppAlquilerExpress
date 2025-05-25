import { cookies } from "next/headers";
import { getReservasCanceladas } from "../../../../utils/inmuebles_fetch";
import { getUser } from "../../../../utils/user_fetchs";
import ReserveCard from "../../../../components/Reserve_card";
import Link from "next/link";


export default async function Cancelaciones() {

  const cookieStore = await cookies();
  const accessToken = await cookieStore.get("access_token")?.value;
  const user = await getUser(accessToken);
  const reservas = await getReservasCanceladas(user.id);

  return (
    <div className="flex flex-col w-4/6  m-auto h-auto text-black">
    <Link className="mt-2 p-2 w-2/12 text-center bg-blue-500 text-white rounded" href={"/user/profile"}> Volver al perfil</Link>
    <div className="flex flex-col items-center justify-center h-auto text-black">
      <h1 className="text-2xl font-bold mb-4">Cancelaciones</h1>
      <p className="text-lg">Aquí puedes ver tus cancelaciones.</p>
      <p className="text-lg">Aquí puedes gestionar tus cancelaciones.</p>
      <ReserveCard reserves={reservas} />
    </div>
    </div>
  );
}