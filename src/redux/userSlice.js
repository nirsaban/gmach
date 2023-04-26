// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  users: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default userSlice.reducer;
