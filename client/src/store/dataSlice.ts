import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Info,
  DataState,
  TermData,
  FolderData,
  ModuleData,
} from "../types/types";

const info: Info = {
  user: {
    id: "583c3ac3f38e84297c002546",
    email: "test@test.com",
    name: "Danil",
  },
  folders: [
    {
      id: "folder1",
      name: "Eng",
      modules: [
        {
          id: "module1",
          name: "Verbs",
          terms: [
            { id: 1, term: "todo", definition: "делать" },
            { id: 2, term: "1", definition: "2" },
          ],
        },
        {
          id: "module2",
          name: "adjectives",
          terms: [
            { id: 1, term: "Happy", definition: "Счастлив" },
            { id: 2, term: "Busy", definition: "Занят" },
          ],
        },
      ],
    },
    {
      id: "folder2",
      name: "Datch",
      modules: [],
    },
  ],
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
    addFolder(state) {
      // base name for new folder
      const baseName = "New folder";
      let newName = baseName;

      // Getting the keys of an existing folder
      const folderNames = state.userData.folders.map(
        (folder: FolderData) => folder.name
      );

      // If the base name already exists, look for the next available name
      if (folderNames.includes(newName)) {
        let counter = 1;
        // While the name with the counter exists, increase the counter
        while (folderNames.includes(`${baseName}(${counter})`)) {
          counter++;
        }
        // When we find a non-existent name, update newName
        newName = `${baseName}(${counter})`;
      }

      // Add a new folder with a unique name
      const newFolder = {
        id: `folder-${Date.now()}`,
        name: newName,
        modules: [],
      };

      state.userData.folders.push(newFolder);
    },

    removeFolder(state, action) {
      const { folderId } = action.payload;
      // We remove the folder directly, thanks to Immer this will not lead to mutation
      state.userData.folders = state.userData.folders.filter(
        (folder: FolderData) => folder.id !== folderId
      );
    },

    renameFolder: (state, action) => {
      const { folderId, newFolderName } = action.payload;

      // Проверяем, уникально ли новое имя среди существующих папок
      const isNameUnique = !state.userData.folders.some(
        (folder: FolderData) => folder.name === newFolderName
      );
      if (!isNameUnique) {
        alert(`Folder "${newFolderName}" already exists.`);
        return;
      }

      // Находим папку, которую нужно переименовать
      const folderIndex = state.userData.folders.findIndex(
        (folder: FolderData) => folder.id === folderId
      );
      if (folderIndex === -1) {
        console.warn(`Folder with id "${folderId}" not found.`);
        return;
      }

      // Переименовываем папку
      state.userData.folders[folderIndex].name = newFolderName;
    },

    addModule: (state, action) => {
      const { folderId } = action.payload;

      // Find the desired folder by ID
      const folder = state.userData.folders.find(
        (folder: FolderData) => folder.id === folderId
      );
      if (!folder) {
        console.warn(`Folder with id "${folderId}" not found.`);
        return;
      }

      // Generating a unique name for a new module
      let newName = "New module";
      let counter = 1;
      while (
        folder.modules.some((module: ModuleData) => module.name === newName)
      ) {
        newName = `New module (${counter})`;
        counter++;
      }

      // Create a new module and add it to the found folder
      const newModule: ModuleData = {
        id: `module-${Date.now()}`,
        name: newName,
        terms: [],
      };

      folder.modules.push(newModule);
    },

    removeModule: (state, action) => {
      const { folderId, moduleId } = action.payload;
      console.log(folderId, moduleId);

      // Find the folder by ID
      const folderIndex = state.userData.folders.findIndex(
        (folder: FolderData) => folder.id === folderId
      );
      if (folderIndex === -1) {
        console.warn(`Folder with id "${folderId}" not found.`);
        return;
      }

      // Filter the modules array, removing the module with the specified moduleId
      state.userData.folders[folderIndex].modules = state.userData.folders[
        folderIndex
      ].modules.filter((module: ModuleData) => module.id !== moduleId);
    },

    renameModule: (state, action) => {
      const { folderId, moduleId, newModuleName } = action.payload;

      // Finding the folder index
      const folderIndex = state.userData.folders.findIndex(
        (folder: FolderData) => folder.id === folderId
      );
      if (folderIndex === -1) {
        console.warn(`Folder with id "${folderId}" not found.`);
        return;
      }

      // Finding the module index
      const moduleIndex = state.userData.folders[folderIndex].modules.findIndex(
        (module: ModuleData) => module.id === moduleId
      );
      if (moduleIndex === -1) {
        console.warn(`Module with id "${moduleId}" not found.`);
        return;
      }

      // Checking if the new name is unique among existing modules
      const isNameUnique = !state.userData.folders[folderIndex].modules.some(
        (module: ModuleData) => module.name === newModuleName
      );
      if (!isNameUnique) {
        alert(`Module name "${newModuleName}" already exists in the folder.`);
        return;
      }

      // Rename the module
      state.userData.folders[folderIndex].modules[moduleIndex].name =
        newModuleName;
    },

    addTerm(state, action) {
      const { folderId, moduleId } = action.payload;

      // Finding the index of the desired folder
      const folderIndex = state.userData.folders.findIndex(
        (folder: FolderData) => folder.id === folderId
      );

      if (folderIndex === -1) {
        console.warn(`Folder with id "${folderId}" not found.`);
        return;
      }

      // Finding the index of the required module
      const moduleIndex = state.userData.folders[folderIndex].modules.findIndex(
        (module: ModuleData) => module.id === moduleId
      );

      if (moduleIndex === -1) {
        console.warn(`Module with id "${moduleId}" not found.`);
        return;
      }

      // We get a link to an array of terms inside the desired module
      const terms =
        state.userData.folders[folderIndex].modules[moduleIndex].terms;

      // Add a new term to the beginning of the term array
      terms.unshift({
        term: "",
        definition: "",
        id: Math.random(),
      });
    },
    changeTerm(state, action) {
      const { folderId, moduleId, newTerm, newDefinition, termId } =
        action.payload;
      console.log(folderId, moduleId, newTerm, newDefinition, termId);
      // Finding the index of the desired folder
      const folderIndex = state.userData.folders.findIndex(
        (folder: FolderData) => folder.id === folderId
      );
      if (folderIndex === -1) {
        console.warn(`Folder with id "${folderId}" not found.`);
        return;
      }

      // Find the index of the required module inside the folder
      const moduleIndex = state.userData.folders[folderIndex].modules.findIndex(
        (module: ModuleData) => module.id === moduleId
      );
      if (moduleIndex === -1) {
        console.warn(`Module with id "${moduleId}" not found.`);
        return;
      }

      // Finding the index of the desired term inside the module
      const termIndex = state.userData.folders[folderIndex].modules[
        moduleIndex
      ].terms.findIndex((term: TermData) => term.id === termId);
      if (termIndex === -1) {
        console.warn(`Term with id "${termId}" not found.`);
        return;
      }

      // Update the term and definition
      state.userData.folders[folderIndex].modules[moduleIndex].terms[
        termIndex
      ].term = newTerm;
      state.userData.folders[folderIndex].modules[moduleIndex].terms[
        termIndex
      ].definition = newDefinition;
    },

    removeTerm(state, action) {
      const { folderId, moduleId, termId } = action.payload;

      // Finding the index of the desired folder
      const folderIndex = state.userData.folders.findIndex(
        (folder: FolderData) => folder.id === folderId
      );

      if (folderIndex === -1) {
        console.warn(`Folder with id "${folderId}" not found.`);
        return;
      }

      // Finding the index of the required module
      const moduleIndex = state.userData.folders[folderIndex].modules.findIndex(
        (module: ModuleData) => module.id === moduleId
      );

      if (moduleIndex === -1) {
        console.warn(`Module with id "${moduleId}" not found.`);
        return;
      }

      // Removing a term using a filter based on an array of terms
      const terms =
        state.userData.folders[folderIndex].modules[moduleIndex].terms;
      const updatedTerms = terms.filter((term: TermData) => term.id !== termId);

      // Updating terms inside the module
      state.userData.folders[folderIndex].modules[moduleIndex].terms =
        updatedTerms;
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
  removeFolder,
  renameFolder,
  addModule,
  removeModule,
  renameModule,
  removeTerm,
  changeTerm,
  addTerm,
} = dataSlice.actions;
export default dataSlice.reducer;
