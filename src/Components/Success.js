import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { useNavigate } from "react-router-dom"
const Success = ()=>{
    const navigate = useNavigate()
    
    const handleRedirect = ()=>{
       navigate('/')
    }
    return(
        <div className="bg-[#ffffff] h-screen flex justify-center items-center">
            <div className="bg-green-400 border h-[330px] w-[300px] rounded-xl">
            <div className="h-[100px]  flex justify-center items-center">
            <IoMdCheckmarkCircleOutline size={30} color="green" className="rounded-full bg-white "/>
           
            </div>
           
            <div className="bg-white h-[150px] border-b border-r border-l rounded-l rounded-r flex justify-center items-center">
                <p className="text-center ml-4 mr-4">Congratulations, your message has been received succesfully</p>
                
            </div>
            <div className="flex justify-center items-center">
                <button className="mt-5 border rounded-xl p-2 text-white bg-[#0866ff]" onClick={ handleRedirect }>Continue</button>
                </div>
            </div>
        </div>
    )
}
export default Success