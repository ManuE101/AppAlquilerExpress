'use client'
import { useState } from "react";


//mapa con las preguntas
//para mi no es necesario hacerlo componentes por separado pq van a ser preguntas fijas
const faqs = [
  { question: "Pregunta 1", answer: "Respuesta 1" },
  { question: "Pregunta 2", answer: "Respuesta 2" },
  { question: "Pregunta 3", answer: "Respuesta 3" },
];


//exporto el componente para q sea usable
export default function FAQSection() {

  // openIndex = null si no fue abierta sino muestra la respuesta correspondiente
  //osea estado de la pregunta (abierta o cerrada)
  //stOpenIndex es para cambiar el estado de openIndex
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="m-auto w-3/4 flex flex-col gap-3 text-black">
      <h2 className="text-2xl  font-semibold mb-4">Preguntas Frecuentes</h2>
      <div className="flex flex-col gap-6">
        {/* esto para loopear dentro del mapa */}
        {faqs.map((faq, index) => (
          <div key={index} className="border-b  border-gray-200 pb-2">

            <button
              // con el boton cambio el estado de openIdex de null a la respuesta
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left flex justify-between items-center font-medium hover:text-cyan-700"
            >
              {/* el texto del boton = la pregunta */}
              {faq.question}
              {/* aca cambio el simbolo del boton */}
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>
            {/* solo muestra la respuesta si openIndex es igual en valor y tipo a index */}
            {openIndex === index && (
              <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}