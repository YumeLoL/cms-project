import { Dispatch, SetStateAction } from "react";

export interface AddEditStudents {
  id?: number;
  name: string;
  country: string;
  email: string;
  type?: number;
  refresh?: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>; //
}

export interface IStudent {
  id: number;
  name: string;
  age: number;
  email: string;
  phone: number;
  address: string;
}

export interface InfoType {
  label: string;
  value: string | number;
}
