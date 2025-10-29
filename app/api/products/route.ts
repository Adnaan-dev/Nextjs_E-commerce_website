import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct, validateApiKey } from '@/lib/db';
import { slugify } from '@/lib/utils';

// GET /api/products - Fetch all products
export async function GET() {
  try {
    const products = getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Add a new product (protected)
export async function POST(request: NextRequest) {
  try {
    // Check for API key in headers
    const apiKey = request.headers.get('x-api-key');
    
    if (!validateApiKey(apiKey)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, price, category, inventory, image } = body;

    // Validate required fields
    if (!name || !description || price === undefined || !category || inventory === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newProduct = createProduct({
      name,
      slug: slugify(name),
      description,
      price,
      category,
      inventory,
      image,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
