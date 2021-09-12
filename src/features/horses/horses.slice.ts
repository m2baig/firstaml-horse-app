import { createSlice } from '@reduxjs/toolkit';
import { fetchHorse } from '../../app/services/horse';
import { Status } from '../../interfaces/status.enum';

import IHorseDto from '../../interfaces/horse.interface';

interface IState {
  status: Status;
  horses?: IHorseDto[];
}
const initialState: IState = {
  status: Status.INIT,
  horses: [],
};

const horseSlice = createSlice({
  name: 'horse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHorse.pending, (state, action) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchHorse.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.horses = action.payload;
      })
      .addCase(fetchHorse.rejected, (state, action) => {
        state.status = Status.FAILED;
      });
  },
});

export default horseSlice.reducer;
