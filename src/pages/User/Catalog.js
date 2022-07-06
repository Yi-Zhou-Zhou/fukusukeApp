import React, { useState, useContext } from "react";

import { ProductContext } from "../../context/product/ProductContext";
import { Badge, Button, Card, Container, Grid, Group, Image, Title, Text } from "@mantine/core";
import { LoremIpsum } from 'react-lorem-ipsum';

import stringifyPrice from '../../functions/common/stringifyPrice';

const Catalog = () => {

    const { products } = useContext(ProductContext);

    return(
        <Container size = 'lg'>
            <Grid>
            {
                products.map(product => 
                    <div
                        key = { product._id }
                        style = {{ width: '21rem', margin: '1rem' }}
                    >
                        <Card 
                            shadow = 'sm'
                            p = 'lg'
                            style = {{ height: '100%' }}
                        >
                            <Card.Section>
                                <Image src = { product.picture } alt = "Fotografía de comida" height={160}/>
                            </Card.Section>

                            <div style = {{ display: 'flex', margin: '1rem 0 0 0', justifyContent: 'space-between' }}>
                                <div>
                                    <Title order = {2} style = {{ fontSize: '1.125rem' }}> { product.name } </Title>

                                    <Text> 
                                        { product.description }
                                    </Text>
                                </div>

                                <div style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem' }}>
                                    <Text weight = { 600 }> ${ stringifyPrice(product.price) } </Text>
                                    <div style = {{ display: 'flex', alignItems: 'center' }}>
                                        <Button 
                                            compact
                                            style = {{ borderRadius: '5px 0 0 5px'}}
                                        > Agregar </Button>
                                        <Badge style = {{ height: '100%', borderRadius: '0 5px 5px 0' }}radius = 'xs'>
                                            { product.stock }   
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