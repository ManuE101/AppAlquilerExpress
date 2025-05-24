import { useEffect } from 'react';

export default function CheckoutButton({ preferenceId }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => {
      const mp = new window.MercadoPago('APP_USR-5690be50-cfa7-4c1a-a4fd-5acb75f01651', {
        locale: 'es-AR',
      });

      mp.checkout({
        preference: {
          id: preferenceId,
        },
        render: {
          container: '.cho-container',
          label: 'Pagar con Mercado Pago',
        },
      });
    };
    document.body.appendChild(script);
  }, [preferenceId]);

  return <div className="cho-container" />;
}

// import React from 'react';
// import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// // Inicializa Mercado Pago con tu public key
// initMercadoPago('YOUR_PUBLIC_KEY');

// const App = () => {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
//       <h1>Botón de Pago</h1>
//       <p>Haz clic en el botón para realizar el pago.</p>
//       {/* Renderiza el botón de pago */}
//       <div style={{ width: '300px' }}>
//         <Wallet initialization={{ preferenceId: 'YOUR_PREFERENCE_ID' }} />
//       </div>
//     </div>
//   );
// };

// export default App;

