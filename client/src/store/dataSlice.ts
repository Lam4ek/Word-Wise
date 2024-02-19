import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataState, TTerm } from "../types/types";

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
        { term: "Happy", definition: "Счастлив", id: 1 },
        { term: "Busy", definition: "Занят", id: 2 },
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
    addFolder(state, action) {
      // Базовое имя для новой папки
      const baseName = "New folder";
      let newName = baseName;

      // Получаем ключи существующих папок
      const folderNames = Object.keys(state.userData.folders);

      // Если базовое имя уже существует, ищем следующее доступное имя
      if (folderNames.includes(newName)) {
        let counter = 1; // Начинаем счетчик с 1
        // Пока имя с счетчиком существует, увеличиваем счетчик
        while (folderNames.includes(`${baseName}(${counter})`)) {
          counter++;
        }
        // Когда нашли несуществующее имя, обновляем newName
        newName = `${baseName}(${counter})`;
      }

      // Добавляем новую папку с уникальным именем
      state.userData.folders[newName] = {};
    },

    removeFolder(state, action) {
      const { folder } = action.payload;
      // We remove the folder directly, thanks to Immer this will not lead to mutation
      delete state.userData.folders[folder];
    },

    addModule(state, action) {},

    removeModule(state, action) {
      const { folder, module } = action.payload;
      // We remove the module directly, thanks to Immer this will not lead to mutation
      delete state.userData.folders[folder][module];
    },

    addTerm(state, action) {
      const { folder, module } = action.payload;
      state.userData.folders[folder][module].unshift({
        term: "",
        definition: "",
        id: Math.random(),
      });
    },
    changeTerm(state, action) {
      const { folder, module, newTerm, newDefinition, termId } = action.payload;
      const correctData = state.userData.folders[folder][module].find(
        (data: TTerm) => data.id === termId
      );
      if (correctData) {
        correctData.term = newTerm;
        correctData.definition = newDefinition;
      }
    },

    removeTerm(state, action) {
      const { folder, module, termId } = action.payload;
      // We create a new object for folders to avoid mutations.
      const updatedFolders = {
        ...state.userData.folders,
        [folder]: {
          ...state.userData.folders[folder],
          [module]: state.userData.folders[folder][module].filter(
            (term: TTerm) => term.id !== termId
          ),
        },
      };
      // Create a new object for userData, including the updated folders
      const updatedUserData = {
        ...state.userData,
        folders: updatedFolders,
      };
      // Returning a new state with updated userData
      return {
        ...state,
        userData: updatedUserData,
      };
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

export const {
  addFolder,
  removeTerm,
  changeTerm,
  addTerm,
  removeFolder,
  removeModule,
} = dataSlice.actions;
export default dataSlice.reducer;
