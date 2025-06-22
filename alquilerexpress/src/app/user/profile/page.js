import Link from "next/link";
import { cookies } from "next/headers";
import { getUser } from "../../../../utils/user_fetchs";
import UserProfile from "../../../../components/components-profile/UserProfile";
import AdminProfile from "../../../../components/components-profile/AdminProfile";
import EmpleadoProfile from "../../../../components/components-profile/EmpleadoProfile";
import { notFound } from "next/navigation";

export default async function Profile() {
  const cookieStore = await cookies();
  const accessToken = await cookieStore.get("access_token")?.value;
  const user = await getUser(accessToken);
  console.log("User Profile Data:", user);
if (!user) {
    notFound();
  }

  return (
    <>
      {user.rol === "cliente" && <UserProfile user={user} />}
      {user.rol === "admin" && <AdminProfile user={user} />}
       {user.rol === "empleado" && <EmpleadoProfile user={user} />}
    </>
  );
}
