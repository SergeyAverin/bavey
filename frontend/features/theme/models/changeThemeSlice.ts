import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: true,
  },
  reducers: {
    toggleTheme: (state, action) => {
      state.darkMode = action.payload.isDark as boolean;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;

