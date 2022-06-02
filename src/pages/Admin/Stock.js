import React, { useState } from 'react'
import imgLogo from "../../images/logo.png"
import { AppShell, Navbar, Header } from '@mantine/core';
import StockSlider from './StockSlider'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillMinusCircle} from 'react-icons/ai'
import { Button } from '@mantine/core';
import {AiFillEdit} from 'react-icons/ai'
const Stock = () => {
    
    const [activeMenu, setToggleMenu] = useState('menu-toggle')
    const [activeSidebar, setToggleSidebar] = useState('sidebar-menu')
    const toggleMenu = () => {
        activeMenu === 'menu-toggle' ? setToggleMenu('menu-toggle is-active') : setToggleMenu('menu-toggle')
        activeSidebar === 'sidebar-menu' ? setToggleSidebar('sidebar-menu is-active') : setToggleSidebar('sidebar-menu')
    }
    return(
        <>
        <nav className='navbar-menu'>
                <div className='navbar-container'>

                    <div className='logo-title'>
                        <div className='logo-container'>
                            <img className='logo' src={imgLogo} alt='fukusuke'/>
                        </div>

                        <h2 className='navbar-title'>
                            Panel de Administración
                        </h2>
                    </div>
                <div className={activeMenu}>
                    <i onClick={() => toggleMenu()}><GiHamburgerMenu size={35}/></i>
                </div>
                </div>
        </nav>
        <div className='admin-page'>
            <aside className={activeSidebar}>

                <nav className='menu'>
                    <a className='menu-item is-active'>Tablas</a>
                    <a className='menu-item'>Entradas</a>
                    <a className='menu-item'>Premium Rolls</a>
                    <a className='menu-item'>Hot Rolls</a>
                    <a className='menu-item'>Traditional Rolls</a>
                    <a className='menu-item'>Gohan</a>
                    <a className='menu-item'>Ramen</a>
                </nav>
            </aside>

            <main className='main-admin'>
                <div className='item-display'>
                    <div className='card'>
                        <div className='card-image'>
                        <i><AiFillMinusCircle size={30} color='red' className='card-trash'/></i>
                        </div>
                            
                        <div className='card-body'>
                            <h3 className='card-title'> Tabla #1 </h3>
                            <h3 className='card-price'>$13.200</h3>
                        </div>
                        <div className='card-features'>
                        <Button
                            component="a"
                            target="_blank"
                            leftIcon={<AiFillEdit size={18} />}
                            styles={(theme) => ({
                                root: {
                                backgroundColor: 'black',
                                border: 0,
                                height: 35,
                                paddingLeft: 10,
                                paddingRight: 10,
                                float: 'right',

                                '&:hover': {
                                    backgroundColor: theme.fn.darken('#00acee', 0.05),
                                },
                                },

                                leftIcon: {
                                marginRight: 15,
                                },
                            })}
                            >
                            Editar
                            </Button>
                        <StockSlider stockStatus={"checked"}/>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-image'>
                        <i><AiFillMinusCircle size={30} color='red' className='card-trash'/></i>
                        </div>
                            
                        <div className='card-body'>
                            <h3 className='card-title'> Tabla #1 </h3>
                            <h3 className='card-price'>$13.200</h3>
                        </div>
                        <div className='card-features'>
                        <Button
                            component="a"
                            target="_blank"
                            leftIcon={<AiFillEdit size={18} />}
                            styles={(theme) => ({
                                root: {
                                backgroundColor: 'black',
                                border: 0,
                                height: 35,
                                paddingLeft: 10,
                                paddingRight: 10,
                                float: 'right',

                                '&:hover': {
                                    backgroundColor: theme.fn.darken('#00acee', 0.05),
                                },
                                },

                                leftIcon: {
                                marginRight: 15,
                                },
                            })}
                            >
                            Editar
                            </Button>
                        <StockSlider stockStatus={"checked"}/>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-image'>
                        <i><AiFillMinusCircle size={30} color='red' className='card-trash'/></i>
                        </div>
                            
                        <div className='card-body'>
                            <h3 className='card-title'> Tabla #1 </h3>
                            <h3 className='card-price'>$13.200</h3>
                        </div>
                        <div className='card-features'>
                        <Button
                            component="a"
                            target="_blank"
                            leftIcon={<AiFillEdit size={18} />}
                            styles={(theme) => ({
                                root: {
                                backgroundColor: 'black',
                                border: 0,
                                height: 35,
                                paddingLeft: 10,
                                paddingRight: 10,
                                float: 'right',

                                '&:hover': {
                                    backgroundColor: theme.fn.darken('#00acee', 0.05),
                                },
                                },

                                leftIcon: {
                                marginRight: 15,
                                },
                            })}
                            >
                            Editar
                            </Button>
                        <StockSlider stockStatus={"checked"}/>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-image'>
                        <i><AiFillMinusCircle size={30} color='red' className='card-trash'/></i>
                        </div>
                            
                        <div className='card-body'>
                            <h3 className='card-title'> Tabla #1 </h3>
                            <h3 className='card-price'>$13.200</h3>
                        </div>
                        <div className='card-features'>
                        <Button
                            component="a"
                            target="_blank"
                            leftIcon={<AiFillEdit size={18} />}
                            styles={(theme) => ({
                                root: {
                                backgroundColor: 'black',
                                border: 0,
                                height: 35,
                                paddingLeft: 10,
                                paddingRight: 10,
                                float: 'right',

                                '&:hover': {
                                    backgroundColor: theme.fn.darken('#00acee', 0.05),
                                },
                                },

                                leftIcon: {
                                marginRight: 15,
                                },
                            })}
                            >
                            Editar
                            </Button>
                        <StockSlider stockStatus={"checked"}/>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-image'>
                        <i><AiFillMinusCircle size={30} color='red' className='card-trash'/></i>
                        </div>
                            
                        <div className='card-body'>
                            <h3 className='card-title'> Tabla #1 </h3>
                            <h3 className='card-price'>$13.200</h3>
                        </div>
                        <div className='card-features'>
                        <Button
                            component="a"
                            target="_blank"
                            leftIcon={<AiFillEdit size={18} />}
                            styles={(theme) => ({
                                root: {
                                backgroundColor: 'black',
                                border: 0,
                                height: 35,
                                paddingLeft: 10,
                                paddingRight: 10,
                                float: 'right',

                                '&:hover': {
                                    backgroundColor: theme.fn.darken('#00acee', 0.05),
                                },
                                },

                                leftIcon: {
                                marginRight: 15,
                                },
                            })}
                            >
                            Editar
                            </Button>
                        <StockSlider stockStatus={"checked"}/>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-image'>
                        <i><AiFillMinusCircle size={30} color='red' className='card-trash'/></i>
                        </div>
                            
                        <div className='card-body'>
                            <h3 className='card-title'> Tabla #1 </h3>
                            <h3 className='card-price'>$13.200</h3>
                        </div>
                        <div className='card-features'>
                        <Button
                            component="a"
                            target="_blank"
                            leftIcon={<AiFillEdit size={18} />}
                            styles={(theme) => ({
                                root: {
                                backgroundColor: 'black',
                                border: 0,
                                height: 35,
                                paddingLeft: 10,
                                paddingRight: 10,
                                float: 'right',

                                '&:hover': {
                                    backgroundColor: theme.fn.darken('#00acee', 0.05),
                                },
                                },

                                leftIcon: {
                                marginRight: 15,
                                },
                            })}
                            >
                            Editar
                            </Button>
                        <StockSlider stockStatus={"checked"}/>
                        </div>
                    </div>

                </div>
            </main>
            </div>
        </>
    )
}

export default Stock