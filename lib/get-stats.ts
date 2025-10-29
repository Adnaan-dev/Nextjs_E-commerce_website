import { Product } from './types';

export interface InventoryStats {
  totalProducts: number;
  totalInventory: number;
  lowStockProducts: number;
  averagePrice: number;
  categories: string[];
}

export function getInventoryStats(products: Product[]): InventoryStats {
  const totalProducts = products.length;
  const totalInventory = products.reduce((sum, product) => sum + product.inventory, 0);
  const lowStockProducts = products.filter(product => product.inventory < 10).length;
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice = totalProducts > 0 ? totalPrice / totalProducts : 0;
  const categories = [...new Set(products.map(product => product.category))];

  return {
    totalProducts,
    totalInventory,
    lowStockProducts,
    averagePrice,
    categories,
  };
}

