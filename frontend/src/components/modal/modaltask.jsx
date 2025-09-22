import { useState } from "react";
import { Modal, Button, Tabs, Tab, Form, Row, Col } from "react-bootstrap";

export default function TaskModal({ show, handleClose }) {
    const [key, setKey] = useState("basic");

    

    return (
        <Modal show={show} onHide={handleClose} centered>
            {/* Header */}
            <Modal.Header className="bg-primary text-white">
                <Modal.Title>Task Details</Modal.Title>
            </Modal.Header>

            {/* Tabs */}
            <Modal.Body>
                <Tabs
                    id="task-tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    {/* BASIC TAB */}
                    <Tab eventKey="basic" title="BASIC">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Title" />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Control type="date" className="mb-3" />
                                </Col>
                                <Col>
                                    <Form.Control type="time" className="mb-3" />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Select className="mb-3">
                                        <option>Category</option>
                                        <option>Work</option>
                                        <option>Personal</option>
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Select className="mb-3">
                                        <option>Status</option>
                                        <option>Pending</option>
                                        <option>Done</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form>
                    </Tab>

                    {/* MORE TAB */}
                    <Tab eventKey="more" title="MORE">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control type="number" placeholder="Progress" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control as="textarea" rows={3} placeholder="Description" />
                            </Form.Group>
                        </Form>
                    </Tab>
                </Tabs>
            </Modal.Body>

            {/* Footer */}
            <Modal.Footer>
                <Button variant="outline-primary" onClick={handleClose}>
                    Cancel
                </Button>
                {key === "basic" ? (
                    <Button variant="primary" onClick={() => setKey("more")}>
                        Next
                    </Button>
                ) : (
                    <Button variant="primary" onClick={handleClose}>
                        Submit
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}
