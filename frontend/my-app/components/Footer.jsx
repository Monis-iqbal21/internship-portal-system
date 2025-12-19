"use client"
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-4 pb-6 mt-auto ">
      {/* Floating Island Container */}
      <div className="mx-auto max-w-6xl bg-[var(--accent)] bg-opacity-80 backdrop-blur-md border border-gray-100 shadow-xl rounded-[2.5rem] p-8 md:p-12 transition-all duration-300">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-2xl font-black tracking-tighter text-[var(--primary)]">
              GET INTERNIFY
            </Link>
            <p className="text-[var(--secondary)] text-sm leading-relaxed max-w-xs">
              Bridging the gap between ambitious students and industry-leading internships. Your career starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[var(--secondary)] uppercase tracking-widest text-xs">Navigation</h4>
            <Link href="/" className="text-sm hover:text-[var(--primary)] transition-colors ">Home</Link>
            <Link href="/about" className="text-sm hover:text-[var(--primary)] transition-colors ">About Us</Link>
            <Link href="/contact" className="text-sm hover:text-[var(--primary)] transition-colors ">Contact</Link>
          </div>

          {/* Newsletter/Socials Section */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[var(--secondary)] uppercase tracking-widest text-xs">Stay Connected</h4>
            <div className="flex gap-4">
              {/* Replace # with your social links */}
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all">
                <span className="sr-only">Twitter</span>
                𝕏
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all">
                in
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-medium">
            © {currentYear} Get Internify. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-[var(--primary)]">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-gray-400 hover:text-[var(--primary)]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;