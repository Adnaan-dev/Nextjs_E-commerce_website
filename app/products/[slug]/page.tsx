import { getProducts, getProductBySlug } from '@/lib/db';
import { formatPrice } from '@/lib/utils';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// This function generates the static paths at build time
export async function generateStaticParams() {
  const products = getProducts();
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// This page uses ISR (Incremental Static Regeneration)
// revalidate: 60 means the page will be regenerated at most once every 60 seconds
export const revalidate = 60;

export default async function ProductDetail({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <>
        <Navigation />
        <div className="container">
          <div className="card">
            <h2>Product Not Found</h2>
            <Link href="/" className="btn">Back to Home</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="card">
          <Link href="/" className="btn btn-secondary">← Back to Products</Link>
          
          <div style={{ marginTop: '20px' }}>
            <p className="alert alert-info">
              <strong>Rendering Strategy: ISR (Incremental Static Regeneration)</strong><br />
              This page is statically generated at build time, but will automatically 
              regenerate every 60 seconds if there's a request. This provides the 
              benefits of static performance with periodic updates for dynamic data 
              like prices and inventory levels.
            </p>

            {product.image && (
              <img 
                src={product.image} 
                alt={product.name}
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}
              />
            )}
            
            <h2>{product.name}</h2>
            <div className="badge" style={{ 
              backgroundColor: product.inventory > 20 ? '#d4edda' : 
                               product.inventory > 10 ? '#fff3cd' : '#f8d7da',
              color: product.inventory > 20 ? '#155724' : 
                     product.inventory > 10 ? '#856404' : '#721c24'
            }}>
              {product.category}
            </div>

            <div className="price" style={{ fontSize: '2.5rem', margin: '20px 0' }}>
              {formatPrice(product.price)}
            </div>

            <h3 style={{ marginTop: '30px' }}>Description</h3>
            <p>{product.description}</p>

            <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
              <h3>Inventory Information</h3>
              <p><strong>In Stock:</strong> {product.inventory} units</p>
              <p><strong>Last Updated:</strong> {new Date(product.lastUpdated).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}





