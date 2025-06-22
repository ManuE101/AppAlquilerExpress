"use client";
import { useState, useEffect } from "react";
import { getInmuebles } from "../../utils/inmuebles_fetch";
import CardInmuebleSimple from "../CardInmuebleSimple";



export default function ListarInmuebles() { 
   const [inmuebles , setInmuebles] = useState([]);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => { // tristemente como es use client no puedo usar getServerSideProps
     getInmuebles()
       .then((data) => setInmuebles(data))
       .catch(() => setInmuebles([]))
       .finally(() => setLoading(false));
   }, []);
 
   return (
     <div className="flex flex-col items-center justify-center mt-2 w-4/6 h-auto text-black">
       <h1 className="text-2xl font-bold mb-4">Lista de inmuebles</h1>
       <p className="text-lg">Aquí puedes ver todos los inmuebles</p>
      <div className="gap-2 mt-2 w-full flex flex-col items-center justify-center">
         {loading ? (
           <p>Cargando inmuebles...</p>
         ) : inmuebles && inmuebles.length > 0 ? (
            inmuebles.map((inmueble) => (
           <CardInmuebleSimple inmueble={inmueble} key={inmueble.id}/> 
         ))) : (
           <p>No hay inmuebles registrados.</p>) }
       </div>
     </div>
   );
}