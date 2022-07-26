import { Form, Button, FloatingLabel, Row, Col, Figure } from 'react-bootstrap'


import { useState } from 'react'
import { serverTimestamp } from 'firebase/firestore'

const AddProduct = (props) => {


    const initialStateValues = {
        Codigo: '',
        categoria: '',
        unidad: '',
        nombre: '',
        precio: '',
        img: '',
        timestamp: serverTimestamp()
    }

    const [values, setValues] = useState(initialStateValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        props.addEpps(values);
        props.handleClose()
        setValues({ ...initialStateValues })
    }



    return (

        <Form className='px-4' onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Codigo">
                            <Form.Control
                                name="codigo"
                                type="text"
                                placeholder='codigo'
                                onChange={handleInputChange}
                                value={values.name}
                                required />
                        </FloatingLabel>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Categoria">
                            <Form.Control
                                name="categoria"
                                type="text"
                                placeholder='categoria'
                                onChange={handleInputChange}
                                value={values.name}
                                required />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Codigo de barras">
                            <Form.Control
                                name="codebar"
                                type="text"
                                placeholder='codigo de barras'
                                onChange={handleInputChange}
                                value={values.name}
                                required />
                        </FloatingLabel>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Unidad de Medida">
                            <Form.Control
                                name="unidad"
                                type="text"
                                placeholder='unidad de medida'
                                onChange={handleInputChange}
                                value={values.name}
                                required />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col>
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt="171x180"
                            src="holder.js/171x180"
                        />
                        <Figure.Caption>
                            Nulla vitae elit libero, a pharetra augue mollis interdum.
                        </Figure.Caption>
                    </Figure>
                    <Button>
                        subir foto
                    </Button>
                </Col>

            </Row>

            <br />
            <Row>
                <Col sm={8}>
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Nombre del producto">
                            <Form.Control
                                name="nombre"
                                type="text"
                                placeholder='nombre del producto'
                                onChange={handleInputChange}
                                value={values.name}
                                required />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={4}>
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Precio">
                            <Form.Control
                                name="precio"
                                type="text"
                                placeholder='precio'
                                onChange={handleInputChange}
                                value={values.name}
                                required />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Moneda">
                            <Form.Select>
                                <option>Soles</option>
                                <option>Dolares</option>
                                <option>Euros</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                </Col>
            </Row>

            <Button type='submit' className="block
                    text-md font-bold my-4">
                Agregar Producto
            </Button>
        </Form>
    )
}

export default AddProduct