import React from "react";

import { Anchor, Title } from "@mantine/core";

import { Link } from "react-router-dom";
import styled from "styled-components";

import img from '../../images/photo-1617196034183-421b4917c92d.avif'

const MyContainer = styled.div`
    background: url(${img});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    padding: 4rem 5.5rem;
    height: 100%;
    width: 100%;
    
    color: white;
`

const Greeting = () => {
    return(
        <MyContainer>
            <Title 
                order = {2}
                style = {{ 
                    top: '10rem',
                    left: '12rem',
                    fontSize: '4rem',
                }}
            >
                ¡Ven a probar el mejor sushi de Santiago!
            </Title>

            <Anchor
                style = {{
                    display: 'inline-block',
                    backgroundColor: 'red',
                    padding: '1rem 2rem',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '1.375rem',
                    borderRadius: '5px',
                    marginTop: "2rem"

                }}
                component = { Link } to = 'catalogo'
            >
                Realizar pedido
            </Anchor>
        </MyContainer>
    )
}

export default Greeting