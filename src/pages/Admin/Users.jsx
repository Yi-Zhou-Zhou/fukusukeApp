import React from 'react'
import {useParams} from 'react-router-dom'

function Users() {
  const selectedCategory = useParams().selectedCategory;

  return (
    <div>{selectedCategory}</div>
  )
}

export default Users