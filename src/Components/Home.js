import Faq from "./Faq"
import Hero from "./Hero"
import Navbar from "./Navbar"
import FaqQuestions from "./FaqQuestions"
import Footer from "./Footer"

const Home = ()=>{
    const navBar = ['Home', 'About', 'Contact', 'Login']
    const faq = FaqQuestions 
    return(
        <div>
            <Navbar navBar={navBar} />
            <Hero />
            <Faq faq={ faq }/>
            <Footer />
        </div>
    )
}
export default Home