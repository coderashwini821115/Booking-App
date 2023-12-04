import express from 'express';
import User from '../models/User.js';
import { verifyToken, verifyUser, verifyAdmin } from '../utility/verifyToken.js';
const router = express.Router();

//UPDATE
router.put('/:id', verifyUser, async(req, res, next) => {
    try{
        const updatedValue = await User.findByIdAndUpdate(req.params.id, 
            { $set: req.body},
            { new: true }
            ); 
        res.status(200).json(updatedValue);
    } catch(e) {
        next(e);
    }
});
//DELETE
router.delete('/:id', verifyUser, async(req, res, next) => {
    try {
        const deletedItem = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedItem);
    }
    catch(e) {
        next(e);
    }
});
//GET
router.get('/:id', verifyUser, async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(e) {
        next(e);
    }
});
//GET ALL
router.get('/', verifyAdmin, async(req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch(e) {
        next(e);
    }
});
export default router;