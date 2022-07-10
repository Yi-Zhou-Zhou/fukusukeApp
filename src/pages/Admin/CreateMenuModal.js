import React, { useContext, useState } from 'react'

import { Modal } from '@mantine/core'

import styled from 'styled-components'


import { ProductContext } from '../../context/product/ProductContext'

const MyGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
`

const CreateMenuModal = ({ addModalOpened, setAddModalOpened, initialMenus, setInitialMenus }) => {
    const [newMenuName, setNewMenuName] = useState("")
    const handleNewMenuNameChange = (event) => {
        setNewMenuName(event.target.value)
    }

    const [newMenuPrice, setNewMenuPrice] = useState("")
    const handleNewMenuPriceChange = (event) => {
        setNewMenuPrice(event.target.value)
    }

    const [newMenuType, setNewMenuType] = useState("tablas")
    const handleNewMenuTypeChange = (event) => {
        setNewMenuType(event.target.value)
    }

    const [nameError, setNameError] = useState(false)
    const [priceError, setPriceError] = useState(false)

    const {addProduct} = useContext(ProductContext)
    const handleNewMenuSubmit = (event) => {
        event.preventDefault()

        if(newMenuName === ""){
            setNameError(true)
        }

        if(newMenuPrice === ""){
            setPriceError(true)
        }

        if(newMenuName !== "" && newMenuPrice !== "")
        {
            const newEl = {
                name: newMenuName,
                price: Number(newMenuPrice),
                stock: 1,
                category: newMenuType,
                picture: "https://images.unsplash.com/photo-1615361200141-f45040f367be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
            }
            setNameError(false)
            setPriceError(false)
            setAddModalOpened(false)

            //Add element function from Context
            addProduct(newEl)

            
        }
    }

    return(
        <Modal
            opened = { addModalOpened }
            onClose = {() => setAddModalOpened(false)}
            title = "Agregar un nuevo menu"
        >
            <form onSubmit = { handleNewMenuSubmit }>
                <MyGrid>
                    <label>
                        Nombre:
                    </label>
                    <div>
                        <input
                            style = {{ width: '100%' }}
                            type = "text"
                            value = { newMenuName }
                            onChange = { handleNewMenuNameChange }
                        />
                        {
                            nameError
                            ? <p style = {{ color: "red" }}> Debe ingresar el nombre del menú </p>
                            : null
                        }
                    </div>

                    <label>
                        Precio:
                    </label>

                    <div>
                        <input
                            style = {{ width: '100%' }}
                            type = "text"
                            value = { newMenuPrice }
                            onChange = { handleNewMenuPriceChange }
                        />
                        {
                            priceError
                            ? <p style = {{ color: "red" }}> Debe ingresar el precio del menú </p>
                            : null
                        }
                    </div>

                    <label>
                        Tipo de menu:
                    </label>
                    <select
                        value = { newMenuType }
                        onChange = { handleNewMenuTypeChange }
                    >
                        <option value = "tablas"> Tablas </option>
                        <option value = "entradas"> Entradas </option>
                        <option value = "gohan"> Gohan </option>
                        <option value = "ramen"> Ramen </option>
                    </select>

                </MyGrid>

                <button style = {{ marginTop: '1rem' }} type = "submit">
                    Agregar
                </button>
            </form>
        </Modal>
    )
}

export default CreateMenuModal