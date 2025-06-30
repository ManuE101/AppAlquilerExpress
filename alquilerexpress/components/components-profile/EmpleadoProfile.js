import Link from 'next/link';


export default function EmpleadoProfile({user}) {
  return (
    <div className="flex flex-col items-center justify-center mt-2 h-auto text-black">
      <h1 className="text-2xl font-bold mb-4">KIKIRIKI GIL LABURANTE</h1>
      <p className="text-lg">A LABURAAAAAAAAAAAAAAAAAAAAR</p>
      <Link className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" target="_blank" href={"https://x.com/DevoxPosting/status/1906995409416855857"}> Mira!</Link>
    </div>
  );
}