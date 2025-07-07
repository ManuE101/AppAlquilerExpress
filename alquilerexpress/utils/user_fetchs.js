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

export async function editarEmpleado(id,form) {
  const res = await fetch(`http://localhost:8080/user/editar_usuario/${id}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(form),
    headers: { 
      "Content-Type": "application/json" 
    },
  });


  //CHAT GPT AAAH HELP
  if (!res.ok) {
    const { message } = await res.json();

    let errorMsg = "Error al editar el empleado.";

    try {
      const parsed = JSON.parse(message);
      const errores = Object.values(parsed)
        .flatMap((campo) => campo._errors || [])
        .filter(Boolean);
      if (errores.length > 0) {
        errorMsg = errores.join("\n");
      }
    } catch (e) {
      errorMsg = message;
    }

    throw new Error(errorMsg);
  } else {
    return await res.json();
  }
} 


export  async function getUserByDNI(dni) {
  const res = await fetch(`http://localhost:8080/user/get_byID?id=${dni}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const msg = await res.text();
    console.error("getUserByDNI error:", msg);
    return null; // Devuelve null para que funcione notFound()
  } else {
    return await res.json();
  }
}

export async function cambiarRol(id) {
  const res = await fetch(`http://localhost:8080/user/cambiar_rol/${id}`, {
    method: "PUT",
    credentials: "include",
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Error al cambiar el rol: ${msg}`);
  } else {
    console.log("cambiarRol response:", res);
    return await res.json();
  }
}