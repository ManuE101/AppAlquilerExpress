export async function registerFetch(data) {
  const res = await fetch("http://localhost:8080/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }

  return await res.json().catch(() => null); // si no hay json devuelve null
}



export async function loginFetch(username,password) {
    const res = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      })

      if (!res.ok) {
        console.log(res)
        const msg = await res.text()
        throw new Error(msg)
      }
}

export async function logOutFetch() {
  fetch('http://localhost:8080/user/logout', {
      method: 'POST',
      credentials: 'include'
    })
}


export async function empleadoRegisterFetch(data) {
  const res = await fetch("http://localhost:8080/user/agregar_empleado", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }

  return await res.json().catch(() => null); // si no hay json devuelve null
}