import React from "react";

import { Card, Group, Text, Title } from "@mantine/core";

const Greeting = ({ orders }) => {
    return(
        <Group direction = "column">
            <Title order = { 2 } > Ordenes recientes: </Title>

            <Group>
            {
                orders.map(order => 
                    <Card> 
                        <Text>
                            {order.id}
                        </Text>
                    </Card>
                )
            }
                { console.log(orders) }
            </Group>

            <Title order = { 2 } > Productos sin stock: </Title> 
        </Group>
    )
}

export default Greeting