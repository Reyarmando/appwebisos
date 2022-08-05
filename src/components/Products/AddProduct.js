import { Form, Button, FloatingLabel, Row, Col, ProgressBar, Toast } from 'react-bootstrap'

import { db } from "../../firebase"
import { useState, useEffect } from 'react'
import { serverTimestamp, collection, onSnapshot, addDoc } from 'firebase/firestore'
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

    const [categorias, setCategorias] = useState([])

    const categoriasCollection = collection(db, "categorias")

    const getCategorias = async () => {
        onSnapshot(categoriasCollection, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setCategorias(docs)
        })
    }

    const addCategoria = async (objetProvider) => {
        await addDoc(categoriasCollection, (objetProvider))
    }

    const [categoria, setCategoria] = useState('')

    const handleCategoria = (e) => {
        const { name, value } = e.target;
        setCategoria({ ...categoria, [name]: value })
    }

    const agregarCategoria = () => {
        addCategoria(categoria)
        setShowT(!showT)
    }

    const [showT, setShowT] = useState(false);

    const toastShow = () => setShowT(!showT);

    const [code, setCode] = useState(Date.now())



    const [values, setValues] = useState(initialStateValues)

    const Codigo = () => {
        setCode(Date.now())
        setValues({ values, codigo: code })
        console.log(code)
    }

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
    useEffect(() => {
        getCategorias()
    }, [])

    return (

        <Form className='px-4' onSubmit={handleSubmit}>
            <Row>
                <Col sm={4} className='justify-center'>
                    <img width="150" height="150" src={picture} alt='product' />
                    <ProgressBar striped variant="info" now={archivo} min={0} max={100} />
                    <input className='btn btn-sm w-100' type='file' onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                    <button className='btn btn-sm w-100' onClick={handleSubirIMG}><ArrowCircleUpIcon className='h-10 w-10' ></ArrowCircleUpIcon>subir imagen</button>
                </Col>
                <Col sm={4}>
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid">
                            <div className="row">
                                <div className="col-7">
                                    <Form.Control
                                        name="codigo"
                                        type="text"
                                        placeholder='codigo'
                                        onChange={handleInputChange}
                                        value={code}
                                        required disabled>
                                    </Form.Control>
                                </div>
                                <div className="col-4">
                                    <Button onClick={Codigo}>generar</Button>
                                </div>
                            </div>
                        </FloatingLabel>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid">
                            <div className="row">
                                <div className="col-7">
                                    <Form.Select name="categoria"
                                        type="text"
                                        onChange={handleInputChange}
                                        aria-label="Default select example">
                                        <option>Please select this</option>
                                        {categorias.map(categoria => (
                                            <option key={categoria.id}>{categoria.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </div>
                                <div className="col-4">
                                    <Button onClick={toastShow}>Agregar</Button>
                                </div>
                                <Toast show={showT} onClose={toastShow}>
                                    <Toast.Header>
                                        <img
                                            src="holder.js/20x20?text=%20"
                                            className="rounded me-2"
                                            alt=""
                                        />
                                        <strong className="me-auto">Agregar Categoria</strong>
                                    </Toast.Header>
                                    <Toast.Body>
                                        <div className="row">
                                            <div className="col-8">
                                                <FloatingLabel controlId="floatingInputGrid" label="Nombre" >
                                                    <Form.Control
                                                        name="nombre"
                                                        type="text"
                                                        placeholder='nombre del producto'
                                                        onChange={handleCategoria}
                                                        required />
                                                </FloatingLabel>
                                            </div>
                                            <div className="col-4">
                                                <Button onClick={agregarCategoria}>+</Button>
                                            </div>
                                        </div>

                                    </Toast.Body>
                                </Toast>
                            </div>

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
                                value={values.name}
                                required />
                        </FloatingLabel>
                    </Form.Group>
                    <br />
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
                            <Form.Select
                                name="moneda"
                                type="text"
                                onChange={handleInputChange}
                                required>
                                <option>Selecione unidad</option>
                                <option>BOBINAS</option>
                                <option>BALDE</option>
                                <option>BARRILES</option>
                                <option>BOLSAS</option>
                                <option>BOTELLAS</option>
                                <option>CAJA</option>
                                <option>CARTONES</option>
                                <option>CENTIMETRO CUADRADO</option>
                                <option>CENTIMETRO CUBICO</option>
                                <option>CENTIMETRO LINEAL</option>
                                <option>CIENTO DE UNIDADES</option>
                                <option>CILINDRO</option>
                                <option>CONOS</option>
                                <option>DOCENA</option>
                                <option>FARDO</option>
                                <option>GALON INGLES(4.545956L)</option>
                                <option>GRAMO</option>
                                <option>GRUESA</option>
                                <option>HECTOLITRO</option>
                                <option>HOJA</option>
                                <option>JUEGO</option>
                                <option>KILOGRAMO</option>
                                <option>KILOMETRO</option>
                                <option>KILOBATIO</option>
                                <option>KIT</option>
                                <option>LATAS</option>
                                <option>LIBRAS</option>
                                <option>LITRO</option>
                                <option>MEGAWATT</option>
                                <option>METRO </option>
                                <option>METRO CUADRADO</option>
                                <option>METRO CUBICO</option>
                                <option>MILIGRAMOS</option>
                                <option>MILILITRO</option>
                                <option>MILIMETRO</option>
                                <option>MILIMETRO CUADRADO</option>
                                <option>MILIMETRO CUBICO</option>
                                <option>MILLARES</option>
                                <option>MILLON DE UNIDADES</option>
                                <option>ONZAS</option>
                                <option>PALETAS</option>
                                <option>PAQUETE</option>
                                <option>PAR</option>
                                <option>PIES</option>
                                <option>PIES CUADRADOS</option>
                                <option>PIES CUBICOS</option>
                                <option>PIEZAS</option>
                                <option>PLACAS</option>
                                <option>PLIEGO</option>
                                <option>PULGADAS</option>
                                <option>RESMA</option>
                                <option>TAMBOR</option>
                                <option>TONELADA CORTA</option>
                                <option>TONELADA LARGA</option>
                                <option>TONELADAS</option>
                                <option>TUBOS</option>
                                <option>UNIDADES</option>
                                <option>SERVICIOS</option>
                                <option>GALON US(3.7843L)</option>
                                <option>YARDA</option>
                                <option>YARDA CUADRADA</option>
                            </Form.Select>
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
                                value={values.name}
                                required />
                        </FloatingLabel>
                    </Form.Group>
                </Col>

            </Row>
            <br />
            <Button type='submit' className="btn btn-sm" variant="success">
                Agregar Producto
            </Button>
        </Form>
    )
}

export default AddProduct