import jwt from "jsonwebtoken";

// Function to generate JWT token
export async function generateToken(user) {
    try {
        return jwt.sign(
            {
                userId: user.id.toString(),
                email: user.email.toString(),
            },
            process.env.JWT_SECRET_KEY || 'JWTTOKENSECRETKEYTHISSERIES',
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.error(error);
        throw new Error("Token generation failed");
    }
}

// Middleware function for authentication
export async function authenticate(req, res, next) {
    // Get the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'JWTTOKENSECRETKEYTHISSERIES');

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Invalid token" });
    }
}
