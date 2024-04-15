// interface User
//String userName, String email, ExerciseEnums.Rol role, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked

import { Role } from "./role.enum";

export interface User {
    id: number;
    userName: string;
    email: string;
    role: Role;
    enabled: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    password: string;
    }