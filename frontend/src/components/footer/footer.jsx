import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './footer.css'

function Footermain() {
    return (
        <>
            <Container fluid className="mt-4">
                <Row className="d-flex justify-content-center bg-dark text-white p-4">
                    <Col className="col-12 col-lg-6 mx-auto text-center fs-5 footer-text">
                        Copyright &copy; 2025 Tasker App. Built by Rehan Ahmed Khan.
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Footermain;