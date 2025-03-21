import express from "express";
import Group from "../models/Group.mjs";

const router = express.Router();



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

// Update whole group 
router.put('/:id', async (req, res) => {
    try {
        console.log("route  /groups/put");
        let updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        });

        res.json(updatedGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
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


// Add new teacher to array of teachers inside the Group
router.post('/:id/teachers', async (req, res) => {
    try {
        console.log("route /groups/:id/teachers (addNew)");

        const updatedGroup = await Group.findByIdAndUpdate(
            req.params.id,
            { $push: { teachers: req.body } }, 
            { new: true, runValidators: true }
        );

        res.json(updatedGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});
//Update teacher information
router.patch('/:id/teachers/:teacherId', async (req, res) => {
    try {
        console.log("route /groups/:id/teachers/:teacherId (update)");

        // Update the child information
        const updatedGroup = await Group.findOneAndUpdate(
            { _id: req.params.id, "teachers._id": req.params.teacherId },
            { $set: { "teachers.$": req.body } },
            { new: true, runValidators: true }
        );

        res.json(updatedGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

//Update child information
router.patch('/:id/kids/:kidId', async (req, res) => {
    try {
        console.log("route /groups/:id/kids/:kidId (update)");


        const updatedGroup = await Group.findOneAndUpdate(
            { _id: req.params.id, "kids._id": req.params.kidId },
            { $set: { "kids.$": req.body } },
            { new: true, runValidators: true }
        );

        res.json(updatedGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

//Remove child
router.delete('/:id/kids/:kidId', async (req, res) => {
    try {
        console.log("route /groups/:id/kids/:kidId (delete)");

        const updatedGroup = await Group.findByIdAndUpdate(
            req.params.id,
            { $pull: { kids: { _id: req.params.kidId } } },
            { new: true }
        );
        res.json(updatedGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});


// Add new child to array of kids inside the Group
router.post('/:id/kids', async (req, res) => {
    try {
        console.log("route /groups/:id/kids (addNew)");

        const updatedGroup = await Group.findByIdAndUpdate(
            req.params.id,
            { $push: { kids: req.body } }, 
            { new: true, runValidators: true }
        );

        res.json(updatedGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

//Remove teacher
router.delete('/:id/teachers/:teacherId', async (req, res) => {
    try {
        console.log("route /groups/:id/teachers/:teacherId (delete)");

        const updatedGroup = await Group.findByIdAndUpdate(
            req.params.id,
            { $pull: { teachers: { _id: req.params.teacherId } } },
            { new: true }
        );

        res.json(updatedGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Read information about one group with id
router.get("/:id", async (req, res) => {
    try {
        console.log("route   /groups/getOne");
        let oneGroup = await Group.find({_id: req.params.id});
        res.json(oneGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});

// Read information about all groups
router.get("/", async (req, res) => {
    try {
        console.log("route   /groups/getAll");
        let allGroups = await Group.find({}).sort({ "group": 1 });
        res.json(allGroups);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});


export default router;
