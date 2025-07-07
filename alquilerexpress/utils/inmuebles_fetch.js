export async function agregarInmueble({titulo,desc, puntaje, precio, habitaciones, domicilio, imagen}) {
    const res = await fetch("http://localhost:8080/inmueble/create_inmueble", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({titulo, desc, puntaje, precio, habitaciones, domicilio, imagen })
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    } else {
        return await res.json();
    }
}

export async function editarInmueble(id, {titulo, desc, puntaje, precio, habitaciones, domicilio, imagen}) {
    const res = await fetch(`http://localhost:8080/inmueble/update_inmueble/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({titulo, desc, puntaje, precio, habitaciones, domicilio, imagen })
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    } else {
        return await res.json();
    }
}

export async function eliminarInmueble(id) { 
    const res = await fetch(`http://localhost:8080/inmueble/delete_inmueble/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    } else {
        return await res.json();
    }
}


export async function getInmuebles() {
    const res = await fetch("http://localhost:8080/inmueble/get_Inmuebles", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    } else {
        return await res.json();
    }
}



export async function getFiltrados(filtrosLimpiados) {
    try {
    const res = await fetch("http://localhost:8080/inmueble/inmuebles_filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(filtrosLimpiados)
    });
    const data = await res.json();
    return data
  } catch (error) {
    console.error("Error al filtrar inmuebles:", error);
  }
}

export async function getReservas(id_Cliente) {
    try {
        const res = await fetch("http://localhost:8080/reserva/reservas_usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({id_Cliente})
        });
        const data = await res.json();
        return data
    } catch (error) {
        console.error("Error al filtrar inmuebles:", error);
    }
}


export async function getInmuebleById(id) {
    try {
        const res = await fetch(`http://localhost:8080/inmueble/get_byID/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        return data
    } catch (error) {
        console.error("Error al filtrar inmuebles:", error);
    }
}



export async function hacerReserva(id_inmueble,fecha_inicio, fecha_fin,token) {
    try {
        const res = await fetch("http://localhost:8080/reserva/make_reserva", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // 👈 lo agregás acá
            },
            credentials: "include",
            body: JSON.stringify({id_inmueble , fecha_inicio, fecha_fin})
        });
             if (!res.ok) {
            // No es 2xx, obtenemos texto para debug
            const text = await res.text();
            console.error("Error en respuesta del backend:", res.status, text);
            throw new Error(`Error en respuesta del backend: ${res.status}`);
        }
        const data = await res.json();
        return data
    } catch (error) {
        console.error("Error al filtrar inmuebles:", error);
    }
}

export async function hacerReservaPresencial(id_inmueble,fecha_inicio, fecha_fin, dni , token) {
    try {
        const res = await fetch("http://localhost:8080/reserva/make_reserva_presencial", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // 👈 lo agregás acá
            },
            credentials: "include",
            body: JSON.stringify({id_inmueble , fecha_inicio, fecha_fin , dni})
        });
             if (!res.ok) {
            // No es 2xx, obtenemos texto para debug
            const text = await res.text();
            console.error("Error en respuesta del backend:", res.status, text);
            throw new Error(`Error en respuesta del backend: ${res.status}`);
        }
        const data = await res.json();
        return data
    } catch (error) {
        console.error("Error al filtrar inmuebles:", error);
    }
}


export async function cancelarReserva(id_reserva) {
    try {
        const res = await fetch("http://localhost:8080/reserva/cancelar_reserva", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({id_reserva})
        });
        const data = await res.json();
        return data
    } catch (error) {
        console.error("Error al cancelar reserva", error);
    }
}

export async function getReservasCanceladas(id_Cliente) {
    try {
        const res = await fetch("http://localhost:8080/reserva/reservas_usuario_canceladas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({id_Cliente})
        });
        const data = await res.json();
        return data
    } catch (error) {
        console.error("Error al filtrar reservas:", error);
    }
}

export async function checkReserva(inmuebleId, fecha_inicio, fecha_fin) {
    console.log("CHECK RESERVA:", inmuebleId, fecha_inicio, fecha_fin);
  try {
   const url = `http://localhost:8080/reserva/check?id_inmueble=${inmuebleId}&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`;
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Error al consultar reserva");
    }

    const data = await res.json(); // { ok: true } o { ok: false, error: "...mensaje..." }
    return data;
  } catch (error) {
    console.error("Error en checkReserva:", error);
    throw error;
  }
}
