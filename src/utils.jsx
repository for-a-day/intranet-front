import { jwtDecode } from 'jwt-decode'; // named import 사용

export const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  return Date.now() >= exp * 1000;
};
