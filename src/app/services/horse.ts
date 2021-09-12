import http from '../../config/http-common';
import { createAsyncThunk } from '@reduxjs/toolkit';
import IHorseDto from '../../interfaces/horse.interface';

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

export const updateHorseById = createAsyncThunk('horse/updateHorseById', async (horse: IHorseDto) => {
  try {
    const response = await http.put(`/horse/${horse.id}`, horse);
    return response.data;
  } catch (e) {}
});
