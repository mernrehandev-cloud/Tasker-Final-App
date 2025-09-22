import { useEffect, useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import ToastAlert from "../toastalert/toast";
import './error.css'

export default function ErrorComp({ BEurl, error }) {
    const [toast, settoast] = useState({ show: false });

    async function CheckBackEnd() {
        let data;
        try {
            const res = await fetch(`${BEurl}/`);
            if (!res.ok) {
                settoast({ show: true, header_toast: "Backend is not working", text: `Express, MongoDB ${data.status}`, bg: "danger", status: "circle-xmark" });
            }
            else {
                settoast({ show: true, header_toast: "Backend is working", text: `Express, MongoDB ${data.status}`, bg: "success", status: "circle-check" });
                data = await res.json();
            }
        } catch (error) {
            settoast({ show: true, header_toast: "Backend is not working", text: `Express, MongoDB is off`, bg: "danger", status: "circle-xmark" });
            console.log('Error checking backend:');
            // alert('Failed to fetch')
            // seterror(error.message || "Failed to Fetch Data")
        }
    }

    return (
        <>
            <Row className="mt-4 d-flex justify-content-center">
                <Col lg={5} md={8} sm={8} xs={10}>
                    <Alert className="text-center" variant="success">
                        <Alert.Heading>Ahh Snap, Error Occured</Alert.Heading>
                        <p className="desc">
                            {  error? error :
                            `I guess Backend API or a component failed to load. <br /> Check back later, Thanks.`
                            }
                        </p>
                        <hr />
                        <Row className="mb-0 justify-content-center">
                            <Col lg={5} md={5} sm={6} xs={6}>
                                <a href="http://localhost:5173">
                                    <Button variant="primary" active>
                                        Click to Refresh Frontend
                                    </Button>
                                </a>
                            </Col>

                            <Col lg={5} md={5} sm={6} xs={6}>
                                {/* <a className="ms-2" href="http://localhost:44000" target="_blank"> */}
                                <Button onClick={CheckBackEnd} variant="secondary" active>
                                    Click to check Backend
                                </Button>
                                {/* </a> */}
                            </Col>
                        </Row>
                    </Alert>
                    < ToastAlert show={toast.show} onClose={() => settoast({ ...toast, show: false })} header_toast={toast.header_toast} bg={toast.bg} status={toast.status} text={toast.text} />
                </Col>
            </Row>
        </>
    )
}
