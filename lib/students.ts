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

