import { Form, Button, FloatingLabel, Row, Col, Figure, ProgressBar } from 'react-bootstrap'


import { useState } from 'react'
import { serverTimestamp } from 'firebase/firestore'
import { uploadFile } from '../../firebase';

import { ArrowCircleUpIcon } from '@heroicons/react/solid'

const AddClient = (props) => {


    const initialStateValues = {
        direccion: '',
        email: '',
        ndoc: '',
        nombre: '',
        numcel: '',
        obs: '',
        tdoc: '',
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
            setValues({ ...values, img: result })
            setArchivo(100)
            setPicture(result)
        } catch (error) {
            console.log(error)
        }
    }


    return (

        <Form className='px-4' onSubmit={handleSubmit}>
            <Row>
                <Col sm={4} className='justify-center'>
                    <img width="150" height="150" src={picture} alt='client' />
                    <ProgressBar striped variant="info" now={archivo} min={0} max={100} />
                    <input className='btn btn-sm w-100' type='file' onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                    <button className='btn btn-sm w-100' onClick={handleSubirIMG}><ArrowCircleUpIcon className='h-10 w-10' ></ArrowCircleUpIcon>subir imagen</button>
                </Col>
                <Col sm={4}>
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Tipo de Documento">
                            <Form.Select
                                name="tdoc"
                                type="text"
                                onChange={handleInputChange}
                                required>
                                <option>Selecione Doc.</option>
                                <option>DNI</option>
                                <option>RUC</option>
                                <option>Pasaporte</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Nombre/Razón social">
                            <Form.Control
                                name="Nombre"
                                type="text"
                                placeholder='nombre'
                                onChange={handleInputChange}
                                value={values.name}
                                required />
                        </FloatingLabel>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="E-mail">
                            <Form.Control
                                name="email"
                                type="text"
                                placeholder='email'
                                onChange={handleInputChange}
                                value={values.email}
                                required />
                        </FloatingLabel>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Observaciones">
                            <Form.Control
                                name="obs"
                                type="text"
                                placeholder='observaciones'
                                onChange={handleInputChange}
                                value={values.obs}
                                required />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Numero de Documento">
                            <Form.Control
                                name="ndoc"
                                type="text"
                                placeholder='num doc'
                                onChange={handleInputChange}
                                value={values.ndoc}
                                required />
                        </FloatingLabel>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Numero de celular">
                            <Form.Control
                                name="numcel"
                                type="text"
                                placeholder='Numero de Celular'
                                onChange={handleInputChange}
                                value={values.numcel}
                                required />
                        </FloatingLabel>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Direccion Principal">
                            <Form.Control
                                name="direccion"
                                type="text"
                                placeholder='precio'
                                onChange={handleInputChange}
                                value={values.direccion}
                                required />
                        </FloatingLabel>
                    </Form.Group>
                </Col>

            </Row>
            <br />
            <Button type='submit' className="btn btn-sm" variant="success">
                Agregar Cliente/Proveedor
            </Button>
        </Form>
    )
}

export default AddClient