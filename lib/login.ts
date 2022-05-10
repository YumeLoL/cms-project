export interface LoginValue {
    email: string;
    password: string;
    role: "student" | "manager" | "teacher";
}