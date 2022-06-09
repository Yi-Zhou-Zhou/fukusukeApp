import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Stock from './pages/Admin/Stock';
import User from './pages/User/User';


function App({ menus }) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/user' element={<User/>} />

        <Route path="/admin" element={<Stock menus = { menus } />} />
      </Routes>
    </Router>
  );
}

export default App;