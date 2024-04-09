import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaPlus } from "react-icons/fa"
import { IoClose } from "react-icons/io5";
import {ReactTyped } from 'react-typed'
import AboutUs from './AboutUs';
import Contact from './Contact';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import { useMediaQuery } from 'react-responsive'

const Navbar = (props)=>{  
    const [nav, setNav] = useState(false)
    const handleNav = ()=>{
        setNav(!nav)
    }
    const[display, setDisplay] = useState(false)

    const handleDisplay = (e)=>{
        
        setDisplay(e)
    }

    const renderComp = ()=>{
        switch(display){
            case 'about':
              return <AboutUs />
            case 'contact': 
              return <Contact />
            case 'login': 
              return <Login />
            default:
              return <Home />              
        }
    }
    const navBar = props.navBar
    const isMediumScreen = useMediaQuery({ minWidth: 640 }); // Set the breakpoint for md screens

    console.log(navBar)
    return(
       
        <div className='text-white flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>
            <div >
                {isMediumScreen && <ReactTyped className= 'w-full text-3xl font-bold text-[#00df9a] ' strings={['ConvoCraft Chatbot']} typeSpeed={90} backSpeed={140}/>}
            </div>
            <ul className='hidden sm:flex'>
            {navBar.map((list)=>(
                
                     <li id='list' key={list}>
                       <NavLink to={list.toLowerCase() === 'home' || list.toLowerCase() === 'login' ? `/${list.toLowerCase()}` : '/'} className='p-4 my-5 border-b border-gray-300' onClick={(e) => handleDisplay(list.toLowerCase())}>{list}</NavLink>
                        
                   </li>
                ))}
               
               
            </ul>
            <h1 className='sm:hidden  text-3xl px-5 my-0 text-[#00df9a] font-bold'>ConvoCraft Chatbot</h1>
            <div onClick={handleNav} className='block sm:hidden'>
                {!nav ? <FaPlus size={30} className='hover:cursor-pointer'/> : <IoClose size={30} className='hover:cursor-pointer'/>}
            </div>
            

            <div className={nav? 'sm:hidden left-0 top-0 w-[90%] fixed h-full ease-in-out duration-500': 'fixed left-[-100%]'}>
            <ul className='pt-18 bg-white text-black  mt-14 ml-9'>
                {navBar.map((list)=>(
                //      <li id='list' key={list}>
                //      <NavLink to={list.toLowerCase() === 'home' || list.toLowerCase() === 'login' ? `/${list.toLowerCase()}` : '/'} className='p-4 my-5 border-b border-gray-300' onClick={(e) => handleDisplay(list.toLowerCase())}>{list}</NavLink>
                      
                //  </li>
                     <li id='list' key={list}>
                      
                       <button className='p-4 my-5 border-b border-gray-300 w-full' onClick={(e)=> handleDisplay(list.toLowerCase())}>{list}</button>
                   </li>
                ))}
                
            </ul>
            <div>
                {renderComp()}
                </div>
            </div>
        </div>
    )
}
export default Navbar