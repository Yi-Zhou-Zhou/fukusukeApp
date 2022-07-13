import React, { useContext, useEffect, useState } from "react"

import { Badge, Card, Container, Divider, Group, Image, List, Stack, Text, Title } from "@mantine/core"

import sushiSvg from '../../images/sushiandgreentea.svg'

import { AiOutlineArrowRight } from 'react-icons/ai'

import { OrderContext } from "../../context/order/OrderContext";

import stringifyPrice from '../../functions/common/stringifyPrice'

import jwt_decode from 'jwt-decode';

const Orders = () => {
    let { orders } = useContext(OrderContext)

    const [activeOrders, setActiveOrders] = useState([])
    const [pastOrders, setpastOrders] = useState([])

    useEffect(() => {
        if(orders.length !== 0)
        {
            setActiveOrders(orders.filter((ord) => ord && ord.state !== "despachado" && ord.client.id === user_id))
            setpastOrders(orders.filter(ord => ord && ord.state === "despachado" && ord.client.id === user_id))
        }
    }, [orders])

    const user_token = localStorage.getItem('token')
    const user_id = user_token && jwt_decode(user_token).id

    const renderBadge = (state) => {
        if(state === "preparando")
        {
            return(
                <Badge
                    color = "green"
                    style = {{
                        border: '1px solid rgb(64, 192, 87)'
                    }}
                >
                    Preparando
                </Badge>
            )
        } else if (state === "listo")
        {
            return(
                <Badge
                    color = "red"
                    style = {{
                        border: '1px solid rgb(250, 82, 82)'
                    }}
                >
                    Listo
                </Badge>
            )
        }
    }

    return(
        <Container>
            <Stack
                spacing = "xl"
                style = {{ margin: '1rem 0 0 0' }}
            >
                <Title
                    order = { 2 }
                    align = 'center'
                >
                    Mis Pedidos
                </Title>

                <Divider />

                <Title
                    order = { 3 }
                >
                    { activeOrders.length } Pedidos Activos
                </Title>

                {
                    activeOrders.length !== 0
                    ?
                        activeOrders.map(order => 
                            <div
                                key = { order?._id }
                                style = {{
                                    width: '640px',
                                    alignSelf: 'center'
                                }}
                            >
                                <Card
                                    shadow = "sm"
                                    p = "lg"
                                >
                                {
                                    order?.productos.map(product =>
                                        <Group
                                            key = { product._id }
                                            direction = "column"
                                            spacing = { 0 }
                                            style = {{
                                                margin: '0 0 1rem 0'
                                            }}
                                        >
                                            <Text>
                                                { product.quantity } x { product.name } - { stringifyPrice(product.quantity * product.price) }
                                            </Text>

                                            <List
                                                spacing = "xl"
                                                size = "sm"
                                                center
                                                icon = {
                                                    <AiOutlineArrowRight/>
                                                }
                                                styles = {{
                                                    item: {
                                                        lineHeight: 'normal'
                                                    }
                                                }}
                                            >
                                                <List.Item> { product.description } </List.Item>
                                            </List>
                                        </Group>
                                    )
                                }

                                    <div
                                        style = {{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        {
                                            renderBadge(order.state)                                                
                                        }
                                    </div>
                                </Card>
                            </div>        
                        )
                    :
                        <div
                            style = {{
                                display: 'grid',
                                height: '100%',
                                placeContent: 'center center'
                            }}
                        >
                            <Group
                                direction = "column"
                                align = "center"
                            >
                                <Title
                                    order = { 2 }
                                >
                                    ¡Realiza un pedido para ver su estado aquí!
                                </Title>

                                <Image
                                    style = {{ margin: '1rem 0 0 0'}}
                                    src = { sushiSvg }
                                    alt = "Imagen placeholder que muestra un dibujo de sushi."
                                    width = {200}
                                />
                            </Group>
                        </div>
                }

                <Title
                    order = { 3 }
                >
                    Pasados
                </Title>

                {
                    pastOrders.map(order => 
                        <div
                            key = { order?._id }
                            style = {{
                                width: '640px',
                                alignSelf: 'center'
                            }}
                        >
                            <Card
                                shadow = "sm"
                                p = "lg"
                            >
                            {
                                order?.productos.map(product =>
                                    <Group
                                        key = { product._id }
                                        direction = "column"
                                        spacing = { 0 }
                                        style = {{
                                            margin: '0 0 1rem 0'
                                        }}
                                    >
                                        <Text>
                                            { product.quantity } x { product.name } - { stringifyPrice(product.quantity * product.price) }
                                        </Text>

                                        <List
                                            spacing = "xl"
                                            size = "sm"
                                            center
                                            icon = {
                                                <AiOutlineArrowRight/>
                                            }
                                            styles = {{
                                                item: {
                                                    lineHeight: 'normal'
                                                }
                                            }}
                                        >
                                            <List.Item> { product.description } </List.Item>
                                        </List>
                                    </Group>
                                )
                            }

                                <div
                                    style = {{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    {
                                        renderBadge(order.state)                                                
                                    }
                                </div>
                            </Card>
                        </div>        
                    )
                }
            </Stack>
        </Container>
    )
}

export default Orders