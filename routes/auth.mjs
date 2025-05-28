import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import auth from '../middleware/auth.mjs';

const router = express.Router();

// @route:   GET api/auth
// @desc:    Authanticate user
// @access:  Private

// This route is protected and requires authentication
// to access. The auth middleware will check for a valid token in the request header.
// If the token is valid, the request will proceed to this route handler.
router.get('/', auth, async (req, res) => {
    try{
        // Get the user id  from req.user and find the user in the database
        const user = await User.findById(req.user.id).select('-password'); // Exclude the password field from the response
        // If the user is found, return the user object
        res.json(user);
    } catch (err) {
        console.error(err);
        // If an error occurs, return a 500 status with an error message
        res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
    });


// @route:   POST api/auth
// @desc:    Login user
// @access:  Public
router.post('/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        // Check for any validation errors in the request
        const errors = validationResult(req);
        console.log(req.body);

        // If the errors variable is NOT empty, return a 400 status with the errors array in the response
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }

        // Destructure the request body to get the email and password
        const { email, password } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email });
            // If user does not exist, return a 400 status with an error message
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Compare the password from the request with the hashed password in the database
            const isMatch = await bcrypt.compare(password, user.password);
            // If the passwords do not match, return a 400 status with an error message
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id,
                },
            };

            // Sign the token with the payload and secret key
            jwt.sign(
                payload, 
                process.env.jwtSecret, 
                { expiresIn: 3600 }, 
                (err, token) => {
                if (err) throw err;
                // Return the token in the response
                res.json({ token });
            });

        } catch (err) {
            console.error(err);
            // If an error occurs, return a 500 status with an error message
            res.status(500).json({ errors: [{ msg: 'Server error' }] });
        }
    }
);



export default router;
