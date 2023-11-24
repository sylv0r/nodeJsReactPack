const { con } = require('../../db/connection.js');
const { sign } = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
require('dotenv').config()

const validateEmail = (email) => {
    const emailRegex = /^[^\s@"`]+@[^\s@'"`]+\.[^\s@'"`]+$/;
    return emailRegex.test(email);
};

module.exports = async (req, res) => {
    const { email, password } = req.body;
    console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/getConnection - email: ${JSON.stringify(email)}`);
    if (!validateEmail(email)) {
        console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/postUser - invalid email format`);
        return res.status(400).json({ message: 'invalid email format' });
    }
    const result = await con.query2('SELECT * FROM users WHERE users.email = ?', [email])
    if(result.length === 0) {
        console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/getConnection - email not found`);
        return res.status(400).json({ message: ' bad email or password' });
    }
    const isMatch = await bcrypt.compare(password, result[0].password);
    if(!isMatch){
        console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/getConnection - wrong password`);
        return res.status(400).json({ message: 'bad email or password' });
    }else{
        const userId = result[0].id;
        const token = sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" })
        console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/getConnection - user connected`);
        res.status(200).json({token});
    }
}