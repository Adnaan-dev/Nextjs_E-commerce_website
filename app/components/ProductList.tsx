'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [filter, setFilter] = useState({ search: '', category: '' });
  
  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(filter.search.toLowerCase()) ||
                           product.description.toLowerCase().includes(filter.search.toLowerCase());
      const matchesCategory = !filter.category || product.category === filter.category;
      return matchesSearch && matchesCategory;
    });
  }, [products, filter]);

  return (
    <>
      <ProductFilter onFilterChange={setFilter} categories={categories} />
      
      {filter.search && (
        <p style={{ marginBottom: '15px', color: '#666' }}>
          Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} matching "{filter.search}"
        </p>
      )}
      
      {filter.category && (
        <p style={{ marginBottom: '15px', color: '#666' }}>
          Category: {filter.category}
        </p>
      )}
      
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found. Try adjusting your search or filter criteria.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
}





