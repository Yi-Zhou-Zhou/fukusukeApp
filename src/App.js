import { useState } from 'react';

import './App.css';

import { 
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

// User view
import Home from './pages/Home/Home';

// Admin view
import AdminHome from './pages/Admin/AdminHome'
import AdminGreeting from './pages/Admin/AdminGreeting'
import Orders from './pages/Admin/Orders';
import Stock from './pages/Admin/Stock';
import Users from "./pages/Admin/Users";

import Greeting from './pages/Home/Greeting';
import Catalog from './pages/User/Catalog';

// Context
import { ProductProvider } from "./context/product/ProductContext";

const App = ({ orders, users }) => {
    const [openedCart, setOpenedCart] = useState(false)
    const [cart, setCart] = useState([])

    return (
        <ProductProvider>
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
                        <Route path = "catalogo" element = { <Catalog cart = { cart } setCart = { setCart } openedCart = { openedCart } setOpenedCart = { setOpenedCart } /> } />
                    </Route>

                </Routes>
            </Router>
        </ProductProvider>
  );
}

export default App;