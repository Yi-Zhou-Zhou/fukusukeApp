import React from 'react'

import { Card, Text } from '@mantine/core'

import styled from 'styled-components';

import { VscTriangleRight } from 'react-icons/vsc'

import stringifyPrice from '../../functions/common/stringifyPrice';

import { ProductContext } from '../../context/product/ProductContext';

const onlyTime = ( date ) => {
    const dateObject = new Date( date )
    return(dateObject.toLocaleTimeString())
}

const addWaitingTime = ( date, hours ) => {
    const dateObject = new Date( date )
    const newDateObject = new Date(dateObject.setHours(dateObject.getHours() + hours))

    return(newDateObject.toLocaleTimeString())
}

const calculateOrderPrice = ( products, orderContent ) => {
    return(
        products
            .filter(product => orderContent.includes(product._id))
            .map(product => product.price)
            .reduce((prev, curr) => prev + curr, 0)
    )
}

// "styled-component" para un botón que borra tarjetas
const ExpandButton = styled.button`
    background-color: transparent;
    content: '';
    border: 0;
    cursor: pointer;
    padding: 0;
    position: absolute;
    right: .5rem;
    top: 1.25rem;
`

const StyledExpandButton = styled(VscTriangleRight)`
    display: flex;
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
`

const Order = ({ handleSelectOrder, order }) => {
    return(
        <Card style = {{ padding: '1rem 3rem', width: '100%', backgroundColor: '#d9d9d9' }}>
            <ExpandButton onClick = { () => handleSelectOrder( order._id ) }>
                <StyledExpandButton />
            </ExpandButton>

            <Text style = {{position: 'absolute', top: '1.3rem', left: '1rem'}}> #X </Text>

            <Text style = {{ fontSize: '1.5rem' }}> Realizado a las: { onlyTime(order.createdAt) } </Text>
            <Text style = {{ fontSize: '1.5rem' }}> Entrega estimada: { addWaitingTime(order.createdAt, 1) } </Text>
            <Text style = {{ fontSize: '1.5rem' }}> Precio: { stringifyPrice(order.price) } </Text>
        </Card>
    )
}

export default Order