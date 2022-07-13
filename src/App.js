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
import { OrderProvider } from './context/order/OrderContext';

const App = ({ orders, users }) => {
    const [openedCart, setOpenedCart] = useState(false)
    const [cart, setCart] = useState([])
    // No cambiar, estoy probando con esto
    const [userOrders, setUserOrders] = useState([])

    return (
        <ProductProvider>
            <UserProvider>
                <OrderProvider>
                    <Router>
                        <Routes>
                        <Route path="/admin" element = { <AdminHome /> } >
                            <Route index element = {<AdminGreeting orders = { orders } />} />
                            <Route path = "pedidos" element = { <AdminOrders orders = { orders } users = { users } /> } />
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
                </OrderProvider>
            </UserProvider>
        </ProductProvider>
  );
}

export default App;