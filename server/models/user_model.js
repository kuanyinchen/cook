require('dotenv').config();
const crypto = require('crypto');
const { query, transaction, commit, rollback } = require('./mysqlcon');

const userRegist = async (r_name, r_email, r_password) => {
    try {
        await transaction();
        console.log(r_email);
        const email = await query('SELECT email FROM member WHERE email = ?', [r_email]);
        if (email.length > 0) {
            await commit();
            return { error: 'Email has already exists' };
        }

        const hash = crypto.createHash('sha256');
        hash.update(r_password);
        hashPassword = hash.copy().digest('hex');
        console.log(hashPassword);

        const userInfo = {
            name: r_name,
            email: r_email,
            password: hashPassword,
        };
        const statement = 'Insert INTO member SET?';
        const result = query(statement, userInfo);
        await commit();
        return { userInfo };
    } catch (error) {
        await rollback();
        return { error };
    }
};

module.exports = {
    userRegist,
};
