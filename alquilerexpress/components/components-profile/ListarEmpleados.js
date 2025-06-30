"use client";
import { useState, useEffect } from "react";
import { getEmpleados } from "../../utils/user_fetchs";
import CardEmpleado from "../CardEmpleado";

export default function ListarEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartelEliminado, setCartelEliminado] = useState(false);

  useEffect(() => { // tristemente como es use client no puedo usar getServerSideProps
    getEmpleados()
      .then((data) => setEmpleados(data))
      .catch(() => setEmpleados([]))
      .finally(() => setLoading(false));
  }, []);

   const handleEmpleadoEliminado = (id) => {
     setCartelEliminado(true);
     setTimeout(() => {
      setEmpleados((prev) => prev.filter(e => e._id !== id));
      setCartelEliminado(false); 
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-2 h-auto w-4/6 text-black">
      <h1 className="text-2xl font-bold mb-4">Lista de empleados</h1>
      <p className="text-lg">Aquí puedes ver todos los empleados</p>
      <div className="gap-2 mt-2 w-full flex flex-col items-center justify-center">
      <div className={`bg-red-300 text-red-500 p-2 rounded text-2xl transition-opacity duration-300
      ${cartelEliminado ? "opacity-100" : "opacity-0"}`}>Empleado eliminado</div>  


        {loading ? (
          <p>Cargando empleados...</p>
        ) : empleados && empleados.length > 0 ? (
       
            empleados.map((empleado) => (
               <CardEmpleado empleado={empleado} key={empleado._id} onEliminado = {handleEmpleadoEliminado}/>
            ))
        ) : (
          <p>No hay empleados registrados.</p>
        )}
      </div>
    </div>
  );
}