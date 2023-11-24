const { con } = require('../../db/connection.js');
const { getDecodedId } = require("../../methods/token.js")
require('dotenv').config()

module.exports = async (req, res) => {
    const user_id = await getDecodedId(req.headers.authorization)
    if (user_id) {
        const result = await con.query2('SELECT admin FROM users WHERE users.id = ?', [user_id])
        if (result[0].admin === 1) {
            await con.query2('UPDATE users SET admin = ? WHERE users.id = ?', [req.query.adminOrNot,req.query.id])
            res.status(200).json({message : `${req.query.id} role changed`});
            console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/postAdmin - user ${user_id} role changed`);
        }else{
            res.status(400).json({});
            console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/postAdmin - user ${user_id} try to post`);
        }
    } else {
        res.status(400).json({error: "you are not connected"})
        console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/postAdmin - user was not connected`);
    }
}