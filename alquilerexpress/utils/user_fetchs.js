export async function getUser(token) {
  const res = await fetch("http://localhost:8080/user/get_user", {
    method: "GET",
    credentials: "include",
    headers: {
       Cookie: `access_token=${token}`, // envio forzozamente la cookie
       "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const msg = await res.text();
    console.error("getUser error:", msg);
    return null; // Devuelve null para que funcione notFound()
  } else {
    return await res.json();
  }
}

export async function getEmpleados() {
  const res = await fetch("http://localhost:8080/user/get_empleados", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const msg = await res.text();
    console.error("getEmpleados error:", msg);
    return null; // Devuelve null para que funcione notFound()
  } else {
    return await res.json();
  }
} 

export async function eliminarEmpleado(id) {
  const res = await fetch(`http://localhost:8080/user/eliminar_usuario/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const msg = await res.text();
    console.error("eliminarEmpleado error:", msg);
    return null; // Devuelve null para que funcione notFound()
  } else {
    return await res.json();
  }
} 