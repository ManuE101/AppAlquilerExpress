// "use client"
// import { registerFetch } from "../../../../utils/auth_fetchs";


// export default function RegisterPage() {
//  async function handleSubmit(event) {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const username = formData.get("username");
//     const password = formData.get("password");

//     try {
//       await registerFetch(username, password);
//       alert("Usuario registrado con exito!");
//       event.target.reset();
//     } catch (err) { 
//       alert(err.message);
//     }
//   }


//   return (
//     <div className="p-4 text-black flex flex-col w-full justify-center items-center">
//       <h1 className="text-2xl font-bold mb-4">Registro</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
//         <input
//           type="text"
//           name="username"
//           placeholder="Usuario"
//           className="border p-2"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Contraseña"
//           className="border p-2"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Registrarse
//         </button>
//       </form>
//     </div>
//   );
// }

"use client"
import { registerFetch } from "../../../../utils/auth_fetchs";

export default function RegisterPage() {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const birthdate = formData.get("birthdate");
    const dni = formData.get("dni");

    // validar > 18
    const birth = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    const isOver18 = age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

    if (!isOver18) {
      alert("Debes tener al menos 18 años para registrarte.");
      return;
    }

    try {
      await registerFetch(username, password, email, birthdate, dni);
      alert("Usuario registrado con exito!");
      event.target.reset();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="p-4 text-black flex flex-col w-full justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
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
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="border p-2"
          required
        />
        <input
          type="date"
          name="birthdate"
          placeholder="Fecha de nacimiento"
          className="border p-2"
          required
        />
        <input
          type="text"
          name="dni"
          placeholder="DNI"
          className="border p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
