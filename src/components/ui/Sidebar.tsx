// import Link from "next/link";

// const menuItems = [
//   { name: "Dashboard", href: "/dashboard" },
//   { name: "Usuarios", href: "/dashboard/users" },
//   { name: "Ajustes", href: "/dashboard/settings" },
// ];

// export default function Sidebar({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
//   return (
//     <aside className={`bg-gray-800 text-white w-64 p-4 fixed h-full transition-transform ${isOpen ? "translate-x-0" : "-translate-x-64"}`}>
//       <button onClick={toggle} className="text-white text-xl">✖</button>
//       <nav className="mt-6 space-y-4">
//         {menuItems.map((item) => (
//           <Link key={item.href} href={item.href} className="block p-2 hover:bg-gray-700 rounded">
//             {item.name}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }
