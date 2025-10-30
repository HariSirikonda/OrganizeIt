const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        const payload = ticket.getPayload();
        return {
            success: true,
            payload
        };
    } catch (error) {
        return {
            success: false,
            error: 'Invalid user detected. Please try again.'
        };
    }
}

async function getOrCreateUser(googleUser) {
    // Check if user exists
    let user = await User.findOne({ email: googleUser.email });
    
    if (!user) {
        // Create new user if doesn't exist
        user = new User({
            email: googleUser.email,
            name: googleUser.name,
            googleId: googleUser.sub,
            isVerified: true // Since Google verifies the email
        });
        await user.save();
    } else if (!user.googleId) {
        // Update existing user with Google ID if logging in with Google for the first time
        user.googleId = googleUser.sub;
        user.isVerified = true;
        await user.save();
    }
    
    return user;
}

function generateToken(user) {
    return jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}

module.exports = {
    verifyGoogleToken,
    getOrCreateUser,
    generateToken
};
