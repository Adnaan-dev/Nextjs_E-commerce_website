'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Product, ProductFormData } from '@/lib/types';
import Link from 'next/link';

// This page uses CSR (Client-Side Rendering)
// Data is fetched and rendered entirely on the client side
export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    inventory: 0,
    image: '',
  });

  const API_KEY = 'admin-secret-key-123'; // In production, use environment variable

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
        setFormData({ name: '', description: '', price: 0, category: '', inventory: 0, image: '' });
        alert('Product created successfully!');
      } else {
        alert('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    }
  }

  async function handleUpdate(productId: string) {
    try {
      const response = await fetch(`/api/products/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify(editingProduct),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map(p => p.id === productId ? updatedProduct : p));
        setEditingProduct(null);
        alert('Product updated successfully!');
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  }

  async function handleDelete(productId: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    // For now, we'll just update to 0 inventory since we don't have a delete endpoint
    const product = products.find(p => p.id === productId);
    if (product) {
      const updatedProduct = { ...product, inventory: 0 };
      
      try {
        const response = await fetch(`/api/products/update/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
          body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
          setProducts(products.map(p => p.id === productId ? { ...p, inventory: 0 } : p));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>Admin Panel</h1>
        
        <div className="card" style={{ marginBottom: '20px' }}>
          <p className="alert alert-info">
            <strong>Rendering Strategy: CSR (Client-Side Rendering)</strong><br />
            This page is rendered entirely on the client side using React. All data 
            is fetched after the page loads using JavaScript. This provides a 
            highly interactive experience with instant updates without page reloads, 
            perfect for admin interfaces and forms.
          </p>
        </div>

        <div className="card">
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Product Name</label>
              <input
                type="text"
                value={editingProduct?.name || formData.name}
                onChange={(e) => editingProduct 
                  ? setEditingProduct({...editingProduct, name: e.target.value})
                  : setFormData({...formData, name: e.target.value})
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Description</label>
              <textarea
                value={editingProduct?.description || formData.description}
                onChange={(e) => editingProduct
                  ? setEditingProduct({...editingProduct, description: e.target.value})
                  : setFormData({...formData, description: e.target.value})
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={editingProduct?.price || formData.price}
                onChange={(e) => editingProduct
                  ? setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})
                  : setFormData({...formData, price: parseFloat(e.target.value)})
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Category</label>
              <input
                type="text"
                value={editingProduct?.category || formData.category}
                onChange={(e) => editingProduct
                  ? setEditingProduct({...editingProduct, category: e.target.value})
                  : setFormData({...formData, category: e.target.value})
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Inventory</label>
              <input
                type="number"
                value={editingProduct?.inventory || formData.inventory}
                onChange={(e) => editingProduct
                  ? setEditingProduct({...editingProduct, inventory: parseInt(e.target.value)})
                  : setFormData({...formData, inventory: parseInt(e.target.value)})
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Image URL</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={editingProduct?.image || formData.image}
                onChange={(e) => editingProduct
                  ? setEditingProduct({...editingProduct, image: e.target.value})
                  : setFormData({...formData, image: e.target.value})
                }
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {editingProduct ? (
                <>
                  <button type="button" className="btn" onClick={() => handleUpdate(editingProduct.id)}>
                    Update Product
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingProduct(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button type="submit" className="btn">
                  Add Product
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="card" style={{ marginTop: '30px' }}>
          <h2>Existing Products</h2>
          {products.length === 0 ? (
            <p>No products yet. Add one above.</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
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
                  <p className="description">{product.description}</p>
                  <div className="price">${product.price.toFixed(2)}</div>
                  <div className="badge" style={{ 
                    backgroundColor: product.inventory > 20 ? '#d4edda' : 
                                     product.inventory > 10 ? '#fff3cd' : '#f8d7da'
                  }}>
                    {product.category} - Stock: {product.inventory}
                  </div>
                  <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => setEditingProduct(product)}
                      style={{ fontSize: '0.85rem', padding: '5px 10px' }}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleDelete(product.id)}
                      style={{ fontSize: '0.85rem', padding: '5px 10px' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
