import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams, useNavigate } from "react-router-dom";
import {AiOutlineLogout} from "react-icons/ai";
import styled from 'styled-components'
import { AppShell, Image, Navbar, Header } from '@mantine/core';
import jwt_decode from 'jwt-decode';

import imgLogo from "../../images/logo.png"

const FlexDiv = styled.div`
    display: flex;
    flex-direction: ${ props => props.column ? "column" : "row"};
    align-items: ${ props => props.column ? "stretch" : "center" };
    padding: ${ props => props.column ? "0" : "0.5rem 3rem" };
    gap: ${ props => props.column ? "0" : "7rem"};
`

const  NewLink = ({ className, text, route }) => {
    return (
        <Link
            className = { className } 
            to = { `/admin/${ route }` }
        >
            { text }
        </Link>
    )
}

const StyledLink = styled(NewLink)`
    position: relative;
    color: white;
    font-size: 1.25rem;
    margin: 1.5rem 0;
    text-decoration: none;
    &:after {
        position: absolute;
        top: -7px;
        bottom: -7px;
        right: -10px;
        width: 0.5rem;
        background-color: ${ props => props.active ? "red" : "transparent"};
        content: "";
    }
`

const AppShellHeader = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
    navigate('/')
    
    }
    return(
        <Header 
            height = {64}
            styles = {{
                root: {
                    backgroundColor: 'black',
                    color: 'white',
                    border: 0,

                    display: 'flex',
                    justifyContent: 'space-between'
                }
            }}
        >
            <FlexDiv>
                <Image
                    src = { imgLogo } 
                    alt = "Logo de Fukusuke"
                    width = { 48 }
                />
                <h3> Panel de Administración </h3>
            </FlexDiv>

            <FlexDiv>
                <StyledLink  text = "Pedidos" route = 'pedidos' />
                <StyledLink  text = "Productos" route = 'productos' />
                <StyledLink  text = "Usuarios" route = 'usuarios' />
                <i onClick={() => handleLogout()} className="navbar-icon">
                    <AiOutlineLogout size={30} color="white" />   
                </i>

            </FlexDiv>
        </Header>
    )
}

const AppShellProductNav = ({ currentSection }) => {
    return(
        <Navbar
            width = {{ base: 180 }}
            p = "xs"
            styles = {{ root: { backgroundColor: 'black' }}}
            fixed
        >
            <FlexDiv column >
                <StyledLink text = "Todo" route = 'productos/' active = { !currentSection } />
                <StyledLink text = "Tablas" route = 'productos/tablas' active = { currentSection === 'tablas' ? 1 : 0 } />
                <StyledLink text = "Entradas" route = 'productos/entradas' active = { currentSection === 'entradas' ? 1 : 0 } />
                <StyledLink text = "Gohan" route = 'productos/gohan' active = { currentSection === 'gohan' ? 1 : 0 } />
                <StyledLink text = "Ramen" route = 'productos/ramen' active = { currentSection === 'ramen' ? 1 : 0 } />
            </FlexDiv>
        </Navbar>
    )
}

const AppShellUserNav = ({ currentSection }) => {
    return(
        <Navbar
            width = {{ base: 180 }}
            p = "xs"
            styles = {{ root: { backgroundColor: 'black' }}}
            fixed
        >
            <FlexDiv column >
                <StyledLink text = "Todos" route = 'usuarios/' active = { !currentSection } />
                <StyledLink text = "Clientes" route = 'usuarios/clientes' active = { currentSection === 'clientes' ? 1 : 0 } />
                <StyledLink text = "Administradores" route = 'usuarios/administradores' active = { currentSection === 'administradores' ? 1 : 0 } />
                <StyledLink text = "Cajeros" route = 'usuarios/cajeros' active = { currentSection === 'cajeros' ? 1 : 0 } />
                <StyledLink text = "Repartidores" route = 'usuarios/repartidores' active = { currentSection === 'repartidores' ? 1 : 0 } />
            </FlexDiv>
        </Navbar>
    )
};

const AdminHome = () => {

    const navigate = useNavigate();

    const currentSection = useParams().selectedCategory
    const [currentNavbar, setCurrentNavbar] = useState(null)

    let loc = useLocation()

    useEffect(() => {
        const user_token = localStorage.getItem('token')
        const user_role = user_token && jwt_decode(user_token).role
        if (user_role === "client") navigate('/catalogo')
        else if (user_role === "cashier" || user_role === "delivery") navigate('/admin/pedidos')

        if(loc.pathname.split("/")[2] === "pedidos"){
            setCurrentNavbar(null)
        } else if(loc.pathname.split("/")[2] === "productos") {
            setCurrentNavbar(<AppShellProductNav currentSection = { currentSection } />)
        } else if(loc.pathname.split("/")[2] === "usuarios") {
            setCurrentNavbar(<AppShellUserNav currentSection = { currentSection } />)
        }
    }, [loc.pathname]);

    return(
        <AppShell
            fixed
            padding = 'md'
            header = { <AppShellHeader /> } 
            navbar = { currentNavbar }
            styles = {{ main: { backgroundColor: 'rgba(217, 217, 217, .25' } }}
        >
            <Outlet />
        </AppShell>
    )
}

export default AdminHome