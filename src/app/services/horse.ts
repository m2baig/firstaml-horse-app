import http from '../../config/http-common';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHorse = createAsyncThunk('horse/fetchHorse', async () => {
  try {
    const response = await http.get('/horse');
    return response.data;
  } catch (e) {}
});

export const fetchHorseById = createAsyncThunk('horse/fetchHorseById', async (horseId: string) => {
  try {
    const response = await http.get(`/horse/${horseId}`);
    return response.data;
  } catch (e) {}
});
