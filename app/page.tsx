import { getProducts } from '@/lib/db';
import { Product } from '@/lib/types';
import Navigation from './components/Navigation';
import ProductList from './components/ProductList';

// This page uses SSG (Static Site Generation)
// Data is fetched at build time using the 'generateStaticParams' pattern
export default async function Home() {
  const products = getProducts();

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="card">
          <h1>Products catalog</h1>
          <p className="alert alert-info">
            <strong>Rendering Strategy: SSG (Static Site Generation)</strong><br />
            This page is pre-rendered at build time. The product list is generated 
            once when you run <code>npm run build</code>, creating HTML files that 
            are served statically for optimal performance. The search and filter 
            functionality runs client-side, demonstrating the hybrid approach.
          </p>
          
          <ProductList products={products} />
        </div>
      </div>
    </>
  );
}
