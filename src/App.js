import { Link, createBrowserRouter, createRoutesFromElements, Route, Routes, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Contact, { contactHandle } from './Components/Contact';
import Hero from './Components/Hero';
import LoginFull, {loginVerify} from './Components/LoginFull';
import Footer from './Components/Footer';
import PasswordReset from './Components/PasswordReset'
import Signup, { createAccount } from './Components/Signup';
import Chat from './Components/Chat'
import Success from './Components/Success'

const router = createBrowserRouter(
  createRoutesFromElements(
<Route>
 <Route path='/' element={<Home />} />
 <Route path='contact' element={<Contact />} action={ contactHandle}/>

 <Route path='login' element={<LoginFull /> } errorElement={<Home/>}/>
 <Route path='passwordReset' element={ <PasswordReset />} />
 <Route path='auth' element={ <Hero />} />
 <Route path='success' element={ <Success />} />
 
 <Route path='chat' element= { <Chat /> } />
 <Route path='*' element={<Home />} />
 </Route>
)
)


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;

