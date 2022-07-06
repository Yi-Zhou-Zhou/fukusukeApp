import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import ItemCard from "./ItemCard";

import { Card, Grid } from "@mantine/core";

import styled from "styled-components";
import CreateMenuModal from "./CreateMenuModal";

import { productApi } from "../../api/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/product/ProductContext";

const myCard = ({ className, children }) => {
	return <Card className={className}>{children}</Card>;
};

const MyCardStyled = styled(myCard)`
	position: relative;
	margin: 1rem;
	width: 18rem;
	padding: 0;
	border: 3px dashed black;
	background-color: transparent;
`;

const AddMenuButton = styled.button`
	height: 100%;
	width: 100%;
	background-color: transparent;
	border: 0;
	cursor: pointer;

	&:after {
		position: absolute;
		top: calc(50% - 0.25rem);
		left: calc(50% - 2.5rem);
		height: 0.5rem;
		width: 5rem;

		background-color: black;
		content: "";
		z-index: 0;
	}

	&:before {
		position: absolute;
		top: calc(50% - 2.5rem);
		left: calc(50% - 0.25rem);
		height: 5rem;
		width: 0.5rem;

		background-color: black;
		content: "";
		z-index: 0;
	}
`;

const Stock = () => {
	const navigate = useNavigate();

	const { products, setProducts } = useContext(ProductContext);

	const [addModalOpened, setAddModalOpened] = useState(false);

	const currentSection = useParams().selectedCategory;
	const menusToShow = !currentSection
		? products
		: products.filter((product) => product.category === currentSection);

	const byName = (product1, product2) =>
		product1.name.localeCompare(product2.name);
	const byCategory = (product1, product2) =>
		product1.category.localeCompare(product2.category);

	const byCategoryThenName = (product1, product2) =>
		byCategory(product1, product2) || byName(product1, product2);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(`${productApi}/`, {
					headers: {
						"x-auth-token": localStorage.getItem("token"),
					},
				});
				setProducts(response.data);
			} catch (error) {
				// redirect to home
				navigate("/");
			}
		};
		fetchProducts();
	}, []);

	return (
		<>
			<CreateMenuModal
				addModalOpened={addModalOpened}
				setAddModalOpened={setAddModalOpened}
			/>
			<Grid>
				<MyCardStyled>
					<AddMenuButton onClick={() => setAddModalOpened(true)}>
						{" "}
					</AddMenuButton>
				</MyCardStyled>
				{menusToShow.sort(byCategoryThenName).map((product) => (
					<ItemCard key={product.name} id={product._id} />
				))}
			</Grid>
		</>
	);
};

export default Stock;
