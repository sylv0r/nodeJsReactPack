const { con } = require('../../db/connection.js');
const { getDecodedId } = require("../../methods/token.js")
require('dotenv').config()

module.exports = async (req, res) => {
    const user_id = await getDecodedId(req.headers.authorization)
    if (user_id) {
        const result = await con.query2('SELECT admin FROM users WHERE users.id = ?', [user_id])
        if (result[0].admin === 1) {
            const result = await con.query2('DELETE FROM `data` WHERE id = ?', [req.query.id])
            if (result.affectedRows === 0) {
                res.status(400).json({error : "data not found"});
                console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/deleteData - data not found`);
                return;
            }
            if (result.error) {
                res.status(400).json({})
                console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/deleteData - error`);
                return;
            }
            res.status(200).json({message : `${req.query.id} deleted`});
            console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/deleteData - ${req.query.id} deleted`);
        } else {
            res.status(400).json({});
            console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/deleteData - user ${user_id} tried to delete ${req.query.id}`);
        }
    } else {
        res.status(400).json({error: "you are not connected"})
        console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/deleteData - user not connected`);
    }
}