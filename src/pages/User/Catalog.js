import React, { useContext, useState } from "react";

import AddItemNotification from "./AddItemNotification";
import ShoppingCart from "../User/ShoppingCart";

import { ProductContext } from "../../context/product/ProductContext";
import { Badge, Button, Card, Container, Grid, Image, Title, Text } from "@mantine/core";

import stringifyPrice from '../../functions/common/stringifyPrice';

const Catalog = ({ cart, setCart, openedCart, setOpenedCart }) => {
    const { products } = useContext(ProductContext);

    const [showAddNotification, setShowAddNotification] = useState(false)

    const handleAddProduct = ( itemObject ) => {
        const newCart = cart.concat(itemObject)

        setCart(newCart)

        setShowAddNotification(true)

        setTimeout(() => {
            setShowAddNotification(false)
        }, 5000)
    }

    return(
        <Container size = 'lg'>
            <ShoppingCart
                cart = { cart }
                setCart = { setCart }
                openedCart = { openedCart }
                setOpenedCart = { setOpenedCart }
            />

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
                                <div style = {{ width: '12rem' }}>
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
                                            onClick = { () => handleAddProduct(product) }
                                        >
                                            Agregar 
                                        </Button>
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

            <AddItemNotification opened = { showAddNotification } />
        </Container>
    )
}

export default Catalog