import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Warehouses from './pages/Warehouses';
import { ModalProvider } from './context/ModalContext';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <BrowserRouter>
    <DataProvider>
       <ModalProvider>
        <div className="App container mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/warehouses" element={<Warehouses />} />
          </Routes>
        </div>
      </ModalProvider>
    </DataProvider>
     
    </BrowserRouter>
  );
}

export default App;
