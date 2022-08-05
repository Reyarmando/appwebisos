import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/Home';
import { Login } from './components/Login/Login';
import { ProtectedRoute } from './components/Login/ProtectedRoute';
import { AuthProvider } from './components/Contexts/authContext';
import { ProtectedRoutesL } from './components/Login/ProtectedRouteL';
import Clients from './components/Clients/Clients';
import Products from './components/Products/Product';


function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home />}>
              <Route path="productoServicios"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                } />
              <Route path="clientesProveedores"
                element={
                  <ProtectedRoute>
                    <Clients />
                  </ProtectedRoute>
                } />
            </Route>

            <Route path="/login"
              element={
                <ProtectedRoutesL>
                  <Login />
                </ProtectedRoutesL>
              } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
