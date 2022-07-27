import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/Home';
import EditProduct from './components/Products/EditProducts';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/"
            element={
              <Home />
            } />
          <Route path="/edit"
            element={
              <EditProduct />
            } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
