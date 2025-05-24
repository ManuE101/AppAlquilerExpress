import { cookies } from "next/headers";
import { getReservas } from "../../../../utils/inmuebles_fetch";
import { getUser } from "../../../../utils/user_fetchs";
import Card from "../../../../components/Card";
import Link from "next/link";

export default async function Reservas() {
  //Hago esto sino las cookies no viajan como deberian
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const user = await getUser(accessToken);
  const inmuebles = await getReservas(user.id);

  return (
    <div className="flex flex-col w-4/6  m-auto h-auto text-black">
      <Link
        className="mt-2 p-2 w-2/12 text-center bg-blue-500 text-white rounded"
        href={"/user/profile"}
      >
        {" "}
        Volver al perfil
      </Link>
      <div className="flex flex-col items-center justify-center h-auto text-black">
        <h1 className="text-2xl font-bold mb-4">Reservas</h1>
        <Card inmuebles={inmuebles} />
      </div>
    </div>
  );
}