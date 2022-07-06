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

import Greeting from './pages/Home/Greeting';
import Catalog from './pages/User/Catalog';

const App = ({ menus, orders, users }) => {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element = { <AdminHome /> } >
                    <Route index element = {<AdminGreeting orders = { orders } />} />
                    <Route path = "pedidos" element = { <Orders menus = { menus } orders = { orders } users = { users } /> } />
                    <Route path = "productos" element = { <Stock menus = { menus} /> } >
                        <Route path=":selectedCategory" element = { <Stock menus = { menus} /> } />
                    </Route>
                </Route>

                <Route path="/" element={<Home/>} >
                    <Route index element = { <Greeting/> } />
                    <Route path = "catalogo" element = { <Catalog menus = { menus } /> } />
                </Route>

            </Routes>
        </Router>
  );
}

export default App;