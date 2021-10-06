const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const { validateEmail, validateName, validatePhoneNumber } = require('./js/validate');

require('dotenv').config()

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


// insert a new subscriber
//  expects: name, email, phone, company
////////////////////////////////////////
app.post('/subscriber', (req, res) => {
    const { name, email, phone, company } = req.body;

    const validatedEmail = validateEmail(email);
    const validatedName = validateName(name);
    const validatedPhoneNumber = validatePhoneNumber(phone);

    if(!validatedName.success) {
        res.json(validatedName);
        return;
    }

    if(!validatedEmail.success) {
        res.json(validatedEmail);
        return;
    }

    if(!validatedPhoneNumber.success) {
        res.json(validatedPhoneNumber);
        return;
    }


    // No validation problems..so let's insert the data.

    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: '3306',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'bayard'
    });

    connection.connect();

    var newSub = { name, email, phone, company }

    connection.query('INSERT INTO subscribers SET ?', newSub, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.json({ success: false, error}); 
        } else {
            connection.end();

            res.json({ success: true, affectedRows: results.affectedRows });
        }
    });
})

// listen...
////////////
app.listen(port, () => {
    console.log('listeing on: ' + port);
})
