
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