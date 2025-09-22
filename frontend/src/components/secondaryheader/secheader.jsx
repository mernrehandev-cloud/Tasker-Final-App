import { Button, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./secheader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import SignupForm from "../signup/signupform";
import LoginForm from "../login/loginform";

function SecHeader(props) {
  const { heading, total, icon_nav, keyforut, BEurl, users, FetchTasks } =
    props;

  return (
    <>
      <Container fluid className="mt-4">
        <Row className="d-flex justify-content-center px-md-0 px-lg-4">
          <Col className="col-12 bg-white ps-lg-5   pe-xl-5 p-lg-4 p-3 shadow border rounded">
            <Row className="my-auto d-flex align-items-center">
              <Col className="col-6 main-text fs-4">
                <FontAwesomeIcon icon={icon_nav} /> {heading}
              </Col>

              { keyforut !== "u" ? (
                <Col className="col-6 text-end total-text fs-5">
                  <span className="total-main">Total:</span> {total} Task/s
                </Col>
              ) : keyforut == "u" ? (
                <Col className="col-6 text-end total-text fs-5">
                  <span className="total-main">Total:</span> {total} User/s
                </Col>
              ) : (
                <FontAwesomeIcon icon={"loader"} />
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SecHeader;
