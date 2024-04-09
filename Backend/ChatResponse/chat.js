const express = require('express')
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();

router.use(express.urlencoded({ extended: true }));

const chatGPT = require('./chatGPT')
router.use(express.json());
router.post('/response',async (req, res)=>{
    const body = req.body
    console.log('Request received', body)
    try{
    const response = await chatGPT(body.text)
    if(response.error && response.error.length > 0) 
    res.status(500).json({error: response.error})

    else
    res.status(201).json(response)

    }
    catch(err){
        res.status(500).json({error: 'Internal Server Error'})
    }
})

module.exports = router 