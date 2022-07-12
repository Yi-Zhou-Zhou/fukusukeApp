import React from "react";

import { Center, Notification, Transition } from "@mantine/core";

const AddItemNotification = ({ notificationMessage, showAddNotification, setShowAddNotification }) => {
    return(
        <Transition mounted = { showAddNotification } duration = {250} timingFunction = "ease" transition = "slide-up">
            {
                (styles) => 
                    <Center 
                        style = {{ ...styles, margin: '1rem 0 0 0' }}
                    > 
                        <Notification
                            style = {{ width: 'fit-content' }}
                            color = "red"
                            title = { notificationMessage }
                            onClose = { () => setShowAddNotification(false) }
                        />
                    </Center>
            }
        </Transition>
    )
}

export default AddItemNotification