import React, { useState } from 'react'
import { useParams } from "react-router-dom"

import ItemCard from './ItemCard';

import { Card, Grid } from '@mantine/core';

import styled from 'styled-components'
import CreateMenuModal from './CreateMenuModal';

const myCard = ({ className, children }) => {
    return(
        <Card className = { className }>
            { children }
        </Card>
    )
}

const MyCardStyled = styled(myCard)`
    position: relative;
    margin: 1rem;
    width: 18rem;
    padding: 0;
    border: 3px dashed black;
    background-color: transparent;
`

const AddMenuButton = styled.button`
    height: 100%;
    width: 100%;
    background-color: transparent;
    border: 0;
    cursor: pointer;

    &:after {
        position: absolute;
        top: calc(50% - .25rem);
        left: calc(50% - 2.5rem);
        height: .5rem;
        width: 5rem;
 
        background-color: black;
        content: "";
        z-index: 0;
    }

    &:before {
        position: absolute;
        top: calc(50% - 2.5rem);
        left: calc(50% - .25rem);
        height: 5rem;
        width: .5rem;
 
        background-color: black;
        content: "";
        z-index: 0;
    }
`

const Stock = ({ menus }) => {
    const [initialMenus, setInitialMenus] = useState(menus)
    const [addModalOpened, setAddModalOpened] = useState(false)

    const currentSection = useParams().selectedCategory
    const menusToShow = !currentSection
        ? initialMenus
        : menus.filter(menu => menu.type === currentSection)

    const byName = (menu1, menu2) => menu1.name.localeCompare(menu2.name)
    const byCategory = (menu1, menu2) => menu1.type.localeCompare(menu2.type)

    const byCategoryThenName = (menu1, menu2) => 
        byCategory(menu1, menu2) || byName(menu1, menu2)

    return  (
        <>
            <CreateMenuModal 
                addModalOpened = { addModalOpened }
                setAddModalOpened = { setAddModalOpened }
                initialMenus = { initialMenus }
                setInitialMenus = { setInitialMenus }
            />
            <Grid>
                <MyCardStyled>
                    <AddMenuButton onClick = { () => setAddModalOpened(true) }>  </AddMenuButton>
                </MyCardStyled>
                {
                    menusToShow.sort(byCategoryThenName).map(menu =>
                        <ItemCard key = { menu.name } menu = { menu } initialMenus = { initialMenus } setInitialMenus = { setInitialMenus } />
                    )
                }
            </Grid>
        </>
    )
}

export default Stock