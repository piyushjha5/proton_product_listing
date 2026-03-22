import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import { useAppContext } from './context/AppContext';

function App() {
  const { darkMode } = useAppContext();

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out ${darkMode ? 'dark bg-background text-foreground' : 'bg-background text-foreground'}`}>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pb-12 pt-2 md:pt-0 max-w-7xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <footer className="border-t border-border py-12 text-center text-xs font-bold uppercase tracking-[0.4em] opacity-40">
        <p>© {new Date().getFullYear()} LUXE. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
