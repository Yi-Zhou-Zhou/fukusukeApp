import './App.css';

import { 
    Navigate,
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

// User view
import Home from './pages/Home/Home';

// Admin view
import AdminHome from './pages/Admin/AdminHome'
import Greeting from './pages/Admin/Greeting'
import Orders from './pages/Admin/Orders';
import Stock from './pages/Admin/Stock';

const App = ({ menus, orders, users }) => {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element = { <AdminHome /> } >
                    <Route index element = {<Greeting orders = { orders } />} />
                    <Route path = "pedidos" element = { <Orders menus = { menus } orders = { orders } users = { users } /> } />
                    <Route path = "productos" element = { <Stock menus = { menus} /> } >
                        <Route path=":selectedCategory" element = { <Stock menus = { menus} /> } />
                    </Route>
                </Route>

                <Route path="/" element={<Home/>} >

                </Route>

            </Routes>
        </Router>
  );
}

export default App;