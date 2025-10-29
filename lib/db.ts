import { Product } from './types';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export { revalidatePath };

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

export function getProducts(): Product[] {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products file:', error);
    return [];
  }
}

export function saveProducts(products: Product[]): void {
  try {
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error saving products file:', error);
    throw error;
  }
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getProducts();
  return products.find(product => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  const products = getProducts();
  return products.find(product => product.id === id);
}

export function createProduct(productData: Omit<Product, 'id' | 'lastUpdated'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...productData,
    id: Date.now().toString(),
    lastUpdated: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex(product => product.id === id);
  
  if (index === -1) {
    return null;
  }
  
  products[index] = {
    ...products[index],
    ...updates,
    lastUpdated: new Date().toISOString(),
  };
  
  saveProducts(products);
  return products[index];
}

export function validateApiKey(apiKey: string | null): boolean {
  const validKey = process.env.ADMIN_API_KEY || 'admin-secret-key-123';
  return apiKey === validKey;
}
