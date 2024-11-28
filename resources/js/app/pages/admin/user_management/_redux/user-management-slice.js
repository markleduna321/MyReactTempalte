import { createSlice } from '@reduxjs/toolkit'

const path = window.location.hash.substring(1); // Get the hash without the first character
const hash = path.split('&')[0];

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    user:{},
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
        state.user = action.payload;
      },
  },
});

export const { 
  setUsers,
  setUser
 } = usersSlice.actions

export default usersSlice.reducer