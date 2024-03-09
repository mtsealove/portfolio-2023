import { AxiosResponse } from 'axios';
import rest from './rest';

export interface ResSignIn {
    accessToken: string;
}

class AuthApi {
  static signIn(email: string, password: string): Promise<AxiosResponse<ResSignIn>> {
    return rest.post('/auth/sign-in', { email, password });
  }

  static setToken(token: string) {
    rest.defaults.headers.common.Authorization = `bearer ${token}`;
  }

  static getMe(): Promise<AxiosResponse<User>> {
    return rest.get('/auth/me');
  }
}

export default AuthApi;
