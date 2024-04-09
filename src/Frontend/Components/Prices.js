import { useState } from "react"
import { IoClose } from "react-icons/io5"
import { IoCheckmarkOutline } from "react-icons/io5"
import { RiStarSFill } from "react-icons/ri"
import { BsStars } from "react-icons/bs"

import { Link } from "react-router-dom"

const Prices = ()=>{
    const[close, setClose] = useState(false)
    
    const handleClose = ()=>{
        setClose(!close)
    }
    //state to be used to change the color of the close button based on hovering of the button
    const [hovered, setHovered] = useState(false);
    return(
        <div className="">
        <div className={ close ? "hidden" : "absolute justify-center inset-0 items-center text-white left-[240px] top-[100px] backdrop-blur-90 " }>
            <div className="max-w-[1000px] border-t border-neutral-600 h-[595px] ml-20 rounded-lg bg-neutral-800">
            
            <div>
           
                <h1 className="flex mx-10 my-5 text-xl ">Upgrade your plan{  <IoClose size={25} className="ml-auto mb-5 hover:cursor-pointer" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onClick={ handleClose } color={hovered? 'white': 'gray'}/> }</h1>
               
            </div>
            <div className="md:grid grid-cols-3 border-t  border-neutral-700 ">
                <div className="p-7 flex flex-col ">
                    <h1 className="text-xl">Free</h1>
                    <p className="text-[#9b9b9b]">USD $0/month</p>
                    <button className="my-5 rounded-lg p-4 text-[#9b9b9b] bg-[#676767] font-light" disabled={ true }>Your current plan</button>
                   
                    <p>For people just getting started with ChatGPT</p>
                    <ul className="m-3 text-sm">
                     
                      <li className="flex p-1">{ <IoCheckmarkOutline size={30}  className="mr-5"/> }Unlimited messages, interactions, and history</li>  
                      <li className="flex p-1">{ <IoCheckmarkOutline size={20}  className="mr-5"/> }Access to our ConvoCraft-3.5 model</li>
                      <li className="flex p-1">{ <IoCheckmarkOutline size={20}  className="mr-5"/> }Access on Web, iOS, and Android</li>
                    </ul>
                    <p className="mt-auto text-sm text-[#9b9b9b]">Have an existing plan? See <strong className="underline">billing help</strong></p>
                   
                </div>
                <div className="p-7 flex flex-col border-l border-r border-neutral-700">
                    <h1 className="text-xl flex"> { < RiStarSFill className="mr-1" size={30} color="green"/>} Plus</h1>
                    <p className="text-[#9b9b9b]">USD $20/month</p>
                    <button className="my-5 rounded-lg p-4 bg-[#10a37f]">Upgrade to plus</button>
                    <p>Everything in Free, and:</p>
                    <ul className="m-3 text-sm">
                        <li className="flex p-1">{ <IoCheckmarkOutline size={30}  className="mr-5"/> }Access to ConvoCraft-4, our most capable model</li>
                        <li className="flex p-1">{ <IoCheckmarkOutline size={20}  className="mr-5"/> }Browse, create, and use ConvoCrafts</li>
                        <li className="flex p-1">{ <IoCheckmarkOutline size={60}  className="mr-5"/> }Access to additional tools like DALL·E, Browsing, Advanced Data Analysis and more</li>
                    </ul>
                </div>
                <div className="p-7 flex md:flex-col ">
                    <h1 className="text-xl flex">{ < BsStars className="mr-1" size={30} color="blue"/>}Team</h1>
                    <p className="text-[#9b9b9b]">USD $25 per person/month*</p>
                    <button className="my-5 rounded-lg p-4 bg-[#0066de]">Upgrade to Team</button>
                    <p>Everything in Plus, and:</p>
                        <ul className="m-3 text-sm">
                            <li className="flex p-1">{ <IoCheckmarkOutline size={65}  className="mr-5 "/> }Higher message caps on ConvoCraft-4 and tools like DALL·E, Browsing, Advanced Data Analysis, and more</li>
                            <li className="flex p-1">{ <IoCheckmarkOutline size={30}  className="mr-5"/> }Create and share ConvoCrafts with your workspace</li>
                            <li className="flex p-1">{ <IoCheckmarkOutline size={30}  className="mr-5"/> }Admin console for workspace management</li>
                            <li className="flex p-1">{ <IoCheckmarkOutline size={30}  className="mr-5"/> }Team data excluded from training by default.</li>
                        </ul>
                        <p className="text-sm ml-5 text-[#9b9b9b]">*Price billed annually, minimum 2 users</p>
                </div>
              
                </div>
               </div>
        </div>
         
        </div>
    
    )
}
export default Prices