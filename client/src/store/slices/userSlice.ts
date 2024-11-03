import { InitialState } from '@/typings/auth.types';
import { createSlice } from '@reduxjs/toolkit'
import { REHYDRATE } from 'redux-persist'



const initialState: InitialState = {
  userDetails: null,
  token: null,
  isLoggedIn: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userDetails = action.payload
      state.isLoggedIn = true
    },
    setAuthToken: (state, action) => {
      state.token = action.payload
    },
    clearUser: (state) => {
      state.userDetails = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action: any) => {
      if (action.payload && action.payload.user) {
        return {
          ...state,
          ...action.payload.user,
        }
      }
    })
  }
})

export const {
  setUser,
  setAuthToken,
  clearUser,
} = userSlice.actions

export default userSlice.reducer
