import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {UserContext} from '../../context/user/UserContext'
import { Table } from '@mantine/core'

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

function Users() {
  const selectedCategory = useParams().selectedCategory;
  const filterName = mapRouteToFilterName(selectedCategory);
  const {users} = useContext(UserContext);

  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (filterName)
      setFilteredUsers(users.filter(user => user.role === filterName));
    else
      setFilteredUsers(users);
  }, [users, filterName]);

  const rows = filteredUsers.map(user => {
    return (
      <tr key={user._id}>
        <td>{user.email}</td>
        <td>{user.name}</td>
        <td>{user.run}</td>
        <td>{user.phone}</td>
        <td>{user.role}</td>
      </tr>
    )
  });

  return (
    <>
      {filterName}
      <Table>
        <thead>
          <tr>
            <th>Correo</th>
            <th>Nombre</th>
            <th>Run</th>
            <th>Celular</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </>
  )
}

export default Users