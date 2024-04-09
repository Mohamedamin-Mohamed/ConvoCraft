import { Form, NavLink, Link, redirect, useActionData, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setFullName, setEmail, setError, setLoading } from "../Redux/userSlice"
import { IoClose } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import { ReactTyped } from "react-typed"
import Signup from "./Signup";
import ClipLoader from "react-spinners/ClipLoader"

const Login = ()=>{

    const currUser = useSelector(state=> state.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [close, setClose] = useState(false)
    const [showAccount, setShowAccount] = useState(false)
    const[windowWidth, setWindowWidth] = useState(window.innerWidth)

    const handleClose = ()=>{
        setClose(!close)
        document.body.style.overflow = ''
        dispatch(setError(null))
    }
    const handleCreateAccount = ()=>{
        setShowAccount(!showAccount)
    }
    const logUpdatedUser = useCallback(() => {
        console.log('Updated currUser:', currUser);
      }, [currUser]); 

    useEffect(()=>{
        logUpdatedUser(); // Invoke the memoized function
    }, [currUser])
    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
     const handleSubmit = async (event)=>{
        event.preventDefault()
         // Dispatch action to set pending state
        dispatch(setLoading(true));

         const form = new FormData(event.target) 
         const response = await loginVerify ({ request: form})
         const responseData = await response.json()

         // Dispatch action to set pending state to false
         dispatch(setLoading(false));
        
         //console.log(responseData.message)
    /*responseData will contain an object. If email is not valid it returns an error; 
    {error: 'Email is not valid'}, if email is valid but password is not valid; 
    {error: 'Invalid Password'} and if both email and password are valid, it returns; 
    {message: 'Valid Credentials'} 
    So we can use this object together with useActiondata() hook to display a message to the user to tell them email/password is either not valid or both
    */
       
         if(!response.ok) {
            // dispatch an ction, so that the respective error message can be shown to the user
            dispatch(setIsLoggedIn(false))
            dispatch(setFullName(null))
            dispatch(setEmail(null))
            dispatch(setError(responseData.error))
            console.log('Invalid Credentials', currUser)
        }
        else{
        //set the curr user to be logged in, so that their name is displayed in the main chat application
        dispatch(setIsLoggedIn(true))
        dispatch(setFullName(responseData.message[0].FirstName + ' ' + responseData.message[0].Surname))
        dispatch(setEmail(responseData.message[0].Email))
        dispatch(setError(''))


        navigate('/chat')
        }
    }
    return(
        <div className={ close ? 'hidden': 'fixed flex justify-center inset-0 items-center text-black backdrop-blur'}>
            <div className="md:flex rounded-lg bg-[#f0f2f5] w-[690px] justify-center items-center" >
         
            <div className="flex-col justify-center items-center border-r ">
            {windowWidth < 768 && <IoClose className="ml-auto hover:cursor-pointer" size={30} onClick={ handleClose }/>}
                <p className="text-[#1877f2] text-2xl text-center">ConvoCraft</p>
                <p className=" text-xl text-center">ConvoCraft enhances conversations with smart, user-friendly aid for connection.</p>
                </div>
              
                <div className="flex-col justify-center items-center text-center bg-white border m-5 rounded-lg">
                {windowWidth > 768 && <IoClose className="ml-auto hover:cursor-pointer" size={30} onClick={ handleClose }/>}

                    <div className="flex justify-center items-center">
                   
                <ReactTyped className= 'w-full text-3xl ml-12 text-[#1877f2] font-bold ' strings={['Login Form']} typeSpeed={60} backSpeed={70}/>
                </div>
                <Form onSubmit={ (e)=> handleSubmit(e) }>
                    <input className="rounded-md text-xl border bg-[#ffffff]  w-[350px] p-3 mb-4 mt-4 outline-none" type="email" name="email" id="email" placeholder="Email Address" required />
                    {currUser.error && currUser.error.startsWith('The email') && <p className="flex justify-center items-center text-center mb-4 text-[#f02849] text-lg">{currUser.error}</p>}
                    <input  className="rounded-md text-xl p-3 w-[350px] mb-4 mx-4 outline-none border bg-[#ffffff]"type="password" name="password" id="password" placeholder="Password" required />
                    {currUser.error && currUser.error.startsWith('The password') && <p className="flex justify-center items-center text-center mb-4 text-[#f02849]">{currUser.error}</p>}
                    <button type="sumbit" className="bg-[#1877f2] text-white rounded-md text-[20px] px-4 py-2.5 w-[350px] cursor-pointer">{currUser.loading  ? <ClipLoader color="white" size={35} loading={ currUser.loading }/>: 'Log in' }</button>
                    </Form>
                    <Link className="flex justify-center mt-4 mb-4 text-[#1877f2] hover:underline" to='/passwordReset'>Forgotten Password</Link>
                    <hr/>
                    <button className="bg-[#42b72a] text-white px-4 font-medium rounded-md py-3 my-4" onClick={handleCreateAccount}>Create a new Account</button>
                    {showAccount && <Signup />}
                </div>
            
            </div>
        </div>
    
    )
    
    }
export default Login

const loginVerify = async({ request })=>{
    const data = await request

    const requestBody = {
        "email": data.get('email'),
        "password": data.get('password')
    }
    //console.log(requestBody)
    const response = await fetch('http://localhost:80/login', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    
   return response;
    
}