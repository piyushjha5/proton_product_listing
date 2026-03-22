import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useAppContext();
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in px-6">
        <div className="bg-muted p-10 rounded-full mb-8 relative">
          <ShoppingBag size={64} className="text-muted-foreground/50" />
          <div className="absolute top-0 right-0 bg-primary w-4 h-4 rounded-full animate-ping" />
        </div>
        <h2 className="text-4xl font-extrabold text-foreground tracking-tighter mb-4">Your Bag is Empty</h2>
        <p className="text-muted-foreground max-w-sm mb-10 font-medium">
          The finest things in life are waiting for you. Start building your curated collection today.
        </p>
        <Link
          to="/"
          className="bg-primary text-primary-foreground px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in px-6 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-12 border-b border-border pb-6 gap-4">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-primary block mb-2">Checkout</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tighter text-foreground leading-tight">Shopping Bag</h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-500 uppercase tracking-widest hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-grow space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="group bg-card p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border border-border flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative">
              <div className="w-full sm:w-28 h-40 sm:h-28 bg-white dark:bg-white/[0.03] p-4 rounded-xl sm:rounded-2xl border border-border/50 flex-shrink-0 relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="flex-grow py-2 text-center sm:text-left w-full">
                <Link to={`/product/${item.id}`} className="font-extrabold text-foreground text-lg sm:text-xl hover:text-primary transition-colors line-clamp-2 sm:line-clamp-1 leading-tight mb-1 block">
                  {item.title}
                </Link>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 sm:mb-4">{item.category}</p>
                
                <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">Price</span>
                    <span className="text-lg sm:text-xl font-black">${item.price}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">Quantity</span>
                    <span className="text-lg sm:text-xl font-black">× {item.quantity}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 p-3 sm:p-4 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl sm:rounded-2xl transition-all"
                aria-label="Remove item"
              >
                <Trash2 size={20} sm:size={22} strokeWidth={2.5} />
              </button>
            </div>
          ))}
          
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all mt-4"
          >
            <ArrowLeft size={16} strokeWidth={2.5} /> Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-[380px] shrink-0 sticky top-28 self-start">
          <div className="bg-card p-8 rounded-[2.5rem] border border-border shadow-2xl shadow-primary/5">
            <h3 className="text-xl font-extrabold tracking-tight mb-8">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-muted-foreground font-medium">
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-muted-foreground font-medium">
                <span>Shipping</span>
                <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Free</span>
              </div>
              <div className="flex justify-between text-muted-foreground font-medium border-t border-border pt-4 mt-4">
                <span className="text-foreground font-bold">Total</span>
                <span className="text-2xl font-black text-foreground">${totalPrice}</span>
              </div>
            </div>

            <button 
              onClick={() => toast.success("This feature will be released soon")}
              className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 group"
            >
              Checkout Now
              <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="mt-8 flex items-center justify-center gap-4 py-4 px-6 bg-muted/50 rounded-2xl border border-border">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Premium Shipping Included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
