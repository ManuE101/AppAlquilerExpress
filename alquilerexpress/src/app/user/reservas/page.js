"use client";
import { useEffect, useState } from "react";
import { getReservas } from "../../../../utils/inmuebles_fetch";
import { getUser } from "../../../../utils/user_fetchs";
import ReserveCard from "../../../../components/Reserve_card";
import Link from "next/link";

export default function Reservas() {
  const [inmuebles, setInmuebles] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];
      const userData = await getUser(accessToken);
      setUser(userData);
      const reservas = await getReservas(userData.id);
      setInmuebles(reservas);
    }
    fetchData();
  }, []);

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
        <ReserveCard
          reserves={inmuebles}
          onCancelReserva={(id) =>
            setInmuebles((prev) => prev.filter((r) => r._id !== id))
          }
        />
      </div>
    </div>
  );
}