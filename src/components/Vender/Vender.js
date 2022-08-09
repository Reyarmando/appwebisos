import { async } from '@firebase/util';
import { doc, deleteDoc, query, where, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Form, FloatingLabel, Row, Col, Table, Button } from 'react-bootstrap'
import Select from 'react-select';
import { db } from '../../firebase';
import { TrashIcon } from '@heroicons/react/solid';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Vender = () => {

  const MySwal = withReactContent(Swal)

  const [values, setValues] = useState([])

  const handleInputChange = (e) => {
    const { value } = e.target;
    setValues(value)
    console.log(values)
  }

  const collectionProductos = collection(db, "productos")

  const [products, setProducts] = useState([])

  const getProductos = async () => {
    onSnapshot(collectionProductos, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({ ...doc.data(), id: doc.id, label: doc.data().nombre, value: doc.data().nombre })
      });
      setProducts(docs)
      console.log(products)
    })
  }

  const [addproducts, setAddproducts] = useState([])

  const handleSelectChange = (e) => {
    setAddproducts([...addproducts, e])
    console.log(addproducts)
  }

  const onDelete = async (id) => {
    const cliDoc = doc(db, "clientes", id)
    deleteDoc(cliDoc)
  }

  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id)
        Swal.fire(
          'Eliminado!',
          'Tu producto fue eliminado.',
          'success'
        )
      }
    })
  }

  useEffect((e) => {
    getProductos()
    const productosRef = collection(db, "productos")
    const queryFilter = query(productosRef, where("nombre", "==", values));
    getDocs(queryFilter)
      .then(res => console.log(res.docs.map(product => ({ id: product.id, ...product.data() }))))
  }, [values])

  return (
    <div>
      <h3>Nueva venta</h3>
      <Row>
        <Col sm={6}>
          <Form.Group>
            <FloatingLabel controlId="floatingInputGrid" label="Cliente">
              <Form.Control
                name="cliente"
                type="text"
                placeholder='cliente'
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group>
            <FloatingLabel controlId="floatingInputGrid" label="Fecha de emisión">
              <Form.Control
                name="cliente"
                type="date"
                placeholder='cliente'
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group>
            <FloatingLabel controlId="floatingInputGrid" label="Fecha de vencimiento">
              <Form.Control
                name="cliente"
                type="date"
                placeholder='cliente'
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>
          </Form.Group>
        </Col>
      </Row>
      <br />
      <Select
        onChange={handleSelectChange}
        options={products}
      />
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Código</th>
            <th>Codigo de barras</th>
            <th>Categoria</th>
            <th>precio</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {addproducts.map(item => (
            <tr key={item.id}>
              <td></td>
              <td>{item.nombre}</td>
              <td>{item.codigo}</td>
              <td>{item.codebar}</td>
              <td>{item.categoria}</td>
              <td>{item.precio}</td>
              <td>
                <button className="btn btn-xs" onClick={() => confirmDelete(item.id)}><TrashIcon className="h-4 w-4 text-red-700" aria-hidden="true" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  )
}

export default Vender