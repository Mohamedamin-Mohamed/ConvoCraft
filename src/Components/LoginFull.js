import { Form, NavLink, Link, redirect, useActionData, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setFullName, setEmail, setError, setLoading, setShowSignupForm } from "../Redux/userSlice"
import { IoClose } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import { ReactTyped } from "react-typed"
import Signup from "./Signup";
import { FaPlus } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader"

const LoginFull = ()=>{
   
    const currUser = useSelector(state=> state.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [close, setClose] = useState(false)

    const handleClose = ()=>{
        setClose(!close)
        document.body.style.overflow = ''
    }
    const handleCreateAccount = ()=>{
        dispatch(setShowSignupForm(true))
        dispatch(setError(null))
    } 
     const handleSubmit = async (event)=>{
        event.preventDefault()
         // Dispatch action to set loading state
        dispatch(setLoading(true));

         const form = new FormData(event.target) 
         try{
         const response = await loginVerify ({ request: form})
         const responseData = await response.json()

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
      catch(err){
        console.error('Network error', err)
      }
      finally{
        // Dispatch action to set loading state to false
        dispatch(setLoading(false));
      }
     }
    const handlePass = ()=>{
        dispatch(setError(null))
        navigate('/passwordReset')
    }
     
     
    return(
       
        <div className={ 'flex  items-center text-black bg-[#f0f2f5] h-screen'}>
            <div className="flex md:flex-row flex-col justify-center items-center bg-[#f0f2f5] p-[20px] text-center ">
            <div className="md:flex-1 text-center ">
                <div className="lg:text-center ">
                <p className="text-[#0866ff] text-3xl font-bold">ConvoCraft</p>
                </div>
                <div className="md:text-center mx-5 ">
                <p className=" text-3xl text-[#1c1e21] text-center">ConvoCraft enhances conversations with smart, user-friendly aid for connection.</p>
                </div>
                </div>
                <div className=" flex-1 ">
                <div className="bg-white rounded-xl max-h-[430px] w-[410px] md:ml-28 pt-[10px] pb-[24px]">
                    <div className="text-center">
                <ReactTyped className= 'text-3xl  text-[#1877f2] font-bold ' strings={['Login Form']} typeSpeed={60} />
                </div>
                <Form onSubmit={ (event)=> handleSubmit(event) } >
                   <div className="mx-6 my-4">
                    <input className="rounded-md text-xl border bg-[#ffffff]  w-[364px] p-3 outline-none" type="email" name="email" id="email" placeholder="Email Address" required />
                    </div>
                    {currUser.error && currUser.error.startsWith("The email") && <p className="flex text-[#f02849] px-6 mb-4 text-lg">{currUser.error}</p>}
                    
                    <input  className="rounded-md text-xl  w-[364px] p-3 mx-6 mb-4 outline-none border bg-[#ffffff]"type="password" name="password" id="password" placeholder="Password" required />
                    {currUser.error && currUser.error.startsWith('The password') && <p className="flex text-[#f02849] mb-4 pl-6 text-lg">{currUser.error}</p>}
                    <div className="ml-6">
                    <button type="sumbit" className="bg-[#1877f2] text-white rounded-md text-[20px] px-4 py-2.5 w-[94%] cursor-pointer"> {currUser.loading  ? <ClipLoader color="white" size={35} loading={ currUser.loading }/>: 'Log in' } </button>
                    </div>
                    </Form>
                    <div className="">
                    <Link className="flex justify-center my-4 text-[#0866ff] hover:underline" onClick={ handlePass} >Forgotten Password</Link>
                    <hr/>
                    <button className="bg-[#42b72a] text-white px-4 font-medium rounded-md py-3 my-4" onClick={handleCreateAccount}>Create a new Account</button>
                    {currUser.showSignupForm && <Signup />}
                    </div>
                    </div>
                    
       </div>
     
       </div>
       </div>
       
    )
}
export default LoginFull

export const loginVerify = async({ request })=>{
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