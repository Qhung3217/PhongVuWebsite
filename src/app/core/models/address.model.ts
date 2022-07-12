export class Address {
  constructor(
    public fullName: string,
    public phone: string,
    public address: string,
    public ward: string,
    public district: string,
    public city: string,
    public country: string,
    public isDefault: boolean,
    public user: string,
    public _id: string,
    public createdAt: Date,
    public updatedAt: Date,
    public __v: number,
    public fullAddress: string,
    public id: string
  ) {}
}
