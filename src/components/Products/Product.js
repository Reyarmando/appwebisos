

import { useState, useEffect } from "react"
import { db } from "../../firebase"
import { Modal, Button, Table, Row, Col, Container } from 'react-bootstrap'
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, orderBy, query } from "firebase/firestore"
import { TrashIcon, PencilIcon } from '@heroicons/react/outline'


import { motion, AnimatePresence } from 'framer-motion'

const Epps = () => {

    const variants = {
        hidden: {
            opacity: 0
        },
        visible: ( delay ) => ({
            opacity: 1,
            transition: {
                delay,
                duration: 1
            }
        })
    }



    const [epps, setEpps] = useState([])
    const [tools, setTools] = useState([])
    const [currentId, setCurrentId] = useState("");

    const toolsCollection = collection(db, "epps")

    const [show, steShow] = useState(false)

    const handleShow = () => steShow(true)
    const handleClose = () => steShow(false)

    const [show2, steShow2] = useState(false)

    const handleShow2 = () => steShow2(true)
    const handleClose2 = () => steShow2(false)



    const getTools = async () => {
        onSnapshot(toolsCollection, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setTools(docs)
        })
    }


    

    useEffect(() => {
        getTools()
        handleClose2()
        console.log(epps)
    }, [])

    return (
        <>

            <div className="flex justify-center m-auto">

                <Modal show={show}>
                    <Modal.Header >
                        <Modal.Title>
                            Add Epps
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                        >table of Epps</motion.h1></Col>
                        <Col><Button onClick={handleShow} className="btn btn-succsess"> addEpps</Button></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name of EPP</th>
                                        <th>Inventory Code</th>
                                        <th>Brand</th>
                                        <th>Model</th>
                                        <th>Stock</th>
                                        <th>actions</th>
                                    </tr>
                                </thead>
                                <motion.tbody initial='hidden'
                                    animate='visible'
                                    exit='hidden'
                                    variants={variants}>
                                    <AnimatePresence>
                                        {tools.map((epp, index) => (
                                            <motion.tr
                                                custom={ (index) * 0.3 }
                                                initial='hidden'
                                                animate='visible'
                                                index={index}
                                                exit='hidden'
                                                variants={variants}
                                                layoutId={epp.id}
                                                key={epp.id}>
                                                <td>-</td>
                                                <td>{epp.brand}</td>
                                                <td>{epp.name}</td>
                                                <td>{}</td>
                                                <td>{epp.model}</td>
                                                <td>{}</td>
                                                <td>
                                                    <button onClick={handleShow2}><p onClick={() => setCurrentId(epp.id)}><PencilIcon className="h-4 w-4 text-yellow-500" aria-hidden="true" /></p></button>
                                                    
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </motion.tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
                <Modal show={show2}>
                    <Modal.Header >
                        <Modal.Title>
                            Edit Epp
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       
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