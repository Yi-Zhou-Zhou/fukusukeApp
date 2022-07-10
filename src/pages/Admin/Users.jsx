import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";
import { usePagination, useSortBy, useTable } from "react-table";

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

const Table = ({ users }) => {
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
		],
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
		state: { pageIndex, pageSize },
	} = useTable(
		{ columns, data: users, initialState: { pageSize: 10 } },
		useSortBy,
		usePagination
	);

	return (
		<>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th
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
				<tfoot>
					{footerGroups.map((footerGroup) => (
						<tr {...footerGroup.getFooterGroupProps()}>
							{footerGroup.headers.map((column) => (
								<td {...column.getFooterProps()}>
									{column.render("Footer")}
								</td>
							))}
						</tr>
					))}
				</tfoot>
			</table>
			<div>
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{"<<"}
				</button>
				<button
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					{"<"}
				</button>
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{">"}
				</button>
				<button
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					{">>"}
				</button>
			</div>
			<div>
				<span>
					Pagina{" "}
					<strong>
						{pageIndex + 1}
						{" of "}
						{pageCount}
					</strong>
				</span>
				<span>
					Mostrando{" "}
					<strong>
						{pageSize}
						{" de "}
						{rows.length}
					</strong>
				</span>
				<span>
					<select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={30}>30</option>
						<option value={40}>40</option>
						<option value={50}>50</option>
					</select>
				</span>
			</div>
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

	return (
		<>
			{filterName}
			<Table users={filteredUsers} />
		</>
	);
}

export default Users;
