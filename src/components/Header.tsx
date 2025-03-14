'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiUser, FiLogOut } from "react-icons/fi"; // Importar íconos de react-icons

const DashboardHeader = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado del menú desplegable
  const menuRef = useRef(null); // Referencia para cerrar el menú al hacer clic fuera

  const handleLogin = () => {
    // Lógica para iniciar sesión (puedes integrar con NextAuth, Firebase, etc.)
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    // Lógica para cerrar sesión
    setIsAuthenticated(false);
    setIsMenuOpen(false); // Cerrar el menú al cerrar sesión
  };

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && (menuRef.current as HTMLElement).contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800">Panel de Control</h1>

        {isAuthenticated ? (
        
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-md bg-indigo-50 text-indigo-800 hover:bg-indigo-100 transition-colors"
            >
              <FiUser size={18} /> {/* Ícono de usuario */}
              <span>Mi Cuenta</span>
            </button>


            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiLogOut className="mr-2" size={16} /> {/* Ícono de cerrar sesión */}
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Botón de inicio de sesión
          <Link href="/dashboard/usuario">
            <button
              onClick={handleLogin}
              className="flex items-center space-x-2 p-2 rounded-md bg-indigo-50 text-indigo-800 hover:bg-indigo-100 transition-colors"
            >
              <FiUser size={18} /> {/* Ícono de usuario */}
              <span>Iniciar sesión</span>
            </button>
          </Link>
        )}
      </header>
    </div>
  );
};

export default DashboardHeader;