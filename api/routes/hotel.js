import express from 'express';
import Hotel from '../models/Hotels.js';
import Room from '../models/Room.js';
import { verifyAdmin } from '../utility/verifyToken.js';
const router = express.Router();

// CREATE
router.post('/', verifyAdmin, async (req, res, next) => {
try {
    const savedHotel = await Hotel.create(req.body);
    res.status(200).json(savedHotel);
}
catch(e) {
    next(e);
}
})
//UPDATE
router.put('/:id', verifyAdmin, async(req, res, next) => {
try{
    const updatedValue = await Hotel.findByIdAndUpdate(req.params.id, 
        { $set: req.body},
        { new: true }
        ); 
    res.status(200).json(updatedValue);
} catch(e) {
    next(e);
}
});
//DELETE
router.delete('/:id', verifyAdmin, async(req, res, next) => {
    try {
        const deletedItem = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedItem);
    }
    catch(e) {
        next(e);
    }
});
// GET
router.get('/find/:id', async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch(e) {
        next(e);
    }
});
//GET ALL
router.get('/', async(req, res, next) => {
    console.log(req.query);
    const {min, max, limit, ...others} = req.query;
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: {$gt: min|1, $lt: max || 99999999},
    }).limit(limit);
        res.status(200).json(hotels);
    } catch(e) {
        next(e);
    }
});

router.get('/countByCity', async(req, res, next) => {
    const cities = req.query.cities.split(',');
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({city: city});
            })
        );
        res.status(200).json(list);
    } catch(e) {
        next(e);
    }
})
router.get('/countByType', async(req, res,next) => {
    const hotels = await Hotel.countDocuments({type: "Hotel"});
    const apartments = await Hotel.countDocuments({type: "apartment"});
    const resorts = await Hotel.countDocuments({type: "resort"});
    const villas = await Hotel.countDocuments({type: "villa"});
    const cabins = await Hotel.countDocuments({type: "cabin"});
    res.status(200).json([
        { type: "Hotel", count: hotels},
        {type: "Apartment", count: apartments},
        { type: "Resort", count: resorts},
        { type: "Villa", count: villas},
        { type: "Cabin", count: cabins}
    ]);
})

//GET HOTEL ROOMS
router.get('/rooms/:id', async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        // console.log(hotel);
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room);
            })
        )
        res.status(200).json(list);
    }
    catch(e) {
        next(e);
    }
})
export default router;