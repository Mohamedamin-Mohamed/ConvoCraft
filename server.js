const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const port = 80
const authenticate = require('./Backend/Authentication/authenticate')
const accountCreation = require('./Backend/AccountCreation/create')
const chatResponse = require('./Backend/ChatResponse/chat')
const email_lookup = require('./Backend/Email/email_lookup')
const resetPass = require('./Backend/Email/passwordReset')
const contact = require('./Backend/Contact/contact')
//will serve the authentication endpoint, for now be will be a post request to /login
app.use(authenticate)
app.use(accountCreation)
app.use(chatResponse)
app.use(email_lookup)
app.use(resetPass)
app.use(contact)

app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`)
})