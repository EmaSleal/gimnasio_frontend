import { Role } from "./role.enum";

export interface User {
    id: number;
    username: string;
    email: string;
    role: Role;
    enabled: boolean;
    createdAt: string;
}
