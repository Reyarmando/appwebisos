import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/"
            element={
              <Home />
            } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
