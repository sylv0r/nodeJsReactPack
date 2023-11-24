const { Router } = require("express");
const router = Router()

const cors = require("cors");
const getData = require("./query/getData.js");
const postData = require("./query/postData.js");
const deleteData = require("./query/deleteData.js");


router.use(cors());
router.get('/getData', getData)
router.post('/postData', postData)
router.delete('/deleteData', deleteData)

module.exports.routes = router
