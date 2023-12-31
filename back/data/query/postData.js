const { con } = require('../../db/connection.js');
const { getDecodedId } = require("../../methods/token.js")
require('dotenv').config()

module.exports = async (req, res) => {
    const user_id = await getDecodedId(req.headers.authorization)
    if (user_id) {
        const {value} = req.body;
        console.log(value)
        const result = await con.query2('INSERT INTO data (user_id, value) VALUES (?, ?)',[user_id, value]);
        if (result) {
            console.log(`[${new Date(Date.now()).toLocaleString()}] - data added`);
            res.status(200).json({ message: "data added" });
        } else {
            console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/postData - Error`);
            res.status(400).json({ message: "Error" });
        }
    } else {
        console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/postData - User was not connected`);
        res.status(406).json({error: "You are not connected"})
      }
}