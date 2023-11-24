const { con } = require('../../db/connection.js');
const { getDecodedId } = require("../../methods/token.js")
require('dotenv').config()


module.exports = async (req, res) => {
    const user_id = await getDecodedId(req.headers.authorization)
    if (user_id) {
        const result = await con.query2('SELECT admin FROM users WHERE users.id = ?', [user_id])
        if (result[0].admin === 1) {
            await con.query2('DELETE FROM `data` WHERE user_id = ?', [req.query.id])
            const result = await con.query2('DELETE FROM users WHERE users.id = ?', [req.query.id])
            if (result.affectedRows === 0) {
                res.status(400).json({"error": "user not found"})
                console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/deleteUser - user ${user_id} try to delete ${req.query.id}`);
                return;
            }
            res.status(200).json({})
            console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/deleteUser - Delete ${req.query.id}`);
        }else{
            res.status(400).json({})
            console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/deleteUser - user ${user_id} try to delete ${req.query.id}`);
        }
    }
    else {
        res.status(400).json({"error": "token invalid"})
        console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/deleteUser - token invalid`);
    }
}