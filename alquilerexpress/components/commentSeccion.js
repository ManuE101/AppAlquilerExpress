"use client";
import { useEffect, useState } from "react";

export default function CommentSection({ inmuebleId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  // Cargar comentarios
  useEffect(() => {
    fetch(`http://localhost:8080/comentario/${inmuebleId}`, { credentials: "include" })
      .then(res => res.json())
      .then(setComments);
  }, [inmuebleId]);

  // Cargar usuario
  useEffect(() => {
    fetch("http://localhost:8080/user/get_user", { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error("No logueado");
        return res.json();
      })
      .then(setCurrentUser)
      .catch(() => setCurrentUser(null));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`http://localhost:8080/comentario/${inmuebleId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error("No autorizado");
      const nuevo = await res.json();
      setComments([...comments, nuevo]);
      setText("");
    } catch (err) {
      setError("No tenés permiso para comentar.");
    }
  };

  const handleReplySubmit = async (comentarioId, e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/comentario/${inmuebleId}/${comentarioId}/responder`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: replyText })
      });
      if (!res.ok) throw new Error();
      const nueva = await res.json();
      setComments(prev =>
        prev.map(c =>
          c.id === comentarioId
            ? { ...c, respuestas: [...(c.respuestas || []), nueva] }
            : c
        )
      );
      setReplyText("");
      setReplyingTo(null);
    } catch {
      setError("No tenés permiso para responder.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/comentario/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      setComments(prev =>
        prev
          .map(c => ({
            ...c,
            respuestas: c.respuestas?.filter(r => r.id !== id) || [],
          }))
          .filter(c => c.id !== id || c.respuestas?.length > 0)
      );
    } catch {
      setError("No tenés permiso para borrar.");
    }
  };

  const puedeEliminar = (autor) =>
    currentUser &&
    (currentUser.username === autor || currentUser.rol === "admin" || currentUser.rol === "empleado");

  const puedeResponder = currentUser?.rol === "admin" || currentUser?.rol === "empleado";

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">Comentarios</h2>

      {error && <p className="text-red-600 mb-4 font-medium">{error}</p>}

      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            className="w-full p-3 border border-gray-300 rounded resize-none"
            rows={3}
            value={text}
            onChange={e => setText(e.target.value)}
            required
            placeholder="Escribí un comentario..."
          />
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Publicar
          </button>
        </form>
      ) : (
        <p className="mb-6 text-gray-600 italic">Iniciá sesión para comentar</p>
      )}

      <ul className="space-y-6">
        {comments.map(c => (
          <li key={c.id} className="border border-gray-200 rounded p-4 bg-gray-50">
            <div className="flex justify-between">
              <div>
                <strong className="text-blue-700">{c.user}</strong>: {c.text}
              </div>
              <div className="flex gap-2">
                {puedeEliminar(c.user) && (
                  <button onClick={() => handleDelete(c.id)} className="text-red-500">🗑</button>
                )}
                {puedeResponder && (
                  <button
                    onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                    className="text-gray-600"
                  >
                    ↪ Responder
                  </button>
                )}
              </div>
            </div>

            {replyingTo === c.id && (
              <form onSubmit={e => handleReplySubmit(c.id, e)} className="mt-2">
                <textarea
                  className="w-full p-2 border rounded"
                  rows={2}
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  required
                  placeholder="Tu respuesta..."
                />
                <button className="mt-1 bg-green-600 text-white px-3 py-1 rounded">Enviar</button>
              </form>
            )}

            {c.respuestas?.length > 0 && (
              <ul className="mt-3 ml-4 space-y-2 border-l-2 border-gray-200 pl-4">
                {c.respuestas.map(r => (
                  <li key={r.id} className="flex justify-between items-center bg-white p-2 rounded">
                    <div>
                      <strong className="text-blue-700">{r.user}</strong>: {r.text}
                    </div>
                    {puedeEliminar(r.user) && (
                      <button onClick={() => handleDelete(r.id)} className="text-red-500">🗑</button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
