const express = require('express')
const router = express.Router()
const mysqlQuery = require('../mysqlQuery')
const dbName = process.env.DB_TABLE_NAME
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/passwordReset/email_lookup', async(req, res)=>{
    console.log(req.email)
    const email = req.body.email
    console.log(email)

    const query = `select FirstName, Email from ${dbName} where Email = ?`
    const queryParam = [email]
    try{
    const response = await mysqlQuery(query, queryParam)
    if(response.length > 0) { //account found
        console.log(response[0])
        res.status(200).json(response[0])
    }
    else{
        res.status(401).json('Account not found')
    }
}
catch(err){
    res.status(500).send('Internal Server Error')
}
})
router.get('/passwordReset/email_lookup', async(req, res)=>{
    res.json({email: "Hey there"})
})
module.exports = router