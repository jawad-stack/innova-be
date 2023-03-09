
import jwt from "jsonwebtoken"

function generateAccessToken(user) {
    return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '8h',
    });
}

function generateTokens(user) {

    const accessToken = generateAccessToken(user);

    return accessToken;
}

export { generateAccessToken, generateTokens }