import React, { useContext } from "react";

import { Card, Container, Group, Image, List, Text, Title } from "@mantine/core"

import styled from 'styled-components'

import { OrderContext } from '../../context/order/OrderContext'

import stringifyPrice from '../../functions/common/stringifyPrice'

import { BsDash } from 'react-icons/bs'

const MediaScroller = styled.div`
    margin: 1rem 0;

    display: grid;
    gap: 1rem;
    grid-auto-flow: column;
    grid-auto-columns: 31%;

    padding: 0 1rem 1rem;

    overflow-x: auto;
    overscroll-behavior-inline: contain;

    scroll-snap-type: inline mandatory;
    scroll-padding-inline: 1rem;

    & > * {
        scroll-snap-align: start;
    }
`

const AdminGreeting = () => {
    const { orders } = useContext(OrderContext)

    console.log(orders)

    return(
        <Container>
            <Title order = { 2 }> Ordenes pendientes: </Title>

            <MediaScroller>
            {
                orders.map(order => 
                    <Card
                        key = { order._id }
                        shadow = "sm"
                        p = "lg"
                    >
                        <Card.Section>
                            <Image src = { order.productos[0].picture } height = {160} />
                        </Card.Section>

                        <div
                            style = {{
                                display: 'flex',
                                flexDirection: 'column',
                                margin: '1rem 0 0 0',
                                height: 'calc(100% + 1rem - 160px)',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div>
                                <List
                                    icon = {<BsDash/>}
                                    size = "md"
                                >
                                    {
                                        order.productos.map(producto =>
                                            <List.Item key = { producto._id }> { producto.name } </List.Item>
                                        )
                                    }
                                </List>
                            </div>

                            <Text style = {{ fontWeight: 'bold' }} align="right"> { stringifyPrice(order.productos.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0)) } </Text>
                        </div>
                    </Card>
                )
            }
            </MediaScroller>
        </Container>
    )
}

export default AdminGreeting