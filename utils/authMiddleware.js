import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    // Get the token from the request headers

    // const token = req.headers.authorization?.split(' ')[1];
    const userCookie = JSON.parse(req?.cookies?.user)
    const token = userCookie?.accessToken

    if (!token) {
        return res.status(401).json({ message: 'Authentication required', status: 401, succeeded: false });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, "123");

        // Add the user object to the request for use in subsequent middleware/handlers
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}