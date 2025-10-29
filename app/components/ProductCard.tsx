'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="product-card">
        {product.image && (
          <img 
            src={product.image} 
            alt={product.name}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '10px'
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <h3>{product.name}</h3>
        <div className="price">{formatPrice(product.price)}</div>
        <p className="description">{product.description}</p>
        <div className="inventory">In Stock: {product.inventory} units</div>
        <span className={`badge ${
          product.inventory > 20 ? 'badge-success' : 
          product.inventory > 10 ? 'badge-warning' : 
          'badge-danger'
        }`}>
          {product.category}
        </span>
      </div>
    </Link>
  );
}




