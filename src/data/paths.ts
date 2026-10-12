// Astro sets BASE_URL from the configured GitHub Pages repository path.
export const basePath = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const sitePath = (path = '') => `${basePath}${path.replace(/^\/+/, '')}`;
