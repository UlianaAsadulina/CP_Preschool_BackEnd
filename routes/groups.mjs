import express from "express";
import Group from "../models/Group.mjs";

const router = express.Router();

// Read information about all groups
router.get("/", async (req, res) => {
    try {
        console.log("route /groups/getAll");
        let allGroups = await Group.find({});
        res.json(allGroups);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});

// Create new group
router.post("/", async (req, res) => {
    try {
        console.log("route  /groups/postNew");
        // Declare a variable for new object and then perform action on collection
        let newGroup = await Group.create(req.body);
        // Return variable
        res.json(newGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});





// Delete whole group
router.delete('/:id', async (req, res) => {
    try {
        console.log("route  /groups/delete");
        await Group.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Group Deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});


export default router;
