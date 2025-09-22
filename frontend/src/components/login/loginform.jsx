import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Modal,
} from "react-bootstrap";
import "./loginform.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ToastAlert from "../toastalert/toast";
import { useDispatch, useSelector } from "react-redux";
import { addlogin } from "../../reduxslices/loginslice";
import { settitle } from "../../reduxslices/titleslice";

export default function LoginForm({ BEurl, FetchTasks }) {
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    Email: "",
    Password: "",
  });
  const [toast, settoast] = useState({ show: false });
  const titledispatch = useDispatch();
  const title = useSelector((state) => state.title.value);
  let oldtitle;

  const handleClose = () => {
    setShow(false);
    document.title = "Tasker App";
    settoast({ show: false });
  };

  const handleShow = () => {
    oldtitle = title;
    document.title = "Tasker App | Login";
    setShow(true);
  };

  const logins = useSelector((state) => state.login.token);
  const logindispatch = useDispatch();

  async function LoginUser() {
    try {
      const res = await fetch(`${BEurl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        // setfound(data);

        settoast({
          show: true,
          header_toast: `Welcome Back`,
          text: `User ${form.Email} Successfully Logged in`,
          bg: "success",
          status: "circle-check",
        });
        logindispatch(addlogin({ token: data.token, user_id: data.user._id }));

        setTimeout(() => {
          handleClose();
        }, 1000);
        // console.log(`${found.token} \n ${found.user}`);
      } else {
        settoast({
          show: true,
          header_toast: `Error`,
          text: `Credentials Wrong`,
          bg: "danger",
          status: "circle-xmark",
        });
      }

      setForm({
        Email: "",
        Password: "",
      });
    } catch (error) {
      console.log("Error fetching user:");
      // seterror(error.message || "Failed to Fetch Data")
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    let err = "";

    // Validation for each field
    if (name === "Email") {
      if (!value) err = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        err = "Enter a valid email address.";
    }
    if (name === "Password") {
      if (!value) err = "Password is required.";
      else if (value.length < 7)
        err = "Password must be greater than 7 characters";
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: err }));
  }

  return (
    <>
      <Button
        className="bg-white border-company fw-bold text-company px-3 py-2"
        onClick={handleShow}
      >
        LOGIN
      </Button>

      <Modal
        style={{ transform: "translate(-50px)" }}
        className="modallogin"
        show={show}
        onHide={handleClose}
      >
        <Card className="login-card">
          <Modal.Header className="bg-company p m-0 mb-0">
            <Modal.Title className="text-white fs-5">Welcome back</Modal.Title>
          </Modal.Header>

          <Card.Body>
            <Form>
              <FloatingLabel
                controlId="floatingInput.email"
                label="Email"
                className="mt-2 mb-3"
              >
                <Form.Control
                  className="border-custom"
                  type="email"
                  name="Email"
                  placeholder="Email"
                  value={form.Email}
                  onChange={handleChange}
                  isInvalid={!!errors.Email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Email}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput.password"
                label="Password"
                className="mt-4 mb-3"
              >
                <Form.Control
                  className="border-custom"
                  type="password"
                  name="Password"
                  placeholder="Password"
                  value={form.Password}
                  onChange={handleChange}
                  isInvalid={!!errors.Password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Password}
                </Form.Control.Feedback>
              </FloatingLabel>

              <Form.Group className="mt-3 mb-1" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Row className="py-1">
              <Col xl={12} className="text-end">
                <Row className="">
                  <Col xl={12} className="d-flex gap-2  justify-content-end">
                    <Button
                      className="bg-danger btn-modal"
                      onClick={handleClose}
                    >
                      <span>Cancel</span>
                    </Button>

                    <Button
                      className="loginbtn btn-success"
                      onClick={LoginUser}
                      disabled={
                        Object.values(errors).some(Boolean) ||
                        Object.values(form).some((v) => !v)
                      }
                    >
                      <FontAwesomeIcon icon="fa fa-right-to-bracket" /> Login
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
        <ToastAlert
          show={toast.show}
          onClose={() => settoast({ ...toast, show: false })}
          header_toast={toast.header_toast}
          bg={toast.bg}
          status={toast.status}
          text={toast.text}
        />
      </Modal>
    </>
  );
}
