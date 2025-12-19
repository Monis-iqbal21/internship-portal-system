"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Menu,
  X,
} from "lucide-react";

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpandingName, setIsExpandingName] = useState(false);

  const menuItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Students",
      href: "/dashboard/students",
      icon: <Users size={20} />,
    },
    { name: "Tasks", href: "/dashboard/tasks", icon: <FileText size={20} /> },
    {
      name: "Domains",
      href: "/dashboard/domains",
      icon: <Settings size={20} />,
    },
  ];

  // Dual-stage animation logic for Mobile
  const toggleSidebar = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Wait for horizontal icon expansion before showing names
      setTimeout(() => setIsExpandingName(true), 300);
    } else {
      setIsExpandingName(false);
      setTimeout(() => setIsOpen(false), 300);
    }
  };

  return (
    <>
      {/* 1. Mobile Burger Trigger (Top Left) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-24 left-6 z-[40] p-3 bg-[var(--primary)] text-white rounded-2xl shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 2. Sidebar Container */}
      <aside
        className={`
          fixed top-4 left-4 z-50 transition-all duration-500 ease-in-out
          /* Desktop/Tablet (1000px range) Logic */
          md:h-[90vh] lg:w-72 min-[768px]:max-[1100px]:w-20
          /* Mobile Logic */
          ${isOpen ? "w-[90%] h-[80vh]" : "w-0 h-0 opacity-0 md:opacity-100"}
        `}
      >
        <div
          style={{ backgroundColor: "var(--primary)" }}
          className="h-full w-full   rounded-[2.5rem] shadow-2xl p-4 md:p-6 flex flex-col text-white overflow-hidden"
        >
          {/* Header - Hide text on smaller screens */}
          <div className="flex flex-row justify-between mb-5  align-center px-2">
            <h2
              className={`text-xl font-black py-4 px-2  tracking-tighter wrap-normal transition-opacity duration-300
            min-[768px]:max-[1100px]:opacity-0 align-middle ${
              isExpandingName ? "opacity-100" : "opacity-0 md:opacity-100"
            }`}
            >
              ADMIN
            </h2>
            <button
              onClick={toggleSidebar}
              className="md:hidden   p-3 bg-[var(--primary)] text-white  h-12  my-2 rounded-2xl shadow-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <nav className="flex-1 space-y-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => window.innerWidth < 768 && toggleSidebar()}
                  className={`flex items-center gap-4 p-3 rounded-2xl transition-all font-bold ${
                    isActive
                      ? "bg-white text-[var(--primary)] shadow-lg"
                      : "hover:bg-white/10 text-white/80"
                  }`}
                >
                  <div className="min-w-[24px] flex justify-center">
                    {item.icon}
                  </div>

                  {/* Name expansion logic */}
                  <span
                    className={`transition-all duration-300 whitespace-nowrap overflow-hidden
                    min-[768px]:max-[1100px]:w-0 min-[768px]:max-[1100px]:opacity-0
                    ${
                      isExpandingName
                        ? "w-auto opacity-100"
                        : "w-0 opacity-0 md:w-auto md:opacity-100"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div
            className={`pt-6 border-t border-white/10 transition-opacity
            min-[768px]:max-[1100px]:opacity-0 ${
              isExpandingName ? "opacity-100" : "opacity-0 md:opacity-100"
            }`}
          >
            <p className="text-[10px] text-white/50 text-center font-medium">
              Internify v1.0
            </p>
          </div>
        </div>
      </aside>

      {/* 3. Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        />
      )}
    </>
  );
};

export default AdminSidebar;
