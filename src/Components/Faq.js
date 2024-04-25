import { useState } from "react";
import { FaPlus } from "react-icons/fa"
import { IoClose } from "react-icons/io5";
const Faq = (props)=>{
    const [displayStates, setDisplayStates] = useState(props.faq.map(() => false)); //create an array of length faq thats intialized to false so that each question is hidden at first
   

    const handleDisplay = (index)=>{
        const newDisplayStates = [...displayStates]
        newDisplayStates[index] = !newDisplayStates[index] //toggle depending on the question the user clicked on
        setDisplayStates(newDisplayStates)
    }
    const faq = props.faq
    
    return(
        <div className="text-white bg-gray-600 my-2   max-w-[1620px] mx-5 rounded-md" >
            <div className="grid grid-cols-3 ease-out duration-500">
            <h1 className="mx-8 font-bold  my-8 text-3xl">FAQS</h1>
           
            </div>
            <div className="mx-8">
                <ul className="md:flex flex-col text-white">
                <p className="col-span-1 uppercase  mb-8">Frequently asked questions</p>
                    {faq.map((faq, index)=>(
                        <li key={index} id={index} className="flex flex-col border-t ">
                            <strong className="uppercase"> {index + 1 + '.'}{faq.question}</strong>
                            {displayStates[index] ? <IoClose className="ml-auto mr-7 " onClick={()=>handleDisplay(index)} size={30}/> : <FaPlus className="ml-auto mr-7 " onClick={()=>handleDisplay(index)} size={25}/>}
                        <p className={!displayStates[index]? 'hidden': 'pb-2 '}>{faq.answer}</p>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}
export default Faq