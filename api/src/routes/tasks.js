const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM tasks', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


module.exports = router;