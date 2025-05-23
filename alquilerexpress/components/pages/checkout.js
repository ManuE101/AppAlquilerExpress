import { useState } from 'react';
import CheckoutButton from '@/components/CheckoutButton';

export default function CheckoutPage() {
  const [preferenceId, setPreferenceId] = useState(null);

  const crearPreferencia = async () => {
    const res = await fetch('http://localhost:4000/generar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Producto ejemplo',
        quantity: 1,
        unit_price: 2000
      })
    });

    const data = await res.json();
    setPreferenceId(data.id);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Checkout</h1>
      <button onClick={crearPreferencia}>
        Generar Link de Pago
      </button>

      {preferenceId && (
        <CheckoutButton preferenceId={preferenceId} />
      )}
    </div>
  );
}
