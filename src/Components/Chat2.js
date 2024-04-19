import { SiOpenai } from "react-icons/si"
import { LuPenSquare } from "react-icons/lu"
import { IoIosArrowDown } from "react-icons/io"
import { LuShare } from "react-icons/lu"

const  Chat2 = ()=>{
    return(
        <div className="flex bg-neutral-900 h-screen">
            <div className="flex w-1/4 items-start pt-4 bg-[#171717]">
            <div className="flex-grow flex items-center text-white">
            <SiOpenai size={15} className="ml-4 mr-2 rounded-full "/>
            <p className="text-[#ececec] text-xs">New chat</p>
            </div>
            <LuPenSquare size={15} color="white" className="mr-4"/>
            
            </div>
            <div className=" 3/4 bg-[#2f2f2f] text-white w-full pt-3 flex justify-between">
                <div className="flex hover:cursor-pointer ">
                <h1 className="ml-4 mr-1 text-sm">ConvoCraft</h1>
                <p className="mr-1 text-[#b4b4b4] text-sm">3.5</p>
                <IoIosArrowDown size={10} className="mt-1"/>
                </div>
                <div className="flex  ">
                <LuShare size={20} className=""/>
               
                </div>
            </div>
            </div>
    )
}
export default Chat2