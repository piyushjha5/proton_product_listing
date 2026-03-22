import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories')
        ]);

        if (!productsRes.ok || !categoriesRes.ok) throw new Error('Failed to fetch data');

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 animate-fade-in pb-6">
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Search and Filter Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-[hsl(var(--card))] border border-border p-4 md:px-6 md:py-4 rounded-2xl shadow-sm">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Product Grid Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-extrabold tracking-tight">
              {selectedCategory === 'all' ? 'All Collections' : <span className="capitalize">{selectedCategory}</span>}
            </h2>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              {filteredProducts.length} items found
            </p>
          </div>
          <ProductList products={filteredProducts} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Home;
