declare module 'download-git-repo';
declare interface IConfig {
  get<T>(setting: string): T;
  has(setting: string): boolean;
  util: IUtil;
  downloadOptions: any
} 