import React from "react";

import { Center, Notification, Transition } from "@mantine/core";

const AddItemNotification = ({ notificationMessage, showAddNotification, setShowAddNotification }) => {
    return(
        <Transition 
            mounted = { showAddNotification }
            duration = {250}
            timingFunction = "ease"
            transition = "slide-up"
        >
            {
                (styles) => 
                    <Center 
                        style = {{ 
                            ...styles, 
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginBottom: '2rem'
                        }}
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