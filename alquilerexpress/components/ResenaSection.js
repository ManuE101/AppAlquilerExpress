"use client";
import { useEffect, useState } from "react";

export default function ResenaSection({ inmuebleId }) {
  const [resenas, setResenas] = useState([]);
  const [texto, setTexto] = useState("");
  const [estrellas, setEstrellas] = useState(5);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  // Obtener reseñas del inmueble
  useEffect(() => {
    fetch(`http://localhost:8080/resena/${inmuebleId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setResenas);
  }, [inmuebleId]);

  // Obtener usuario actual
  useEffect(() => {
    fetch("http://localhost:8080/user/get_user", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setCurrentUser)
      .catch(() => setCurrentUser(null));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`http://localhost:8080/resena/${inmuebleId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto, estrellas }),
      });

      if (!res.ok) throw new Error();
      const nueva = await res.json();
      setResenas((prev) => [...prev, nueva]);
      setTexto("");
      setEstrellas(5);
    } catch {
      setError("No tenés permiso para dejar una reseña.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/resena/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setResenas((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setError("No tenés permiso para eliminar esta reseña.");
    }
  };

  const puedeEliminar = (autor) =>
    currentUser &&
    (currentUser.username === autor ||
      currentUser.rol === "admin" ||
      currentUser.rol === "empleado");

  const renderEstrellas = (cant) => {
    return "★".repeat(cant) + "☆".repeat(5 - cant);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
        Reseñas
      </h2>

      {error && <p className="text-red-600 mb-4 font-medium">{error}</p>}

      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-medium">Tu calificación:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setEstrellas(n)}
                className={`text-2xl ${
                  n <= estrellas ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
            className="w-full p-2 border rounded resize-none"
            rows={3}
            placeholder="Escribí tu reseña..."
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Publicar reseña
          </button>
        </form>
      ) : (
        <p className="mb-6 text-gray-600 italic">
          Iniciá sesión para dejar una reseña
        </p>
      )}

      <ul className="space-y-6">
        {resenas.map((r) => (
          <li
            key={r.id}
            className="border border-gray-200 rounded p-4 bg-gray-50"
          >
            <div className="flex justify-between">
              <div>
                <strong className="text-blue-700">{r.user}</strong>
                <div className="text-yellow-400">
                  {renderEstrellas(r.estrellas)}
                </div>
                <p>{r.texto}</p>
              </div>
              {puedeEliminar(r.user) && (
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
