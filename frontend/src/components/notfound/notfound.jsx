import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container fluid>
            <Row className="justify-content-center mt-4">
                <Col xl={4}>
                    <Alert variant="danger" className="text-center">
                        <Alert.Heading>Hey, What happened</Alert.Heading>
                        <p className="text-capitalize">
                            oh okie, you lost the way, the path you are trying to reach doesnot exist.
                        </p>
                        <hr />
                        <p className="">
                            But no problem we will help you get back to right place.
                        </p>
                        <Link to="/"><Button variant="success">Go to Safe Place</Button></Link>
                    </Alert>
                </Col>
            </Row>

        </Container>
    )
}