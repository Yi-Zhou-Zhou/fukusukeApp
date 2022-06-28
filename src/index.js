import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Datos dummy para probar hasta tener base de datos
const menus = [
  {
    id: 1,
    name: "Tabla de 20 piezas",
    price: 9000,
    stock: 0,
    type: "tablas",
    picture: "https://images.unsplash.com/photo-1615361200141-f45040f367be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
  },
  {
    id: 2,
    name: "Tabla de 30 piezas",
    price: 11200,
    stock: 0,
    type: "tablas",
    picture: "https://images.unsplash.com/photo-1615361200098-9e630ec29b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
  },
  {
    id: 3,
    name: "Tabla de 40 piezas",
    price:  13400,
    stock: 1,
    type: "tablas",
    picture: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
  },
  {
    id: 4,
    name: "Tabla de 50 piezas",
    price: 15600,
    stock: 1,
    type: "tablas",
    picture: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 5,
    name: "Tabla de 60 piezas",
    price: 17800,
    stock: 1,
    type: "tablas",
    picture: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
  },
  {
    id: 6,
    name: "Koroke",
    price: 4500,
    stock: 0,
    type: "entradas",
    picture: "https://image.shutterstock.com/image-photo/broccoli-cream-croquette-japanese-style-600w-260895305.jpg"
  },
  {
    id: 7,
    name: "Gyosas",
    price: 4500,
    stock: 1,
    type: "entradas",
    picture: "https://images.unsplash.com/photo-1588182728399-e8f2df121744?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 8,
    name: "Camaron apanado",
    price: 4900,
    stock: 1,
    type: "entradas",
    picture: "https://images.unsplash.com/photo-1579887829114-282b4fa31072?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 9,
    name: "Gohan de pollo teriyaki",
    price: 6000,
    stock: 1,
    type: "gohan",
    picture: "https://media.istockphoto.com/photos/traditional-breakfast-of-japan-natt-gohan-picture-id174270968"
  },
  {
    id: 10,
    name: "Takikomi gohan",
    price: 7000,
    stock: 1,
    type: "gohan",
    picture: "https://media.istockphoto.com/photos/japanese-food-takikomi-gohan-boiled-rice-picture-id1202391123"
  },
  {
    id: 11,
    name: "Ramen 1",
    price: 12000,
    stock: 0,
    type: "ramen",
    picture: "https://images.unsplash.com/photo-1617421753170-46511a8d73fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
  },
  {
    id: 12,
    name: "Ramen 2",
    price: 12000,
    stock: 1,
    type: "ramen",
    picture: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 13,
    name: "Ramen 3",
    price: 12000,
    stock: 1,
    type: "ramen",
    picture: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
  }
]

const users = [
  {
    id: 1,
    name: "Pedro Yáñez",
    phone: "993147044",
    address: "Mercedes 761, Valparaíso",
  },
  {
    id: 2,
    name: "Axel Arroyo",
    phone: "912345678",
    address: "Siete Hermanas, Viña del Mar",
  },
  {
    id: 3,
    name: "Yi Zhou",
    phone: "987654321",
    address: "Quillota, Viña del Mar"
  }
]

const orders = [
  {
    id: 1,
    orderedBy: 1,
    orderDate: "2022/06/14 10:00:00",
    content: [1,2,3],
    deliveryAddress: "Avenida Francia, Valparaíso",
  },
  {
    id: 2,
    orderedBy: 2,
    orderDate: "2022/06/14 10:04:32",
    content: [3, 5],
    deliveryAddress: "Pedro Montt, Valparaíso"
  },
  {
    id: 3,
    orderedBy: 3,
    orderDate: "2022/06/14 10:06:17",
    content: [11],
    deliveryAddress: "Avenida Francia, Valparaíso"
  },
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App menus = { menus } orders = { orders } users = { users } />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();