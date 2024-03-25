import { createSlice } from '@reduxjs/toolkit';
import { apiApp } from '@/store/features/api/apiApp';
import { Article, User } from '@/types';
import { RootState } from '@/store/store';

export type InitialStateProp = {
  user: User | null;
  accessToken: string | null;
  articles: [] | Article[];
  countOfArticles: null | number;
};

const initialState: InitialStateProp = {
  accessToken: null,
  user: null,
  articles: [],
  countOfArticles: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(apiApp.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    });
    builder.addMatcher(apiApp.endpoints.updateAccessToken.matchFulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
