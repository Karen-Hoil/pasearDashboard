import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/sidebar.css';
import './css/header.css';
import './css/admin.css';
import './css/login.css';
import Admin from './page/Admin';
import Login from './page/login';
import Appp from './page/pppp';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/admin" element={<Admin/>} />
      <Route path='/lugar' element={<Appp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
