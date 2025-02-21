import express from 'express';
import Group from '../models/Group.mjs';

const router = express.Router();

// Read information about all groups
router.get('/', async (req, res) => {
    try {
        console.log("route /groups/getAll");
        let allGroups = await Group.find({});
        res.json(allGroups);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});


export default router;