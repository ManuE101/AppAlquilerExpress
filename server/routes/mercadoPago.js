
// // SDK de Mercado Pago
// import { MercadoPagoConfig, Preference } from 'mercadopago';
// // Agrega credenciales
// const client = new MercadoPagoConfig({ accessToken: 'APP_USR-412533297282542-052017-1f02203b19d8de48fdd23d1f95c44ff1-2448200083' });


// // esto va en el index
// app.use('/generar', async(req, res) => {

// const preference = new Preference(client);

// preference.create({
//     body: {
//         items: [
//         {
//             title: 'Mi producto',
//             quantity: 1,
//             unit_price: 2000
//         }
//         ],
//     }
// })
// .then(console.log)
// .catch(console.log);

// });
import { Router } from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const router = Router();

const client = new MercadoPagoConfig({
  accessToken: 'APP_USR-XXXXXXXXXX' // Reemplazá con tu access token
});

router.post('/', async (req, res) => {
  try {
    const { title, unit_price, quantity } = req.body;

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title,
            quantity,
            unit_price
          }
        ],
        back_urls: {
          success: 'http://localhost:3000/success',
          failure: 'http://localhost:3000/failure',
          pending: 'http://localhost:3000/pending',
        },
        auto_return: 'approved'
      }
    });

    res.json({ id: result.id });
  } catch (error) {
    console.error('Error creando preferencia:', error);
    res.status(500).json({ error: 'Hubo un error al crear la preferencia' });
  }
});

export default router;

