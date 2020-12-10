const _ = require('lodash');
const crypto = require('crypto');
const User = require('../models/user_model');

const userRegist = async (req, res) => {
    const { r_name } = req.body;
    const { r_email, r_password } = req.body;

    if (!name || !email || !password) {
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
};
