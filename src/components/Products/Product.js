

import { useState, useEffect } from "react"
import { db } from "../../firebase"
import { Modal, Button, Table, Row, Col, Container } from 'react-bootstrap'
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, orderBy, query } from "firebase/firestore"

import { PencilAltIcon, TrashIcon, SortAscendingIcon, SortDescendingIcon, SwitchVerticalIcon } from '@heroicons/react/solid'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { motion, AnimatePresence } from 'framer-motion'
import AddProduct from "./AddProduct"
import EditProduct from "./EditProducts"

import * as XLSX from 'xlsx'

const Products = () => {



    const variants = {
        hidden: {
            opacity: 0
        },
        visible: (delay) => ({
            opacity: 1,
            transition: {
                delay,
                duration: 1
            }
        })
    }

    const MySwal = withReactContent(Swal)

    const [products, setProducts] = useState([])
    const [currentId, setCurrentId] = useState("");

    const productsCollection = collection(db, "productos")

    const [show, steShow] = useState(false)

    const handleShow = () => steShow(true)
    const handleClose = () => steShow(false)

    const [show2, steShow2] = useState(false)

    const handleShow2 = () => steShow2(true)
    const handleClose2 = () => steShow2(false)

    const [show3, steShow3] = useState(false)

    const handleShow3 = () => steShow(true)
    const handleClose3 = () => steShow(false)

    const [show4, steShow4] = useState(false)

    const handleShow4 = () => steShow2(true)
    const handleClose4 = () => steShow2(false)

    const addProduct = async (objetProvider) => {
        await addDoc(productsCollection, (objetProvider))
    }

    const getTools = async () => {
        onSnapshot(productsCollection, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setProducts(docs)
        })
    }

    const updateProduct = async (objetProvider) => {
        const docm = doc(db, "productos", currentId)
        await updateDoc(docm, objetProvider)
    }

    const onDelete = async (id) => {
        const proDoc = doc(db, "productos", id)
        deleteDoc(proDoc)
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

    const handleExport = () => {
        var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(products);

        XLSX.utils.book_append_sheet(wb, ws, "Productos");

        XLSX.writeFile(wb, "Productos-prueba.xlsx")
    }

    useEffect(() => {
        getTools()
        handleClose2()
    }, [])

    return (
        <>

            <div className="flex justify-center m-auto">

                <Modal show={show} size="lg">
                    <Modal.Header >
                        <Modal.Title>
                            Producto / Servicio
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddProduct {...{ addProduct, handleClose, currentId }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} >
                            close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={show3} size="lg">
                    <Modal.Header >
                        <Modal.Title>
                            Producto / Servicio
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddProduct {...{ addProduct, handleClose, currentId }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} >
                            close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={show4} size="lg">
                    <Modal.Header >
                        <Modal.Title>
                            Producto / Servicio
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddProduct {...{ addProduct, handleClose, currentId }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} >
                            close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Container>
                    <Row>
                        <Col><motion.h1 initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                duration: 2,
                                ease: 'easeInOut',
                                delay: '0.2',
                                type: 'spring'
                            }}
                        >Productos / Servicios</motion.h1></Col>
                        <Col><Button onClick={handleShow} className="btn btn-sm" variant="success">Agregar producto/Servicio</Button></Col>
                        <Col>
                            <Button onClick={handleExport} className="btn btn-sm" variant="success">export excels</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped bordered hover size="sm" id="tablaProductos">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Codigo</th>
                                        <th>Codigo de barras</th>
                                        <th>Categoia</th>
                                        <th>Precio</th>
                                        <th>informes</th>
                                        <th>actions</th>
                                    </tr>
                                </thead>
                                <motion.tbody initial='hidden'
                                    animate='visible'
                                    exit='hidden'
                                    variants={variants}>
                                    <AnimatePresence>
                                        {products.map((product, index) => (
                                            <motion.tr
                                                custom={(index) * 0.3}
                                                initial='hidden'
                                                animate='visible'
                                                index={index}
                                                exit='hidden'
                                                variants={variants}
                                                layoutId={product.id}
                                                key={product.id}>
                                                <td><img className='center' width="50" height="50" src={product.img} alt='' /></td>
                                                <td>{product.nombre}</td>
                                                <td>{product.codigo}</td>
                                                <td>{product.codebar}</td>
                                                <td>{product.categoria}</td>
                                                <td>{product.precio}</td>
                                                <td>
                                                    <button className="btn btn-xs" onClick={handleShow2}><SortAscendingIcon className="h-5 w-5 text-black-500" onClick={() => setCurrentId(product.id)} /></button>
                                                    <button className="btn btn-xs" onClick={() => confirmDelete(product.id)}><SortDescendingIcon className="h-5 w-5 text-black-700" aria-hidden="true" /></button>
                                                    <button className="btn btn-xs" onClick={() => confirmDelete(product.id)}><SwitchVerticalIcon className="h-5 w-5 text-black-700" aria-hidden="true" /></button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-xs" onClick={handleShow2}><PencilAltIcon className="h-5 w-5 text-black-500" onClick={() => setCurrentId(product.id)} /></button>
                                                    <button className="btn btn-xs" onClick={() => confirmDelete(product.id)}><TrashIcon className="h-4 w-4 text-red-700" aria-hidden="true" /></button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </motion.tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>

                <Modal show={show2} size="lg">
                    <Modal.Header >
                        <Modal.Title>
                            Administrar Producto / Servicio
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditProduct {...{ currentId, updateProduct, handleClose2 }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2} >
                            close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default Products