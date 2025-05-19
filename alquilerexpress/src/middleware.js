import { NextResponse } from 'next/server'  // Importa NextResponse para manejar respuestas en middleware

export function middleware(request) {
  const token = request.cookies.get('access_token')?.value  // Obtiene el token de la cookie 'access_token'
  const { pathname } = request.nextUrl  // Extrae la ruta (path) de la URL solicitada

  // Si la ruta es '/about' y no hay token, redirige al login
if (pathname === '/about' && !token && !pathname.startsWith('/auth')) {
  return NextResponse.redirect(new URL('/auth/login', request.url));
}

  
  return NextResponse.next()  // Si no, deja pasar la petición normalmente
}
export const config = {
  matcher: ['/about']  // Middleware solo se ejecuta para la ruta '/about'
}

