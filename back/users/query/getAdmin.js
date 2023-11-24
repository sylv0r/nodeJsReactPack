const { con } = require('../../db/connection.js');
const { getDecodedId } = require("../../methods/token.js")
require('dotenv').config()

module.exports = async (req, res) => {
    const user_id = await getDecodedId(req.headers.authorization)
    if (user_id) {
        const result = await con.query2('SELECT admin FROM users WHERE users.id = ?', [user_id])
        if (result[0].admin === 1) {
            res.status(200).json({ admin: true });
            console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/getAdmin - ${user_id} is admin`);
        }else{
            res.status(400).json({ admin: false });
            console.log(`[${new Date(Date.now()).toLocaleString()}] - POST /users/getAdmin - ${user_id} is not admin`);
        }
    } else {
        res.status(400).json({error: "You arre not connected"})
    }
}