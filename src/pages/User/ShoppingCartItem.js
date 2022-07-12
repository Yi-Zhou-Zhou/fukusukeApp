import React, { useState, useEffect } from 'react'

import { Button, Text } from '@mantine/core'

import stringifyPrice from '../../functions/common/stringifyPrice';

import { AiOutlineDelete, AiOutlineMinus, AiOutlineArrowDown } from 'react-icons/ai'

const ShoppingCartItem = ({ product, handleDeleteProduct }) => {
    const [productOpened, setProductOpened] = useState(false)

    return(
        <div>
            <div 
                style = {{
                    display: 'flex',
                    margin: '1rem 0 0 0',
                    alignItems: 'center'
                }}
            >
                <Button
                    onClick = { () => setProductOpened(!productOpened) }
                    compact
                    style = {{
                        background: 'transparent',
                        cursor: 'pointer',
                        margin: '0 1rem 0 0',
                    }}>

                    { 
                        productOpened
                        ? <AiOutlineMinus/> 
                        : <AiOutlineArrowDown/>
                    }

                </Button>

                <div
                    style = {{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text
                        style = {{
                            display: 'inline-block'
                        }}
                    >
                        { product.cartQuantity } x { product.name }
                    </Text>

                    <div
                        style = {{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style = {{
                                display: 'inline-block',
                            }}
                        >
                            { stringifyPrice( Math.floor(product.price) * product.cartQuantity) }
                        </Text>

                        <Button
                            compact
                            style = {{ 
                                backgroundColor: 'transparent',
                                border: 0
                            }}
                            onClick = { () => handleDeleteProduct(product._id) }
                        >
                            <AiOutlineDelete/>
                        </Button>
                    </div>
                </div>
            </div>

            {
                productOpened
                ? 
                    <Text style = {{ margin: '1rem 0 0 2rem' }}> { product.description } </Text>
                :   null
            }
        </div>
    )
}

export default ShoppingCartItem