import React, {useState} from 'react'
import NavBar from '../componenets/NavBar'
import SideBar from '../componenets/SideBar'
import Login from '../componenets/forms/Login'
import Register from '../componenets/forms/Register'
import AddFirm from '../componenets/forms/AddFirm'
import AddProduct from '../componenets/forms/AddProduct'
import WelcomeAfterLogin from '../componenets/WelcomeAfterLogin'

const LandingPage = () => {

  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showFirm, setShowFirm] = useState(false)
  const [showProduct, setShowProduct] = useState(false)
  const [showlogingWelcome, setShowLoginWelocme] = useState(false)


  const showLoginHandler =()=>{
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowLoginWelocme(false)
  }

  const showRegisterHandler =()=>{
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowLoginWelocme(false)
  }

  const showFirmHandler =()=>{
    setShowFirm(true)
    setShowLogin(false)
    setShowRegister(false)
    setShowProduct(false)
    setShowLoginWelocme(false)
  }

  const showProductHandler =()=>{
    setShowProduct(true)
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowLoginWelocme(false)
  }

  const showLoginWelcomeHandler =()=>{
    setShowLoginWelocme(true)
    setShowProduct(false)
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
  }

  return (
    <>
    <section className='landingSection'>
        <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} />
        <div className="collectionSection">
        <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler}/>

        { showLogin && <Login showLoginWelcomeHandler={showLoginWelcomeHandler}/> /* <Login /> */}
        {showRegister && <Register showLoginHandler={showLoginHandler}/>/* <Register /> */}
        {showFirm && <AddFirm/>/* <AddFirm /> */}
        {showProduct && <AddProduct/>/* <AddProduct /> */}
        {showlogingWelcome && <WelcomeAfterLogin/>}
        </div>
        

    </section>
    </>
  )
}

export default LandingPage