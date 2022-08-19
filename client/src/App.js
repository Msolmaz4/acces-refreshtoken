
import './App.css';
import Login from './componnets/Login';
import {BrowserRouter,Routes,Route, Link} from 'react-router-dom'
import Home from './componnets/Home';
import Register from './componnets/Register'; 

function App() {
  return (
    <BrowserRouter>

<header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <Link to='/'>
          <li>Home</li>
          </Link>
          
        
        </ul>

  

        <div className="text-end">
          <Link to='/login'>
          <button type="button" className="btn btn-outline-light me-2">Login</button>
          </Link>
       <Link to='/register'>
       <button type="button" className="btn btn-warning">Register</button>
       </Link>

        </div>
      </div>
    </div>
  </header>







      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>



  );
}

export default App;
