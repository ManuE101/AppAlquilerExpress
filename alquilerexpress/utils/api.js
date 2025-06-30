const API = 'http://localhost:8080/comentario';

export async function fetchComments() {
  const res = await fetch(API, {
    credentials: 'include' // importante para enviar cookies (token de sesión)
  });
  return res.json();
}

export async function postComment(text) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ text })
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }

  return res.json();
}

export async function deleteComment(id) {
  const res = await fetch(`${API}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({})
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
}
