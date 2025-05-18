import Image from "next/image";
import FilterPanel from "../../components/FilterPanel";
import Card from "../../components/Card"


export default async function  Home() {
    fetch("http://localhost:8080/api/home").then(response => response.json())
    .then(data => {
      console.log(data)
    })

  return (
    <div className="mx-2 flex justify-start flex-col gap-4">
      <FilterPanel/>
      <div className="flex justify-between">
      <h2 className="text-xl text-black"> Resultados:</h2> 
      <h2 className="text-xl text-black"> Ordenar por 
        <button className="border-2 border-black text-sm hover:text-cyan-700">X</button>
      </h2>
      </div>
      <Card/>
      </div> 
  )}