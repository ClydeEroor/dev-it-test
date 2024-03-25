import { Token, User } from '@prisma/client';

export interface Tokens {
  user: User;
  accessToken: string;
  refreshToken: Token;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string[];
}

export interface ParsedArticle {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: Date;
}

export interface ParsedItem {
  items: ParsedArticle | ParsedArticle[];
  feedUrl: string;
  image: {
    link: string;
    url: string;
    title: string;
  };
  paginationLinks: { self: string };
  title: string;
  description: string;
  generator: string;
  link: string;
  language: string;
  copyright: string;
  lastBuildDate: string;
  ttl: string;
}
