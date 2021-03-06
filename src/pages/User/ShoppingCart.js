import React, { useContext, useEffect, useState } from "react"

import { Button, Divider, Drawer, Text } from "@mantine/core"
import ShoppingCartItem from "./ShoppingCartItem"

import stringifyPrice from '../../functions/common/stringifyPrice'
import { OrderContext } from "../../context/order/OrderContext"
import { ProductContext } from "../../context/product/ProductContext"
import jwt_decode from 'jwt-decode';

const ShoppingCart = ({ cart, setCart, openedCart, setOpenedCart, setShowBuyNotification }) => {
    const [total, setTotal] = useState(0)
    const { addOrder} = useContext(OrderContext);
    const { updateProduct } = useContext(ProductContext)

    const user_token = localStorage.getItem('token')
    const user_role = user_token && jwt_decode(user_token).role

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
        const user_token = localStorage.getItem('token')
        const decode = user_token && jwt_decode(user_token)
        
        const user_id = decode?.id
        const user_name = decode?.name
        const user_address = decode?.address

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

            updateProduct({ ...cart[i], stock: cart[i].stock - cart[i].cartQuantity })
		}

        const order = {
            "price": total,
            "productos": productos,
            "state": "preparando",
            "userId": user_id,
            "userName": user_name,
            "userAddress": user_address
        }

        addOrder(order)

        setShowBuyNotification(true)
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
                                            ??Inicia sesi??n para terminar tu pedido!
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
                : <Text style = {{ margin: '1rem 0 0 0' }}> ??Agregue productos al carrito para realizar su pedido! </Text>
            }

        </Drawer>
    )
}

export default ShoppingCart