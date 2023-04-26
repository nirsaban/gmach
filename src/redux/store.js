import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import loaderReducer from './loaderSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage
};

const reducers = combineReducers({
  users: userReducer,
  loader: loaderReducer
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export const persistor = persistStore(store);

export default store;
