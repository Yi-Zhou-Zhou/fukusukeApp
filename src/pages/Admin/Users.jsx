import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";
import { usePagination, useSortBy, useTable, useFilters } from "react-table";
import { Table, Button, Select, Group, TextInput } from "@mantine/core";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
	HiChevronDoubleLeft,
	HiChevronDoubleRight,
	HiChevronLeft,
	HiChevronRight,
} from "react-icons/hi";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

const mapRouteToFilterName = (route) => {
	switch (route) {
		case "clientes":
			return "client";
		case "administradores":
			return "admin";
		case "cajeros":
			return "cashier";
		case "repartidores":
			return "delivery";
		default:
			return null;
	}
};

const UsersTable = ({ users, handleEdit, handleDelete }) => {
	const columns = useMemo(
		() => [
			{
				Header: "Correo",
				accessor: "email",
			},
			{
				Header: "Nombre",
				accessor: "name",
			},
			{
				Header: "Run",
				accessor: "run",
			},
			{
				Header: "Celular",
				accessor: "phone",
			},
			{
				Header: "Rol",
				accessor: "role",
			},
			{
				Header: "Editar",
				accessor: "EditButton",
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ row }) => (
					<Button
						onClick={() => handleEdit(row.original._id)}
						leftIcon={<AiFillEdit />}
						variant="subtle"
					/>
				),
			},
			{
				Header: "Eliminar",
				accessor: "DeleteButton",
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ row }) => (
					<Button
						onClick={() => handleDelete(row.original._id)}
						leftIcon={<AiFillDelete />}
						variant="subtle"
					/>
				),
			},
		],
		[]
	);

	function DefaultColumnFilter({
		column: { filterValue, preFilteredRows, setFilter },
	}) {
		const count = preFilteredRows.length;

		return (
			<TextInput
				value={filterValue || ""}
				onChange={(e) => {
					setFilter(e.target.value || undefined);
				}}
				placeholder={`Buscar ${count} ${
					count === 1 ? "registro" : "registros"
				}`}
			/>
		);
	}

	const defaultColumn = useMemo(
		() => ({
			Filter: DefaultColumnFilter,
		}),
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		rows,
		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		canFilter,
		state: { pageIndex, pageSize },
	} = useTable(
		{ columns, data: users, defaultColumn, initialState: { pageSize: 10 } },
		useFilters,
		useSortBy,
		usePagination
	);

	return (
		<>
			<Table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th>
									<div
										{...column.getHeaderProps(
											column.getSortByToggleProps()
										)}
									>
										{column.render("Header")}
										<span>
											{column.isSorted
												? column.isSortedDesc
													? " 🔽"
													: " 🔼"
												: ""}
										</span>
									</div>
									<div>
										{column.canFilter
											? column.render("Filter")
											: null}
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</Table>
			<Group position="center" style={{ marginTop: "15px" }}>
				<Button
					onClick={() => gotoPage(0)}
					variant="subtle"
					leftIcon={<HiChevronDoubleLeft />}
					disabled={!canPreviousPage}
				/>
				<Button
					onClick={() => previousPage()}
					variant="subtle"
					leftIcon={<HiChevronLeft />}
					disabled={!canPreviousPage}
				/>
				<Button
					onClick={() => nextPage()}
					variant="subtle"
					leftIcon={<HiChevronRight />}
					disabled={!canNextPage}
				/>
				<Button
					onClick={() => gotoPage(pageCount - 1)}
					variant="subtle"
					leftIcon={<HiChevronDoubleRight />}
					disabled={!canNextPage}
				/>
			</Group>
			<Group position="center" style={{ marginTop: "15px" }}>
				<span>
					Pagina{" "}
					<strong>
						{pageIndex + 1}
						{" de "}
						{pageCount}
					</strong>
				</span>
				<span style={{ marginLeft: "10px" }}>
					Mostrando{" "}
					<strong>
						{pageSize}
						{" de "}
						{rows.length}
					</strong>
				</span>
				<span>
					<Select
						value={pageSize}
						placeholder="10"
						onChange={(value) => setPageSize(Number(value))}
						style={{ marginLeft: "10px" }}
						data={["10", "20", "30", "40", "50"]}
					/>
				</span>
			</Group>
		</>
	);
};

function Users() {
	const selectedCategory = useParams().selectedCategory;
	const filterName = mapRouteToFilterName(selectedCategory);
	const { users } = useContext(UserContext);

	const filteredUsers = useMemo(() => {
		if (filterName) {
			return users.filter((user) => user.role === filterName);
		}
		return users;
	}, [users, filterName]);

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [userId, setUserId] = useState(null);

	const handleEdit = (_id) => {
		setUserId(_id);
		setEditModalOpen(true);
	};

	const handleDelete = (_id) => {
		setUserId(_id);
		setDeleteModalOpen(true);
	};

	return (
		<>
			{editModalOpen && (
				<EditUser
					_id={userId}
					open={editModalOpen}
					setOpen={setEditModalOpen}
				/>
			)}
			{deleteModalOpen && (
				<DeleteUser
					_id={userId}
					open={deleteModalOpen}
					setOpen={setDeleteModalOpen}
				/>
			)}
			<UsersTable
				users={filteredUsers}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
		</>
	);
}

export default Users;
