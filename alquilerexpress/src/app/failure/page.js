"use client";

import { useEffect, useState } from "react";

export default function FailurePage() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
    const timeout = setTimeout(() => {
      window.location.href = "http://localhost:3000/";
    }, 4000);

    return () => clearTimeout(timeout); // Limpieza
  }, []);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
            <h1 className="text-3xl font-bold text-red-600 mb-2">¡Error!</h1>
            <p className="text-lg text-gray-700">
              No se pudo completar la reserva. Por favor, intentá nuevamente más tarde.
            </p>
            <p className="mt-4 text-sm text-gray-500">Redirigiendo al inicio...</p>
          </div>
        </div>
      )}

      {!showModal && (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <p className="text-gray-600">Procesando...</p>
        </div>
      )}
    </>
  );
}
