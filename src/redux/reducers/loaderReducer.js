import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
};

const loaderSlice = createSlice({
  name: 'Loader',
  initialState,
  reducers: {
    SHOW_LOADER: (state) => {
      state.show = true;
    },
    HIDDEN_LOADER: (state) => {
      state.show = false;
    },
  },
});

export default loaderSlice.reducer;
export const { SHOW_LOADER, HIDDEN_LOADER } = loaderSlice.actions;
