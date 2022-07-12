import React from "react"

import { Badge, Card, Container, Group, Image, Stack, Text, Title } from "@mantine/core"

import sushiSvg from '../../images/sushiandgreentea.svg'

const Orders = ({ orders }) => {
    console.log(orders)

    if(orders.length !== 0)
    {
        return(
            <Container>
                <Stack
                    spacing = "xl"
                >
                    {
                        orders.map(order => 
                            <div
                                key = { order._id }
                                style = {{
                                    width: '640px',
                                    alignSelf: 'center'
                                }}
                            >
                                {
                                    order.map(product =>
                                            <Card
                                                shadow = "sm"
                                                p = "lg"
                                            >
                                                <Group>
                                                    <Text>
                                                        { product.name }
                                                    </Text>
                                                    <Badge
                                                        color = "green"
                                                    >
                                                        Preparando
                                                    </Badge>
                                                </Group>
                                            </Card>
                                    )
                                }
                            </div>                            
                        )
                    }
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