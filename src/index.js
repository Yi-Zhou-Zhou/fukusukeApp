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
    picture: "https://images.unsplash.com/photo-1615361200141-f45040f367be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
  },
  {
    id: 2,
    name: "Tabla de 30 piezas",
    price: 11200,
    stock: 0,
    picture: "https://images.unsplash.com/photo-1615361200098-9e630ec29b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
  },
  {
    id: 3,
    name: "Tabla de 40 piezas",
    price:  13400,
    stock: 1,
    picture: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
  },
  {
    id: 4,
    name: "Tabla de 50 piezas",
    price: 15600,
    stock: 1,
    picture: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 5,
    name: "Tabla de 60 piezas",
    price: 17800,
    stock: 1,
    picture: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
  }
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App menus = { menus }/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
