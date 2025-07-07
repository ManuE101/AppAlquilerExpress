import { NextResponse } from "next/server";
import { getInmuebleById } from "../../../../utils/inmuebles_fetch";
import { Preference, MercadoPagoConfig } from "mercadopago";
import { cookies } from "next/headers"; // ✅ importás el helper

const mercadopago = new MercadoPagoConfig({
  accessToken: "APP_USR-412533297282542-052017-1f02203b19d8de48fdd23d1f95c44ff1-2448200083",
});


export async function POST(req: Request) {
  const cookieStore = await cookies(); // 👈 obtenés las cookies del request
  const token = cookieStore.get("access_token")?.value; // 👈 accedés al token
  
  try {
    const body = await req.json();
    const { productoId } = body;

    if (!productoId) {
      console.error("No se proporcionó productoId");
      return NextResponse.json({ error: "productoId requerido" }, { status: 400 });
    }

    const inmueble = await getInmuebleById(productoId);
    console.log("Inmueble obtenido:", inmueble);

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
        productoId: inmueble.id || productoId,
      fecha_inicio: body.fecha_inicio, // ← agregás las fechas
      fecha_fin: body.fecha_fin,  
        },
        back_urls: {
          success: `https://pd71ds4n-3000.brs.devtunnels.ms/confirmation?id=${productoId}&token=${token}`,
          failure: 'https://pd71ds4n-3000.brs.devtunnels.ms/failure',
        },
        external_reference: token,
        auto_return: "approved",
      },
    });

    return NextResponse.json({ init_point: preference.init_point });
  } catch (error: any) {
    console.error("Error interno al crear preferencia MP:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
