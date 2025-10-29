import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// POST /api/revalidate - On-demand ISR revalidation
// This demonstrates revalidation on update (ISR on-demand)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, secret } = body;

    // Simple secret check (in production, use a secure token)
    if (secret !== 'my-super-secret-revalidate-token') {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    if (!path) {
      return NextResponse.json(
        { error: 'Path is required' },
        { status: 400 }
      );
    }

    // Revalidate the path
    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      path,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 }
    );
  }
}






