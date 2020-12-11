require('dotenv').config();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user_model');
const { JWT_alg, JWT_typ, JWT_secret } = process.env;

const jwtSignOptions = {
    algorithm: JWT_alg,
    type: JWT_typ,
};

const userRegist = async (req, res) => {
    const { r_name, r_email, r_password } = req.body;

    if (!r_name || !r_email || !r_password) {
        res.status(400).send({ error: 'Request Error: name, email and password are required.' });
        return;
    }

    const result = await User.userRegist(r_name, r_email, r_password);
    if (result.error) {
        res.status(403).send({ error: result.error });
        return;
    }

    const { userInfo } = result;
    if (!userInfo) {
        res.status(500).send({ error: 'Database Query Error' });
        return;
    }

    const giveToken = () => {
        let payload = {
            id: userInfo.id,
            name: r_name,
            email: r_email,
            exp: 86400,
        };
        return jwt.sign(payload, JWT_secret);
    };

    res.status(200).json({
        jwtToken: giveToken(),
    });
    // res.status(200).json('ok');
};

const userLogin = async (req, res) => {
    const { mail, password } = req.body;

    if (!mail || !password) {
        res.status(400).send({ error: 'Request Error: name, email and password are required.' });
        return;
    }

    const result = await User.userLogin(mail, password);
    if (result.error) {
        res.status(403).send({ error: result.error });
        return;
    }

    const { user } = result;

    if (!user) {
        res.status(500).send({ error: 'Database Query Error' });
    }

    const giveToken = () => {
        let payload = {
            id: user.id,
            name: user.name,
            email: mail,
            exp: 86400,
        };
        return jwt.sign(payload, JWT_secret);
    };

    res.status(200).json({
        jwtToken: giveToken(),
    });
};

module.exports = {
    userRegist,
    userLogin,
};
