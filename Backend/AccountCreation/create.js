const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const nodeMailer = require('../Mail/nodeMailer')
const mysqlQuery = require('../mysqlQuery')
const dbName = process.env.DB_TABLE_NAME
const monthsMapping = {
    'January' : '01',
    'February' : '02',
    'March' : '03',
    'April' : '04',
    'May' : '05',
    'June' : '06',
    'July' : '07',
    'August' : '08',
    'September' : '09',
    'October' : '10',
    'November' : '11',
    'December' : '12'
}

router.post('/account_creation', async(req, res)=>{
    console.log('Create Account post received')
    
    const body = req.body
    console.log('Body is ', body)
    const query = `insert into ${dbName} (FirstName, Surname, Email, Password, Gender, DOB) values(?,?,?,?,?,?)`

    const hashPassword = await bcrypt.hash(body.password, 10)
    console.log(hashPassword)
    const queryParams = [body.firstName, body.surname, body.email, hashPassword, body.gender, `${body.year}-${monthsMapping[body.month]}-${body.day}`]
    const result = await mysqlQuery(query, queryParams);
    if(result.affectedRows > 0){ //query okay
        try{
            await nodeMailer(body.email, body.firstName, false)
            console.log(`Email sent succesfully`)
            res.status(201).json({ message: 'Account created succesfully' })
        }
        catch(err){
            console.error(`Error sending email, ${err}`)
             res.status(500).json({ message: 'Error sending confirmation email' });
        }
    }
    else{
        res.status(500).json({ message: 'Account creation failed' })
    }
})
module.exports = router