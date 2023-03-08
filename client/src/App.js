import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Warehouses from './pages/Warehouses';
import {ModalProvider} from './context/ModalContext';

function App() {
  return <BrowserRouter>
      <ModalProvider>
        <div className="App container mt-5">
       <Routes>
        <Route path="/" element={<Home /> } />
          <Route path="/warehouses" element={<Warehouses/>} />
      </Routes>
        </div>
        
      </ModalProvider>
     
    </BrowserRouter>
}

export default App;
