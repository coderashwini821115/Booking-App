import express from 'express';
import { verifyAdmin } from '../utility/verifyToken.js';
import Room from '../models/Room.js';
import Hotel from '../models/Hotels.js';
const router = express.Router();

// CREATE
router.post('/:hotel_id', verifyAdmin, async (req, res, next) => {
    try {
        const savedRoom = await Room.create(req.body);
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.hotel_id,
            {$push: {rooms: savedRoom._id}},
            {new: true}
            );
        res.status(200).json(savedRoom);
    }
    catch(e) {
        next(e);
    }
    })

//UPDATE
router.put('/:id', verifyAdmin, async(req, res, next) => {
    try{
        const updatedValue = await Room.findByIdAndUpdate(req.params.id, 
            { $set: req.body},
            { new: true }
            ); 
        res.status(200).json(updatedValue);
    } catch(e) {
        next(e);
    }
    });

//UPDATE UNAVAILABLE ROOMS
router.put('/availaiblility/:id', async(req, res, next)=> {
    try {
        await Room.updateOne(
            {"roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                }
            },
        )
        res.status(200).json('Room date updated');
    } catch(e) {
        next (e);
    }
} )
//DELETE
router.delete('/:id/:hotel_id', verifyAdmin, async(req, res, next) => {
        try {
            const deletedItem = await Room.findByIdAndDelete(req.params.id);
            await Hotel.findByIdAndUpdate(req.params.hotel_id,
                {$pull: {rooms: req.params.id}});
            res.status(200).json('Room is deleted');
        }
        catch(e) {
            next(e);
        }
    });
// GET
router.get('/:id', async(req, res, next) => {
        try {
            const room = await Room.findById(req.params.id);
            res.status(200).json(room);
        } catch(e) {
            next(e);
        }
    });
//GET ALL
router.get('/', async(req, res, next) => {
        try {
            const rooms = await Room.find();
            res.status(200).json(rooms);
        } catch(e) {
            next(e);
        }
    });
    export default router;