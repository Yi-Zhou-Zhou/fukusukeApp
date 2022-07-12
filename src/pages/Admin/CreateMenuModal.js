import React, { useContext, useState } from 'react'

import { Modal } from '@mantine/core'

import styled from 'styled-components'

import { Select,Input, Button, Textarea, NumberInput} from '@mantine/core'
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

    const [newMenuPrice, setNewMenuPrice] = useState(0)

    const [newMenuType, setNewMenuType] = useState("tablas")


    const [newMenuStock, setNewMenuStock] = useState(0)
    const [newMenuDescription, setNewMenuDescription] = useState("")
    const handleNewMenuDescriptionChange = (event) => {
        setNewMenuDescription(event.target.value)
    }

    const [newMenuPicture, setNewMenuPicture] = useState("")
    const handleNewMenuPictureChange = (event) => {
        setNewMenuPicture(event.target.value)
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
                stock: Number(newMenuStock),
                description: newMenuDescription,
                category: newMenuType,
                picture: newMenuPicture,
            }
            setNameError(false)
            setPriceError(false)
            setAddModalOpened(false)
            
            //Add element function from Context
            addProduct(newEl)
            setNewMenuName = ""
            setNewMenuDescription = ""
            setNewMenuPicture = ""
            setNewMenuStock = 0
            setNewMenuPrice = 0
            setNewMenuType = "tablas"
            
        }
    }

    return(
        <Modal
            opened = { addModalOpened }
            onClose = {() => setAddModalOpened(false)}
            title = "Agregar un nuevo producto"
            styles={{
				title: {
					fontSize: "26px",
					marginBottom: "1rem",
					letterSpacing: "1.2px",
					fontWeight: "600",
				},
			}}
        >
            <form onSubmit = { handleNewMenuSubmit }>
                <MyGrid>
                    <label>
                        Nombre:
                    </label>
                    <div>
                            <Input
                                placeholder="Nombre del producto"
                                type={"text"}
                                value={newMenuName}
                                onChange = { handleNewMenuNameChange }
                        />
                        {
                            nameError
                            ? <p style = {{ color: "red" }}> Debe ingresar el nombre del producto </p>
                            : null
                        }
                    </div>

                    <label>
                        Precio:
                    </label>

                    <div>
                            <NumberInput
                                placeholder="Precio del producto"
                                type={"text"}
                                defaultValue={0}
                                value={newMenuPrice}
                                onChange = { (val) => {setNewMenuPrice(val)} }
                        />
                        {
                            priceError
                            ? <p style = {{ color: "red" }}> Debe ingresar el precio del producto! </p>
                            : null
                        }
                    </div>
                    <label>
                        Stock:
                    </label>

                    <div>
                            <NumberInput
                                placeholder="Stock del producto"
                                value={newMenuStock}
                                defaultValue={0}
                                onChange = { (val) => {setNewMenuStock(val)} }
                                required
                        />
                        {
                            priceError
                            ? <p style = {{ color: "red" }}> Debe ingresar el precio del producto! </p>
                            : null
                        }
                    </div>
                    
                    <label>
                        Descripción
                    </label>
                    <div>
                            <Textarea
                                placeholder="Descripción del producto"
                                type={"text"}
                                value={newMenuDescription}
                                onChange = { handleNewMenuDescriptionChange}
                        />
                        {
                            nameError
                            ? <p style = {{ color: "red" }}> Debe ingresar la Descripción del producto </p>
                            : null
                        }
                    </div>
                    <label>
                        Tipo de menu:
                    </label>
                    <Select
                        placeholder="Escoja tipo de menú"
                        onChange = {setNewMenuType}
                        value={newMenuType}
                        data={[
                            { value: 'tablas', label: 'Tablas' },
                            { value: 'entradas', label: 'Entradas' },
                            { value: 'gohan', label: 'Gohan' },
                            { value: 'ramen', label: 'Ramen' },
                        ]}
                    />
                    <label>
                        Imágen
                    </label>

                    <div>
                            <Input
                                placeholder="URL de la imágen"
                                type={"text"}
                                value={newMenuPicture}
                                onChange = { handleNewMenuPictureChange }
                        />
                        {
                            priceError
                            ? <p style = {{ color: "red" }}> Debe ingresar el precio del producto! </p>
                            : null
                        }
                    </div>

                </MyGrid>
                
                <Button       styles={(theme) => ({
        root: {
          border: 0,
          height: 36,
          marginTop: "2rem",
            backgroundColor: "#bf0202",

          '&:hover': {
            backgroundColor: "#a30202",
          },
                }})} type="submit" color={"#bf0202"}>
                    Agregar
                    </Button>
            </form>
        </Modal>
    )
}

export default CreateMenuModal