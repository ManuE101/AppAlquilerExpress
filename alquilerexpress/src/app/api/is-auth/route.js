import { cookies } from 'next/headers'

export async function GET() {
  // Obtener cookies que envía el navegador
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    return new Response(JSON.stringify({ loggedIn: false }), { status: 401 });
  }

  // Consulta a tu backend Node para validar el token
  const response = await fetch('http://localhost:8080/protected', {
    headers: {
      cookie: `access_token=${token}`
    },
    credentials: 'include'
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ loggedIn: false }), { status: 401 });
  }

  // Suponemos que backend responde con info del usuario
  const user = await response.json();

  return new Response(JSON.stringify({ loggedIn: true, user }), { status: 200 });
}
