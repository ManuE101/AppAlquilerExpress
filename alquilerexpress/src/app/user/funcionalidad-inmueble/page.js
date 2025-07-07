import Link from "next/link";
import { cookies } from "next/headers";
import { getUser } from "../../../../utils/user_fetchs";
import { notFound } from "next/navigation";
import InmuebleForm from "../../../../components/components-profile/InmuebleForm";



export default async  function AgregarInmueble() {

  const cookieStore = await cookies();
  const accessToken = await cookieStore.get("access_token")?.value;
  const user = await getUser(accessToken);
  console.log("User Profile Data:", user);
  if (!user || user.rol !== "admin") {
    notFound();
  }

  return (
    <div className="p-4 text-black flex flex-col w-full justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Rellene para agregar un empleado</h1>
    <InmuebleForm/>
    </div>
  );
}