const { con } = require('../../db/connection');
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const validateEmail = (email) => {
    const emailRegex = /^[^\s@"`]+@[^\s@'"`]+\.[^\s@'"`]+$/;
    return emailRegex.test(email);
};
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
};

module.exports = async (req, res) => {
    console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/postUser - email: ${JSON.stringify(req.body.email)}`);
    const { email, password } = req.body;

    if (!validateEmail(email)) {
        console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/postUser - invalid email format`);
        return res.status(400).json({ message: 'Finvalid email format' });
    }
    if (!validatePassword(password)) {
        console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/postUser - invalid password format`);
        return res.status(400).json({ message: 'invalid password format' });
    }

    const verif = await con.query2('SELECT * FROM users WHERE users.email = ?', [email]);
    if (verif.length > 0) {
        console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/postUser - email already used`);
        return res.status(400).json({ message: 'email already used' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const result = await con.query2('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    const userId = result.insertId;
    const token = sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
    console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/postUser - user (email : ${email}) created`);
};
