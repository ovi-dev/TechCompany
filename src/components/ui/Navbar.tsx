'use client';
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiHome, FiUsers, FiChevronDown, FiChevronRight, FiUserPlus, FiList } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menuId: string) => {
    if (openSubmenu === menuId) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(menuId);
    }
  };

  const menuItems = [
    { 
      id: "dashboard",
      icon: <FiHome size={20} />, 
      text: "Dashboard", 
      href: "/dashboard" 
    },
    { 
      id: "clientes",
      icon: <FiUsers size={20} />, 
      text: "Clientes", 
      submenu: true,
      items: [
        { icon: <FiUserPlus size={18} />, text: "Cliente Nuevo", href: "/dashboard/cliente/nuevo-cliente" },
        { icon: <FiList size={18} />, text: "Lista de Clientes", href: "/dashboard/cliente/lista-clientes" },
      ]
    },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-indigo-800 text-white shadow-xl transition-all duration-300 flex flex-col p-5 min-h-screen`}
    >
      <div className="flex items-center justify-between mb-10">
        {isOpen && <h2 className="text-xl font-bold">TechCompany</h2>}
        <button
          className="p-2 rounded-md hover:bg-indigo-700 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <nav className="space-y-3">
        {menuItems.map((item) => (
          <div key={item.id} className="flex flex-col">
            {item.submenu ? (
              <>
                <div 
                  className="flex items-center justify-between p-2 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
                  onClick={() => toggleSubmenu(item.id)}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    {isOpen && <span>{item.text}</span>}
                  </div>
                  {isOpen && (
                    openSubmenu === item.id ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />
                  )}
                </div>
                {isOpen && openSubmenu === item.id && (
                  <div className="ml-5 mt-1 space-y-1">
                    {item.items?.map((subItem, idx) => (
                      <Link href={subItem.href} key={idx}>
                        <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer">
                          {subItem.icon}
                          <span>{subItem.text}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link href={item.href || "#"}>
                <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer">
                  {item.icon}
                  {isOpen && <span>{item.text}</span>}
                </div>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Navbar;