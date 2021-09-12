import { configureStore, Action } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';

import { ThunkAction } from 'redux-thunk';
import horse from '../features/horses/horses.slice';

const preloadedState = {};

const allReducers = combineReducers({
  horse: horse,
});
//export type RootState = ReturnType<typeof allReducers>;

const store = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {Horses: HorsesState, }

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();
