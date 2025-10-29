import { GET } from '@/app/api/products/[slug]/route';
import { getProductBySlug } from '@/lib/db';

// Mock the database module
jest.mock('@/lib/db');

describe('/api/products/[slug]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return product by slug', async () => {
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      slug: 'test-product',
      description: 'Test description',
      price: 99.99,
      category: 'Electronics',
      inventory: 10,
      lastUpdated: '2024-01-01T00:00:00.000Z',
    };

    (getProductBySlug as jest.Mock).mockReturnValue(mockProduct);

    const params = { slug: 'test-product' };
    const response = await GET({} as any, { params });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockProduct);
    expect(getProductBySlug).toHaveBeenCalledWith('test-product');
  });

  it('should return 404 for non-existent product', async () => {
    (getProductBySlug as jest.Mock).mockReturnValue(undefined);

    const params = { slug: 'non-existent' };
    const response = await GET({} as any, { params });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('Product not found');
  });

  it('should handle errors when fetching product fails', async () => {
    (getProductBySlug as jest.Mock).mockImplementation(() => {
      throw new Error('Database error');
    });

    const params = { slug: 'test-product' };
    const response = await GET({} as any, { params });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to fetch product');
  });
});






