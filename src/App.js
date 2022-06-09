import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Stock from './pages/Admin/Stock';
import User from './pages/User/User';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<Stock />} />
        <Route path='/user' element={<User/>} />
      </Routes>
    </Router>
  );
}

export default App;
