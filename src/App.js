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

// Role Users Validation

import AdminProtectedRoute from './pages/AdminProtectedRoute';
import UserProtectedRoute from './pages/UserProtectedRoute';


const App = ({ orders, users }) => {
    return (
        <ProductProvider>
            <Router>
                <Routes>
                    <Route element={<AdminProtectedRoute/>} >
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
                    </Route>

                    <Route path="/" element={<Home/>} >
                        <Route index element = { <Greeting/> } />
                        <Route path = "catalogo" element = { <Catalog /> } />
                    </Route>

                </Routes>
            </Router>
        </ProductProvider>
  );
}

export default App;