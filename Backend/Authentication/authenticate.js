const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const mysqlQuery = require('../mysqlQuery'); // query function to be used
const dbName = process.env.DB_TABLE_NAME;

router.post('/login', (req, res) => {
    console.log('Post received')
  const body = req.body;
  const sqlQuery = `SELECT FirstName, Surname, Password, Email FROM ${dbName} WHERE Email = ?`;
  const params = [body.email];

  mysqlQuery(sqlQuery, params)
    .then((response) => {
      console.log(response)
      if (response.length > 0) {
        // If any rows were returned, check if the stored password matches with the actual password typed by the user
        bcrypt.compare(body.password, response[0].Password, (err, result) => {
          if (err) {
            res.status(401).json({ error: 'Password does not match with email on file' });
          } else if (result) {
            res.status(201).json({ message: response });
          } else {
            res.status(401).json({ error: "The password that you've entered is incorrect."});
          }
        });
      } else {
        // No rows were returned, email is not valid
        res.status(401).json({ error: "The email that you've entered is incorrect." });
      }
    })
    .catch((error) => {
      console.error('Error during MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
router.get('/test-connection', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
      //  console.error('Error connecting to MySQL:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      console.log('Connected to MySQL!');
      connection.release();
      res.send('Connection Successful');
    });
  });
  
router.get('/hey', (req, res) => {
  res.status(404).json({ error: 'Could not load resource' });
});

module.exports = router;
