import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import errorReducer from './slices/ErrorSlice'
// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

// Persistor for the store
export const persistor = persistStore(store)

// RootState type
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
