import React from 'react'

import StockSlider from './StockSlider'

import { Button, Card, Group, Image, Text, useMantineTheme } from '@mantine/core';
import {AiFillCloseCircle} from 'react-icons/ai'
import styled from 'styled-components'

// Retorna un entero separado por puntos en grupos de a 3
// @param { int } price: El número a separar
// @return { string } price separado por puntos
const stringifyPrice = (price) => {
    return(
        price.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g).join(".")        
    )
}

// "styled-component" para un botón que borra tarjetas
const DeleteButton = styled.button`
    position: absolute;
    top: -12px;
    right: -6px;
    width: 2rem;
    height: 2rem;

    background-color: transparent;
    content: ''; 
    color: red;
    border: 0;
    cursor: pointer;
    z-index: 99;

    /* Se crea un rectángulo de color blanco detrás del ícono para que actúe de fondo */
    &:before {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 1rem;
        height: 1rem;

        background-color: white;
        content: "";
        z-index: -1;
    }    
`

// "styled-component" para el ícono dentro de "DeleteButton"
const StyledDeleteIcon = styled(AiFillCloseCircle)`
    font-size: 2rem;
`

// Componente 
const ItemCard = ({ menu }) => {
    const theme = useMantineTheme();

    const containerStyles = {
        margin: '1rem',
        position: 'relative'
    }

    const groupStyles = {
        marginTop: '1rem',
    }

    const buttonStyles = {
        margin: "0 8rem 0 0",
    }

    return (
        <div style = {containerStyles}>
            <DeleteButton>
                <StyledDeleteIcon />
            </DeleteButton>

            <Card shadow = "sm" >
                <Card.Section>
                    <Image src = { menu.picture } alt = "Fotografía de sushi" height={160}/>
                </Card.Section>

                <Group position='apart' style = { groupStyles }>
                    <Text weight = { 600 } >
                        { menu.name }
                    </Text>

                    <Text weight = { 100 } >
                        { stringifyPrice(menu.price) }
                    </Text>
                </Group>

                <Group position = 'apart' align = 'center' style = { groupStyles }>
                    <Button variant="light" color="blue" style = { buttonStyles }>
                        Editar
                    </Button>

                    <StockSlider stockState = { menu.stock }/>
                </Group>
            </Card>
        </div>
    )
}

export default ItemCard