import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="App container mt-5">
            <Home />
           </div>
          } />
      </Routes>
    </BrowserRouter>
 
 
//   return (
//     <div className="App container mt-5">
     
//     </div>

//  );
}

export default App;
