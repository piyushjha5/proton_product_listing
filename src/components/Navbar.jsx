import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, ShoppingBag, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode, cart } = useAppContext();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-primary rounded-xl text-primary-foreground group-hover:scale-110 transition-transform">
            <Zap size={22} fill="currentColor" />
          </div>
          <span className="text-2xl font-extrabold tracking-tighter bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            LUXE.
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl border border-border hover:bg-muted transition-all duration-300"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
          </button>

          <Link to="/cart" className="relative p-2.5 rounded-xl border border-border hover:bg-muted transition-all duration-300 group">
            <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-primary/20">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
