import { createSlice } from '@reduxjs/toolkit';

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    isLanguageRu: true,
  },
  reducers: {
    toggleLanguage: (state, action) => {
      state.isLanguageRu = action.payload.isDark as boolean;
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;

export const themeReducer = languageSlice.reducer;
