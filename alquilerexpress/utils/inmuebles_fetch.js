
export async function getInmuebles() {
    const res = await fetch("http://localhost:8080/inmueble/get_Inmuebles", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    } else {
        return res;
    }
}

export async function getFiltrados(filtrosLimpiados) {
    try {
    const res = await fetch("http://localhost:8080/inmuebles-filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(filtrosLimpiados)
    });
    const data = await res.json();
    console.log("Inmuebles filtrados:", data);
    // Aquí puedes actualizar el estado de tu lista de inmuebles si lo necesitas
  } catch (error) {
    console.error("Error al filtrar inmuebles:", error);
  }
}