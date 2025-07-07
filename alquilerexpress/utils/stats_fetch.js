export async function getReservasEntreFetch(fechaInicio, fechaFin){
    const res = await fetch(`http://localhost:8080/reserva/entre-fechas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fechaInicio, fechaFin }),
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Error al obtener reservas");
      return [];
    }

    const data = await res.json();
    return data;
}

export async function getClientesEntreFetch(fechaInicio, fechaFin) {
  try {
    const res = await fetch("http://localhost:8080/reserva/clientes-entre-fechas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fechaInicio, fechaFin }),
      credentials: "include",
    });

    if (!res.ok) {
      const errorMsg = await res.text();
      console.error("Error al obtener clientes");
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error en getClientesEntreFetch:", err);
    return [];
  }
}

export async function getMontoEntreFetch(fechaInicio, fechaFin){
    try{
        const res = await fetch("http://localhost:8080/reserva/monto-entre-fechas" , {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fechaInicio, fechaFin }),
            credentials: "include",
        })

        if(!res.ok){
            const errorMsg = await res.text();
            console.error("Error al obtener total");
            return null;
        }

        const tot = await res.json();
        return tot.total || 0;
    } catch(err){
        console.error("Error en getMontoEntreFetch:", err);
        return null;
    }
}