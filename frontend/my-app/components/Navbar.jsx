"use client"
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const userEmail = "hello@internify.com";

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      {/* Floating Island - Now using Primary Color */}
      <div className="w-full max-w-6xl bg-[var(--primary)] bg-opacity-10 backdrop-blur-md border border-white/10 shadow-xl rounded-[2rem] px-6 py-3  md:py-4 transition-all duration-300 SafariBlur">
        <div className="flex items-center justify-between">
          
          {/* Logo - Changed to white for contrast against primary bg */}
          <Link href="/" className="text-2xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity">
            GET INTERNIFY
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 md:gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-sm font-semibold text-white/90 rounded-3xl px-4 py-2 md:px-2 md:py-1 md:bg-white md:text-(--primary) hover:text-[var(--primary)] hover:bg-[var(--accent)]  transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {isLoggedIn && (
              <>
                <Link href="/dashboard" className="text-sm font-semibold text-white/90  rounded-3xl px-4 py-2 md:px-2 md:bg-white md:text-(--primary)  md:py-1 hover:text-[var(--primary)] hover:bg-[var(--accent)]">
                  Dashboard
                </Link>
                <div className="h-4 w-[1px] bg-white/20 mx-2"></div>
                <span className="text-xs font-medium text-white/70 italic">{userEmail}</span>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-white text-[var(--primary)] px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Burger Button */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-current transition duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col gap-4 pb-4 border-t border-white/10 pt-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="font-medium text-white" onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="font-medium text-white" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <p className="text-xs text-white/60">{userEmail}</p>
                <button className="w-full bg-white text-[var(--primary)] py-3 rounded-2xl font-bold">Logout</button>
              </>
            ) : (
              <button className="w-full bg-white text-[var(--primary)] py-3 rounded-2xl font-bold">Login</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;