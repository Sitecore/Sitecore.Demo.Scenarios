'use server';

import { cookies } from 'next/headers';

export async function createHasVisitedCookie() {
  cookies().set('hasVisited', 'true');
}
