import express, { response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';

const router = express.Router();

// @route:   GET api/users
// @desc:    Test route
// @access:  Public
router.get('/', async (req, res) => res.send('User Route'));



// @route:   POST api/users
// @desc:    Register user
// @access:  Public
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 5 }),
    ],
    async (req, res) => {
        // Check for any validation errors in the request
        const errors = validationResult(req);
        console.log(req.body);

        // If the errors variable is NOT empty, return a 400 status with the errors array in the response
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }

        // Destructure the request body to get the name, email, and password
        const { name, email, password } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email });
            // If user exists, return a 400 status with an error message
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }
            // Create a new user instance with the name, email, and password from the request body
            user = new User({
                name,
                email,
                password,
            });

            // Encrypt password
            //          1 step - create a salt - a number of encryption rounds of hashing i goes through
            const salt = await bcrypt.genSalt(10);
            //          2 step - hash the password  using this salt
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id,
                },
            };
            // Create a jwt token, sign the token with the payload, secret, and expiration time
           // iF NO ERRORS - Send the token to the front end
            jwt.sign(
                payload,
                process.env.jwtSecret,
                { expiresIn: 3600 }, // 1 hour expiration time
                // Callback function to handle the result of the sign operation
                (err, token) => {
                    if (err) throw err;
                    res.status(201).json({ token });
                }
            );
            
        } catch (err) {
            console.error(err);
            res.status(500).json({ errors: [{ msg: 'Server error' }] });
        }
    }
);

export default router;
