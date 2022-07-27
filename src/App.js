import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/Home';
import EditProduct from './components/Products/EditProducts';
import FileUpload from './components/Products/FileUpload';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/"
            element={
              <Home />
            } />
          <Route path="/image"
            element={
              <FileUpload />
            } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
