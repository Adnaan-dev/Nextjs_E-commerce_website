import { GET, POST } from '@/app/api/products/route';
import { NextRequest } from 'next/server';
import { getProducts, createProduct, validateApiKey } from '@/lib/db';

// Mock the database module
jest.mock('@/lib/db');
jest.mock('@/lib/utils', () => ({
  slugify: (text: string) => text.toLowerCase().replace(/\s+/g, '-'),
}));

describe('/api/products', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return all products', async () => {
      const mockProducts = [
        {
          id: '1',
          name: 'Test Product',
          slug: 'test-product',
          description: 'Test description',
          price: 99.99,
          category: 'Electronics',
          inventory: 10,
          lastUpdated: '2024-01-01T00:00:00.000Z',
        },
      ];

      (getProducts as jest.Mock).mockReturnValue(mockProducts);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockProducts);
      expect(getProducts).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when fetching products fails', async () => {
      (getProducts as jest.Mock).mockImplementation(() => {
        throw new Error('Database error');
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch products');
    });
  });

  describe('POST', () => {
    const mockProductData = {
      name: 'New Product',
      description: 'New description',
      price: 199.99,
      category: 'Electronics',
      inventory: 5,
    };

    const mockCreatedProduct = {
      ...mockProductData,
      id: '123',
      slug: 'new-product',
      lastUpdated: '2024-01-01T00:00:00.000Z',
    };

    it('should create a product with valid API key', async () => {
      (validateApiKey as jest.Mock).mockReturnValue(true);
      (createProduct as jest.Mock).mockReturnValue(mockCreatedProduct);

      const request = new NextRequest('http://localhost/api/products', {
        method: 'POST',
        headers: {
          'x-api-key': 'admin-secret-key-123',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockProductData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual(mockCreatedProduct);
      expect(validateApiKey).toHaveBeenCalledWith('admin-secret-key-123');
      expect(createProduct).toHaveBeenCalled();
    });

    it('should reject request without valid API key', async () => {
      (validateApiKey as jest.Mock).mockReturnValue(false);

      const request = new NextRequest('http://localhost/api/products', {
        method: 'POST',
        headers: {
          'x-api-key': 'invalid-key',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockProductData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
      expect(createProduct).not.toHaveBeenCalled();
    });

    it('should reject request with missing required fields', async () => {
      (validateApiKey as jest.Mock).mockReturnValue(true);

      const request = new NextRequest('http://localhost/api/products', {
        method: 'POST',
        headers: {
          'x-api-key': 'admin-secret-key-123',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Test' }), // Missing fields
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Missing required fields');
    });

    it('should handle errors when creating product fails', async () => {
      (validateApiKey as jest.Mock).mockReturnValue(true);
      (createProduct as jest.Mock).mockImplementation(() => {
        throw new Error('Database error');
      });

      const request = new NextRequest('http://localhost/api/products', {
        method: 'POST',
        headers: {
          'x-api-key': 'admin-secret-key-123',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockProductData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to create product');
    });
  });
});






