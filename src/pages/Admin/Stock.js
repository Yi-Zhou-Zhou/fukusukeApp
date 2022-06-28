import React from 'react'
import { useParams } from "react-router-dom"

import ItemCard from './ItemCard';

const Stock = ({ menus }) => {
    const currentSection = useParams().selectedCategory
    const menusToShow = !currentSection
        ? menus
        : menus.filter(menu => menu.type === currentSection)

    return(
        <div className='item-display'>
            {
                menusToShow.map(menu =>
                    <ItemCard key = { menu.id } menu = { menu } />
                )
            }
        </div>
    )
}

export default Stock