import { getProducts } from '@/lib/db';
import { getInventoryStats } from '@/lib/get-stats';
import Navigation from '../components/Navigation';
import Link from 'next/link';

// This page uses SSR (Server-Side Rendering)
// Data is fetched on EVERY request to ensure real-time statistics
export default function Dashboard() {
  const products = getProducts();
  const stats = getInventoryStats(products);
  const lowStockProducts = products.filter(p => p.inventory < 10);

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>Inventory Dashboard</h1>
        
        <div className="card" style={{ marginBottom: '20px' }}>
          <p className="alert alert-info">
            <strong>Rendering Strategy: SSR (Server-Side Rendering)</strong><br />
            This page is rendered on the server for every request, ensuring you always 
            see the latest inventory data. This is perfect for dashboards that need 
            real-time information, but it's slower than static pages because it 
            processes on each request.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.totalProducts}</h3>
            <p>Total Products</p>
          </div>
          <div className="stat-card">
            <h3>{stats.totalInventory}</h3>
            <p>Total Inventory</p>
          </div>
          <div className="stat-card">
            <h3>{stats.lowStockProducts}</h3>
            <p>Low Stock Items</p>
          </div>
          <div className="stat-card">
            <h3>${stats.averagePrice.toFixed(2)}</h3>
            <p>Average Price</p>
          </div>
        </div>

        <div className="card" style={{ marginTop: '30px' }}>
          <h2>Categories</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {stats.categories.map((category) => (
              <span key={category} className="badge badge-success">
                {category}
              </span>
            ))}
          </div>
        </div>

        {lowStockProducts.length > 0 && (
          <div className="card" style={{ marginTop: '20px' }}>
            <h2 style={{ color: '#dc3545' }}>⚠️ Low Stock Alert</h2>
            <div className="product-grid">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <h3>{product.name}</h3>
                  <p className="description">{product.description}</p>
                  <div className="badge badge-danger">
                    Only {product.inventory} in stock
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <Link href="/admin" className="btn">
            Manage Products →
          </Link>
        </div>
      </div>
    </>
  );
}





