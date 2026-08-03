import { env } from '$env/dynamic/private';
import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function randomState() {
  return crypto.randomUUID().replaceAll('-', '').slice(0, 16);
}

export const GET: RequestHandler = ({ url }) => {
  const provider = url.searchParams.get('provider');
  if (provider !== 'github') error(400, 'Invalid provider');

  const clientId = env.GITHUB_OAUTH_ID;
  if (!clientId) error(500, 'Missing GITHUB_OAUTH_ID');

  const repoIsPrivate = env.GITHUB_REPO_PRIVATE && env.GITHUB_REPO_PRIVATE !== '0';
  const scope = repoIsPrivate ? 'repo,user' : 'public_repo,user';
  const redirectUri = `${url.origin}/api/cms/callback?provider=github`;

  const githubUrl = new URL('https://github.com/login/oauth/authorize');
  githubUrl.searchParams.set('response_type', 'code');
  githubUrl.searchParams.set('client_id', clientId);
  githubUrl.searchParams.set('redirect_uri', redirectUri);
  githubUrl.searchParams.set('scope', scope);
  githubUrl.searchParams.set('state', randomState());

  redirect(302, githubUrl.toString());
};
