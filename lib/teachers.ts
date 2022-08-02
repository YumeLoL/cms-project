import { Dispatch, SetStateAction } from "react";

export interface ITeachers {
  id: number;
  name: string;
}

export interface AddEditTeachers {
id: number;
  name: string;
  email: string;
  country: string;
  phone: number;
  skills: [];
  refresh?: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}
