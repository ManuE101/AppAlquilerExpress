import Link from 'next/link';


export default function UserProfile({user}) { // si lo traigo puedo usar sus atributos aca
  return (
    <div className="flex flex-col items-center justify-center mt-2 h-auto text-black">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p className="text-lg">Welcome to your profile page!</p>
      <p className="text-lg">Here you can manage your account settings.</p>
      <Link className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" href={"http://localhost:3000/user/reservas"}> Ver reservas</Link>
      <Link className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" href={"http://localhost:3000/user/cancelaciones"}> Ver cancelaciones</Link>
    </div>
  );
}