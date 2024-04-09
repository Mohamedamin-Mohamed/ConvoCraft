
import { useEffect, useState } from 'react';
import { Form, NavLink, useNavigate, Link } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader"
import { CgProfile } from "react-icons/cg"
import { CgDanger } from "react-icons/cg"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../Redux/userSlice'


const PasswordReset = () => {
    const [input, setInput] = useState('');
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const[nullCheck, setNullCheck] = useState(true)
    const[accountFound, setAccountFound] = useState(false)
    const [userData, setUserData] = useState({});
    const[resetPass, setResetPass] = useState(false)
    const[pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('');
    const[passwordsMatch, setPassMatch] = useState(true)
    const[width, setWidth] = useState(window.innerWidth)

    const dispatch = useDispatch()
    const currUser = useSelector(state=> state.userInfo)

    const handleCancel = () => {
        navigate('/login');
    };

    const handleSearch = async() => {
        if (input.length === 0) {
            setNullCheck(true);
            setErr(false)
        }
        else {
            dispatch(setLoading(true))
            try{
            //make request to the server, and retrieve the email of the user, if account exists, redirect him to change his/her password, then redirect them to login with the updated password
            const response = await fetch("http://localhost:80/passwordReset/email_lookup", {
                method: 'post',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify({email: input})
            })
            const data = await response.json()
            
            if(response.ok){
            if(data && data.FirstName && data.Email){ //check to see whether user info is return 
                setUserData(data)
                console.log('data', userData)
                setAccountFound(!accountFound)
            }
            else{ //means account was not found
                setErr(true)
                setNullCheck(false)
                setAccountFound(!accountFound)
            }
        }
            else if(response.status === 401){
                setErr(true)
                setNullCheck(false)
             }
            else{
                console.error('Server error:', response.statusText);
            }
        
        }
            catch(err){
            console.error('Network error:', err);
        }
        finally{
            dispatch(setLoading(false))
        }
        }
    };
   const handleNotYou = ()=>{
    setAccountFound(false);
    setUserData({});
   }
   const handleResetPass = ()=>{
    setResetPass(true)
   }
   const handlePassMatch = async()=>{
    setPassMatch((pass === confirmPass))
    
    if(pass === confirmPass){ //if the two passwords match, then update the users password
       
        dispatch(setLoading(true))
        try{
        const response = await fetch('http://localhost:80/passwordReset/resetPassword', {
            method: 'post', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({password: pass, email: userData.Email})
        })
        const res = await response.json()
        if(response.ok){
            navigate('/login')
        }
    }
    catch(err){
        console.error('Network error', err)
    }
    finally{
        dispatch(setLoading(false))
    }
    }
}
useEffect(()=>{
    const handleResize = ()=>{
        setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return ()=>{
        window.removeEventListener('resize', handleResize)
    }
},[])
const handleSubmit = async(event)=>{
    event.preventDefault()
    
    if(width < 1024){
        navigate('/login')
       return
    }
    const form = new FormData(event.target);

    const email = form.get('email');
    const password = form.get('password')

    if(email && password){
    try{
    const response = await loginVerify ({ request: form})
    const responseData = await response.json()

    if(!response.ok){ //invalid credentials
        navigate('/login')
    }
    else{ //valid credentials
        navigate('/chat')
    }
    }
    catch(err){
        throw err
    }
}
    else{
        alert('Missing field(s)')
    }
    
}
    return (
        <div className='bg-white text-black h-screen'>
            <div className='flex mr-4'>
                <h1 className='text-2xl text-[#1b74e4] font-bold m-4'>ConvoCraft</h1>
                <div className='flex ml-auto p-3'>
                    <Form onSubmit={(e)=> handleSubmit(e) }>
                      
                        <input className='pt-[8px] px-[12px] pb-[10px] border border-neutral-300 rounded-lg text-normal outline-[#216fdb] hidden lg:inline-block' name='email' type='email' placeholder='Email or phone' />
                        <input className='pt-[8px] px-[12px] pb-[10px] ml-3 border border-neutral-300 rounded-lg outline-[#216fdb] hidden lg:inline-block' name='password' type='password' placeholder='Password'  />
                    
                        <button type='submit' className='flex px-[14px] py-2 lg:ml-5 text-[#ffffff] bg-[#1b74e4] rounded-lg hover:cursor-pointer lg:inline-block'>Log in</button>
                      
                    </Form>
                    <div className='mx-2 my-2 text-[#216fdb] hover:underline hidden lg:inline-block '>
                        <NavLink to='/passwordReset' target='blank'>Forgotten Account?</NavLink>
                    </div>
                </div>
            </div>
            <div className={`bg-[#e9ebee] h-[${(err || nullCheck) ? 595 : 436.5 }px] flex justify-center items-center`}>
                <div className={`bg-[#ffffff] h-[${(err || nullCheck) ? 358.5 : 276.5 }px] w-[520px] rounded-lg mt-5` }>
                   
                        { !accountFound && !currUser.loading && ( 
                            <div>
                            <h1 className='text-xl font-bold my-3 mx-6 '>Find Your Account</h1>
                            <div className='border'>
                                {err && (
                                    <div className='my-3 mx-6 bg-[#ffebe8] p-4 border border-red-600'>
                                        <h1 className='text-[#333333]'>No search results</h1>
                                        <p className='text-[#1c1e21]'>Your search did not return any results. Please try again with other information.</p>
                                    </div>
                                )}
                                {nullCheck && (
                                    <div className='my-3 mx-6 bg-[#ffebe8] p-4 border border-red-600'>
                                        <h1 className='text-[#333333]'>Please fill in at least one field. </h1>
                                        <p className='text-[#1c1e21]'>Fill in at least one field to search for your account</p>
                                    </div>
                                )}
                                    <p className='my-3 mx-6 text-normal font-medium'>Please enter your email address or mobile number to search for your account.</p>                       
                                
                                    <input className='w-[92%] p-4 mx-6 mb-4 border rounded-lg' type='email' placeholder='Email address or mobile number' name='email' onChange={(e) => setInput(e.target.value)} required />
                               
                            </div>
                            <div className='flex justify-end mr-4 my-4'>
                                <button className='bg-[#e9ebee] rounded-lg  mr-2 px-6 py-2 text-[#4b4f56] font-bold' type='button' onClick={ handleCancel }>Cancel</button>
                                <button className='bg-[#1b74e4] text-[#ffffff] rounded-lg px-6 py-2' type='submit' onClick={ handleSearch }>Search</button>
                            </div>
                        </div>
                        )}
                   
                  
                       {accountFound && !resetPass && (
                        <div className='h-[315.5px]  ml-[12px]'>
                        <h1 className='font-bold text-black border-b pb-2 pt-5 text-xl'>Use your ConvoCraft account</h1>
                        <div className='flex border-b'>
                            <div className='flex-col border-r'>
                        <p className='mb-6 mt-3'>Quickly log in with your ConvoCraft account. </p>
                     
                            <p className='text-lg mt-2 text-[#1c1e21] text-center'>{userData.FirstName}</p>
                            </div>
                            <div className='ml-auto mr-4 mt-7'>
                                <div className='flex justify-center items-center'>
                                <CgProfile size={60} />
                                    </div>
                               
                            <p className='text-sm text-[#333333] font-bold ml-2'>{userData.Email}</p>
                                <p className='text-center text-[#90949c]'>ConvoCraft user</p>
                                <p onClick={ handleNotYou } className='text-center text-[#385898] hover:cursor-pointer hover:underline pb-4'>Not you?</p>
                                </div>
                            </div>
                            <div>
                            <div className='flex my-4 hover:underline hover:cursor-pointer text-[#1877f2]'>
                            <Link to='/login' className='mt-2'>Log in with password</Link>
                            <button className='ml-auto mr-8 border bg-[#1877f2] text-white p-2 rounded-lg ' onClick={ handleResetPass }>Reset Password</button>
                            </div>
                           
                            </div>
                        </div>
                       )}
                        {currUser.loading && ( //display the loading spinner, as data is being fetched from the server
                        <div className="flex justify-center items-center">
                            <ClipLoader color="#1b74e4" loading={currUser.loading} size={35} />
                        </div>
                    )}
                   { resetPass && !currUser.loading && (
                        <div className={`h-[${!passwordsMatch ? 310 : 300}px] ml-4` }>
                         <div className= 'w-[90%]'>
                             <h1 className='font-bold my-3 border-b pb-3'>Reset your Password</h1>
                   {!passwordsMatch &&  <p className='bg-[#ffebe8] p-4 border border-red-600'>Passwords don't match</p> }
                        <div className='flex flex-col'>
                        <div className='text-lg my-6'>
                            <label htmlFor='password' className='md:mr-1 mr-6'>New Password:</label>
                            <input type='password' placeholder='New Password' name='password' className='md:ml-28 ml-20 border p-1 rounded-lg outline-none' onChange={(e)=> setConfirmPass(e.target.value)}/>
                        </div>
     
                        <div className='text-lg'>
                            <label htmlFor='password'>Confirm new Password:</label>
                            <input type='password' placeholder='Confirm new Password' name='password' className='md:ml-12 ml-9 border p-1 rounded-lg outline-none' onChange={(e)=>setPass(e.target.value)}/>
                           
                        </div>
                        <div className='flex justify-center mt-8'>
                            <button className='my-4 bg-[#1877f2] text-white p-3 rounded-lg' onClick={handlePassMatch}>Confirm Password</button>
                        </div>
                        </div>
                        </div>
                        </div>
)}
                        
                </div>
               
        </div>
        </div>
    );
};

export default PasswordReset

const loginVerify = async({request})=>{
    const data = await request

    const requestBody = {
        "email": data.get('email'),
        "password": data.get('password')
    }

    const response = await fetch('http://localhost:80/login', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    
   return response;
}
