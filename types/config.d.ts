export interface Config {
  host: string;
  port?: number;

  timeout?: number;

  protocol?: string;
  path_prefix?: string;
  strictSSL?: boolean;
  version?: string;
  basic_auth?: {
    email?: string;
    api_token?: string;
    username?: string;
    password?: string;
    base64?: string;
  };
  oauth?: {
    consumer_key: string;
    private_key: string;
    token: string;
    token_secret: string;
  };
  cookie_jar?: any;
  promise?: PromiseLike<any>;
  request?: any;
  rejectUnauthorized?: any;
}
