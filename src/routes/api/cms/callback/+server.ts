import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function callbackHtml(status: 'success' | 'error', token = '') {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Authorizing Decap</title>
    <script>
      const receiveMessage = () => {
        window.opener.postMessage(
          'authorization:github:${status}:' + JSON.stringify({ token: ${JSON.stringify(token)} }),
          '*'
        );
        window.removeEventListener('message', receiveMessage, false);
      };
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:github', '*');
    </script>
  </head>
  <body><p>Authorizing Decap...</p></body>
</html>`;
}

export const GET: RequestHandler = async ({ url, fetch }) => {
  const provider = url.searchParams.get('provider');
  if (provider !== 'github') error(400, 'Invalid provider');

  const code = url.searchParams.get('code');
  if (!code) error(400, 'Missing code');

  const clientId = env.GITHUB_OAUTH_ID;
  const clientSecret = env.GITHUB_OAUTH_SECRET;
  if (!clientId || !clientSecret) error(500, 'Missing GitHub OAuth environment variables');

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `${url.origin}/api/cms/callback?provider=github`,
      grant_type: 'authorization_code'
    })
  });

  const data = await response.json();
  if (!response.ok || !data.access_token) {
    return new Response(callbackHtml('error'), {
      status: 502,
      headers: { 'Content-Type': 'text/html' }
    });
  }

  return new Response(callbackHtml('success', data.access_token), {
    headers: { 'Content-Type': 'text/html' }
  });
};
