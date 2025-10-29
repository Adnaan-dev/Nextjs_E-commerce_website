import { getProducts } from '@/lib/db';
import Navigation from '../components/Navigation';
import ProductCard from '../components/ProductCard';
import AddToWishlist from '../components/AddToWishlist';

// This page uses Server Components
// The data fetching happens on the server, but includes a client component
export default function Recommendations() {
  const products = getProducts();
  
  // Simulate fetching "recommended" products (top 3 by price)
  const recommendedProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="card">
          <h1>Recommended Products</h1>
          <p className="alert alert-info">
            <strong>Rendering Strategy: Server Components</strong><br />
            This page uses React Server Components. The product list is fetched and rendered 
            on the server for better performance and SEO, while the "Add to Wishlist" button 
            is an interactive Client Component. This demonstrates the hybrid approach where 
            you can mix server and client components based on your needs.
          </p>

          <div className="product-grid">
            {recommendedProducts.length === 0 ? (
              <p>No products available. Add products from the Admin panel.</p>
            ) : (
              recommendedProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                  <div style={{ marginTop: '10px' }}>
                    <AddToWishlist productId={product.id} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}





