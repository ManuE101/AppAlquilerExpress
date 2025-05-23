
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
        const res = await fetch("http://localhost:8080/inmueble/reservas_usuario", {
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
            },
            credentials: "include"
        });
        const data = await res.json();
        return data
    } catch (error) {
        console.error("Error al filtrar inmuebles:", error);
    }
}


export async function hacerReserva(id_inmueble) {
    try {
        const res = await fetch("http://localhost:8080/reserva/make_reserva", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({id_inmueble , fecha_inicio: "2023-11-01", fecha_fin: "2023-11-05"})
        });
        const data = await res.json();
        return data
    } catch (error) {
        console.error("Error al filtrar inmuebles:", error);
    }
}