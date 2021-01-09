require('dotenv').config();
const crypto = require('crypto');
const { query, transaction, commit, rollback } = require('./mysqlcon');

const userRegist = async (r_name, r_email, r_password) => {
    try {
        await transaction();
        const email = await query('SELECT email FROM user WHERE email = ?', [r_email]);
        if (email.length > 0) {
            await commit();
            return { error: 'Email has already exists' };
        }

        const hash = crypto.createHash('sha256');
        hash.update(r_password);
        const hashPassword = hash.copy().digest('hex');

        const userInfo = {
            name: r_name,
            email: r_email,
            password: hashPassword,
        };
        const statement = 'Insert INTO user SET?';
        const result = query(statement, userInfo);
        await commit();
        return { userInfo };
    } catch (error) {
        await rollback();
        return { error };
    }
};

const userLogin = async (mail, password) => {
    try {
        await transaction();
        const userCheck = await query('SELECT * FROM user WHERE email = ?', [mail]);
        const user = userCheck[0];

        const hash = crypto.createHash('sha256');
        hash.update(password);
        const hashPassword = hash.copy().digest('hex');

        if (user.password !== hashPassword) {
            await commit();
            return { error: 'Password is wrong' };
        }
        await commit();

        return { user };
    } catch (error) {
        await rollback();
        return { error };
    }
};

module.exports = {
    userRegist,
    userLogin,
};
