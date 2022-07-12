import React, { useEffect } from "react"

import { Badge, Card, Container, Divider, Group, Image, List, Stack, Text, Title } from "@mantine/core"

import sushiSvg from '../../images/sushiandgreentea.svg'

import { AiOutlineArrowRight } from 'react-icons/ai'

import stringifyPrice from '../../functions/common/stringifyPrice'

const Orders = ({ orders }) => {
    if(orders.length !== 0)
    {
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
                        Activos
                    </Title>
                    {
                        orders.map(order => 
                            <div
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
                                    order.map(product =>
                                        <Group
                                            key = { product._id }
                                            direction = "column"
                                            spacing = { 0 }
                                            style = {{
                                                margin: '0 0 1rem 0'
                                            }}
                                        >
                                            <Text>
                                                { product.name } { stringifyPrice(product.price) }
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
                                        <Badge
                                            color = "green"
                                            style = {{
                                                border: '1px solid rgb(64, 192, 87)'
                                            }}
                                        >
                                            Preparando
                                        </Badge>
                                    </div>

                                </Card>
                            </div>                            
                        )
                    }

                    <Title
                        order = { 3 }
                    >
                        Pasados
                    </Title>

                    <Text>
                        ¡Aún no has completado ningún pedido!
                    </Text>
                </Stack>
            </Container>
        )
    } else {
        return(
            <Container
                style = {{
                    height: '100%'
                }}
            >
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
            </Container>
        )
    }
}

export default Orders