import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import favouritesReducer from './favouritesSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, 
};

const persistedFavouritesReducer = persistReducer(persistConfig, favouritesReducer);

export const store = configureStore({
  reducer: {
    favourites: persistedFavouritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
