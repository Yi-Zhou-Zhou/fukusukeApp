import React, { useState } from "react";

import { Badge, Button, Card, Container, Grid, Group, Image, Title, Text } from "@mantine/core";
import { LoremIpsum } from 'react-lorem-ipsum';

import stringifyPrice from '../../functions/common/stringifyPrice';

const Catalog = ({ menus }) => {
    const [initialMenus, setInitialMenus] = useState(menus)

    return(
        <Container size = 'lg'>
            <Grid>
            {
                initialMenus.map(menu => 
                    <div
                        key = { menu.id }
                        style = {{ width: '21rem', margin: '1rem' }}
                    >
                        <Card 
                            shadow = 'sm'
                            p = 'lg'
                            style = {{ height: '100%' }}
                        >
                            <Card.Section>
                                <Image src = { menu.picture } alt = "Fotografía de comida" height={160}/>
                            </Card.Section>

                            <div style = {{ display: 'flex', margin: '1rem 0 0 0', justifyContent: 'space-between' }}>
                                <div>
                                    <Title order = {2} style = {{ fontSize: '1.125rem' }}> { menu.name } </Title>

                                    <Text> 
                                        <LoremIpsum
                                            p = {1}
                                            avgSentencesPerParagraph = {1}
                                            avgWordsPerSentence = {3}
                                            startWithLoremIpsum = { false }
                                        />
                                    </Text>
                                </div>

                                <div style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem' }}>
                                    <Text weight = { 600 }> ${ stringifyPrice(menu.price) } </Text>
                                    <div style = {{ display: 'flex', alignItems: 'center' }}>
                                        <Button 
                                            compact
                                            style = {{ borderRadius: '5px 0 0 5px'}}
                                        > Agregar </Button>
                                        <Badge style = {{ height: '100%', borderRadius: '0 5px 5px 0' }}radius = 'xs'>
                                            { Math.floor( Math.random() * 20)}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )
            }
            </Grid>
        </Container>
    )
}

export default Catalog