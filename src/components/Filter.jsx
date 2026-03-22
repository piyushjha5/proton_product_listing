import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Filter as FilterIcon, Check } from 'lucide-react';

const Filter = ({ categories, selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full lg:min-w-[200px] lg:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-[hsl(var(--card))] border border-border rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary"
      >
        <div className="flex items-center gap-2 capitalize">
          <FilterIcon size={14} className="text-primary" />
          <span>{selectedCategory === 'all' ? 'All Collections' : selectedCategory}</span>
        </div>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[hsl(var(--card))] border border-border rounded-xl shadow-2xl overflow-hidden animate-fade-in py-1 max-h-[300px] overflow-y-auto no-scrollbar">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setIsOpen(false);
            }}
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors capitalize"
          >
            <span>All Collections</span>
            {selectedCategory === 'all' && <Check size={14} className="text-primary" />}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setIsOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors capitalize"
            >
              <span>{category}</span>
              {selectedCategory === category && <Check size={14} className="text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
