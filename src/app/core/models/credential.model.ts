export class Credential {
  constructor(
    private _token: string,
    private _refreshToken: string,
    private expiresIn: Date
  ) {}
  get token() {
    if (!this.expiresIn || new Date() > this.expiresIn) return null;
    return this._token;
  }
  get refreshToken() {
    if (!this.expiresIn || new Date() > this.expiresIn) return null;
    return this._refreshToken;
  }
}
