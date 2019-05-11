var express = require('express');
var router = express.Router();

// Import Dependencies.
const cors = require('cors');
const db = require('../db/db_conf');
const Member = require('../db/models/Member');

router.use(cors());

router.get('/me', (req, res) => {

});



module.exports = router;
