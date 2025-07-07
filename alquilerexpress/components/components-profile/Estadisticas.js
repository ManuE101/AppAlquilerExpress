"use client";
import Link from "next/link";

export default function Estadisticas() {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">Sección de Estadísticas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/estadisticas/reservas" className="bg-blue-100 p-4 rounded shadow hover:bg-blue-200">
          <p>Estadísticas de Reservas</p>
        </Link>
        <Link href="/estadisticas/clientes" className="bg-green-100 p-4 rounded shadow hover:bg-green-200">
          <p>Estadísticas de Clientes</p>
        </Link>
        <Link href="/estadisticas/dinero" className="bg-purple-100 p-4 rounded shadow hover:bg-purple-200">
          <p>Estadísticas de Dinero</p>
        </Link>
      </div>
    </div>
  );
}