import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'user2', password: 'password2' },
  ],
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { username, password } = action.payload;
      const loggedInUser = state.users.find(user => user.username === username && user.password === password);
      if (loggedInUser) {
        state.currentUser = loggedInUser;
      }
    },
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { loginUser, registerUser } = userSlice.actions;

export default userSlice.reducer;
