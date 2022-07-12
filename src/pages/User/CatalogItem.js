import React from "react"

import { Badge, Button, Card, Image, Text, Title, Tooltip } from "@mantine/core"

import stringifyPrice from "../../functions/common/stringifyPrice"

const CatalogItem = ({ cart, setCart, product, setShowAddNotification, setNotificationMessage, quantityOnCart }) => {
    const handleItemChange = ( operator ) => {
        const productOnCart = cart.find(productOnCart => productOnCart._id === product._id)

        if(operator === "+")
        {
            if(!productOnCart && product.stock > 0)
            {
                setCart(cart.concat({...product, cartQuantity: 1}))

                setShowAddNotification(true)
                setNotificationMessage("¡Producto agregado al carrito correctamente!")

                setTimeout(() => {
                    setShowAddNotification(false)
                }, 5000)
            } else {
                if(productOnCart.cartQuantity + 1 <= productOnCart.stock)
                {
                    const productIdx = cart.findIndex(product => product._id === productOnCart._id)
    
                    const newCart = [ ...cart]
    
                    newCart[productIdx].cartQuantity = newCart[productIdx].cartQuantity + 1
    
                    setCart(newCart)

                    setShowAddNotification(true)
                    setNotificationMessage("¡Producto agregado al carrito correctamente!")

                    setTimeout(() => {
                        setShowAddNotification(false)
                    }, 5000)
                }
            }

        } else {
            if (productOnCart.cartQuantity > 0)
            {
                const productOnCart = cart.find(productOnCart => productOnCart._id === product._id)

                const productIdx = cart.findIndex(product => product._id === productOnCart._id)

                if(productIdx !== null)
                {
                    const newCart = [ ...cart]

                    newCart[productIdx].cartQuantity = newCart[productIdx].cartQuantity - 1

                    setCart(newCart)

                    setShowAddNotification(true)
                    setNotificationMessage("¡Producto retirado del carrito correctamente!")
        
                    setTimeout(() => {
                        setShowAddNotification(false)
                    }, 5000)
                }
            }
        }
    }

    return(
        <div
            style = {{ width: '21rem', margin: '1rem' }}
        >
            <Card 
                shadow = 'sm'
                p = 'lg'
                style = {{ position: 'relative', height: '100%' }}
            >
                <Tooltip
                    label = 'stock'
                    position = 'left'
                    withArrow

                    style = {{
                        position: 'absolute',
                        top: '2rem',
                        right: '1rem',
                        zIndex: 2,
                    }}
                >
                    <div
                        style = {{ 
                            color: 'black',
                            backgroundColor: 'white',
                            height: '2rem',
                            width: '2rem',

                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',

                            borderRadius: '50%',
                            cursor: 'help',
                            userSelect: 'none',
                        }}
                    >
                        <Text>
                            { product.stock }
                        </Text>
                    </div>
                </Tooltip>

                <Card.Section
                    style = {{
                        zIndex: 1,
                    }}
                >
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
                        <Text weight = { 600 }> { stringifyPrice(product.price) } </Text>
                        <div style = {{ display: 'flex', alignItems: 'center' }}>
                            <Button 
                                style = {{ height: '100%', borderRadius: '5px 0 0 5px' }}
                                compact
                                onClick = { () => handleItemChange("-") }
                            >
                                -
                            </Button>

                            <Badge
                                style = {{ borderRadius: '0 0 0 0'}}
                                radius = 'xs'
                            >
                                { quantityOnCart }
                            </Badge>

                            <Button 
                                style = {{ height: '100%', borderRadius: '0 5px 5px 0' }}
                                compact
                                onClick = { () => handleItemChange("+") }
                            >
                                +   
                            </Button>
                        </div>
                    </div>

                </div>
            </Card>
        </div>
    )
}

export default CatalogItem