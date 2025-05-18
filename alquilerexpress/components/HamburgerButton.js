"use client"
import { useState } from "react"
import NavButton from "./NavButton";
export default function HamburguerButton() {
   const [isOpen , setIsOpen] = useState(false)    
    
   return (
    <nav className="md:hidden bg-red-800 p-4 flex items-center justify-between">
      {/* Botón de menú en móvil */}
      <div className="md:hidden">
        <button 
          className="text-white text-3xl px-2 h-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Menú desplegable */}
      <div className={`top-25 right-0 w-full bg-red-700 p-4 transition-transform duration-300 origin-top ${
        isOpen ? "scale-y-100 absolute" : "scale-y-0 hidden"
      } md:static md:w-auto md:flex md:gap-6`}>
        <NavButton onClick={() => setIsOpen(false)} href="/">Home</NavButton>
        <NavButton onClick={() => setIsOpen(false)} href="/about">About</NavButton>
        <NavButton onClick={() => setIsOpen(false)} href="/contact">Contact</NavButton>
      </div>
    </nav>
  );

}