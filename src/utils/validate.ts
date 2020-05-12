import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';

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

export const validateJwt = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, { algorithm: 'HS256'}, (err, decoded) => {
            if(err) {return reject(err)}
            return resolve(decoded);
        })
    })
}

export const generateToken = data => {
    const expiresIn = '5h';
    const token = jwt.sign({data}, process.env.SECRET_KEY, { expiresIn });
    return token;
}

export default {
    signup: Joi.object().keys({
        email: Joi.string()
                .trim()
                .lowercase()
                .email()
                .required()
                .label('Email is required and should look like this : example@email.com!'),
        password: Joi.string()
                .trim()
                .min(5)
                .max(30)
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
                .required()
                .label('Password should have 5 characters, have one digit, one Lowercase and  Uppercase')
                
    })
}