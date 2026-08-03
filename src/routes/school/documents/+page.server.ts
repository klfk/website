import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const COOKIE_NAME = 'school_docs_auth';
// Session lasts 8 hours — enough for an interview day
const MAX_AGE_SEC = 60 * 60 * 8;

export const load: PageServerLoad = async ({ cookies }) => {
  const password = env.SCHOOL_DOCS_PASSWORD ?? '';
  const token    = cookies.get(COOKIE_NAME) ?? '';

  // Treat as authenticated only when both sides are non-empty and match
  const authenticated = password !== '' && token === password;

  return { authenticated };
};

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const data     = await request.formData();
    const entered  = (data.get('pin') ?? '').toString().trim();
    const password = env.SCHOOL_DOCS_PASSWORD ?? '';

    if (!password) {
      // Env variable not configured — fail loudly so it is noticed during setup
      return fail(500, { error: 'Passwort nicht konfiguriert. Bitte SCHOOL_DOCS_PASSWORD setzen.' });
    }

    if (entered !== password) {
      return fail(403, { error: 'Falscher PIN. Bitte nochmals versuchen.' });
    }

    cookies.set(COOKIE_NAME, password, {
      path:     '/school/documents',
      httpOnly: true,
      sameSite: 'strict',
      secure:   true,      // Cloudflare Pages always runs on HTTPS
      maxAge:   MAX_AGE_SEC,
    });

    return { authenticated: true };
  },

  logout: async ({ cookies }) => {
    cookies.delete(COOKIE_NAME, { path: '/school/documents' });
  },
};
