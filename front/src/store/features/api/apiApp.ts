import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';
import { envConst } from '@/utils/envConstants';
import { Article, User } from '@/types';

export type UserResponse = {
  user: User;
  accessToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type GetArticlesQueryProp = {
  page: number;
  limit: number;
  search: string;
  datePub: boolean;
};
export type CreateArticleRequestProp = {
  id?: string;
  title: string;
  link?: string;
  content: string;
  videoLink?: string;
};

export const apiApp = createApi({
  reducerPath: 'api',
  tagTypes: ['Articles'],
  baseQuery: fetchBaseQuery({
    baseUrl: envConst.backend_api,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a accessToken in the store, let's use that for authenticated requests
      const accessToken = (getState() as RootState).auth.accessToken;
      if (accessToken) {
        headers.set('authorization', accessToken);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: `/auth/login`,
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
    checkAuth: builder.mutation<{ error: string }, void>({
      query: () => `/auth/check-auth`,
    }),
    register: builder.mutation<User, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    logOutCallApi: builder.mutation<'OK', void>({
      query: () => ({
        url: 'auth/logout',
        method: 'GET',
        credentials: 'include',
      }),
    }),
    updateAccessToken: builder.mutation<UserResponse, void>({
      query: () => ({
        url: 'auth/refresh-tokens',
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getArticles: builder.query({
      query: ({ page, limit, search, datePub }: GetArticlesQueryProp) => ({
        url: 'articles',
        params: { page, limit, contentOrTitle: search, datePub: datePub ? 'asc' : 'desc' },
      }),
      providesTags: [{ type: 'Articles', id: 'PARTIAL-LIST' }],
    }),
    getArticleById: builder.query<Article, string>({
      query: (id) => ({
        url: `articles/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Articles', id }],
    }),
    deleteArticleById: builder.mutation<Article, { id: string }>({
      query: (credentials) => ({
        url: `articles/${credentials.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Articles', id: 'PARTIAL-LIST' }],
    }),
    createArticle: builder.mutation<Article, CreateArticleRequestProp>({
      query: (credentials) => ({
        url: `articles`,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: () => [{ type: 'Articles', id: 'PARTIAL-LIST' }],
    }),
    updateArticles: builder.mutation<Article, CreateArticleRequestProp>({
      query: (credentials) => ({
        url: `articles/${credentials.id}`,
        method: 'PUT',
        body: credentials,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Articles', id: arg.id }],
    }),
  }),
});

export const {
  useLoginMutation,
  useCheckAuthMutation,
  useRegisterMutation,
  useLogOutCallApiMutation,
  useUpdateAccessTokenMutation,
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useDeleteArticleByIdMutation,
  useCreateArticleMutation,
  useUpdateArticlesMutation,
} = apiApp;

export default apiApp.reducer;
