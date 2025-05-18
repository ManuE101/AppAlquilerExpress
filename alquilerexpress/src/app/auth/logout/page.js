"use client"

export default function LogoutPage() {
  function handleClick() {
    console.log("Deslogeado")
      fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials: 'include'  // ¡IMPORTANTE para que las cookies se envíen!
    });
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
