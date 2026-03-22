import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-card rounded-[2rem] border border-border overflow-hidden animate-pulse h-[500px]">
            <div className="aspect-[4/5] bg-muted" />
            <div className="p-8 space-y-4">
              <div className="h-3 bg-muted rounded-full w-1/4" />
              <div className="h-10 bg-muted rounded-2xl w-full" />
              <div className="pt-8 flex justify-between">
                <div className="space-y-2">
                  <div className="h-2 bg-muted rounded-full w-10" />
                  <div className="h-6 bg-muted rounded-lg w-20" />
                </div>
                <div className="h-12 w-12 bg-muted rounded-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="bg-red-50 dark:bg-red-900/10 p-10 rounded-full mb-8 border border-red-500/20">
          <span className="text-5xl">⚠️</span>
        </div>
        <h2 className="text-3xl font-extrabold text-foreground tracking-tighter mb-4">Something went wrong</h2>
        <p className="text-muted-foreground font-medium max-w-md mx-auto mb-10">
          We encountered an unexpected error while fetching our collection.
          <code className="block mt-4 text-xs bg-muted p-3 rounded-xl border border-border">{error}</code>
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="bg-muted p-10 rounded-full mb-8">
          <span className="text-5xl">🔍</span>
        </div>
        <h2 className="text-3xl font-extrabold text-foreground tracking-tighter mb-4">No treasures found</h2>
        <p className="text-muted-foreground font-medium max-w-sm mb-10">
          Try adjusting your search or filters to discover our premium items.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
