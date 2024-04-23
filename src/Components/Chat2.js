import { SiOpenai } from "react-icons/si";
import { LuPenSquare } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { LuShare } from "react-icons/lu";
import { CgMenuLeftAlt } from "react-icons/cg";
import { useMediaQuery } from "react-responsive";
import { FaArrowUp } from "react-icons/fa";
import { useState } from "react";
import Model from "./Model";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import {useDispatch, useSelector} from 'react-redux'
import { FaUserAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";


const Chat2 = () => {

    const isMediumScreen = useMediaQuery({minWidth: 768}) // Set the breakpoint for md screens
    
    const[input, setInput] = useState('')
    const[model, setModel] = useState(false)
    const[userInfo, setUserInfo] = useState(false)

    const dispatch = useDispatch()
    const currUser = useSelector(state=>state.userInfo)
  return (
    <div className="flex bg-neutral-900 h-screen relative justify-center">
        
      <div className="lg:flex w-1/4 items-start pt-6 bg-[#171717] hidden">
        <div className="flex-grow flex items-center text-white">
          <SiOpenai size={19} className="ml-7 mr-4 rounded-full " />
          <p className="text-[#ececec] text-sm">New chat</p>
        </div>
        <LuPenSquare size={22} color="white" className="mr-6" />
        
        <FaUserAlt size={20} className="absolute top-[750px] left-4" color="white"/> 
        <button className=" absolute top-[750px] text-sm text-[#ececec] ml-12" onClick={()=> setUserInfo(true)}>{currUser.fullName}</button>
          {userInfo &&
           <div className="absolute top-[700px]">
          <p>{currUser.email}</p>
          <LuLogOut size={20} />
          <p>Log out</p>
        </div>
}
      </div>
      <div className="flex-grow w-full bg-[#2f2f2f] text-white  pt-6 flex justify-center">
       
        <div className="flex hover:cursor-pointer">
        <CgMenuLeftAlt size={20} color="white" className="mt-1 ml-4 lg:hidden flex mr-18"/>
        <div className="flex lg:ml-0 ml-28 hover:cursor-pointer" >
          <h1 className="ml-4 mr-1 text-lg flex hover:cursor-pointer" onClick= {()=>setModel(!model) }>ConvoCraft</h1>
          <p className="mr-1 text-[#b4b4b4] text-lg">3.5</p>
         
          <IoIosArrowDown size={18} className="mt-2" color="gray" />
          </div>
         {model && < Model /> }
        </div>
        <div className="ml-auto">
           {isMediumScreen ? <LuShare size={25} className="mr-8" /> : <LuPenSquare size={25} className="mr-8" />} { /* if screen size is less than md, display the LuPenSquare component so that the user can 
           create a new chat else display LuShare component so that the user can export their chat*/}
       
        </div>
      
      </div>
      <div className="absolute inset-0 flex  justify-center items-center">
        <div className="flex flex-col justify-center items-center ">
          {/* this div will be used when the user first accesses the chat page, be it first time logged in or user wants to start a new chat */}
          <SiOpenai size={30} color="white" className="mb-5"/>
          <h1 className="text-white text-2xl">How can I help you today?</h1>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center mb-2">
        <button className="flex-col justify-center items-center mt-auto text-white">
            <div className="flex flex-wrap justify-center gap-3">
        <div className="md:w-[324px] w-full h-[66px] border border-gray-400 md:px-[12px] md:py-[10px] rounded-lg text-start p-3 hover:bg-[#8b878b67]">

            <h1 className="text-[#ececec] text-sm">Recommend a dish</h1>
            <p className="text-neutral-400 text-sm">to bring to a potluch</p>
        </div>
        <div className="md:w-[324px] w-full h-[66px] border border-gray-400 md:px-[12px] md:py-[10px] rounded-lg text-start p-3 hover:bg-[#8b878b67]">
            <h1 className="text-[#ececec] text-sm">Design a programming game</h1>
            <p className="text-neutral-400 text-sm">teach basics in a fun way</p>
        </div>
        </div>
        <div className="md:flex flex-wrap justify-center gap-3 mt-4 hidden">
        <div className="w-[324px] h-[66px] border border-gray-400 px-[12px] py-[10px] rounded-lg text-start p-3 hover:bg-[#8b878b67]">
            <h1 className="text-[#ececec] text-sm">Design a database schema</h1>
            <p className="text-neutral-400 text-sm">for an online merch store</p>
        </div>
        <div className="w-[324px] h-[66px] border border-gray-400 px-[12px] py-[10px] rounded-lg text-start p-3 hover:bg-[#8b878b67]">
            <h1 className="text-[#ececec] text-sm">Plan a 'mental health day'</h1>
            <p className="text-neutral-400 text-sm">to help me relax</p>
        </div>
        </div>
        <div className="flex mt-4 border border-gray-400 rounded-xl">
        <input className="md:w-[670px] w-full h-[52px] p-5 bg-inherit outline-none overflow-hidden" style={{wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}  placeholder="Message ConvoCraft... " onChange={(e)=>setInput(e.target.value)} value={input}/>
        <FaArrowUp size={20} className="mt-4 mr-4 hover:text-white" color={input === '' ? "gray" : "white" }/>
          </div>
          <p className="text-sm text-[#cdcdcd] hover:cursor-text">ConvoCraft can make mistakes. Consider checking important information.</p>
          
        </button>
        

       
        </div>
    </div>
  );
};

export default Chat2;
