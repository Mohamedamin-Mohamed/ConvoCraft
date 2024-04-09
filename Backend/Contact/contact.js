const express = require('express')
const router = express.Router()

router.use(express.json())

router.post('/contact', async(req, res)=>{
    res.status(201).json({message: 'Received'})
})
module.exports = router