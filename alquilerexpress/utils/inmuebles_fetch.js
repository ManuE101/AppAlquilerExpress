

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


export async function hacerReserva(id_inmueble,token) {
    try {
        const res = await fetch("http://localhost:8080/reserva/make_reserva", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // 👈 lo agregás acá
            },
            credentials: "include",
            body: JSON.stringify({id_inmueble , fecha_inicio: "2023-11-01", fecha_fin: "2023-11-05"})
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

export async function checkReserva(productoId, fecha_inicio, fecha_fin) {
  try {
    const res = await fetch(
      `http://localhost:8080/reserva/check?id_inmueble=${productoId}&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`
    );

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
