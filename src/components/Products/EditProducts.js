import { Form, Button, Col, Row, FloatingLabel, ProgressBar } from 'react-bootstrap'
import { db, uploadFile } from "../../firebase"
import { getDoc, doc } from "firebase/firestore"

import { useState, useEffect } from 'react'
import { serverTimestamp } from 'firebase/firestore'
import { ArrowCircleUpIcon } from '@heroicons/react/solid'

const EditProduct = (props) => {
    const [key, setKey] = useState('edit');

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
        props.updateProduct(values);
        props.handleClose2()
        setValues({ ...initialStateValues })
    }

    const getProductById = async (id) => {
        const productDoc = doc(db, "productos", id);
        const docP = await getDoc(productDoc)
        setValues({ ...docP.data() })
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
            getProductById(props.currentId)
        }
    }, [props.currentId])

    return (

        <>


            <Form className='px-4' onSubmit={handleSubmit}>
                <Row>
                    <Col sm={4}>
                        <img width="150" height="150" src={values.img || picture} alt='product' />
                        <ProgressBar striped variant="info" now={archivo} min={0} max={100} />
                        <input className='btn btn-sm w-100' type='file' onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                        <button className='btn btn-sm w-100' onClick={handleSubirIMG}><ArrowCircleUpIcon className='h-10 w-10' ></ArrowCircleUpIcon>subir imagen</button>
                    </Col>
                    <Col sm={4}>
                        <Form.Group>
                            <FloatingLabel controlId="floatingInputGrid" label="Codigo">
                                <Form.Control
                                    name="codigo"
                                    type="text"
                                    placeholder='codigo'
                                    onChange={handleInputChange}
                                    value={values.codigo}
                                    required
                                    disabled
                                />
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
                                    value={values.categoria}
                                    required />
                            </FloatingLabel>
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <FloatingLabel controlId="floatingInputGrid" label="Nombre del producto">
                                <Form.Control
                                    name="nombre"
                                    type="text"
                                    placeholder='nombre del producto'
                                    onChange={handleInputChange}
                                    value={values.nombre}
                                    required />
                            </FloatingLabel>
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <FloatingLabel controlId="floatingInputGrid" label="Moneda">
                                <Form.Select
                                    name="moneda"
                                    value={values.moneda}
                                    type="text"
                                    onChange={handleInputChange}
                                    required>
                                    <option>Seleccione Moneda</option>
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
                                    value={values.codebar}
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
                                    value={values.unidad}
                                    required />
                            </FloatingLabel>
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <FloatingLabel controlId="floatingInputGrid" label="Precio">
                                <Form.Control
                                    name="precio"
                                    type="text"
                                    placeholder='precio'
                                    onChange={handleInputChange}
                                    value={values.precio}
                                    required />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>

                </Row>


                <Button type='submit' className="btn btn-sm" variant="warning">
                    Editar Producto
                </Button>
            </Form>

        </>


    )
}

export default EditProduct