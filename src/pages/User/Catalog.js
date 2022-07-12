import React, { useContext, useState } from "react";

import AddItemNotification from "./AddItemNotification";
import BuyNotification from "./BuyNotification"
import CatalogItem from "./CatalogItem";
import ShoppingCart from "../User/ShoppingCart";

import { ProductContext } from "../../context/product/ProductContext";
import { Container, Grid } from "@mantine/core";

const Catalog = ({ cart, setCart, openedCart, setOpenedCart, orders, setOrders }) => {
    const { products } = useContext(ProductContext);

    const [showAddNotification, setShowAddNotification] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState(null)

    const [showBuyNotification, setShowBuyNotification] = useState(false)

    const getQuantityOnCart = (productId) => {
        const productOnCart = cart.find(prod => prod._id === productId)

        return(
            productOnCart ? productOnCart.cartQuantity : 0
        )
    }

    return(
        <Container size = 'lg'>
            <ShoppingCart
                cart = { cart }
                setCart = { setCart }
                openedCart = { openedCart }
                setOpenedCart = { setOpenedCart }
                setShowBuyNotification = { setShowBuyNotification }
                orders = { orders }
                setOrders = { setOrders }
            />

            <Grid>
            {
                products.map(product => 
                    <CatalogItem
                        key = { product._id }
                        cart = { cart }
                        setCart = { setCart }
                        product = { product }
                        setShowAddNotification = { setShowAddNotification }
                        setNotificationMessage = { setNotificationMessage }
                        quantityOnCart = { getQuantityOnCart(product._id) }
                    />
                )
            }
            </Grid>

            <AddItemNotification
                notificationMessage = { notificationMessage }
                showAddNotification = { showAddNotification }
                setShowAddNotification = { setShowAddNotification }
            />

            <BuyNotification
                showBuyNotification = { showBuyNotification }
                setShowBuyNotification = { setShowBuyNotification }
            />
        </Container>
    )
}

export default Catalog