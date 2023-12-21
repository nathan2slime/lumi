import { AuthService } from '../../app/auth/auth.service';

export type ContextDataType = {
  token: string;
  authService: AuthService;
};

export type RequestHeaders = {
  authorization: string;
  'accept-language': string;
};

export type Request = {
  headers: RequestHeaders;
};

export type ContextPayloadType = {
  req: Request;
};
