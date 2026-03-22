import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Star, ChevronRight, Bookmark, Share2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useAppContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="w-full lg:w-1/2 aspect-[4/5] bg-muted rounded-3xl" />
          <div className="w-full lg:w-1/2 space-y-8 py-6">
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-16 bg-muted rounded w-3/4" />
            <div className="h-6 bg-muted rounded w-1/3" />
            <div className="space-y-4 pt-10">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <h2 className="text-3xl font-extrabold mb-6">Product Not Found</h2>
        <Link to="/" className="bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all">
          <ArrowLeft size={18} /> Back to Luxe Library
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 pb-10 pt-4 animate-fade-in max-w-7xl">
      <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary transition-colors">Products</Link>
        <ChevronRight size={12} className="text-muted-foreground/50" />
        <span className="text-primary">{product.category}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
        {/* Left Column: Image */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-28 self-start">
          <div className="relative group bg-white dark:bg-white/[0.03] p-12 md:p-20 rounded-[3rem] border border-border overflow-hidden shadow-2xl shadow-primary/5 transition-colors duration-500">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto aspect-[4/5] object-contain group-hover:scale-110 transition-transform duration-700 animate-float"
            />
            <div className="absolute top-8 right-8 flex flex-col gap-3">
              <button 
                onClick={() => toast.success("This feature will be released soon")}
                className="p-3 bg-card border border-border rounded-full hover:bg-muted transition-all shadow-sm"
              >
                <Bookmark size={20} className="text-foreground" />
              </button>
              <button 
                onClick={() => toast.success("This feature will be released soon")}
                className="p-3 bg-card border border-border rounded-full hover:bg-muted transition-all shadow-sm"
              >
                <Share2 size={20} className="text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="w-full lg:w-1/2 flex flex-col py-4">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 bg-white/80 dark:bg-card/80 text-primary dark:text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-primary/20 dark:border-primary/40 shadow-sm backdrop-blur-md transition-all duration-300">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tighter leading-[1.1]">
              {product.title}
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 bg-yellow-400/10 text-yellow-600 px-3 py-1.5 rounded-xl border border-yellow-400/20">
                <Star size={18} className="fill-yellow-500 text-yellow-500" />
                <span className="font-extrabold text-sm">{product.rating.rate}</span>
              </div>
              <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">({product.rating.count} Customer Reviews)</span>
            </div>
          </div>

          <div className="mt-12 space-y-8">
            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-[0.3em] block mb-2">Price</span>
              <span className="text-5xl font-black text-foreground">${product.price}</span>
            </div>
            
            <div className="pt-8 border-t border-border">
              <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4">Description</h3>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                {product.description}
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-5">
            <button
              onClick={() => addToCart(product)}
              className="flex-grow flex items-center justify-center gap-4 bg-primary text-primary-foreground px-10 py-5 rounded-[2rem] font-bold text-lg hover:scale-[1.03] active:scale-95 transition-all shadow-2xl shadow-primary/30"
            >
              <ShoppingBag size={22} strokeWidth={2.5} />
              Add to Luxe Bag
            </button>
            <Link
              to="/"
              className="px-10 py-5 border-2 border-border rounded-[2rem] font-bold text-lg flex items-center justify-center gap-2 hover:bg-muted transition-all"
            >
              Explore more
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4">
            <div className="bg-muted/30 p-6 rounded-3xl border border-border/50 text-center">
              <span className="block text-xl mb-2 font-bold italic">Premium</span>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-muted-foreground">Certified Quality</span>
            </div>
            <div className="bg-muted/30 p-6 rounded-3xl border border-border/50 text-center">
              <span className="block text-xl mb-2 font-bold italic">Secure</span>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-muted-foreground">Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
