import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import createError from '../utility/error.js';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/login', async(req, res, next) => {
    // console.log(req.body);
    const user = await User.findOne({username: req.body.username});
    if(!user) return next(createError(404, "User not Found"));
    const isPassCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!isPassCorrect) return next(createError(400, "Wrong password or username"));
    // console.log(user._doc);
    const {password, isAdmin, ...otherDetails} = user._doc;
    const token = jwt.sign(
        {id: user._id, isAdmin: user.isAdmin},
        process.env.JWT_SECRET
    );
    res.cookie("access_token", token, {
        httpOnly: true,
    }).status(200)
    .json(otherDetails);
    // res.status(400).json(user);
})
router.post('/register', async(req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 10);
        await User.create({
            ...req.body,
            password: hash,
        });
        res.status(200).json("User created");
    }
    catch(e) {
        next(e);
    }
})

export default router;