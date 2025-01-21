import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(403).json({ message: "Token not found or expired !" })
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
            if (err) {
                return next(err);
            }
            req.userId = payload.userId;
            next();
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}