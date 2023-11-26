const { Router } = require("express");
const router = Router()

const cors = require("cors");
const getConnection = require("./query/getConnection.js");
const postUser = require("./query/postUser.js");
const getUsers = require("./query/getUsers.js");
const deleteUser = require("./query/deleteUser.js");
const verifyToken = require("./query/verifyConnexion.js")
const getAdmin = require("./query/getAdmin.js")
const patchAdmin = require("./query/patchAdmin.js")

router.use(cors());
router.put('/getConnection', getConnection)
router.get('/getUsers', getUsers)
router.post('/postUser', postUser)
router.delete('/deleteUser', deleteUser)
router.get('/verifyToken', verifyToken)
router.get('/getAdmin', getAdmin)
router.patch('/patchAdmin', patchAdmin)

module.exports.routes = router
