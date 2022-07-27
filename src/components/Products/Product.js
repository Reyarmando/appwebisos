

import { useState, useEffect } from "react"
import { db } from "../../firebase"
import { Modal, Button, Table, Row, Col, Container } from 'react-bootstrap'
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, orderBy, query } from "firebase/firestore"



import { motion, AnimatePresence } from 'framer-motion'
import AddProduct from "./AddProduct"
import EditProduct from "./EditProducts"

const Epps = () => {

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


    const [products, setProducts] = useState([])
    const [currentId, setCurrentId] = useState("");

    const productsCollection = collection(db, "productos")

    const [show, steShow] = useState(false)

    const handleShow = () => steShow(true)
    const handleClose = () => steShow(false)

    const [show2, steShow2] = useState(false)

    const handleShow2 = () => steShow2(true)
    const handleClose2 = () => steShow2(false)

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
                        <Col><Button onClick={handleShow} className="btn btn-succsess">Agregar producto</Button></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Codigo</th>
                                        <th>Codigo de barras</th>
                                        <th>Categoia</th>
                                        <th>Precio</th>
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
                                                <td>-</td>
                                                <td>{product.nombre}</td>
                                                <td>{product.codigo}</td>
                                                <td>{product.codebar}</td>
                                                <td>{product.categoria}</td>
                                                <td>{product.precio}</td>
                                                <td>
                                                    <button onClick={handleShow2}><p onClick={() => setCurrentId(product.id)}>administrar</p></button>

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
                            Administrar Producto
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

export default Epps