const API = 'http://localhost:8080/reseña';

export async function fetchReseñas(inmuebleId) {
  const res = await fetch(`${API}/${inmuebleId}`, {
    credentials: 'include'
  });
  return res.json();
}

export async function postReseña(inmuebleId, texto, estrellas) {
  const res = await fetch(`${API}/${inmuebleId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ texto, estrellas })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteReseña(id) {
  const res = await fetch(`${API}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({})
  });
  if (!res.ok) throw new Error(await res.text());
}
