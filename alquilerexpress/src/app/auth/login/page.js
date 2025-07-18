'use client'
import { redirect } from "next/dist/server/api-utils";
import { loginFetch } from "../../../../utils/auth_fetchs";
import { useRouter } from 'next/navigation'



export default function LoginPage() {
  const router = useRouter()


  async function handleSubmit(event) {
      event.preventDefault();
  
      const formData = new FormData(event.target);
      const username = formData.get("username");
      const password = formData.get("password");
  
      try {
        const resp = await loginFetch(username, password);
        if(resp.requires2FA){
          router.push(`/verify?username=${encodeURIComponent(username)}`);
        }
        alert("Good to go");
        event.target.reset();
        window.location.href = "/"; 
      } catch (err) {
        console.error(err);
        alert("El usuario o la contraseña son incorrectos");
      }
    }

  return (
    <div className="p-4 max-w-md m-auto text-black">
      <h2 className="text-xl mb-4">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
         <input
          type="text"
          name="username"
          placeholder="Usuario"
          className="border p-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="border p-2"
          required
        />
        <button className="bg-green-500 text-white px-4 py-2" type="submit">Ingresar</button>
      </form>
    </div>
  )
}
