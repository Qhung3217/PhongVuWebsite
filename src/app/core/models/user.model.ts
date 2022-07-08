export class User {
  constructor(
    public _id: string,
    public email: string,
    public isEmailVerified: boolean,
    public isPhoneVerified: boolean,
    public role: string,
    public status: string,
    public phone?: string,
    public firstName?: string,
    public lastName?: string,
    public avatar?: string,
    public cover?: string,
    public dob?: Date,
    public gender?: string
  ) {}
}
