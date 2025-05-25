import { NextRequest } from "next/server";
import api from "../../../api";

export async function POST(req: NextRequest) {
  try {
    const { productoId } = await req.json();

    if (!productoId) {
      return new Response(JSON.stringify({ error: "Falta productoId" }), {
        status: 400,
      });
    }

    const init_point = await api.venta.submit(productoId);

    return new Response(JSON.stringify({ init_point }), { status: 200 });
  } catch (error) {
    console.error("Error en /api/create-order:", error);
    return new Response(
      JSON.stringify({ error: "Error al crear preferencia" }),
      { status: 500 }
    );
  }
}
