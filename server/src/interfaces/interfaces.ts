

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN'
}