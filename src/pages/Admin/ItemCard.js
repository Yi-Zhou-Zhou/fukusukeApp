import React from 'react'

import StockSlider from './StockSlider'

import { Button, Card, Group, Image, Text } from '@mantine/core';
import {AiFillCloseCircle} from 'react-icons/ai'
import styled from 'styled-components'

import stringifyPrice from '../../functions/common/stringifyPrice';

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
        height: 1.3rem;

        background-color: white;
        content: "";
        z-index: -1;
    }    
`

// "styled-component" para el ícono dentro de "DeleteButton"
const StyledDeleteIcon = styled(AiFillCloseCircle)`
    font-size: 2rem;
`

// "styled-component" para el contenedor de la Card
const CardContainer = styled.div`
    margin: 1rem;
    position: relative;

    width: 19.25rem;
`

// "styled-component" para grupos dentro de Cards
const CardGroup = ({ className, children }) => {
    return(
        <Group className = { className } position='apart' align = 'center'>
            { children }
        </Group>
    )
}

const StyledCardGroup = styled(CardGroup)`
    margin: 1rem 0;
`

const ItemCard = ({ menu, initialMenus, setInitialMenus }) => {
    const handleDelete = ( id ) => {
        const newMenus = initialMenus.filter(menu => menu.id !== id)

        setInitialMenus(newMenus)
    }

    return (
        <CardContainer>
            <DeleteButton onClick = {() => handleDelete( menu.id )}>
                <StyledDeleteIcon />
            </DeleteButton>

            <Card shadow = "sm" >
                <Card.Section>
                    <Image src = { menu.picture } alt = "Fotografía de sushi" height={160}/>
                </Card.Section>

                <StyledCardGroup>
                    <Text weight = { 600 } >
                        { menu.name }
                    </Text>

                    <Text weight = { 100 } >
                        { stringifyPrice(menu.price) }
                    </Text>
                </StyledCardGroup>

                <StyledCardGroup>
                    <Button variant="light" color="blue">
                        Editar
                    </Button>

                    <StockSlider stockState = { menu.stock }/>
                </StyledCardGroup>

            </Card>
        </CardContainer>
    )
}

export default ItemCard