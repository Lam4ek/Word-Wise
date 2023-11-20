import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const info = {
  user_Id: "583c3ac3f38e84297c002546",
  email: "test@test.com",
  name: "Danil",
  folders: {
    Eng: {
      Verbs: ["to do", "to be", "to go", "to find"],
      adjectives: ["hot", "cold", "beautiful"],
    },
    Datch: {},
    Datch1: {},
    Datch2: {},
    Datch3: {},
    Datch4: {},
    Datch5: {},
    Datch6: {},
  },
};

type UserData = {
  user_Id: string;
  email: string;
  name: string;
  folders: Object;
};

type DataState = {
  userData: UserData[] | any;
  status: string;
  error: string | null;
};

export const fetchData = createAsyncThunk(
  "userData/fetchData",
  async function (_, { rejectWithValue }) {
    try {
      const userData = await info;
      return userData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: DataState = {
  userData: [],
  status: "",
  error: "",
};

const dataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addFolder(state, action: PayloadAction<string>) {
      state.userData.folders.push([action.payload]);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = "resolved";
      state.userData = action.payload;
    });
  },
});

export const { addFolder } = dataSlice.actions;
export default dataSlice.reducer;
