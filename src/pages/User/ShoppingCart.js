import { Modal } from "@mantine/core";
import React from "react";

const ShoppingCart = ({ openedCart, setOpenedCart }) => {
    return(
        <Modal
            opened = { openedCart }
            onClose = { () => setOpenedCart(false) }
            title = "Carrito de compras"
        >
            Hello world!
        </Modal>
    )
}

export default ShoppingCart