import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

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
    content: ["62cdd4a4227a3d50d00eed8d", "62cdd724348a80c4273877b5"],
    deliveryAddress: "Avenida Francia, Valparaíso",
  },
  {
    id: 2,
    orderedBy: 2,
    orderDate: "2022/06/14 10:04:32",
    content: ["62cdd724348a80c4273877b5"],
    deliveryAddress: "Pedro Montt, Valparaíso"
  },
  {
    id: 3,
    orderedBy: 3,
    orderDate: "2022/06/14 10:06:17",
    content: ["62cdd7fb348a80c4273877c3", "62cddaec348a80c4273877cc"],
    deliveryAddress: "Avenida Francia, Valparaíso"
  },
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App orders = { orders } users = { users } />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();