import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    // pull token from header
    const token = req.header('x-auth-token');
    //check if token exists
    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'No token, authorization denied' }]});
    }   

    //verify token
    try {
        // Decode the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the user information from the decoded token to the request object
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err);
        // If the token is not valid, return a 401 status with an error message
        res.status(401).json({ errors: [{ msg: 'Token is not valid' }]});
        //next(err);
    }

}