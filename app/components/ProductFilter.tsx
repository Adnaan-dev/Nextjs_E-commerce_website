'use client';

import { useState } from 'react';

interface ProductFilterProps {
  onFilterChange: (filter: { search: string; category: string }) => void;
  categories: string[];
}

export default function ProductFilter({ onFilterChange, categories }: ProductFilterProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({ search: value, category });
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setCategory(value);
    onFilterChange({ search, category: value });
  }

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
      <div style={{ flex: '1', minWidth: '200px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1rem'
          }}
        />
      </div>
      <div style={{ minWidth: '150px' }}>
        <select
          value={category}
          onChange={handleCategoryChange}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}





