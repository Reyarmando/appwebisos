

import { useState, useEffect } from "react"
import { db } from "../../firebase"
import { Modal, Button, Table, Row, Col, Container } from 'react-bootstrap'
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, orderBy, query } from "firebase/firestore"

import { PencilAltIcon, TrashIcon, SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/solid'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { motion, AnimatePresence } from 'framer-motion'
import AddClient from "./AddClients"
import EditClient from "./EditClients"
import Compras from "./Compras"
import Ventas from "./Ventas"

const Clients = () => {

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

    const [clients, setClients] = useState([])
    const [currentId, setCurrentId] = useState("");

    const clientsCollection = collection(db, "clientes")

    const [show, steShow] = useState(false)

    const handleShow = () => steShow(true)
    const handleClose = () => steShow(false)

    const [show2, steShow2] = useState(false)

    const handleShow2 = () => steShow2(true)
    const handleClose2 = () => steShow2(false)

    const [show3, steShow3] = useState(false)

    const handleShow3 = () => steShow3(true)
    const handleClose3 = () => steShow3(false)

    const [show4, steShow4] = useState(false)

    const handleShow4 = () => steShow4(true)
    const handleClose4 = () => steShow4(false)

    const addClient = async (objetProvider) => {
        await addDoc(clientsCollection, (objetProvider))
    }

    const getClients = async () => {
        onSnapshot(clientsCollection, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setClients(docs)
        })
    }

    const updateClient = async (objetProvider) => {
        const docm = doc(db, "clientes", currentId)
        await updateDoc(docm, objetProvider)
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

    useEffect(() => {
        getClients()
        handleClose2()
    }, [])

    return (
        <>

            <div className="flex justify-center m-auto">

                <Modal show={show} size="lg">
                    <Modal.Header >
                        <Modal.Title>
                            Clientes / Proveedores
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddClient {...{ addClient, handleClose, currentId }} />
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
                            Clientes / Proveedores
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Ventas />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose3} >
                            close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={show4} size="lg">
                    <Modal.Header >
                        <Modal.Title>
                            Clientes / Proveedores
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Compras />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose4} >
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
                        >Clientes / Proveedores</motion.h1></Col>
                        <Col><Button onClick={handleShow} className="btn btn-sm" variant="success">Agregar Cliente/Proveedor</Button></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>DNI</th>
                                        <th>N° Celular</th>
                                        <th>E-mail</th>
                                        <th>Observaciones</th>
                                        <th>Informes</th>
                                        <th>actions</th>
                                    </tr>
                                </thead>
                                <motion.tbody initial='hidden'
                                    animate='visible'
                                    exit='hidden'
                                    variants={variants}>
                                    <AnimatePresence>
                                        {clients.map((client, index) => (
                                            <motion.tr
                                                custom={(index) * 0.3}
                                                initial='hidden'
                                                animate='visible'
                                                index={index}
                                                exit='hidden'
                                                variants={variants}
                                                layoutId={client.id}
                                                key={client.id}>
                                                <td><img className='center' width="50" height="50" src={client.img} alt='' /></td>
                                                <td>{client.nombre}</td>
                                                <td>{client.ndoc}</td>
                                                <td>{client.numcel}</td>
                                                <td>{client.email}</td>
                                                <td>{client.obs}</td>
                                                <td>
                                                    <button className="btn btn-xs" onClick={handleShow3}><SortAscendingIcon className="h-5 w-5 text-black-500" onClick={() => setCurrentId(client.id)} /></button>
                                                    <button className="btn btn-xs" onClick={handleShow4}><SortDescendingIcon className="h-5 w-5 text-black-700" aria-hidden="true" /></button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-xs" onClick={handleShow2}><PencilAltIcon className="h-5 w-5 text-black-500" onClick={() => setCurrentId(client.id)} /></button>
                                                    <button className="btn btn-xs" onClick={() => confirmDelete(client.id)}><TrashIcon className="h-4 w-4 text-red-700" aria-hidden="true" /></button>
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
                            Administrar Clientes / Proveedores
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditClient {...{ currentId, updateClient, handleClose2 }} />
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

export default Clients