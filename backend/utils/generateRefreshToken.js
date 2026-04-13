import jwt from "jsonwebtoken";

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};
