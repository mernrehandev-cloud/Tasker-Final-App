import { useRef, useState } from "react";
import {
  Button,
  Modal,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import "./signupform.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ToastAlert from "../toastalert/toast";

export default function SignupForm({ BEurl, users }) {
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    document.title = "Tasker App";
    settoast({ show: false });
  };

  const handleShow = () => {
    setShow(true);
    document.title = "Tasker App | Signup";
  };

  const hiddenFileInput = useRef(null);

  const [fileName, setFileName] = useState(`Upload File`);

  const [form, setForm] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Name: "",
    BirthDate: "",
    ContactNumber: "",
    Image: "",
    SecurityAnswer: "",
    SecurityQuestion: "",
  });
  const [toast, settoast] = useState({ show: false });

  const handleChangeimg = (event) => {
    const fileUploaded = event.target.files[0];
    const realname = fileUploaded.name;
    if (fileUploaded) {
      setFileName(`${realname.slice(0, 10)} ...`);
    } else {
      setFileName("No file chosen");
    }
  };

  async function SignupUser() {
    try {
      // const check = await fetch(`${BEurl}/users/userbyemail/${form.Email}`);
      // const checkformat = await check.json();

      if (users) {
        users.forEach((u) => {
          console.log(u);
          if (u.Email === form.Email)
            return settoast({
              show: true,
              header_toast: `Signup Failed`,
              text: `User already Exist.`,
              bg: "danger",
              status: "circle-xmark",
            });
        });
      }

      const res = await fetch(`${BEurl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.message === "User already exist") {
        return settoast({
          show: true,
          header_toast: `Signup Failed`,
          text: `User already Exist.`,
          bg: "danger",
          status: "circle-xmark",
        });
      } else if (!res.ok) {
        settoast({
          show: true,
          header_toast: `Signup Failed`,
          text: `Something went wrong`,
          bg: "danger",
          status: "circle-xmark",
        });
      } else {
        // setfound(data);
        // console.log(`${form} \n ${res} \n ${BEurl}`);

        settoast({
          show: true,
          header_toast: `Signup Success`,
          text: `User ${form.Email} Successfully Signed Up`,
          bg: "success",
          status: "circle-check",
        });
        setTimeout(() => {
          handleClose();
        }, 1000);
        // console.log(`${found.token} \n ${found.user}`);
      }

      setForm({
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Name: "",
        BirthDate: "",
        ContactNumber: "",
        Image: "",
        SecurityAnswer: "",
        SecurityQuestion: "",
      });
    } catch (error) {
      console.log("Error signing up user:");
      // seterror(error.message || "Failed to Fetch Data")
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    let err = "";

    // Validation for each field
    if (name === "Name") {
      if (!value) err = "Name is required.";
      else if (value.length < 3) err = "Name must be greater than 3 characters";
    }

    if (name === "ContactNumber") {
      if (!value) err = "Contact Number is required.";
      else if (value.length < 11) err = "Contact Number must be 11 Digits";
      else if (value.length > 11)
        err = "Contact Number can't be greater than 11 Digits";
    }

    if (name === "SecurityQuestion") {
      if (!value) err = "Security Question is required.";
      else if (value.length < 5)
        err = "Security Question must be greater than 5 characters";
    }

    if (name === "SecurityAnswer") {
      if (!value) err = "Security Answer is required.";
      else if (value.length < 5)
        err = "Security Answer must be greater than 5 characters";
    }

    if (name === "BirthDate") {
      let year = value.slice(0, 4);
      // console.log(year);
      if (!value) err = "Birth Date is required.";
      else if (year > 2007) err = "Must be 18+";
      else if (year < 1925) err = "Cant be older than 100";
      else if (year.length > 4) err = "Year is Error";
    }

    if (name === "Email") {
      if (!value) err = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        err = "Enter a valid email address.";
    }
    if (name === "Password") {
      if (!value) err = "Password is required.";
      else if (value.length < 8)
        err = "Password must be greater than 8 characters";
    }

    if (name === "ConfirmPassword") {
      if (!value) err = "Confirm Password is required.";
      else if (value != form.Password) err = "Password doesnot match";
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: err }));
  }

  return (
    <>
      <Button className="bg-company fw-bold px-3 py-2" onClick={handleShow}>
        SIGNUP
      </Button>

      <Modal
        style={{ transform: "translate(-100px)" }}
        className="modalsignup"
        show={show}
        onHide={handleClose}
      >
        <Card className="signup-card">
          <Modal.Header className="bg-company p m-0 mb-0">
            <Modal.Title className="text-white fs-5">
              Welcome to Tasker App
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col xl={12} md={12}>
                  <FloatingLabel
                    controlId="floatingInput.name"
                    label="Full Name"
                    className="mt-2 mb-2"
                  >
                    <Form.Control
                      className="border-custom"
                      type="text"
                      name="Name"
                      placeholder="Full Name"
                      value={form.Name}
                      onChange={handleChange}
                      isInvalid={!!errors.Name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Name}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col xl={12} md={12}>
                  <FloatingLabel
                    controlId="floatingInput.email"
                    label="Email"
                    className="mt-2 mb-2"
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
                </Col>
              </Row>

              <Row>
                <Col xl={6} md={6}>
                  <FloatingLabel
                    controlId="floatingInput.password"
                    label="Password"
                    className="mt-2 mb-2"
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
                </Col>

                <Col xl={6} md={6}>
                  <FloatingLabel
                    controlId="floatingInput.confirmpassword"
                    label="Confirm Password"
                    className="mt-2 mb-2"
                  >
                    <Form.Control
                      className="border-custom"
                      type="password"
                      name="ConfirmPassword"
                      placeholder="Confirm Password"
                      value={form.ConfirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.ConfirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ConfirmPassword}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col xl={6} md={6}>
                  <FloatingLabel
                    controlId="floatingInput.contact"
                    label="Contact"
                    className="contactinput"
                  >
                    <Form.Control
                      className="border-custom"
                      type="number"
                      name="ContactNumber"
                      placeholder="Contact Number"
                      value={form.ContactNumber}
                      onChange={handleChange}
                      isInvalid={!!errors.ContactNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ContactNumber}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col xl={6} md={6}>
                  <FloatingLabel
                    controlId="floatingInput.dob"
                    label="Date of Birth"
                    className=""
                  >
                    <Form.Control
                      className="border-custom"
                      type="date"
                      name="BirthDate"
                      placeholder="Date of Birth"
                      value={form.BirthDate}
                      onChange={handleChange}
                      isInvalid={!!errors.BirthDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.BirthDate}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col xl={6} md={6}>
                  <FloatingLabel
                    controlId="floatingInput.SecurityQuestion"
                    label="Security Question"
                    className="mt-2 mb-2"
                  >
                    <Form.Control
                      className="border-custom"
                      type="text"
                      name="SecurityQuestion"
                      placeholder="Security Question"
                      value={form.SecurityQuestion}
                      onChange={handleChange}
                      isInvalid={!!errors.SecurityQuestion}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.SecurityQuestion}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col xl={6} md={6}>
                  <FloatingLabel
                    controlId="floatingInput.SecurityAnswer"
                    label="Security Answer"
                    className="mt-2 mb-2"
                  >
                    <Form.Control
                      className="border-custom"
                      type="text"
                      name="SecurityAnswer"
                      placeholder="Security Answer"
                      value={form.SecurityAnswer}
                      onChange={handleChange}
                      isInvalid={!!errors.SecurityAnswer}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.SecurityAnswer}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col xl={6} md={6}>
                  <Button
                    className="bg-company py-2 px-4 rounded-1"
                    onClick={() => hiddenFileInput.current.click()}
                  >
                    {fileName.includes("Upload") ? (
                      <FontAwesomeIcon icon="fa fa-upload" />
                    ) : (
                      ""
                    )}
                    &nbsp;&nbsp;
                    {fileName}
                  </Button>

                  <FloatingLabel
                    controlId="signup.image"
                    label="Image"
                    className="imagelabel text-white"
                  >
                    <Form.Control
                      className="bg-company text-white"
                      type="file"
                      ref={hiddenFileInput}
                      name="Image"
                      placeholder="Image"
                      value={form.Image}
                      onChange={handleChangeimg}
                      isInvalid={!!errors.Image}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Image}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
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
                      className="registerbtn btn-success"
                      onClick={SignupUser}
                      // disabled={Object.values(errors).some(Boolean) || Object.values(form).some(v => !v)}
                    >
                      <FontAwesomeIcon icon="fa fa-right-to-bracket" /> Register
                    </Button>

                    {/* <Link to="/login"> */}
                    {/* <Button
                                            className='loginbtn btn-secondary'
                                        >
                                            <FontAwesomeIcon icon="fa fa-user-plus" /> Login
                                        </Button> */}
                    {/* </Link> */}
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
