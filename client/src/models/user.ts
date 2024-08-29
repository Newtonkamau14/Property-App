export interface IUser {
    user_id: string
    username: string
    email: string
    role: string
    password: string
    createdAt: Date
    updatedAt: Date
}


export interface UserProps {
    user: IUser
}
