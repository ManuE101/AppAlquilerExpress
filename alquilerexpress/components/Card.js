"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";




export default function Card({ inmuebles = []}) {

  const router = useRouter();

 const handleClickOnMueble = (id) => {
    console.log("Click en mueble" , id);
    router.push(`/inmueble/${id}`);
  }
  
  return (
    <div className="flex flex-col w-full m-auto sm:h-screen gap-4 text-black ">
      {inmuebles.map((item, index) => (
        <div key={item.id} 
          onClick={() => handleClickOnMueble(item.id)}
          className="bg-gray-200 p-4 rounded shadow-md flex hover:shadow-lg hover:scale-101 transition-all duration-300
           w-full h-2/4 gap-2 flex-col sm:flex-row sm:gap-4 items-center">
          <div className="w-70 h-50 sm:h-full sm:w-auto items-center flex flex-col justify-center px-1">
            <Image src={item.imagen} className="min-h-5/6 border-1 border-black" alt="Imagen depto" width={300} height={100}/>
            <h2 className="text-bold text-xl"> Precio  ${item.precio}</h2>
          </div>
          <div className="h-auto">
            <h2 className="text-lg font-bold">{item.titulo}</h2>
            <p>{item.descripcion}</p>
            <p>Cant habitaciones {item.habitaciones}</p>
            <p> Domicilio: {item.domicilio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}