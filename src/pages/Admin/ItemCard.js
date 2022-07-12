import React, { useContext, useState } from "react";
	 
import { ProductContext } from "../../context/product/ProductContext";


import { Button, Card, Group, Image, Text, Divider} from "@mantine/core";
import { AiFillCloseCircle } from "react-icons/ai";
import styled from "styled-components";

import stringifyPrice from "../../functions/common/stringifyPrice";


// "styled-component" para un botón que borra tarjetas
const DeleteButton = styled.button`
	position: absolute;
	top: -12px;
	right: -6px;
	width: 2rem;
	height: 2rem;

	background-color: transparent;
	content: "";
	color: red;
	border: 0;
	cursor: pointer;
	z-index: 99;

	/* Se crea un rectángulo de color blanco detrás del ícono para que actúe de fondo */
	&:before {
		position: absolute;
		top: 5px;
		right: 6px;
		width: 1rem;
		height: 1.3rem;

		background-color: white;
		content: "";
		z-index: -1;
	}
`;

// "styled-component" para el ícono dentro de "DeleteButton"
const StyledDeleteIcon = styled(AiFillCloseCircle)`
	font-size: 2rem;
`;

// "styled-component" para el contenedor de la Card
const CardContainer = styled.div`
	margin: 1rem;
	position: relative;

	width: 18rem;
`;

// "styled-component" para grupos dentro de Cards
const CardGroup = ({ className, children }) => {
	return (
		<Group className={className} position="apart" align="center">
			{children}
		</Group>
	);
};

const StyledCardGroup = styled(CardGroup)`
	margin: 1rem 0;
`;

const ItemCard = ({ _id }) => {
	const { products, updateProduct, deleteProduct} =
		useContext(ProductContext);
	
	const product = products.find((product) => product._id === _id);
	const [editing, setEditing] = useState(false);
	const [cardTitle, setCardTitle] = useState(product.name);
	const [cardPrice, setCardPrice] = useState(product.price);
	const [cardStock, setCardStock] = useState(product.stock);
	const [cardDescription, setCardDescription] = useState(product.description);

	const initialValues = {
		name: product.name,
		price: product.price, 
		stock: product.stock, 
		description: product.description,
	}
	const handleDelete = () => {
		// delete function from Context 
		deleteProduct(_id)
		setEditing(false)
	
	};
	console.log("xd", initialValues)

	const handleEdit = () => {
		editing ? setEditing(false) : setEditing(true);
	};
	const handleTitleChange = (event) => {
		setCardTitle(event.target.value);
	};

	const handlePriceChange = (event) => {
		setCardPrice(event.target.value);
	};

	const handleStockChange = event => {
		setCardStock(event.target.value);
	}

	const handleDescriptionChange = event => {
		setCardDescription(event.target.value);
	}

	const handleSubmit = event => {
		event.preventDefault();
		const updatedProduct = {...product, name:cardTitle, price: cardPrice, stock: cardStock, description: cardDescription}
		updateProduct(updatedProduct)
		setEditing(false);
		initialValues.name = cardTitle;
		initialValues.price = cardPrice;
		initialValues.stock = cardStock;
		initialValues.description = cardDescription;
	}

	const handleCancel = event => {
		event.preventDefault();
		setCardTitle(initialValues.name);
		setCardPrice(initialValues.price);
		setCardDescription(initialValues.description);
		setCardStock(initialValues.stock);
		setEditing(false);
	}
	return (
		<CardContainer>
			{editing ? (
				<DeleteButton onClick={handleDelete}>
					<StyledDeleteIcon />
				</DeleteButton>
			) : null}

			<Card shadow="sm" height="m">
				<Card.Section>
					<Image
						src={product.picture}
						alt="Fotografía de sushi"
						height={160}
					/>
				</Card.Section>

				<StyledCardGroup>
				{editing ? (
						<form onSubmit={handleSubmit}>
							
							<input
								name="titleInput"
								type="text"
								value={cardTitle}
								onChange={handleTitleChange}
								style={{ width: "11rem", backgroundColor: "#f8fcbb", border: "none", borderRadius: "20px", textAlign: "center"}}
							/>
						</form>
					) : (
						<Text weight={600}>{cardTitle}</Text>
					)}

				{editing ? (
						<form onSubmit={handleSubmit}>

							<input
								name="priceInput"
								type="text"
								value={cardPrice}
								onChange={handlePriceChange}
								style={{ width: "3rem",backgroundColor: "#f8fcbb", border: "none", borderRadius: "20px", textAlign: "center"}}
							/>
						</form>
					) : (
						<Text weight={600}>{stringifyPrice(cardPrice)}</Text>
					)}
				</StyledCardGroup>

				<StyledCardGroup>
						
				{!editing ?  
					<Button variant="light" color="blue" onClick={handleEdit}>
						Editar
					</Button> : 
					<div style={{display: "flex", gap: "0.4rem"}}>
					<Button variant="light" color="blue" onClick={handleSubmit}>
						Aceptar
					</Button> 
					<Button variant="light" color="red" onClick={handleCancel}>
						Cancelar
					</Button>
				</div>}
					{editing ? (
						<form onSubmit={handleSubmit} style={{display: "flex", gap: "0.3rem"}}>
							<input
								name="stockInput"
								type="text"
								value={cardStock}
								onChange={handleStockChange}
								style={{ width: "3rem", backgroundColor: "#f8fcbb", border: "none", borderRadius: "20px", textAlign: "center"}}
							/>
						</form>
					) : <Text>Stock: {product.stock}</Text>}
				</StyledCardGroup>
				<Divider my="xs" label="Descripción" labelPosition="center" />
				{editing ? 
						<form onSubmit={handleSubmit} style={{display: "flex", gap: "0.3rem"}}>
							<textarea
								name="descriptionInput"
								type="text"
								value={cardDescription}
								onChange={handleDescriptionChange}
								style={{ width: "100%", backgroundColor: "#f8fcbb	", border: "none", textAlign: "center"}}
							/>
						</form> : <Text size="xs" >{product.description}</Text>}
				
			</Card>
		</CardContainer>
	);
};

export default ItemCard;
