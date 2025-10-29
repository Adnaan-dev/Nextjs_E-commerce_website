import { NextRequest, NextResponse } from 'next/server';
import { updateProduct, getProductById, validateApiKey, revalidatePath } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const apiKey = request.headers.get('x-api-key');
    if (!validateApiKey(apiKey)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const body = await request.json();
    const updatedProduct = await updateProduct(id, body);

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }

    revalidatePath(`/products/${updatedProduct.slug}`);
    revalidatePath(`/products/${updatedProduct.slug}/page`);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Internal server error during update' },
      { status: 500 }
    );
  }
}
