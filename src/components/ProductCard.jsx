import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, ArrowUpRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useAppContext();

  return (
    <div className="group bg-card text-card-foreground rounded-3xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
      <Link to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-white dark:bg-white/[0.03] flex items-center justify-center p-8 transition-colors duration-500">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/80 dark:bg-card/80 text-primary dark:text-primary-foreground text-[10px] font-bold px-2.5 py-1.5 rounded-lg uppercase tracking-widest backdrop-blur-md border border-primary/20 dark:border-primary/40 shadow-sm transition-all duration-300">
            {product.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-primary text-primary-foreground p-4 rounded-full scale-50 group-hover:scale-100 transition-transform duration-500 shadow-xl shadow-primary/30">
            <ArrowUpRight size={24} strokeWidth={2.5} />
          </div>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={`${i < Math.floor(product.rating.rate) ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`} 
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
            {product.rating.rate} • {product.rating.count} reviews
          </span>
        </div>
        
        <Link to={`/product/${product.id}`} className="flex-grow">
          <h3 className="font-bold text-foreground text-lg line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
            {product.title}
          </h3>
        </Link>
        
        <div className="mt-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Price</span>
            <span className="text-2xl font-extrabold text-foreground">${product.price}</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="bg-primary text-primary-foreground p-3.5 rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/20 group-hover:shadow-primary/40"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
