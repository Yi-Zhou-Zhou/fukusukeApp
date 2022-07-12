import React, { useEffect, useState } from "react"

import { Button, Divider, Drawer, Text } from "@mantine/core"
import ShoppingCartItem from "./ShoppingCartItem"

import stringifyPrice from '../../functions/common/stringifyPrice'

const ShoppingCart = ({ cart, setCart, openedCart, setOpenedCart, setShowBuyNotification, orders, setOrders }) => {
    const [total, setTotal] = useState(0)

    const handleDeleteProduct = (id) => {
        const newCart = cart.filter(product => product._id !== id)

        setCart(newCart)
    }

    useEffect(() => {
        setTotal(cart.reduce((anterior, actual) => anterior + Math.floor(actual.price) * actual.cartQuantity, 0))

        if(cart.find(product => product.cartQuantity === 0))
        {
            setCart(cart.filter(product => product.cartQuantity !== 0))
        }
    }, [cart, setCart])

    const handleBuyCart = () => {
        setShowBuyNotification(true)

        setOrders([...orders, cart])

        setCart([])
        setOpenedCart(false)
    }

    return(
        <Drawer
            opened = { openedCart }
            onClose = { () => setOpenedCart(false) }
            title = "Carrito de compras"
            padding = "xl"
            position = "right"

            styles = {{
                title: {
                    fontSize: '1.25rem'
                },
                drawer: {
                    backgroundColor: 'black',
                    color: 'white'
                }
            }}
        >
            <Divider/>

            {
                cart.length !== 0
                ?   <div>
                        {
                            cart.map(product =>
                                <ShoppingCartItem key = { product._id } product = { product } handleDeleteProduct = { handleDeleteProduct }/>
                            )
                        }
        
                        <Divider style = {{ margin: '1rem 0 0 0' }}/>

                        <div
                            style = {{ margin: '1rem 0 0 0', display: 'flex', justifyContent: 'space-between' }}
                        >
                            <Text style = {{ display: 'inline-block' }} align = "right">
                                Total a pagar: { stringifyPrice(total) }
                            </Text>

                            <Button 
                                compact
                                color = "red"
                                onClick = { handleBuyCart }
                            >
                                Comprar
                            </Button>
                        </div>
                    </div>
                : <Text style = {{ margin: '1rem 0 0 0' }}> ¡Agregue productos al carrito para realizar su pedido! </Text>
            }

        </Drawer>
    )
}

export default ShoppingCart