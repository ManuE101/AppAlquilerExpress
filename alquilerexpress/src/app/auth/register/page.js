import RegisterForm from "../../../../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="p-4 text-black flex flex-col w-full justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <RegisterForm  />
    </div>
  );
}