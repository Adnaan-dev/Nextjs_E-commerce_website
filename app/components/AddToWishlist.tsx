'use client';

import { useState } from 'react';

interface AddToWishlistProps {
  productId: string;
}

export default function AddToWishlist({ productId }: AddToWishlistProps) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setAdded(true);
    // In a real app, this would make an API call to add to wishlist
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button 
      onClick={handleAdd}
      className="btn"
      style={{ width: '100%' }}
    >
      {added ? '✓ Added to Wishlist!' : 'Add to Wishlist'}
    </button>
  );
}





