const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  "admin": {
    "articles": {
      _id: (id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/admin/articles/[id]' as const, query: { id }, hash: url?.hash, path: `/admin/articles/${id}${buildSuffix(url)}` })
      })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/admin' as const, hash: url?.hash, path: `/admin${buildSuffix(url)}` })
  },
  "auth": {
    "register": {
      $url: (url?: { hash?: string }) => ({ pathname: '/auth/register' as const, hash: url?.hash, path: `/auth/register${buildSuffix(url)}` })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/auth' as const, hash: url?.hash, path: `/auth${buildSuffix(url)}` })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash, path: `/${buildSuffix(url)}` })
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  favicon_ico: '/favicon.ico',
  next_svg: '/next.svg',
  vercel_svg: '/vercel.svg'
} as const;

export type StaticPath = typeof staticPath;
