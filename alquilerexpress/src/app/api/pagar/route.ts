import { NextResponse } from "next/server";
import { getInmuebleById } from "../../../../utils/inmuebles_fetch";
import { Preference, MercadoPagoConfig } from "mercadopago";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productoId } = body;

    if (!productoId) {
      console.error("No se proporcionó productoId");
      return NextResponse.json({ error: "productoId requerido" }, { status: 400 });
    }

    const inmueble = await getInmuebleById(productoId);

    if (!inmueble || !inmueble.precio || !inmueble.titulo) {
      console.error("Inmueble inválido o incompleto:", inmueble);
      return NextResponse.json({ error: "Inmueble no válido o no encontrado" }, { status: 404 });
    }

    const preference = await new Preference(mercadopago).create({
      body: {
        items: [
          {
            id: inmueble._id || productoId,
            title: inmueble.titulo,
            unit_price: Number(inmueble.precio),
            quantity: 1,
          },
        ],
        metadata: {
          productoId: inmueble._id || productoId,
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/confirmacion?id=${productoId}`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/error`,
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({ init_point: preference.init_point });
  } catch (error: any) {
    console.error("Error interno al crear preferencia MP:", error.message || error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
