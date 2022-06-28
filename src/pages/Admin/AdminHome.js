import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import styled from 'styled-components'
import { AppShell, Image, Navbar, Header } from '@mantine/core';

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
            </FlexDiv>
        </Header>
    )
}

const AppShellNav = ({ currentSection }) => {
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

const AdminHome = () => {
    const currentSection = useParams().selectedCategory
    const [currentNavbar, setCurrentNavbar] = useState(null)

    let loc = useLocation()

    useEffect(() => {
        if(loc.pathname.split("/")[2] === "pedidos"){
            setCurrentNavbar(null)
        } else if(loc.pathname.split("/")[2] === "productos") {
            setCurrentNavbar(<AppShellNav currentSection = { currentSection } />)
        }
    }, [loc]);

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