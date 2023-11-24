const { con } = require('../../db/connection.js');
const { getDecodedId } = require("../../methods/token.js")
require('dotenv').config()


module.exports = async (req, res) => {
    const user_id = await getDecodedId(req.headers.authorization)
    if (user_id) {
        const result = await con.query2('SELECT admin FROM users WHERE users.id = ?', [user_id])
        if (result[0].admin === 1) {
            const result = await con.query2('SELECT * FROM users')
            res.status(200).json(result);
            console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/getUser - user ${user_id} get users`);
        }else{
            res.status(400).json({})
            console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/getUser - user ${user_id} try to get`);
        }
    }
    else {
        res.status(400).json({"error": "invalid token"})
        console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/getUser - user was not conected`);
    }
}