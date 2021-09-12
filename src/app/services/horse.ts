import http from '../../config/http-common';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHorse = createAsyncThunk('horse/fetchHorse', async () => {
  try {
    const response = await http.get('/horse');
    const horses = response.data;

    return horses;
  } catch (e) {}
});
