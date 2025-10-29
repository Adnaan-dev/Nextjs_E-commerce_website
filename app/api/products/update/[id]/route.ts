import { NextRequest, NextResponse } from 'next/server';
import { updateProduct, getProductById, validateApiKey, revalidatePath } from '@/lib/db';

// PUT /api/products/update/[id] - Update an existing product (protected) with on-demand revalidation
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check for API key in headers
    const apiKey = request.headers.get('x-api-key');
    
    if (!validateApiKey(apiKey)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const product = getProductById(id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updatedProduct = updateProduct(id, body);

    // On-demand revalidation - revalidate the product detail page
    revalidatePath(`/products/${updatedProduct.slug}`);
    revalidatePath(`/products/${updatedProduct.slug}/page`);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}
