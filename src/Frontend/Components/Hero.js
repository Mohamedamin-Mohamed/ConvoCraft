import { ReactTyped } from 'react-typed'
import Image from '../Images/chatbot.avif'

const Hero = ()=>{
    return(
        <div className=' bg-white py-2 border rounded-md max-w-[1800px] mx-5 '>
            <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3 '>
            <img src={ Image } alt='' className=' w-full mx-auto my-7 col-span-2 lg:h-[600px]'/>
            
            <div className='mx-5 w-full'>
                <ReactTyped className='font-bold text-3xl md:p-5 py-6 text-[#00df9a]' strings={ ['Welcome to ConvoCraft Chatbot🤖🚀']} typeSpeed={90} backSpeed={80} loop startDelay={2720}/>
                <p className='text-2xl'>ConvoCraft Chatbot is an intelligent virtual assistant designed to help you with various tasks. Whether you need information, assistance, or just want to have a friendly chat, 
                    our chatbot is here for you 24/7.
                    </p>
                    <p className='font-bold p-3 text-2xl'>Key Features:</p>
                    <ul className='list-disc px-8 mx-auto'>
                        <li className='text-xl italic'>Instant answers to your questions</li>
                        <li className='text-xl italic'>Help with product information and support</li>
                        <li className='text-xl italic'>Fun and engaging conversation</li> 
                    </ul>
                    <p className='text-2xl py-4'>
                    Feel free to start a conversation by typing your queries or saying hello. Our chatbot is here to make your experience enjoyable and efficient. Enjoy chatting!
                    </p>
            </div>
            </div>
        </div>
    )
}
export default Hero