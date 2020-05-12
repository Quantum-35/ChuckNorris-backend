import jwt from 'jsonwebtoken';

export const authenticate = token => {
    if (!token) return false;
    try {
        const isAuthenticated = jwt.verify(token, process.env.SECRET_KEY);
        if (isAuthenticated) {
          return true;
        }
      } catch (e) {
        return false;
      }
};