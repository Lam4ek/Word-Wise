export type DataState = {
  userData: Info | any;
  status: string;
  error: string | null;
};

interface User {
  id: string;
  email: string;
  name: string;
}

export interface TermData {
  id: number;
  term: string;
  definition: string;
}

export interface ModuleData {
  id: string;
  name: string;
  color: string;
  terms: TermData[];
}

export interface FolderData {
  id: string;
  name: string;
  color: string;
  modules: ModuleData[];
}

export interface Info {
  user: User;
  folders: FolderData[];
}
