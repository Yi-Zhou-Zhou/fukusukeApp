import React, {useEffect, useState} from 'react'
import imgLogo from "../../images/logo.png"
import {AiOutlineConsoleSql, AiOutlineLogin} from "react-icons/ai"
import {BiFoodMenu} from "react-icons/bi"
import {RiTeamLine} from "react-icons/ri"
import {GoLocation} from "react-icons/go"
import { Modal} from '@mantine/core';
import pdf from "../../pdf/Carta.pdf"
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const [openedSignUp, setOpenedSignUp] = useState(false);
  const [openedSignIn, setOpenedSignIn] = useState(false);
  const [error, setError] = useState('')
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: "",
  })
  async function registerUser(e){
    e.preventDefault()
    const email = credentials.email
    const password = credentials.password
    const phoneNumber = credentials.phone
    const userAccount = "user"
    const name = 'testUser'
    const newUser = {
      email: email,
      password: password,
      name: name,
      role: userAccount,
      action: "register", 
    }
    axios.post('http://localhost:8080/', newUser)
  }
  const handleChange  = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value}) 
  }
  const handleLogin  = async (e) => {
    e.preventDefault()
    const email = credentials.email
    const password = credentials.password
    const loginUser = {
      email: email,
      password: password,
      action: "login",
    }
    try {
      const {data} = await axios.post("http://localhost:8080/", loginUser)
      const userType = data.user.role;
      console.log(data)
      if (userType === 'user') navigate('/user')
      else if(userType === 'admin') navigate('/admin')

    } catch (error) {
      console.log(error.response.data.err.message)
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8080/').then((response) => {
    })
  }, [])
  return (
    <>
    <Modal
    styles={
      {
        title: { fontSize: '34px', marginBottom:'1rem', letterSpacing:'1.2px', fontWeight:'700'}
      }
    }
      centered
        opened={openedSignIn}
        onClose={() => setOpenedSignIn(false)}
        transition="fade"
        transitionDuration={400}
        position='center'
        title='Iniciar Sesión'
      >
          <form className='form'>
            <div className='input-field'>
              <input type="text" class="form-input" placeholder=" " name="email" onChange={handleChange}/>
              <label for="" class="form-label">Correo electrónico</label>
            </div>
            <div class="input-field">
              <input type="password" class="form-input" placeholder=" " name="password" onChange={handleChange}/>
              <label for="" class="form-label">Contraseña</label>
              </div>
            <button class="form-button" onClick={handleLogin}>Ingresar</button>

            <div className='modal-tools'>
              <div className='checkbox'>
              <input type="checkbox" value="lsRememberMe" id="rememberMe"/>
              <label for="rememberMe">Recuérdame</label>
              </div>

              <p className='modal-forgot'>¿Olvidaste tu contraseña?</p>
            </div>

            <div modal-footer>
              <p className='modal-p'>¿No tienes cuenta? </p>
              <p className='modal-p' onClick={() => {
                setOpenedSignIn(false);
                setOpenedSignUp(true);
                setCredentials({
                  email: '',
                  password: '',
                  confirmPassword: ''
                })
                }
              }>Registrate</p>
                </div>
          </form>
      </Modal>

      <Modal
    styles={
      {
        title: { fontSize: '34px', marginBottom:'1rem', letterSpacing:'1.2px', fontWeight:'700'}
      }
    }
      centered
        opened={openedSignUp}
        onClose={() => setOpenedSignUp(false)}
        transition="fade"
        transitionDuration={400}
        position='center'
        title='Registrarse'
      >
          <form className='form'>
            <div className='input-field'>
              <input type="text" class="form-input" placeholder=" " name='email' onChange={handleChange}/>
              <label for="" class="form-label">Correo electrónico *</label>
            </div>
            <div class="input-field">
              <input type="password" class="form-input" placeholder=" " name='password' onChange={handleChange}/>
              <label for="" class="form-label">Contraseña *</label>
            </div>
            <div class="input-field">
              <input type="password" class="form-input" placeholder=" " name='confirmPassword' onChange={handleChange}/>
              <label for="" class="form-label">Confirmar Contraseña *</label>
            </div>

            <div class="input-field">
              <input type="number" class="form-input" placeholder=" " name="phone" onChange={handleChange}/>
              <label for="" class="form-label">Celular *</label>
            </div>
            <button class="form-button" onClick={registerUser}>Crear Cuenta</button>

            <div className='modal-tools'>
              <div className='checkbox'>
              <input type="checkbox" value="lsRememberMe" id="rememberMe"/>
              <label for="rememberMe">Recibir ofertas y notificaciones</label>
              </div>
            </div>

            <div modal-footer>
              <p className='modal-p'>¿Ya tienes una cuenta? </p>
              <p className='modal-p' onClick={() => {
                setOpenedSignIn(true);
                setOpenedSignUp(false);
                setCredentials({
                  email: '',
                  password: '',
                  confirmPassword: ''
                })
                }
              }>Login</p>
            </div>
          </form>
      </Modal>

    <nav className='navbar-menu'>
      <div className='navbar-container'>
        <div className='logo-container'>
          <img className='logo' src={imgLogo} alt='fukusuke'/>
        </div>
        <div className='navbar-links'>
          <a href={pdf} target = "_blank" className='navbar-link'><BiFoodMenu/>Carta</a>
          <a href='#' className='navbar-link'><RiTeamLine/>Nosotros</a>
          <a href='#' className='navbar-link'><GoLocation/>Contacto</a>
          <i onClick={() => {setOpenedSignIn(true)} } className='navbar-icon'><AiOutlineLogin size={35} color="white" /></i>
        </div>
      </div>
    </nav>

    <main className='main-content'>
      <div className='bg-container'>
        <h3 className='hero-title' >Atrévete a probar el mejor Sushi de Santiago...</h3>
        <button className='hero-btn'>Realizar Pedido</button>
      </div>
    </main>

    <footer className="footer-content">
      <div className='footer-container'>

      </div>
    </footer>

    </>
  )
}

export default Home