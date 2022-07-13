import React, { useEffect, useState } from "react"

import jwt_decode from 'jwt-decode'

import { Button, Divider, Drawer, Text } from "@mantine/core"
import ShoppingCartItem from "./ShoppingCartItem"

import stringifyPrice from '../../functions/common/stringifyPrice'
import naiveGenerateId from '../../functions/common/naiveGenerateId'

const ShoppingCart = ({ cart, setCart, openedCart, setOpenedCart, setShowBuyNotification, orders, setOrders }) => {
    const [total, setTotal] = useState(0)

    const user_token = localStorage.getItem('token')
    const user_role = user_token && jwt_decode(user_token).role

    const handleDeleteProduct = (id) => {
        const newCart = cart.filter(product => product._id !== id)

        setCart(newCart)
    }

    useEffect(() => {
        console.log(cart)

        setTotal(cart.reduce((anterior, actual) => anterior + Math.floor(actual.price) * actual.cartQuantity, 0))

        if(cart.find(product => product.cartQuantity === 0))
        {
            setCart(cart.filter(product => product.cartQuantity !== 0))
        }
    }, [cart, setCart])

    const handleBuyCart = () => {
        setShowBuyNotification(true)
        const user_id = user_token && jwt_decode(user_token).id

        const cartObject = {
            id: naiveGenerateId(orders),
            productos: [...cart],
            client: user_id
        }

        setOrders(orders.concat(cartObject))

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
                            <div>
                                {
                                    user_role
                                    ? <Text align = "left">
                                        Total a pagar: { stringifyPrice(total) }
                                    </Text>
                                    : <Text>
                                            ¡Inicia sesión para terminar tu pedido!
                                    </Text>
                                }
                            </div>

                            {
                                user_role
                                ? <Button 
                                    compact
                                    color = "red"
                                    onClick = { handleBuyCart }
                                >
                                    Comprar
                                </Button>
                                : null
                            }
                        </div>
                    </div>
                : <Text style = {{ margin: '1rem 0 0 0' }}> ¡Agregue productos al carrito para realizar su pedido! </Text>
            }

        </Drawer>
    )
}

export default ShoppingCart