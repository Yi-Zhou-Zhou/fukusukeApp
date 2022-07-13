import React, { useContext, useEffect, useState } from "react"

import { Button, Divider, Drawer, Text } from "@mantine/core"
import ShoppingCartItem from "./ShoppingCartItem"

import stringifyPrice from '../../functions/common/stringifyPrice'
import { OrderContext } from "../../context/order/OrderContext"
import jwt_decode from 'jwt-decode';

const ShoppingCart = ({ cart, setCart, openedCart, setOpenedCart, setShowBuyNotification, orders, setOrders }) => {
    const [total, setTotal] = useState(0)
    const { addOrder} = useContext(OrderContext);

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

        //Sacamos el token, ayuda xfa
        const user_token = localStorage.getItem('token')
        const decode = user_token && jwt_decode(user_token)
        const user_name = decode?.name
        const user_address = decode?.address
        const user_phone = decode?.phone
                
        //setOrders([...orders, cart])
        //Agregamos la orden nueva 
        let productos = []

        for (let i = 0; i < cart.length; i++) {
			const object = {
				id: cart[i].id,
				name: cart[i].name,
				price: cart[i].price,
				description: cart[i].description,
				picture: cart[i].picture,
				quantity: cart[i].cartQuantity,
			}
			productos.push(object)
		}

        const order = {
            "price": total,
            "productos": productos,
            "name": user_name,
            "address": user_address,
            "phone": user_phone,
            
        } 
        addOrder(order)

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