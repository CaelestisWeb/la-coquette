import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

// Quitte le mode aperçu et revient au site publié.
export async function GET(request: Request) {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL('/', request.url));
}
