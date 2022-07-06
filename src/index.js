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
    content: ["62c4f0989f423e3c21ba35ca", "62c4f0f69f423e3c21ba35cb"],
    deliveryAddress: "Avenida Francia, Valparaíso",
  },
  {
    id: 2,
    orderedBy: 2,
    orderDate: "2022/06/14 10:04:32",
    content: ["62c4f0989f423e3c21ba35ca"],
    deliveryAddress: "Pedro Montt, Valparaíso"
  },
  {
    id: 3,
    orderedBy: 3,
    orderDate: "2022/06/14 10:06:17",
    content: ["62c4f0989f423e3c21ba35ca", "62c4f0f69f423e3c21ba35cb"],
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