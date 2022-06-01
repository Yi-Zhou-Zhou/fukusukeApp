import React, { useState } from 'react'

const StockSlider = ({ stockStatus }) => {
    const [checkedState, setCheckedState] = useState(stockStatus)

    const handleStockChange = () => {
        if (checkedState === "") {
            setCheckedState("checked")
        } else {
            setCheckedState("")
        }
    }

    return(
        <label class="switch">
            <input type="checkbox" checked={ checkedState } onClick={handleStockChange}/>
            <span class="slider round"></span>
        </label>
    )
}

export default StockSlider