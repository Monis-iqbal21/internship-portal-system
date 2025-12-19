"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Send, 
  User, 
  LogOut, 
  GraduationCap 
} from 'lucide-react';

const StdSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/student', icon: <LayoutDashboard size={20} /> },
    { name: 'My Tasks', href: '/student/tasks', icon: <CheckSquare size={20} /> },
    { name: 'Submissions', href: '/student/submissions', icon: <Send size={20} /> },
    { name: 'Profile', href: '/student/profile', icon: <User size={20} /> },
  ];

  return (
    <aside className="hidden md:flex w-72 flex-col p-6 h-screen sticky top-0">
      {/* Main Container with Primary Color Background */}
      <div 
        style={{ backgroundColor: 'var(--primary)' }}
        className="h-full w-full rounded-[2.5rem] shadow-2xl p-8 flex flex-col text-white transition-all duration-300"
      >
        {/* Logo/Brand Section */}
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="bg-white p-2 rounded-xl">
            <GraduationCap className="text-[var(--primary)]" size={24} />
          </div>
          <h2 className="text-xl font-black tracking-tighter uppercase">Internify</h2>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 font-bold group ${
                  isActive 
                  ? 'bg-white text-[var(--primary)] shadow-lg scale-105' 
                  : 'hover:bg-white/10 text-white/80 hover:text-white'
                }`}
              >
                <span className={`${isActive ? 'text-[var(--primary)]' : 'text-white/60 group-hover:text-white'}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer/Logout Section */}
        <div className="pt-6 border-t border-white/10 mt-6">
          <button className="flex items-center gap-4 px-5 py-4 w-full rounded-2xl font-bold text-white/70 hover:bg-red-500/20 hover:text-white transition-all">
            <LogOut size={20} />
            Logout
          </button>
          <p className="text-[10px] text-white/40 text-center mt-6 font-medium tracking-widest uppercase">
            Student Portal v1.0
          </p>
        </div>
      </div>
    </aside>
  );
};

export default StdSidebar;