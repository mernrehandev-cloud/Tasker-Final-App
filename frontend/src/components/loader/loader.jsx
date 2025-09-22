import { Col, Row } from "react-bootstrap";

export default function Loader() {
    return (
        <>
            <Row className="d-flex justify-content-center align-items-center mt-5" style={{
                minHeight: "45vh"
            }}>
                <Col className="col-3 d-flex justify-content-center align-items-center">
                    <div className="loader"></div>
                </Col>
            </Row>
        </>
    )
}