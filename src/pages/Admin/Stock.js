import React from 'react'
import imgLogo from "../../images/logo.png"

import StockSlider from './StockSlider'

const Stock = () => {
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
                    
                </div>
            </nav>

            <main className='main-admin'>
                <div className='item-display'>
                    <div className='card'>
                        <div className='card-image'></div>

                        <div className='card-body'>
                            <div className='card-title'>
                                <h3> Tabla #3 </h3>
                            </div>

                            <StockSlider stockStatus={"checked"}/>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='card-image'></div>

                        <div className='card-body'>
                            <div className='card-title'>
                                <h3> Tabla #3 </h3>
                            </div>

                            <StockSlider stockStatus={"checked"}/>

                        </div>
                    </div>

                    <div className='card'>
                        <div className='card-image'></div>

                        <div className='card-body'>
                            <div className='card-title'>
                                <h3> Tabla #3 </h3>
                            </div>

                            <StockSlider stockStatus={""}/>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Stock