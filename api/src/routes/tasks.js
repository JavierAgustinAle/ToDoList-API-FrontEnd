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

// GET by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM tasks WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// DELETE Task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM tasks WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Task Deleted' });
        } else {
            console.log(err);
        }
    });
});

// INSERT Task
router.post('/', (req, res) => {
    const { id, description, completed, folderID } = req.body;
    console.log(id, description, completed, folderID);
    const query = `
    SET @id = ?;
    SET @description = ?;
    SET @completed = ?;
    SET @folderID = ?;
    CALL TaskIU(@id, @description, @completed, @folderID);
  `;
    mysqlConnection.query(query, [id, description, completed, folderID], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Task Saved' });
        } else {
            console.log(err);
        }
    });
});

// UPDATE Task
router.put('/:id', (req, res) => {
    const { description, completed, folderID } = req.body;
    const { id } = req.params;
    const query = `
    SET @id = ?;
    SET @description = ?;
    SET @completed = ?;
    SET @folderID = ?;
    CALL TaskIU(@id, @description, @completed, @folderID);
    `;
    mysqlConnection.query(query, [id, description, completed, folderID], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Task Updated' });
        } else {
            console.log(err);
        }
    });
});

module.exports = router;