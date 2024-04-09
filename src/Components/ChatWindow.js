import { useSelector } from "react-redux"
import { IoMdArrowRoundUp } from "react-icons/io"
import { useState } from "react"

const ChatWindow = ()=>{
    const currUser = useSelector((state)=>state.userInfo)
    const [input, setInput] = useState(null)
    const[color, setColor] = useState(null)
    const[reqSent, setReq] = useState(false)
    const [responseData, setResponseData] = useState([]);

    
    const handleSendRequest = async()=>{
        const requestBody = { text: input }; // Wrap input in an object

        console.log('Hey here it is', requestBody)

        const response = await fetch('http://localhost:80/response',{
            method: 'post', 
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        const data = await response.json()
        setResponseData([...responseData, data])
        console.log(responseData)
    }
    return(
       <div></div>
    )
}
export default ChatWindow