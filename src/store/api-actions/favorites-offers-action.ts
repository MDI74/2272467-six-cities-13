import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.ts';
import { AxiosInstance } from 'axios';
import { TOffer } from '../../types/offers.ts';
import { ApiRoute } from '../../constants/api-route.ts';


export const fetchFavoritesOffers = createAsyncThunk<TOffer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoritesOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TOffer[]>(ApiRoute.Favorite);

    return data;
  },
);

export const favoritesOffersChangeStatus = createAsyncThunk<void, { id: TOffer['id']; status: 0 | 1 }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeStatus',
  async ({ id, status }, { dispatch, extra: api }) => {
    await api.post<TOffer>(`${ApiRoute.Favorite}/${id}/${status}`);
    dispatch(fetchFavoritesOffers());
  },
);
