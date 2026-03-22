import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative group w-full lg:max-w-md">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search size={16} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-4 py-2 bg-[hsl(var(--card))] border border-border rounded-xl text-sm transition-all focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary shadow-sm hover:shadow-md"
        placeholder="Search for items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
