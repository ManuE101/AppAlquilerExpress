"use client"

import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  function handleClick() {
    console.log("Deslogeado")
    alert("Deslogeado")
      fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials: 'include'  // ¡IMPORTANTE para que las cookies se envíen!
    });
    router.push('/'); // Redirigir a la página de inicio
  }


  return (
   <div className="text-black p-10">
      <button
        onClick={handleClick}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
