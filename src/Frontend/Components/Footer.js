import { useEffect, useState } from "react"
import AboutUs from "./AboutUs"
import Login from "./Login";
import Contact from "./Contact";

const Footer = ( )=>{
    const [showAboutUs, setShowAboutUs] = useState(false);
    const[showLogin, setLogin] = useState(false)
    const[showContact, setContact] = useState(false)
   // const [showAccount, setAccount] = useState(false)

    const aboutUsHandle = ()=>{
        setShowAboutUs(!showAboutUs)   
    }
    const loginHandle = ()=>{
        setLogin(!showLogin)
    }
    const contactHandle = ()=>{
        setContact(!showContact)
    }
    // const accountHandle = ()=>{
    //     setLogin(!showLogin)
    //     setAccount(!setAccount)
    // }
    /*effect to be used to limit the user from scrolling depending if any of the pop-up windows are open,
    then clean up the function by enabling the user to scroll */
    useEffect(()=>{
        const handleOverflow = ()=>{
            document.body.style.overflow = showAboutUs || showLogin || showContact? 'hidden' : ''
        }
        handleOverflow() // Set overflow on initial render
        return ()=>{
            document.body.style.overflow = '' //clean up on component unmount
        }
    }, [showAboutUs, showLogin, showContact])

    return(
        <div className="text-white">
            <div className="grid md:grid-cols-4 bg-black h-[200px] mx-5 rounded-md mb-4">
                <div className="ml-5 mt-5 ">
                    <h1 className="pb-2 text-bold uppercase text-xl">Services</h1>
                    <ul className="pb-6">
                        <li>Branding</li>
                        <li>Design</li>
                        <li>Marketing</li>
                        <li>Advertisement</li>
                    </ul>
                </div>
                <div className="ml-5 mt-5 ">
                    <h1 className="pb-2 text-bold uppercase text-xl">Company</h1>
                    <ul>
                        <li><button onClick={aboutUsHandle}>About Us</button></li>
                        {showAboutUs && <AboutUs />}
                        {showLogin && <Login />}
                        {showContact && <Contact />}
                        <li><button onClick={contactHandle}>Contact</button></li>
                        <li><button onClick={ loginHandle }>Login</button></li>
                    </ul>
                </div>
                <div className="ml-5 mt-5 ">
                    <h1 className="pb-2 text-bold uppercase text-xl">Legal</h1>
                    <ul>
                        <li>Terms of policy</li>
                        <li>Privacy policy</li>
                        <li>Cookie policy</li>
                    </ul>
                </div>
                <div className="ml-5 mt-5 ">
                    <h1 className="pb-2 text-bold uppercase text-xl">Newsletter</h1>
                    <input className="p-3 rounded-md text-black" type="email" name="email" placeholder="username@domain.com" />
                    <button className="p-3 m-2 rounded-md border bg-[#00df9a] text-black" type="submit">Subscribe</button>
                </div>
            </div>
        </div>
    )
}
export default Footer