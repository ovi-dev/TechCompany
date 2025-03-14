
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";
import { FiUser } from "react-icons/fi";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col bg-gray-100">
        
        {/* Header */}
        
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
    <h1 className="text-lg font-semibold text-gray-800">Panel de Control</h1>
    <Link href="/dashboard/usuario">
      <button className="flex items-center space-x-2 p-2 rounded-md bg-indigo-50 text-indigo-800 hover:bg-indigo-100 transition-colors">
        <FiUser size={18} />
        <span>Iniciar sesión</span>
      </button>
    </Link>
  </header>

        {/* Contenido dinámico de cada página */}
        <div className="flex-1 p-5">{children}</div>
      </main>
    </div>
  );
}
