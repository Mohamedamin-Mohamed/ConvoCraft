const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mysqlQuery = require('../mysqlQuery')
const mail = require('../Mail/nodeMailer')

const dbName = process.env.DB_TABLE_NAME

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.post('/passwordReset/resetPassword', async(req, res)=>{
    console.log('Email', req.body.email, 'Password', req.body.password)
    const password = await bcrypt.hash(req.body.password, 10)
    const query = `update ${dbName} set Password = ? where Email = ?`
    const queryParams = [password, req.body.email]
    try{
        const response = await mysqlQuery(query, queryParams)
        if(response.affectedRows > 0){
            try{
            const name = await mysqlQuery(`select FirstName from ${dbName} where Email = ?`, req.body.email)
            const mailResponse = mail(req.body.email, name[0].FirstName, true)
            res.status(201).json({message: 'Password change mail sent succesfully'})
            }
            catch(err){
                console.log(`Couldn't send mail`, err)
            }
            
        }
        else{
            res.status(401).json({message: `Password couldn't be updated`})
        }
    }
    catch(err){
        console.error('Internal Server Error', err)
    }
})
router.get('/check', (req, res)=>{
    res.status(200).send('Check check')
})
module.exports = router