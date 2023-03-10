
import jwt from "jsonwebtoken"

function generateAccessToken(user) {
    return jwt.sign({ user: user }, "123", {
        expiresIn: '8h',
    });
}

function generateTokens(user) {

    const accessToken = generateAccessToken(user);

    return accessToken;
}

export { generateAccessToken, generateTokens }