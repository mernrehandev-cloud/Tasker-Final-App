import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './secheader.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

function SecHeader2(props) {
    const { heading, icon_nav
    } = props;

    return (
        <>
            <Container fluid className="mt-4">
                <Row className="d-flex justify-content-center px-md-0 px-lg-4">
                    <Col xl={4} lg={4} md={5} sm={5} xs={8} className=" bg-white p-lg-3 p-3 shadow border rounded">
                        <Row className="my-auto justify-content-center">
                            <Col className="col-6 text-center main-text fs-4">
                                <FontAwesomeIcon icon={icon_nav} /> {heading}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SecHeader2;