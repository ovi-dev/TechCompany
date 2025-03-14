import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TechCompanys</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Directorio de empresas tecnológicas líderes en el sector.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/empresas" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Empresas</Link></li>
              <li><Link href="/categorias" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Categorías</Link></li>
              <li><Link href="/sobre-nosotros" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Sobre Nosotros</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <address className="not-italic text-gray-600 dark:text-gray-400">
              <p>Email: info@techcompanys.com</p>
              <p>Teléfono: +34 123 456 789</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} TechCompanys. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}