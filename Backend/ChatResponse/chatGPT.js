const dotenv = require('dotenv')
dotenv.config()

const apiKey = process.env.API_KEY
const apiUrl = "https://api.openai.com/v1/chat/completions"
const ChatGPT = async (req)=>{
    const prompt = req
    const requestData = {
        prompt,
        max_tokens: 10,
        model: "gpt-3.5-turbo"
      };
      try{
      const response = await fetch(apiUrl, {
        method: 'post', 
        headers:{
            'content-type': 'application/json',
            'authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestData)
      })
      console.log(await response.json())
      if(!response.ok) return {error: `HTTP error! Status: ${response.status}`}
      return response.json()
    }
    catch(err){
        return { error: err.message}
    }
}
module.exports = ChatGPT