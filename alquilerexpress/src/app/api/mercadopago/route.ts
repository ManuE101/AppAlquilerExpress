import { Payment } from "mercadopago";
import { revalidatePath } from "next/cache";

import api, { mercadopago } from "../../../api";

export async function POST(request: Request) {
  const body: { data: { id: string } } = await request.json();

  try {
    const payment = await new Payment(mercadopago).get({ id: body.data.id });

    if (payment.status === "approved") {
      const productoId = payment.metadata?.productoId;

      if (!productoId) {
        console.error("No se encontró productoId en metadata");
        return new Response(null, { status: 400 });
      }

      // Guardamos la venta con el ID del pago como identificador único
      await api.venta.add({
        id: payment.id!,
        productoId: productoId,
      });

      // Revalidamos la página (por ejemplo, el listado de ventas)
      revalidatePath("/");

      return new Response(null, { status: 200 });
    }

    return new Response(null, { status: 204 }); // No aprobada, pero recibida
  } catch (error) {
    console.error("Error procesando webhook:", error);
    return new Response(null, { status: 500 });
  }
}
