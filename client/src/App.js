import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import {ModalProvider} from './context/ModalContext';

function App() {
  return <BrowserRouter>
      <ModalProvider>
         <Routes>
        <Route path="/" element={
          <div className="App container mt-5">
            <Home />
           </div>
          } />
      </Routes>
      </ModalProvider>
     
    </BrowserRouter>
}

export default App;
