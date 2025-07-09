export interface IuserRegister {
    username: string,
    email: string,
    password: string,
    created_at: Date
}

export interface ILogin {
    email: string,
    password: string
}