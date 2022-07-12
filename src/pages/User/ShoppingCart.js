import { Modal } from "@mantine/core";
import React from "react";

const ShoppingCart = ({ cart, openedCart, setOpenedCart }) => {
    return(
        <Modal
            opened = { openedCart }
            onClose = { () => setOpenedCart(false) }
            title = "Carrito de compras"
        >
            {
                cart.map(product =>
                    <div key = { product._id }>
                        <p> { product.name } </p>
                    </div>
                )
            }
        </Modal>
    )
}

export default ShoppingCart