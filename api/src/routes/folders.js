const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET All
router.get('/folders', (req, res) => {
    mysqlConnection.query('SELECT * FROM folders', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// GET by ID
router.get('/folders/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM folders WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// DELETE Folder
router.delete('/folders/:id', (req, res) => {
    const { id } = req.params;
    const query = `
    SET @id = ?;
    CALL SP_Folder_D(@id);
    `;
    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Folder Deleted' });
        } else {
            console.log(err);
        }
    });
});


// INSERT Folder
router.post('/folders', (req, res) => {
    const { id, name } = req.body;
    console.log(id, name);
    const query = `
    SET @id = ?;
    SET @name = ?;
    CALL SP_Folder_IU(@id, @name);
  `;
    mysqlConnection.query(query, [id, name], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Folder Saved' });
        } else {
            console.log(err);
        }
    });
});

// UPDATE Folder
router.put('/folders/:id', (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const query = `
    SET @id = ?;
    SET @name = ?;
    CALL SP_Folder_IU(@id, @name);
    `;
    mysqlConnection.query(query, [id, name], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Folder Updated' });
        } else {
            console.log(err);
        }
    });
});


module.exports = router;