import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  id: number;
}

const initialState: UserState = {
  name: "",
  email: "",
  id: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
