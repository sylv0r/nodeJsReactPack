const { verifyToken } = require("../../methods/token");
require("dotenv").config()

module.exports = async (req, res) => {
  const token = req.headers.authorization
  if (token) {
    const isTokenValid = await verifyToken(token)
    if (isTokenValid) {
      console.log(`[${new Date(Date.now()).toLocaleString()}] - GET /users/verifyToken - token valid`);
      res.status(200).json({message: "You are connected", user_id: isTokenValid})
    } else {
      console.log(`[${new Date(Date.now()).toLocaleString()}] - GET /users/verifyToken - token invalid`);
      res.status(404).json({error: "You have been disconect"})
    }
  } else {
    console.log(`[${new Date(Date.now()).toLocaleString()}] - GET /users/verifyToken - no token`);
    res.status(404).json({error: "bad token"})
  }
}