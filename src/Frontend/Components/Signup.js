import { IoClose, IoHandLeft } from "react-icons/io5"
import { useEffect, useState } from "react"
import { Form, redirect, useNavigate } from "react-router-dom"
import DateOfBirthInput from "./DateOfBirthInput"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../Redux/userSlice"
import ClipLoader from "react-spinners/ClipLoader"

const Signup = ()=>{
    const currUser = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[close, setClose] = useState(false)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    const days = []
    for(let i =0; i<=31; i++){
    days.push(i)
    }

    const years = []
    for(let i=2024; i >= 1905; i--) {
    years.push(i)
    }
    
    const date = new Date()
    const handleClose = ()=>{
        setClose(!close)
    }
    useEffect(()=>{
        const scrollHandle = () =>{
            document.body.style.overflow = close ? 'hidden' : ''
        }
        scrollHandle()
        return ()=>{
            document.body.style.overflow = ''
        }
    },[close])
    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        const formData = new FormData(e.target);
        dispatch(setLoading(true)) //awaiting response from the server
        const response = await createAccount({request: formData})
        dispatch(setLoading(false)) //response received
        console.log(response.status, 'create account status')
       if(response.status === 201) navigate('/login')
       
       else navigate('/')
    }
    return(
        <div className={ close ? 'hidden': 'fixed flex justify-center inset-0 items-center text-black backdrop-blur'}>

            <div className="text-black rounded-lg bg-white w-[450px] text-center border h-[620px] ease-in-out duration-500">

            <IoClose size={30} className="ml-auto text-gray-700 hover:cursor-pointer" onClick={ handleClose }/>
               <div className="ml-5">
                <h1 className="flex font-bold text-3xl">Sign Up</h1>
                <p className="flex mb-3 text-sm font-[15px]">It's quick and easy.</p>
                </div>
                <hr/>
                <Form onSubmit={ (e)=> handleSubmit(e)} >
                <div className="flex ml-5 mt-4">

                    <input  className="rounded-md border bg-gray-100 p-2 outline-none"type="text" name="firstName" placeholder="First Name"/>
                    <input className="rounded-md border bg-gray-100 p-2 outline-none ml-3" type="text" name="surname" placeholder="Surname"/>
                </div>
                <div className="flex ml-5 mt-4">
                    <input className="rounded-md border bg-gray-100 p-2 outline-none w-[94%]" type="text" name="email" placeholder="Mobile number or email address"/>
                </div>
                <div className="flex ml-5 mt-4">
                    <input className="rounded-md border bg-gray-100 p-2 outline-none w-[94%]" type="password" name="password" placeholder="New Password" />
                </div>
                <p className="flex ml-5 mt-4">Date of birth</p>
                <div className="flex ">
               <DateOfBirthInput  days={days} months={months} years={years}/>
                </div>
                <p className="flex ml-5 mt-4">Gender</p>
                <div className="flex ">
                    <div className=" flex rounded-md border bg-white p-2 outline-none w-[29%] ml-5">
                    <p className="bg-white">Female<input className="ml-11" type="radio" name="gender" value={"Female"} required /> </p>
                    </div>
                    <div className=" flex rounded-md border bg-white p-2 outline-none w-[29%] ml-2 mr-2">
                    <p className=" bg-white">Male<input className="ml-16" type="radio" name="gender" value={"Male"} required /> </p>
                    </div>
                    <div className="flex rounded-md border bg-white p-2 outline-none w-[29%]">
                    <p className="bg-white">Custom<input className="ml-10" type="radio" name="gender" value={"Custom"} /> </p>
                    </div>
                </div>
                <div className="flex ml-5 mt-4">
                <p className=" text-xs text-[#777777] w-[96%]">People who use our service may have uploaded your contact information to ConvoCraft.</p>
                </div>
                <div className="flex ml-5 mt-4">
                <p className=" text-xs text-[#777777] w-[98%]">By clicking Sign Up, you agree to our <strong>Terms, Privacy Policy</strong>and <strong>Cookies Policy.</strong> You may receive SMS notifications from us and can opt out at any time.</p>
                </div>
                <button className="bg-[#42b72a] text-white text-xl px-4 rounded-md py-1 my-4 w-[200px] " type="submit"> {currUser.loading  ? <ClipLoader color="white" size={35} loading={ currUser.loading }/>: 'Sign Up' } </button>
            </Form>
            </div>
        </div>
    )
}
export default Signup

export const createAccount = async ({ request })=>{
    const data = await request

    // Extract day, month, and year from the form data
    const day = data.get('day');
    const month = data.get('month');
    const year = data.get('year');

    // Format date of birth
    const dob = `${year}-${month}-${day}`;

    const requestBody = {
        "firstName": data.get('firstName'),
        "surname": data.get('surname'),
        "email": data.get('email'),
        "password": data.get('password'),
        "year": year,
        "month": month,
        "day": day,
        "gender": data.get('gender'),
    }
   
    const response = await fetch('http://localhost:80/account_creation', {
        method: 'post', 
        headers : {
            'content-type': 'application/json'
        }, 
        body: JSON.stringify(requestBody)
    })
  return response
    
}

