import React from "react";

import { Card, Group, Text, Title } from "@mantine/core";

const AdminGreeting = ({ orders }) => {
    return(
        <Group direction = "column">
            <Title order = { 2 } > Ordenes recientes: </Title>

            <Group>
            {
                orders.map(order => 
                    <Card key = { order.id }> 
                        <Text>
                            {order.id}
                        </Text>
                    </Card>
                )
            }
            </Group>

            <Title order = { 2 } > Productos sin stock: </Title> 
        </Group>
    )
}

export default AdminGreeting