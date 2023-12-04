import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Hotel from './pages/hotel/Hotel.jsx';
import List from './pages/List/List.jsx';
import Login from './pages/login/login.jsx'
function App() {
  return (
    <Router>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/hotels' element={<List/>} />
    <Route path='/hotels/:id' element={<Hotel/>} />
    <Route path='/login' element={<Login />} />
    </Routes>
    </Router>
  );
}

export default App;
