import { createSlice } from '@reduxjs/toolkit';
import { fetchHorse, fetchHorseById, updateHorseById } from '../../app/services/horse';
import { Status } from '../../interfaces/status.enum';

import IHorseDto from '../../interfaces/horse.interface';
import { RootState } from '../../app/store';

interface IState {
  status: Status;
  horses?: IHorseDto[];
  horse?: IHorseDto;
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
      })
      .addCase(fetchHorseById.pending, (state, action) => {
        state = Object.assign(state, { horse: {} });
      })
      .addCase(fetchHorseById.fulfilled, (state, action) => {
        state.horse = action.payload;
      })
      .addCase(updateHorseById.fulfilled, (state, action) => {
        if (state.horses) {
          const horseId = action.payload.id;
          const horseIndex = state.horses.findIndex((horse) => horse.id === horseId);
          state.horses[horseIndex] = action.payload;
        }
      });
  },
});

export default horseSlice.reducer;
export const selectHorseById = (state: RootState, horseId: string) =>
  state.horse.horses?.find((horse: IHorseDto) => horse.id === horseId);

export const selectedHorseById = (state: RootState) => state.horse?.horse;
