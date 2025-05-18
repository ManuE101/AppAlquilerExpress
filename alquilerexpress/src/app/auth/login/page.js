'use client'
import { redirect } from "next/dist/server/api-utils";
import { loginFetch } from "../../../../utils/auth_fetchs";
import { useRouter } from 'next/navigation'



export default function LoginPage() {
  const router = useRouter()


  async function handleSubmit(event) {
      alert("boca")
      event.preventDefault();
  
      const formData = new FormData(event.target);
      const username = formData.get("username");
      const password = formData.get("password");
  
      try {
        await loginFetch(username, password);
        alert("Good to go");
        event.target.reset();  
        router.push("/")
      } catch (err) {
        alert(err.message);
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
