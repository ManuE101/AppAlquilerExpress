'use client';

import { useEffect, useState } from 'react';
import { fetchComments, postComment, deleteComment } from '../utils/api';

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // lo sacamos de la sesión

  useEffect(() => {
    loadComments();
    loadUser();
  }, []);

  async function loadComments() {
    try {
      const data = await fetchComments();
      setComments(data);
    } catch (e) {
      setError("Error al cargar comentarios");
    }
  }

  async function loadUser() {
    try {
      const res = await fetch("http://localhost:8080/user/me", {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.username);
      }
    } catch (e) {
      console.error("Error al obtener el usuario actual");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newComment = await postComment(text);
      setComments([...comments, newComment]);
      setText('');
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteComment(id);
      setComments(comments.filter(c => c.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <h1 className="flex-1 px-2 ">Comentarios</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {currentUser ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Escribí un comentario..."
            required
            rows={3}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <button type="submit">Publicar</button>
        </form>
      ) : (
        <p>Iniciá sesión para comentar</p>
      )}

      <ul style={{ marginTop: "1rem" }}>
        {comments.map(comment => (
          <li key={comment.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{comment.user}:</strong> {comment.text}
            {comment.user === currentUser && (
              <button
                onClick={() => handleDelete(comment.id)}
                style={{ marginLeft: "1rem", color: "red" }}
              >
                🗑 Borrar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
