import { readFileSync, writeFileSync } from "node:fs";
import { MercadoPagoConfig, Preference } from "mercadopago";
//import { InmuebleRepository } from "../../server/repositories/inmueble-repository.js";
import { getInmuebleById } from "../utils/inmuebles_fetch";


interface Venta {
  id: number;
  productoId: string; 
}

export const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const api = {
  venta: {
    async list(): Promise<Venta[]> {
      const db = readFileSync("db/ventas.db");
      return JSON.parse(db.toString());
    },
    async add(venta: Venta): Promise<void> {
      const db = await api.venta.list();

      if (db.some((v) => v.id === venta.id)) {
        throw new Error("Venta ya registrada");
      }

      const draft = db.concat(venta);
      writeFileSync("db/ventas.db", JSON.stringify(draft, null, 2));
    },

    async submit(productoId: string) {
      const inmueble = await getInmuebleById(productoId);

      if (!inmueble) {
        throw new Error("Inmueble no encontrado");
      }

      const preference = await new Preference(mercadopago).create({
        body: {
          items: [
            {
              id: inmueble._id,
              title: inmueble.titulo,
              unit_price: inmueble.precio,
              quantity: 1,
            },
          ],
          metadata: {
            productoId: inmueble._id,
          },
        back_urls: {
            success: `${process.env.NEXT_PUBLIC_BASE_URL}/confirmacion?id=${inmueble._id}`,
            failure: `${process.env.NEXT_PUBLIC_BASE_URL}/error`,
        },
        auto_return: "approved",
        },
      });

       return preference.init_point!;
    },
  },
};

export default api;

