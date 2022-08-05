import { Form, Button, FloatingLabel, Row, Col, Figure, ProgressBar } from 'react-bootstrap'


import { useState } from 'react'
import { serverTimestamp } from 'firebase/firestore'
import { uploadFile } from '../../firebase';

import { ArrowCircleUpIcon } from '@heroicons/react/solid'

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

    const [archivo, setArchivo] = useState(0)

    const [picture, setPicture] = useState(null)

    const handleSubirIMG = async (e) => {
        e.preventDefault()
        try {
            const result = await uploadFile(imageUpload);
            console.log(result)
            setValues({ ...values, img: result})
            setArchivo(100)
            setPicture(result)
        } catch (error) {
            console.log(error)
        }
    }


    return (

        <Form className='px-4' onSubmit={handleSubmit}>
            <Row>
                <Col sm={4}>
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
                    <br/>
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
                    <br/>
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Moneda">
                            <Form.Select
                                name="moneda"
                                type="text"
                                onChange={handleInputChange}
                                required>
                                <option>Selecione moneda</option>
                                <option>Soles</option>
                                <option>Dolares</option>
                                <option>Euros</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col sm={4}>
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
                    <br/>
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
                <Col sm={4} className='justify-center'>
                    <img width="150" height="150" src={picture} alt='product'/>
                    <ProgressBar striped variant="info" now={archivo} min={0} max={100} />
                    <input className='btn btn-sm w-100' type='file' onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                    <button className='btn btn-sm w-100' onClick={handleSubirIMG}><ArrowCircleUpIcon className='h-10 w-10' ></ArrowCircleUpIcon>subir imagen</button>
                </Col>

            </Row>
            <br/>
            <Button type='submit' className="btn btn-sm" variant="success">
                Agregar Producto
            </Button>
        </Form>
    )
}

export default AddProduct