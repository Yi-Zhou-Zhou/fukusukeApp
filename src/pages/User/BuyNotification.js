import React from "react";

import { Button, Modal, Text, Transition } from "@mantine/core";

const BuyNotification = ({ showBuyNotification, setShowBuyNotification }) => {
    return(
        <Transition
            mounted = { showBuyNotification }
            transition = "slide-up"
            duration = { 300 }
            timingFunction = "ease"
        >
            {
                (styles) => 
                    <Modal
                        style = { styles }
                        opened = { showBuyNotification }
                        onClose = { () => setShowBuyNotification(false) }
                        title = "¡Su pedido fué realizado!"
                        styles = {{
                            title: {
                                fontSize: '1.25rem'
                            }
                        }}
                    >
                        <Text>
                            Por favor, acérquese al mesón del restaurant para pagar.

                            Luego, podrá ver el estado del pedido en la pestaña de pedidos.
                        </Text>

                        <div
                            style = {{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <Button
                                onClick = { () => setShowBuyNotification(false) }
                            >
                                ¡OK!
                            </Button>
                        </div>
                    </Modal>
            }
        </Transition>
    )
}

export default BuyNotification