const { con } = require('../../db/connection.js');
const { getDecodedId } = require("../../methods/token.js")
require('dotenv').config()

module.exports = async (req, res) => {
    const user_id = await getDecodedId(req.headers.authorization)
    if (user_id) {
        const result = await con.query2('SELECT * FROM data')
        if (result.error) {
            res.status(400).json({})
            console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/getData - Error`);
            return;
        }
        console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/getData - Data send`);
        res.status(200).json(result);
    } else {
        console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/getData - user was not connected`);
        res.status(400).json({error: "you are not connected"})
    }
}