import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const info = {
  user_Id: "583c3ac3f38e84297c002546",
  email: "test@test.com",
  name: "Danil",
  folders: {
    Eng: {
      Verbs: [
        { term: "todo", definition: "делать", id: 1 },
        { term: "1", definition: "2", id: 2 },
        { term: "3", definition: "4", id: 3 },
        { term: "5", definition: "6", id: 4 },
        { term: "7", definition: "8", id: 5 },
        { term: "9", definition: "10", id: 6 },
        { term: "11", definition: "12", id: 7 },
        { term: "13", definition: "14", id: 8 },
      ],
      adjectives: [
        { term: "Happy ", definition: "Счастлив", id: 1 },
        {
          term: "Busy ",
          definition: "Занят",
          id: 2,
        },
      ],
    },
    Datch: {
      verbs: [
        { term: "todo", definition: "делать", id: 1 },
        { term: "1", definition: "2", id: 2 },
        { term: "3", definition: "4", id: 3 },
        { term: "5", definition: "6", id: 4 },
        { term: "7", definition: "8", id: 5 },
        { term: "9", definition: "10", id: 6 },
        { term: "11", definition: "12", id: 7 },
        { term: "13", definition: "14", id: 8 },
      ],
    },
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
    changeTerm() {},
    changeDefinition() {},
    removeTerm(state, action) {
      const { folder, module, termId } = action.payload;
      if (
        state.userData.folders[folder] &&
        state.userData.folders[folder][module]
      ) {
        state.userData.folders[folder][module] = state.userData.folders[folder][
          module
        ].filter((data: any) => data.id !== termId);
      }
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

export const { addFolder, removeTerm } = dataSlice.actions;
export default dataSlice.reducer;
