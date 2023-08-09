import { AppDispatch, State } from '../../types/state.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../../constants/api-route.ts';
import { AuthorizationStatus } from '../../constants/authorization-status.ts';
import { requireAuthorizationStatus } from '../action.ts';
import { dropToken, saveToken } from '../../services/token.ts';
import { AuthData, TUser } from '../../types/user.ts';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(ApiRoute.Login);
      dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorizationStatus(AuthorizationStatus.NotAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<TUser>(ApiRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(requireAuthorizationStatus(AuthorizationStatus.NotAuth));
  },
);
