import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalComp from "../modal/modal_add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotFound2({FetchTasks, FetchCategory, category, BEurl}) {
    return (
        <Container fluid>
            <Row className="justify-content-center mt-4">
                <Col xl={4}>
                    <Alert variant="body" className="text-center">
                        <p>
                            <FontAwesomeIcon style={{backgroundColor: "lightgray",color: "gray"}} className="p-4 rounded-circle fs-2" icon="fa fa-clipboard-list"/>
                        </p>
                        <Alert.Heading className="mb-3">No Tasks Yet</Alert.Heading>
                        <p className="text-capitalize">
                            Get Started by creating your first task. <br/>
                            Stay organised and boost your productivity.
                        </p>
                       
                        <ModalComp content="Create your first task" FetchTasks={FetchTasks} FetchCategory={FetchCategory} category={category} BEurl={BEurl}/>
                    </Alert>
                </Col>
            </Row>

        </Container>
    )
}