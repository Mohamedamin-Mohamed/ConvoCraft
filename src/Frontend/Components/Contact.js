import { Form, redirect } from "react-router-dom"
import { IoClose } from "react-icons/io5"
import { useState } from "react"
import { ReactTyped } from "react-typed"


const Contact = ()=>{
    const[close, setClose] = useState(false)

    const closeHandle = ()=>{
        setClose(!close)
        document.body.style.overflow = ''
    }
    return (
        <Form action="/contact" method="post">
            <div className= {close ? "hidden" : "fixed flex justify-center inset-0 items-center text-black backdrop-blur"}>
                <div className="text-black rounded-lg  max-w-[650px] text-center border h-[480px] w-full bg-gray-200 shadow-md">
                    <IoClose size={30} className="ml-auto hover:cursor-pointer" onClick={closeHandle}/>
                    <ReactTyped className="font-bold text-2xl" strings={['Lets get in touch']} typeSpeed={60} backSpeed={90}/>
                    <div className="mt-8">
                    <div className="flex ">
                        <label className="mx-5 font-bold" htmlFor="fullName">Full Name</label>
                        <input className="flex bg-gray-200 outline-none border-b border-black" name="fullName" id="fullName" placeholder="Name" />
                    
                    <div className="ml-6 ">
                        <label className="mr-5 font-bold" htmlFor="email">Email Address</label>
                        <input className=" outline-none border-b border-[black] bg-gray-200" name="email" id="email" placeholder="Email Address" />
                    </div>
                    </div>
                   </div>
                   <div className="flex my-6">
                    <label className="ml-5 font-bold" htmlFor="subject">Subject</label>
                    <input className="outline-none w-[511px] ml-9 border-b border-black bg-gray-200" name="subject" id="subject" placeholder="Subject" />
                   </div>
                   <div className="flex">
                    <label className="mx-5 font-bold" htmlFor="message">Message</label>
                    <input className="bg-gray-200 outline-none border-b border-black h-[92px] resize-none ml-2 w-[511px]" name="message" id="message" placeholder="Message" />
                   </div>
                   <div className="mt-9 flex justify-center rounded-lg">
                  
                   <button className="font-bold text-xl rounded-md border border-black px-6 py-4 mt-10 bg-black text-white" type="submit">Send Message</button>
                   </div>
                </div>
            </div>
        </Form>
    )
}
export default Contact
export const contactHandle = async({ request })=>{
    const data = await request.formData()
    const requestBody = {
        fullName: data.get('fullName'),
        email: data.get('email'),
        subject: data.get('subject'),
        message: data.get('message')
    }
    const response = await fetch('http://localhost:80/contact', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    if(response.status === 201){
        return redirect('/success')
    }

     return redirect('/')
}