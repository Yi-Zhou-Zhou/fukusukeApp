import React from 'react'
import {useParams} from 'react-router-dom'

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

  return (
    <div>{filterName}</div>
  )
}

export default Users