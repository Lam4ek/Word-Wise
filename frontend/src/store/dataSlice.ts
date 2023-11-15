import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserData = {
  user_Id: string;
  email: string;
  name: string;
  folders: Object;
};

type DataState = {
  data: UserData[];
};

const initialState: DataState = {
  data: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    postData(state, action: PayloadAction<string>) {
      console.log(state.data);
    },
  },
});

export const { postData } = dataSlice.actions;

export default dataSlice.reducer;
