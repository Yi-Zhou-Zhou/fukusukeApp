import React, { useState } from 'react'

import { Switch } from '@mantine/core'

const StockSlider = ({ stockState }) => {
    const [switchState, setSwitchState] = useState( stockState )

    const handleStockChange = () => {
        if (switchState === 0) {
            setSwitchState(1)
        } else {
            setSwitchState(0)
        }
    }

    return(
        <Switch
            label = "stock"
            color = "red"
            size = "md"
            checked = { switchState }
            onChange = { handleStockChange }
        />
    )
}

export default StockSlider