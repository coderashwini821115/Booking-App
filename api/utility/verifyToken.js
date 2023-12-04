import jwt from 'jsonwebtoken';
import createError from './error.js';


export const verifyToken = async(req, res, next) => {
    // console.log(req);
    const token = req.cookies.access_token;
    // console.log("mai v chla");
    if(!token) return next(createError(401, 'You are not authenticated'));
    console.log("authentcated");
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(createError(403, 'Token is not Valid'));
        req.user = user;
        // console.log(user, " user hai ye");
        next();
        // console.log("yeee merea");
    });
};
export const verifyUser = (req, res, next) => {
    console.log("chla");
    verifyToken(req, res, () => {
        console.log(req.user.id, " ", req.params.id);
        if(req.user.id === req.params.id || req.user.isAdmin) {
            console.log("ch'");
            next();
        } else {
            console.log("chla)");
            return next(createError(403, "You are not authorized"));
        }
    });
};
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // console.log("runned");
        if(req.user.isAdmin) {
            next();
        }
        else {
            next(createError(403, "You are not authorized"));
        }
    })
};