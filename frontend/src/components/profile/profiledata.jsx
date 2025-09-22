import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import "./profiledata.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ToastAlert from "../toastalert/toast";
import { useSelector } from "react-redux";

export default function ProfileData({ users, FetchUser, BEurl }) {
  const [errors, setErrors] = useState({});
  //   const [user, setuser] = useState({});
  const [form, setForm] = useState({
    Email: "",
    // Password: "",
    // ConfirmPassword: "",
    Name: "",
    BirthDate: "",
    ContactNumber: "",
    // Image: "",
    SecurityAnswer: "",
    SecurityQuestion: "",
  });
  const [toast, settoast] = useState({ show: false });

  const loginArr = useSelector((state) => state.login.token);
  const currentUser =
    loginArr.length > 0 ? loginArr[loginArr.length - 1] : null;

  const token = currentUser ? currentUser.token : null;
  const userid = currentUser ? currentUser.user_id : null;

  const [userdata, setuserdata] = useState({});

  async function FetchUser() {
    try {
      const res = await fetch(`${BEurl}/users/${userid}`, {
        headers: {
          "X-Auth-Token": token,
        },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setuserdata(data);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    if (userid && token) {
      FetchUser();
    }
  }, [userid, token]);

  async function UpdateUser() {
    try {
      const res = await fetch(`${BEurl}/users/${userdata._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": token,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        settoast({
          show: true,
          header_toast: `Update Success`,
          text: `Data of User ${userdata.Name} Successfully Updated۔`,
          bg: "success",
          status: "circle-check",
        });
        setTimeout(() => {
          FetchUser();
        }, 1500);
      } else {
        settoast({
          show: true,
          header_toast: `Update Failed`,
          text: `Data of User ${userdata.Name} Failed to Update`,
          bg: "danger",
          status: "circle-xmark",
        });
      }
    } catch (error) {
      console.log("Error updating up user:");
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

  function handleEmail(e) {
    const { value } = e.target;
    if (value) {
      settoast({
        show: true,
        header_toast: `Not Allowed to change Email`,
        text: `Email cannot be changed after registration`,
        bg: "danger",
        status: "circle-xmark",
      });
    }
  }

  useEffect(() => {
    if (userdata) {
      setForm((prev) => ({
        ...prev,
        Email: userdata.Email || "",
        Name: userdata.Name || "",
        BirthDate: userdata.BirthDate ? userdata.BirthDate.slice(0, 10) : "",
        ContactNumber: userdata.ContactNumber || "",
        // Image: user.Image || "",
        SecurityAnswer: userdata.SecurityAnswer || "",
        SecurityQuestion: userdata.SecurityQuestion || "",
      }));

      // console.log(form.ContactNumber);
    }
  }, [userdata]);

  return (
    <Container fluid className="mt-4">
      <Row className="d-flex justify-content-center">
        <Col xl={10} lg={10} md={10} sm={10}>
          <Card className="shadow">
            <Card.Header
              as="h5"
              className="p-3 bg-info text-white text-profile"
            >
              Welcome,{" "}
              <span className="shadow px-1 py-2 bg-success rounded fs-6 text-user">
                {userdata ? userdata.Name : ""}
              </span>{" "}
              to Tasker App
            </Card.Header>
            <Card.Body>
              <Card.Title className="text-center text-decoration-underline text-capitalize">
                Update your Details Here
              </Card.Title>

              {/*
                            Image: "/image/failed",
                            SecurityAnswer: "failed",
                            SecurityQuestion: "failed?" */}

              <Row className="mt-4 justify-content-center">
                <Col xl={3} lg={4} md={4} sm={5} xs={12}>
                  <FloatingLabel
                    controlId="floatingInput.name"
                    label="Name"
                    className="mb-3"
                  >
                    <Form.Control
                      className="border-custom"
                      type="text"
                      name="Name"
                      placeholder="Name"
                      value={form.Name}
                      onChange={handleChange}
                      isInvalid={!!errors.Name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Name}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col xl={3} lg={4} md={4} sm={5} xs={12}>
                  <FloatingLabel
                    controlId="floatingInput.contact"
                    label="Contact"
                    className="mb-3"
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

                <Col xl={3} lg={4} md={4} sm={5} xs={12}>
                  <FloatingLabel
                    controlId="floatingInput.email"
                    onMouseEnter={handleEmail}
                    label="Email"
                    className="mb-3"
                  >
                    <Form.Control
                      className="border-custom emailnot"
                      type="email"
                      name="Email"
                      placeholder="Email"
                      value={form.Email}
                      // onChange={handleChange}
                      // isInvalid={!!errors.Email}
                      disabled
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Email}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col xl={3} lg={4} md={4} sm={5} xs={12}>
                  <FloatingLabel
                    controlId="floatingInput.dob"
                    label="Date of Birth"
                    className="mb-3"
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

                <Col xl={3} lg={4} md={4} sm={5} xs={12}>
                  <FloatingLabel
                    controlId="floatingInput.password"
                    label="New Password"
                    className="mb-3"
                  >
                    <Form.Control
                      className="border-custom"
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      value={form.Password}
                      onChange={handleChange}
                      isInvalid={!!errors.Password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col xl={3} lg={4} md={4} sm={5} xs={12}>
                  <FloatingLabel
                    controlId="floatingInput.confirmpassword"
                    label="Confirm Password"
                    className="mb-3"
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

                <Col xl={3} lg={6} md={6} sm={5} xs={12}>
                  <FloatingLabel
                    controlId="floatingInput.SecurityQuestion"
                    label="Security Question"
                    className="mb-3"
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

                <Col xl={3} lg={6} md={6} sm={5} xs={12}>
                  <FloatingLabel
                    controlId="floatingInput.SecurityAnswer"
                    label="Security Answer"
                    className="mb-3"
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

                <Col xl={3} lg={4} md={4} sm={5} xs={12}>
                  <FloatingLabel
                    controlId="floatingInput.image"
                    label="Image"
                    className="mb-3"
                  >
                    <Form.Control
                      className=""
                      type="file"
                      name="Image"
                      placeholder="Image"
                      value={form.Image}
                      onChange={handleChange}
                      isInvalid={!!errors.Image}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Image}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>

              <Row className="mt-4 mb-3 justify-content-center row-btn">
                <Col xl={2} lg={2} md={2} sm={6} className="text-lg-end">
                  <Link to="/">
                    <Button className="btn-secondary p-2">
                      <FontAwesomeIcon icon="fa fa-cancel" /> Cancel
                    </Button>
                  </Link>
                </Col>

                <Col xl={2} lg={2} md={2} sm={6} className="text-lg-start">
                  <Button
                    className="btn-success p-2"
                    onClick={UpdateUser}
                    disabled={
                      Object.values(errors).some(Boolean) ||
                      Object.values(form).some((v) => !v)
                    }
                  >
                    <FontAwesomeIcon icon="fa fa-user" /> Update
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastAlert
        show={toast.show}
        onClose={() => settoast({ ...toast, show: false })}
        header_toast={toast.header_toast}
        bg={toast.bg}
        status={toast.status}
        text={toast.text}
      />
    </Container>
  );
}
