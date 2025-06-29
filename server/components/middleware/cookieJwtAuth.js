import jwt from 'jsonwebtoken';

export const cookieJwtAuth = (req, res, next) => {
    const token = res.cookies.token;
}