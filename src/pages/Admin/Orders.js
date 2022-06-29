import React, { useState } from 'react'

import { Grid, Group, List, Text, Title } from '@mantine/core'

import styled from 'styled-components';

import Order from './Order';

const StyledTitle = styled(Title)`
    display: flex;
    position: relative;
    font-size: 2rem;
    color: #6F6868;

    &:after {
        width: 42rem;
        height: 1px;
        background-color: #6F6868;
        content: "";
        position: absolute;
        top: calc(2.625rem + .2rem); // 2.625 = 2rem (alto del texto) + 10px (padding superior), .2rem es que tan abajo del título debe quedar la línea
        bottom: 0;
    }
`

const Orders = ({ menus, orders, users }) => {
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [orderingUser, setOrderingUser] = useState(null)

    const handleSelectOrder = ( id ) => {
        const findSelectedOrder = orders.find(order => order.id === id)
        const findOrderingUser = users.find(user => user.id === findSelectedOrder.orderedBy)

        setSelectedOrder(findSelectedOrder)
        setOrderingUser(findOrderingUser)
    }

    return(
        <Grid columns = { 20 } style = {{ padding: '0rem 2rem' }}>
            <Grid.Col span = { 8 }>
                <Group direction = 'column'>
                    {   
                        orders.map(order =>
                            <Order key = { order.id } menus = { menus } order = { order } handleSelectOrder = {handleSelectOrder}/>
                        )
                    }
                </Group>
            </Grid.Col>

            <Grid.Col span = { 12 }>
                {
                    !selectedOrder
                    ?   <StyledTitle order = { 2 } >
                            Selecciona un pedido para ver los detalles...
                        </StyledTitle>
                    :   <Group style = {{ border: '1px solid black', padding: '1rem 3rem' }} direction='column' grow = {false}>
                            <Title order = { 2 } style = {{fontSize: '2.125rem', paddingRight: '18rem'}}> Pedido </Title>

                            <List style = {{ fontSize: '1.125rem' }}>
                                {
                                    selectedOrder.content.map(item =>  
                                            <List.Item key = { item }>
                                                {
                                                    menus.filter(menu => menu.id === item).map(menu => menu.name)
                                                }
                                            </List.Item>
                                    )
                                }
                            </List>

                            <Title order = { 2 } style = {{ fontSize: '2rem' }}> Dirección de Entrega </Title>

                            <List style = {{ fontSize: '1.125rem' }}>
                                <List.Item> { selectedOrder.deliveryAddress } </List.Item>
                            </List>

                            <Title order = { 2 } style = {{ fontSize: '2rem' }} > Detalles del Cliente </Title>

                            <List style = {{ fontSize: '1.125rem' }}>
                                <List.Item> { orderingUser.name } </List.Item>
                                <List.Item> +56{orderingUser.phone} </List.Item>
                            </List>
                        </Group>
                }
            </Grid.Col>

        </Grid >
    )
}

export default Orders