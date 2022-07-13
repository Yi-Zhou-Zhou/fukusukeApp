import React from "react";

import { Card, Container, Image, Text, Title } from "@mantine/core";

import styled from 'styled-components'

const MediaScroller = styled.div`
    display: grid;
    grid-auto-flow: column;
`

const AdminGreeting = ({ orders }) => {
    return(
        <Container>
            <Title order = { 2 } > Ordenes recientes: </Title>

            <MediaScroller>
            {
                orders.map(order => 
                    <Card key = { order.id }>
                        <Card.Section>
                            {/* <Image src = { order. } */}
                        </Card.Section>
                        <Text>
                            {order.id}
                        </Text>
                    </Card>
                )
            }
            </MediaScroller>

            <Title order = { 2 } > Productos sin stock: </Title> 
        </Container>
    )
}

export default AdminGreeting