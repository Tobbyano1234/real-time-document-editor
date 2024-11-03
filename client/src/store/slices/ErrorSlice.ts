import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  isOpen: boolean;
  message: string;
}

const initialState: ErrorState = {
  isOpen: false,
  message: '',
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.message = action.payload;
    },
    hideError: (state) => {
      state.isOpen = false;
      state.message = '';
    },
  },
});

export const { showError, hideError } = errorSlice.actions;
export default errorSlice.reducer;