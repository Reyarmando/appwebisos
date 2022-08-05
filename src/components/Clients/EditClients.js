import { Form, Button, Col, Row, FloatingLabel, ProgressBar, Tabs, Tab } from 'react-bootstrap'
import { db, uploadFile } from "../../firebase"
import { getDoc, doc } from "firebase/firestore"

import { useState, useEffect } from 'react'
import { serverTimestamp } from 'firebase/firestore'
import { ArrowCircleUpIcon } from '@heroicons/react/solid'

const EditClient = (props) => {
    const [key, setKey] = useState('edit');

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
        props.updateClient(values);
        props.handleClose2()
        setValues({ ...initialStateValues })
    }

    const getClientById = async (id) => {
        const clientDoc = doc(db, "clientes", id);
        const docC = await getDoc(clientDoc)
        setValues({ ...docC.data() })
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

    useEffect((id) => {
        if (props.currentId === "") {
            setValues({ ...initialStateValues })
        } else {
            getClientById(props.currentId)
        }
    }, [props.currentId])

    return (

        <>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                justify
            >
                <Tab eventKey="edit" title="Producto">

                    <Form className='px-4' onSubmit={handleSubmit}>
                        <Row>
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
                                            value={values.nombre}
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
                            <Col sm={4}>
                                <img width="150" height="150" src={values.img || picture} alt='product' />
                                <ProgressBar striped variant="info" now={archivo} min={0} max={100} />
                                <input className='btn btn-sm w-100' type='file' onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                                <button className='btn btn-sm w-100' onClick={handleSubirIMG}><ArrowCircleUpIcon className='h-10 w-10' ></ArrowCircleUpIcon>subir imagen</button>
                            </Col>

                        </Row>
                        <br />
                        <Button type='submit' className="btn btn-sm" variant="warning">
                            Editar Cliente/Proveedor
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="ventas" title="Ventas Realizadas">

                </Tab>
                <Tab eventKey="compras" title="Compras Realizadas">

                </Tab>
            </Tabs>


        </>


    )
}

export default EditClient