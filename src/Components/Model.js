import { IoIosCheckmarkCircleOutline } from "react-icons/io"
import { TbBolt } from "react-icons/tb"
import { BsStars } from "react-icons/bs"
import { LuShare } from "react-icons/lu"
import { useState, useEffect, useRef } from "react"
const Model = ()=>{
    const[model, setModel] = useState(null)
    const [pricing, setPrices] = useState(null)

    const handleModels = (event)=> {
         /* Stop the propagation of the click event to prevent it from reaching the document-click event listener..
         So there is two phases of event propogatio; capturing phase and bubbling phase. 
         During the capturing phase, the event starts from the root of the DOM hierarchy and travels down to the target element.
        It allows ancestors of the target element to capture the event before it reaches the target. Then the event reaches its target element.
        During the bubbling phase, the event travels back up from the target element to the root of the DOM hierarchy.
        It allows ancestors of the target element to react to the event after it has been processed by the target. So without calling event.propogation(), the documen-level- click
        event listener is added immediatelynd that invokes handleClickOutside which sets pricing to false making the pricing component to close immediately. So we prevent this by
        using the below function
         */
        event.stopPropagation();
        setModel(!model)
    }

    const modelsRef = useRef(null)

    useEffect(()=>{

        const handleClickOutside = (event)=>{
        if(modelsRef.current && !modelsRef.current.contains(event.target)){
        setModel(false)
        }

        }

        if(model)
        document.addEventListener('click', handleClickOutside)

    //detach the event listener when prcing is false
    return ()=>{
        document.removeEventListener('click', handleClickOutside)
    }
    }, [model])

    const handlePrices = ()=>{
        setPrices(!pricing)
        setModel(!model)
    }
    return(
        <div className="absolute top-20 left-70" onMouseEnter={()=>alert("hey there")} onMouseLeave={()=>alert("leaving???")}>
            <div ref={ modelsRef } className="border border-neutral-700 bg-neutral-900 max-w-[390px] mx-9 rounded-lg p-2" > 
                 
                 <div className="  px-2 py-3 hover:cursor-pointer hover:bg-neutral-800 rounded hover:border hover:border-blue-400">
                 
                 <h1 className="text-sm flex">{< TbBolt size={20} className="mr-4"/>} ConvoCraft~3.5</h1>
                 <div>
                 <p className="text-sm ml-9 mt-0">Great for everyday tasks</p>
              
                
                 </div>
                 </div>
                 <div className="px-2 mb-2 mt-2 hover:cursor-pointer hover:bg-neutral-800 rounded py-3 hover:border hover:border-blue-400 " onClick={ handlePrices }>
                     <h1 className="text-sm flex">{ <BsStars size={20} className="mr-4"/> }ConvoCraft~4</h1>
                     <p className="text-sm ml-9">Our smartest and most capable model.</p>
                     <p className="text-sm ml-9">Including browsing and more</p>
                     <button className="w-[78%] mt-7 ml-9 bg-purple-500 rounded-lg p-2 text-[#ffffff] font-medium text-sm ">Upgrade to Plus</button>
                     </div>
                     <p className="md:hidden border-t border-neutral-700 pb-3">
                         </p>
                     <div className="md:hidden mx-2 py-3 px-2 hover:cursor-pointer hover:bg-neutral-800 rounded">
                     <p className="text-sm flex ">{ < LuShare  size={20} className="mr-4"/> }Share Chat</p>
                     </div>
                 </div>
            </div>
    )
}
export default Model