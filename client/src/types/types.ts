export type UserData = {
  user_Id: string;
  email: string;
  name: string;
  folders: Object;
};

export type DataState = {
  userData: UserData[] | any;
  status: string;
  error: string | null;
};

export type TTerm = {
  term: string;
  definition: string;
  id: number;
};
