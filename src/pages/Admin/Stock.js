import React, { useState } from 'react'

// Icons from react-icons
import {GiHamburgerMenu} from 'react-icons/gi'

import imgLogo from "../../images/logo.png"

import Card from './ItemCard';

const Stock = ({ menus }) => {
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
                        <a href="/#" className='menu-item is-active'>Tablas</a>
                        <a href="/#" className='menu-item'>Entradas</a>
                        <a href="/#" className='menu-item'>Premium Rolls</a>
                        <a href="/#" className='menu-item'>Hot Rolls</a>
                        <a href="/#" className='menu-item'>Traditional Rolls</a>
                        <a href="/#" className='menu-item'>Gohan</a>
                        <a href="/#" className='menu-item'>Ramen</a>
                    </nav>
                </aside>

                <main className='main-admin'>
                    <div className='item-display'>
                        {
                            menus.map(menu =>
                                <Card key = { menu.id } menu = { menu } />
                            )
                        }
                    </div>
                </main>
            </div>
        </>
    )
}

export default Stock