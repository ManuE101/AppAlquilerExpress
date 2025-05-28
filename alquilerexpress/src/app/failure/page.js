export default function FailurePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">¡Error!</h1>
      <p className="text-lg text-gray-700 mb-6">
        No se pudo completar la reserva. Por favor, inténtalo de nuevo más tarde.
      </p>
      <a
        href="http://localhost:3000"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
      >
        Volver al inicio
      </a>
    </div>
  );
}