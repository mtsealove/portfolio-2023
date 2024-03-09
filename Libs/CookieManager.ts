import { Cookies } from 'react-cookie';

const cookies = new Cookies();

class CookieManager {
  static setCookie = (name: string, value: string, expires?: Date) => cookies.set(name, value, { path: '/', expires });

  static getCookie = (name: string): string|undefined => {
    const value = cookies.get(name);
    if (typeof value === 'string') {
      return value;
    }
    return undefined;
  };

  static deleteCookie = (name: string) => {
    cookies.remove(name, { path: '/' });
  };
}

export default CookieManager;
