import { Form, Button, FloatingLabel, Row, Col, Figure } from 'react-bootstrap'


import { useState } from 'react'
import { serverTimestamp } from 'firebase/firestore'
import { uploadFile } from '../../firebase';

const AddProduct = (props) => {


    const initialStateValues = {
        codigo: '',
        codebar: '',
        categoria: '',
        unidad: '',
        nombre: '',
        precio: '',
        moneda: '',
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
        props.addProduct(values);
        props.handleClose()
        setValues({ ...initialStateValues })
    }

    const [imageUpload, setImageUpload] = useState(null)


    const handleSubirIMG = async (e) => {
        e.preventDefault()
        try {
            const result = await uploadFile(imageUpload);
            console.log(result)
        } catch (error) {
            console.log(error)
        }
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
                    <input type='file' name='' id='' onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                    <button onClick={handleSubirIMG}>subir imagen</button>
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
                            <Form.Select
                                name="moneda"
                                type="text"
                                onChange={handleInputChange}
                                required>
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