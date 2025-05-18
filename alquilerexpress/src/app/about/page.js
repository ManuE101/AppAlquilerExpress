import Image from "next/image";

export default async function About() {
 //const res = await fetch('http://localhost:3000/api/is-auth')
//const isLogged = await res.json()

//if (!isLogged) {
   // return <h1>No estás logeado</h1>;
  //}

  return (
  <div>
    <div className="flex flex-col gap-4 w-3/4 m-auto">
      <h2 className="mt-4 text-2xl font-semibold text-black mb-2">Sobre Nosotros</h2>
      <p className="text-gray-700 text-base mb-4">
        Alquiler Express es una empresa de blablabla Lorem50
      </p>

      {/* aca iria la api de google maps  */}
      <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
        <span className="text-gray-500">[mapa de Google Maps]</span>
        {/* se podria agregar una imagen aca por el momento pero por ahora paja */}
      </div>
    </div>

  </div> )
}
