export interface Payload {
  id: string;
}

export interface JwtModuleOptions {
  accessKey: string;
  accessExpiration: string;
  refreshKey: string;
  refreshExpiration: string;
}
