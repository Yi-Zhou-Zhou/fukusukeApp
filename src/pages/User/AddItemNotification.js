import React from "react";

import { Center, Notification, Transition } from "@mantine/core";

const AddItemNotification = ({ opened }) => {
    return(
        <Transition mounted = { opened } duration = {250} timingFunction = "ease" transition = "slide-up">
            {
                (styles) => 
                    <Center style = {{ ...styles, margin: '1rem 0 0 0' }}> 
                        <Notification style = {{ width: '32rem' }} color = "red" title = "¡Producto agregado al carrito correctamente!" />
                    </Center>
            }
        </Transition>
    )
}

export default AddItemNotification