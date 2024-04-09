import { useState, useEffect } from "react"
import { IoClose } from "react-icons/io5"
import { ReactTyped } from "react-typed"
const AboutUs = ()=>{
    const [close, setClose] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
const handleClose = ()=>{
    setClose(!close)
    document.body.style.overflow = ''
}
useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    return (
        <div className={ close ? "hidden" :  "fixed flex justify-center inset-0  items-center text-black backdrop-blur"}>
          
                <div className="md:flex rounded-lg bg-[#f0f2f5] w-[700px] justify-center items-center h-[400px]">
               
                <div className="">
                {windowWidth < 768 && <IoClose className="ml-auto hover:cursor-pointer" size={30} onClick={ handleClose }/>}
                </div>
                    <div className="flex-col justify-center items-center border-r  text-center mx-7">
                    
                    <ReactTyped className= ' text-2xl text-[#1877f2] font-bold' strings={['ConvoCraft Chatbot Application']} typeSpeed={60} backSpeed={70} />
                    </div>
                   
                    <div className="text-center">
                    { windowWidth > 768 && <IoClose className="md:ml-auto relative hover:cursor-pointer top-[0px]" size={30} onClick={ handleClose }/>}
                    <p className="text-xl ">With our ConvoCraft Chatbot Application, we believe in the power of technology to simplify and enhance daily interactions. Our mission is to create innovative solutions that seamlessly integrate into your life, 
                    making tasks more convenient and enjoyable. With our chatbot application, we aim to provide intelligent and user-friendly assistance, fostering efficient communication and problem-solving. 
                    Join us on the journey to a more connected and streamlined future</p>
                   </div>
            </div>
        </div>
    )
}
export default AboutUs