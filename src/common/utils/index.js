import Cookies from 'universal-cookie';

export const setCookies = (key, value, expireIn) => {
  const cookies = new Cookies();
  cookies.set(key, value, {
    path: '/',
    expires: new Date(expireIn)
  });
};
