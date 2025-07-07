'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { handle2FA } from '../../../../utils/auth_fetchs';

export default function VerifyPage() {
  const router = useRouter();
  const params = useSearchParams();
  const username = params.get("username");

  const [codigo, setCodigo] = useState("");

  async function handleVerificacion(event) {
    event.preventDefault();

    try {
      await handle2FA(username, codigo);
      alert("Verificación exitosa");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("El código ingresado no es correcto");
    }
  }

  return (
    <div className="p-4 max-w-md m-auto text-black">
      <h2 className="text-xl mb-4">Verificación 2FA</h2>
      <p>Se envió un código a tu correo</p>
      <form onSubmit={handleVerificacion} className="flex flex-col gap-3">
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Código de verificación"
          className="border p-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">
          Verificar
        </button>
      </form>
    </div>
  );
}