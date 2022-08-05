import { Nav } from "react-bootstrap"
import { Outlet, Link } from "react-router-dom"
export const NavBarInvet = () => {
    return (
        <>
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link as={Link} to="/productoServicios">Productos</Nav.Link>
                <Nav.Link as={Link} to="/clientesProveedores">Clientes</Nav.Link>
                <Nav.Link as={Link} to="/">Link</Nav.Link>

            </Nav>

            <section>
                <Outlet></Outlet>
            </section>
        </>
    )
}
