const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();


const ACCESS_TOKEN_SECRET = 'yehaccesstokenhai';
const REFRESH_TOKEN_SECRET = 'yehrefreshtokenhai';
const ID_TOKEN_SECRET = 'yehidtokenhai';

const generateAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

const generateIDToken = (user) => {
  return jwt.sign(user, ID_TOKEN_SECRET, { expiresIn: "1h" });
};

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log("user = ",user);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' ,password:req.body.password, compared:user.password});
        }

        const accessToken = generateAccessToken({ _id: user._id });
        const refreshToken = generateRefreshToken({ _id: user._id });
        const idToken = generateIDToken({ _id: user._id });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.json({success:true, username: user.username, accessToken:accessToken, refreshToken:refreshToken, idToken:idToken });
    } catch (err) {
        console.log("Error caught : ",err);
        return res.status(400).json({ message: 'Error logging in' });
    }
});

// router.post('/token', (req, res) => {
//     const refreshToken = req.session.refreshToken;
  
//     if (refreshToken == null) return res.sendStatus(401);
  
//     jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
//       if (err) return res.sendStatus(403);
  
//       const accessToken = generateAccessToken({ username: user.username });
  
//       return res.json({ accessToken: accessToken });
//     });
// });


router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
  });
  res.status(200).json({ message: 'Logged out' });
});

module.exports = router;