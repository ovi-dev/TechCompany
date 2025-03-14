import Link from "next/link";

export default function NotFound() {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 p-6">

        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-800">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-gray-700">Página no encontrada</h2>
          <p className="mt-2 text-gray-500">
            Lo sentimos, la página que buscas no existe o fue movida.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold shadow-md transition-transform hover:scale-105 hover:bg-blue-700"
          >
            Volver al inicio
          </Link>
        </div>
        
      </div>
    );
  }
  