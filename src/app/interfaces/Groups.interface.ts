import { UserResponse } from "./User.interface";

export interface Group {
    title:string;
    users: UserResponse[]
}
