import React, {useState} from 'react'
import imgLogo from "../../images/logo.png"

import { AiOutlineLogin } from "react-icons/ai"
import { BiFoodMenu } from "react-icons/bi"
import { RiTeamLine } from "react-icons/ri"
import { GoLocation } from "react-icons/go"
import { Modal} from '@mantine/core';

const Home = () => {
  const [openedSignUp, setOpenedSignUp] = useState(false);
  const [openedSignIn, setOpenedSignIn] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const handleChange  = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value}) 
  }
  const handleRegister = async (e) => {
    e.preventDefault()

  }
  const handleLogin  = async (e) => {
    e.preventDefault()
    
  }
  return (
    <>
    <Modal
    styles={
      {
        title: { fontSize: '34px', marginBottom:'1rem', letterSpacing:'1.2px'}
      }
    }
      centered
        opened={openedSignIn}
        onClose={() => setOpenedSignIn(false)}
        transition="fade"
        transitionDuration={400}
        position='center'
        title='Iniciar Sesion'
      >
      </Modal>

    <nav className='navbar-menu'>
      <div className='navbar-container'>

        <div className='logo-container'>
          <img className='logo' src={imgLogo} alt='fukusuke'/>
        </div>

        <div className='navbar-links'>
          <a href='#' className='navbar-link'><BiFoodMenu/>Carta</a>
          <a href='#' className='navbar-link'><RiTeamLine/>Nosotros</a>
          <a href='#' className='navbar-link'><GoLocation/>Contacto</a>
          <i onClick={() => {setOpenedSignIn(true)}}><AiOutlineLogin size={35} color="white" /></i>
        </div>

      </div>
    </nav>

    <main className='main-content'>

      <div className='bg-container'>
        <button className='hero-btn'>Realizar pedido</button>
      </div>

    </main>

    <footer className="footer-content">
      <div className='footer-container'>
        FOOTER DOU
      </div>
    </footer>

    </>
  )
}

export default Home