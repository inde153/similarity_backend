export interface Payload {
  id: number;
  username: string;
  loginType: string;
}

export interface JwtModuleOptions {
  accessKey: string;
  accessExpiration: string;
  refreshKey: string;
  refreshExpiration: string;
}
