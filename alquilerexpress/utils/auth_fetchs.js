'use client'

export async function registerFetch(username, password) {
  const res = await fetch("http://localhost:8080/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }

  return await res.json().catch(() => null); // si no hay json devuelve null
}


export async function loginFetch(username,password) {
    const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      })

      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg)
      }
}

export async function logOutFetch() {
  fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials: 'include'
    })
}