import React, { useContext, useEffect, useState, useMemo } from 'react'
import {useParams} from 'react-router-dom'
import {UserContext} from '../../context/user/UserContext'
import { useTable } from 'react-table'

const mapRouteToFilterName = (route) => {
  switch (route) {
    case 'clientes':
      return 'client'
    case 'administradores':
      return 'admin'
    case 'cajeros':
      return 'cashier'
    case 'repartidores':
      return 'delivery'
    default:
      return null
  }
}

const Table = ({ users }) => {
  const columns = useMemo(() => (
    [
      {
        Header: 'Correo',
        accessor: 'email',
      },
      {
        Header: 'Nombre',
        accessor: 'name',
      },
      {
        Header: 'Run',
        accessor: 'run',
      },
      {
        Header: 'Celular',
        accessor: 'phone',
      },
      {
        Header: 'Rol',
        accessor: 'role',
      }
    ]
  ), [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: users })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        }
        )}
      </tbody>
      <tfoot>
        {footerGroups.map(footerGroup => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map(column => (
              <td {...column.getFooterProps()}>{column.render('Footer')}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  )
}

function Users() {
  const selectedCategory = useParams().selectedCategory;
  const filterName = mapRouteToFilterName(selectedCategory);
  const {users} = useContext(UserContext);

  const filteredUsers = useMemo(() => {
    if (filterName) {
      return users.filter(user => user.role === filterName)
    }
    return users
  }, [users, filterName])

  return (
    <>
      {filterName}
      <Table users={filteredUsers} />
    </>
  )
}

export default Users;