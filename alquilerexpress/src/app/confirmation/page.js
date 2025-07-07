"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function confirmar() {
      const payment_id = searchParams.get("id");
      const token = searchParams.get("token");

      if (!payment_id || !token) {
        setError("Faltan datos para confirmar la reserva");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://tu-backend/confirmar?payment_id=${payment_id}&token=${token}`, {
  method: "GET",
});

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Error al confirmar la reserva");
        } else {
          setSuccess(true);
        }
      } catch (e) {
        setError("Error de red al confirmar la reserva");
      } finally {
        setLoading(false);
      }
    }

    confirmar();
  }, [searchParams]);

  if (loading) return <p>Confirmando reserva...</p>;
  if (error) return <p>Error: {error}</p>;
  if (success)
    return (
      <div>
        <h1>Reserva confirmada con éxito</h1>
        <p>Gracias por tu compra.</p>
      </div>
    );

  return null;
}
