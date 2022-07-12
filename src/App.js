import { useState } from 'react';

import './App.css';

import { 
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

// User view
import Catalog from './pages/User/Catalog';
import Greeting from './pages/Home/Greeting';
import Home from './pages/Home/Home';
import Orders from './pages/User/Orders'

// Admin view
import AdminHome from './pages/Admin/AdminHome'
import AdminGreeting from './pages/Admin/AdminGreeting'
import AdminOrders from './pages/Admin/AdminOrders';
import Stock from './pages/Admin/Stock';
import Users from "./pages/Admin/Users";


// Context
import { ProductProvider } from "./context/product/ProductContext";
import { UserProvider } from './context/user/UserContext';

// Role Users Validation

import AdminProtectedRoute from './pages/ProtectedRoutes/AdminProtectedRoute';
import UserProtectedRoute from './pages/ProtectedRoutes/UserProtectedRoute';


const App = ({ orders, users }) => {
    const [openedCart, setOpenedCart] = useState(false)
    const [cart, setCart] = useState([])
    // No cambiar, estoy probando con esto
    const [userOrders, setUserOrders] = useState([
        [
            {
                "_id": "62c4f0f69f423e3c21ba35cb",
                "name": "Tabla de 2 personas ",
                "price": 20000,
                "stock": 14,
                "category": "tablas",
                "picture": "https://images.unsplash.com/photo-1615361200098-9e630ec29b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
                "description": "15 Camarón, 15 Salmón",
                "createdAt": "2022-07-12T01:10:47.178Z",
                "updatedAt": "2022-07-12T01:10:47.178Z",
                "cartQuantity": 4
            }
        ],
      ])

    return (
        <ProductProvider>
            <UserProvider>
                <Router>
                    <Routes>
                        <Route path="/admin" element = { <AdminHome /> } >
                            <Route index element = {<AdminGreeting orders = { orders } />} />
                            <Route path = "pedidos" element = { <Orders orders = { orders } users = { users } /> } />
                            <Route path = "productos" element = { <Stock /> } >
                                <Route path=":selectedCategory" element = { <Stock /> } />
                            </Route>
                            <Route path = "usuarios" element = { <Users /> } >
                                <Route path=":selectedCategory" element = { <Users /> } />
                            </Route>
                        </Route>

                        <Route path="/" element={<Home openedCart = { openedCart } setOpenedCart = { setOpenedCart }/>} >
                            <Route index element = { <Greeting/> } />
                            <Route path = "catalogo" element = { <Catalog cart = { cart } setCart = { setCart } openedCart = { openedCart } setOpenedCart = { setOpenedCart } orders = {userOrders} setOrders = { setUserOrders } /> } />
                            <Route path = "pedidos" element = { <Orders orders = { userOrders } /> } />
                        </Route>

                    </Routes>
                </Router>
            </UserProvider>
        </ProductProvider>
  );
}

export default App;