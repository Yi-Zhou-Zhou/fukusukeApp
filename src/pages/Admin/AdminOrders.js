import React, { useEffect, useState, useContext } from 'react'

import { Button, Container, Group, List, Title } from '@mantine/core'

import styled from 'styled-components';

import Order from './Order';

import { OrderContext } from '../../context/order/OrderContext';
import { UserContext } from '../../context/user/UserContext';

const StyledTitle = styled(Title)`
    display: flex;
    position: relative;
    font-size: 2rem;
    color: #6F6868;

    &:after {
        width: 26rem;
        height: 1px;
        background-color: #6F6868;
        content: "";
        position: absolute;
        top: calc(2 * 2.625rem + .2rem); // 2 * 2.625 = 2 * (2rem (alto del texto) + 10px (padding superior)), .2rem es que tan abajo del título debe quedar la línea
        bottom: 0;
    }
`

const MediaScroller = styled.div`
    display: grid;
    gap: 1rem;
    grid-auto-flow: row;
    grid-auto-rows: 18%;

    padding: 0 1rem 1rem;

    overflow-y: auto;
    overscroll-behavior-y: contain;

    scroll-snap-type: y mandatory;
    scroll-padding-y: 1rem;

    & > * {
        scroll-snap-align: start;
    }
`

const AdminOrders = () => {
    const { orders, updateOrder } = useContext(OrderContext);

    const [initialOrders, setInitialOrders] = useState([])

    useEffect(() => {
        if(orders.length !== 0)
        {
            setInitialOrders(orders)
        }
    }, [orders])

    const { users } = useContext(UserContext);

    const [selectedOrder, setSelectedOrder] = useState(null)
    const [orderingUser, setOrderingUser] = useState(null)

    const handleSelectOrder = ( id ) => {
        const findSelectedOrder = orders.find(order => order._id === id)

        console.log(findSelectedOrder)

        const findOrderingUser = users.find(user => user._id === findSelectedOrder.client.id)

        setSelectedOrder(findSelectedOrder)
        setOrderingUser(findOrderingUser)
    }

    const handleFinishOrder = ( order ) => {
        let newOrder = { ...order}

        if(order.state === "preparando")
        {
            newOrder.state = "listo"
            setSelectedOrder({ ...order, state: 'listo'})

        } else if (order.state === "listo")
        {
            newOrder.state = "despachado"
            setSelectedOrder(null)

            setInitialOrders(initialOrders.filter(orderOnArray => orderOnArray._id !== order._id))
        }

        updateOrder(newOrder)
    }

    return(
        <Container style = {{ height: 'calc(100vh - 160px)' }}>
            <div
                style = {{ display: 'grid', gridTemplateColumns: '50% 50%', height: '100%' }}
            >
                <MediaScroller>
                    {
                        initialOrders.filter(order => order.state !== "despachado").map(order =>
                            <Order key = { order._id } order = { order } handleSelectOrder = {handleSelectOrder}/>
                        )
                    }
                </MediaScroller>

                <div>
                    {
                        !selectedOrder
                        ?   <StyledTitle order = { 2 }>
                                Selecciona un pedido para ver los detalles...
                            </StyledTitle>
                        :   <Group style = {{ border: '1px solid black', padding: '1rem 3rem' }} direction='column' grow = {false}>
                                <Title order = { 2 } style = {{fontSize: '2.125rem', paddingRight: '18rem'}}> Pedido </Title>

                                <List style = {{ fontSize: '1.125rem' }}>
                                    {
                                        selectedOrder.productos.map(item =>  
                                                <List.Item key = { item._id } >
                                                    { item.name }
                                                </List.Item>
                                        )
                                    }
                                </List>

                                <Title order = { 2 } style = {{ fontSize: '2rem' }}> Dirección de Entrega </Title>

                                <List style = {{ fontSize: '1.125rem' }}>
                                    <List.Item>{ selectedOrder.client.address }</List.Item>
                                </List>

                                <Title order = { 2 } style = {{ fontSize: '2rem' }} > Detalles del Cliente </Title>

                                <List style = {{ fontSize: '1.125rem' }}>
                                    <List.Item>{ selectedOrder.client.name }</List.Item>
                                    <List.Item>+56{ orderingUser?.phone }</List.Item>
                                </List>

                                <Button
                                    color = { selectedOrder.state === "preparando" ? "red" : "green"}
                                    onClick = { () => handleFinishOrder(selectedOrder) }
                                >
                                    Finalizar pedido
                                </Button>
                            </Group>
                    }
                </div>
            </div>
        </Container>
    )
}

export default AdminOrders