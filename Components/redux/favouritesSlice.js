import { createSlice } from '@reduxjs/toolkit';

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    services: [],
  },
  reducers: {
    addFavourite: (state, action) => {
      // Check if already added (avoid duplicates)
      const alreadyExists = state.services.some(
        (service) => service.id === action.payload.id
      );
      if (!alreadyExists) {
        state.services.push(action.payload);
      }
    },
    removeFavourite: (state, action) => {
      // Remove by service id
      state.services = state.services.filter(
        (service) => service.id !== action.payload
      );
    },
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
