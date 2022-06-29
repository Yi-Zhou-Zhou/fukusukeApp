import React, { useState } from 'react'
import { useParams } from "react-router-dom"

import ItemCard from './ItemCard';

const Stock = ({ menus }) => {
    const [initialMenus, setInitialMenus] = useState(menus)

    const currentSection = useParams().selectedCategory
    const menusToShow = !currentSection
        ? initialMenus
        : menus.filter(menu => menu.type === currentSection)

    return(
        <div className='item-display'>
            {
                menusToShow.map(menu =>
                    <ItemCard key = { menu.id } menu = { menu } initialMenus = { initialMenus } setInitialMenus = { setInitialMenus } />
                )
            }
        </div>
    )
}

export default Stock