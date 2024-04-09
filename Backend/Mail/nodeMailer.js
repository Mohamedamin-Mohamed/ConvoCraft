const nodeMailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const userEmail = process.env.USER_EMAIL
const userPass = process.env.USER_PASSWORD

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: userEmail,
        pass: userPass  
    }
})

var textInfo
var subjectHeader
const mail = async(mailRecepient, userName, isLookUp)=>{ //nodemailer will be used to send email when the user creates an account or the user changes their password
    if(isLookUp){ //password change
     subjectHeader = 'Password change'
     textInfo = `Dear ${userName},

We hope this email finds you well. This is to confirm that your password has been changed successfully. Your account security is our top priority, and we want to ensure that your information remains protected at all times. 

If you did not initiate this password change or believe your account has been compromised, please contact our support team immediately for assistance.
     
Thank you for choosing our services.
     
Best regards,
ConvoCraft team`
    }
    else if(!isLookUp){ //sign up
     subjectHeader = `Unlock the Power of Chatbots with ConvoCraft!`
     textInfo = `Dear ${userName},

Thank you for joining the ConvoCraft community! We're excited to welcome you aboard. ConvoCraft offers powerful tools to help you create engaging and helpful chatbots that enhance user experiences, automate tasks, and more. Should you have any questions, our dedicated support team is here to assist you. Happy creating!
Best regards,
ConvoCraft team` 
    }
    else{ //contact 
     subjectHeader = 'Your Message to ConvoCraft Support'
     textInfo = `Dear ${userName},

Thank you for reaching out to ConvoCraft Support. Your message has been received, and a member of our customer support team will reply to your email at the soonest.

Best regards,
ConvoCraft Support Team     `
    }
    

    const mailOptions = {
        from: userEmail,
        to: mailRecepient,
        subject: subjectHeader,
        text: textInfo
    }
    try{
    const result = await new Promise((resolve, reject)=>{
        transporter.sendMail(mailOptions, (err, info)=>{
            if(err)
            reject(err)
        else
        resolve(info.response)
    })
    })
    return result
}

     catch(err){
        throw(err)
     }
    }
module.exports = mail