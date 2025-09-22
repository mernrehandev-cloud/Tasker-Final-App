import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form, FloatingLabel, ProgressBar } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import { Card, Col, Row } from "react-bootstrap";
import ToastAlert from "../toastalert/toast";
import { addcategory } from "../../reduxslices/categoryslice";
import { useDispatch, useSelector } from "react-redux";
import { addstatus } from "../../reduxslices/statusslice";

function ModalComp({
  FetchTasks,
  FetchCategor,
  category,
  BEurl,
  content,
  icon,
}) {
  const [show, setShow] = useState(false);
  const [status, setstatus] = useState([]);
  const [error, seterror] = useState(null);
  const [toast, settoast] = useState({ show: false });
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    Title: "",
    DueDate: "",
    DueTime: "",
    Category: "",
    Status: "",
    Progress: 0,
    Desc: "",
  });
  const loginArr = useSelector((state) => state.login.token);
  const currentUser =
    loginArr.length > 0 ? loginArr[loginArr.length - 1] : null;

  const token = currentUser ? currentUser.token : null;
  const userid = currentUser ? currentUser.user_id : null;

  const handleClose = () => {
    setShow(false);
    setForm({
      Title: "",
      DueDate: "",
      DueTime: "",
      Category: "",
      Status: "",
      Progress: 0,
      Desc: "",
    });
  };

  const handleShow = () => setShow(true);

  function handleChange(e) {
    const { name, value } = e.target;
    let err = "";

    // Validation for each field
    if (name === "Title") {
      if (!value) err = "Title is required.";
      else if (value.length > 30 || value.length < 3)
        err = "Title must be 3-30 characters.";
      else if (!/^[a-zA-Z0-9 ]*$/.test(value))
        err = "Only letters, numbers, and spaces allowed.";
    }
    if (name === "DueDate") {
      if (!value) err = "Due date is required.";
    }
    if (name === "DueTime") {
      if (!value) err = "Due time is required.";
    }
    if (name === "Category") {
      if (!value) err = "Category is required.";
    }
    if (name === "Status") {
      if (!value) err = "Status is required.";
    }
    if (name === "Progress") {
      let numValue = Number(value);
      if (isNaN(numValue) || numValue < 0 || numValue > 100) {
        err = "Progress must be between 0 and 100.";
      }
      setForm((prev) => ({ ...prev, Progress: numValue }));
      setErrors((prev) => ({ ...prev, Progress: err }));
      return;
    }

    if (name === "Desc") {
      if (!value) err = "Description is required.";
      else if (value.length < 5)
        err = "Description must be at least 5 characters.";
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: err }));
  }

  function getProgressClass(progress) {
    if (progress === 100) return "done";
    if (progress === 0) return "empty";
    return "prog";
  }

  const statuses = useSelector((state) => state.status.list);
  const statdispatch = useDispatch();

  async function FetchStatus() {
    try {
      const res = await fetch(`${BEurl}/task_status`);
      if (!res.ok) {
        console.log("Error");
      } else {
        const data = await res.json();
        if (data.length > 0) {
          data.map((d) => {
            statdispatch(addstatus({ id: d._id, Name: d.Name }));
          });
        }
      }
    } catch (error) {
      seterror(error.message || "Failed to Fetch Data");
    }
  }

  const categories = useSelector((state) => state.category.list);
  const catdispatch = useDispatch();

  async function FetchCategory() {
    try {
      const res = await fetch(`${BEurl}/task_category`, {
        headers: {
          "X-Auth-Token": token,
        },
      });
      if (res) {
        const data = await res.json();
        if (data.length > 0) {
          data.map((d) => {
            catdispatch(addcategory({ id: d._id, Name: d.Name }));
          });
        }
      } else {
        alert("Failed to Fetch Category");
      }
    } catch (error) {
      seterror(error.message || "Failed to Fetch Data");
    }
  }

  async function addtask() {
    // Validate all fields before submit
    const newErrors = {};
    if (!form.Title) newErrors.Title = "Title is required.";
    else if (form.Title.length > 30 || form.Title.length < 3)
      newErrors.Title = "Title must be 3-30 characters.";
    else if (!/^[a-zA-Z0-9 ]*$/.test(form.Title))
      newErrors.Title = "Only letters, numbers, and spaces allowed.";

    if (!form.DueDate) newErrors.DueDate = "Due date is required.";
    if (!form.DueTime) newErrors.DueTime = "Due time is required.";
    if (!form.Category) newErrors.Category = "Category is required.";
    if (!form.Status) newErrors.Status = "Status is required.";
    // if (!form.Progress) newErrors.Progress = "Progress is required.";
    if (form.Progress === null || form.Progress === undefined) {
      newErrors.Progress = "Progress is required.";
    } else if (
      isNaN(form.Progress) ||
      form.Progress < 0 ||
      form.Progress > 100
    ) {
      newErrors.Progress = "Progress must be between 0 and 100.";
    }
    if (!form.Desc) newErrors.Desc = "Description is required.";
    else if (form.Desc.length < 5)
      newErrors.Desc = "Description must be at least 5 characters.";

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      setErrors((prev) => ({
        ...prev,
        form: "Please fix errors and fill all required fields.",
      }));
      return;
    }

    try {
      const res = await fetch(`${BEurl}/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": token,
        },
        body: JSON.stringify(form),
      });

      if (res.status == "401") {
        settoast({
          show: true,
          header_toast: "UnAuthorized Error",
          text: `Unable to add ${form.Title}`,
          bg: "danger",
          status: "circle-xmark",
        });

        setTimeout(() => {
          settoast({ ...toast, show: false });
        }, 1500);
      }

      setForm({
        Title: "",
        DueDate: "",
        DueTime: "",
        Category: "",
        Status: "",
        Progress: "",
        Desc: "",
      });
      handleClose();

      if (res.ok) {
        settoast({
          show: true,
          header_toast: "Successfully Added Task",
          text: `Title: ${form.Title}`,
          bg: "success",
          status: "circle-check",
        });

        setTimeout(() => {
          FetchTasks();
          settoast({ ...toast, show: false });
        }, 1500);
      }
    } catch (error) {
      seterror(error.message);
    }
  }

  useEffect(() => {
    FetchCategory();
    FetchStatus();
  }, []);

  return (
    <>
      <Button className="modalbtn my-auto" onClick={handleShow}>
        <FontAwesomeIcon icon={"fa fa-square-plus"} />{" "}
        <span className="text-capitalize">
          {content ? content : "Add task"}
        </span>
      </Button>

      <Row className="d-flex justify-content-center">
        <Col className="d-flex justify-content-center">
          <Modal
            style={{ transform: "translate(-50px)" }}
            className="taskmodal"
            show={show}
            onHide={handleClose}
          >
            <Card className="card-add">
              <Modal.Header className="modal-header-add bg-company p m-0 mb-0">
                <Modal.Title className="text-white fs-5">
                  Enter Task Details
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <FloatingLabel
                    controlId="floatingInput.title"
                    label="Title"
                    className="mb-3"
                  >
                    <Form.Control
                      className="border-custom"
                      type="text"
                      name="Title"
                      placeholder="Title"
                      value={form.Title}
                      onChange={handleChange}
                      isInvalid={!!errors.Title}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Title}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <Row>
                    <Col className="col-6">
                      <FloatingLabel
                        controlId="floatingInput.date"
                        label="Due Date"
                        className="mb-3"
                      >
                        <Form.Control
                          className="border-custom"
                          type="date"
                          name="DueDate"
                          placeholder="Due Date"
                          value={form.DueDate}
                          onChange={handleChange}
                          isInvalid={!!errors.DueDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.DueDate}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                    <Col className="col-6">
                      <FloatingLabel
                        controlId="floatingInput.time"
                        label="Due Time"
                        className="mb-3"
                      >
                        <Form.Control
                          className="border-custom"
                          type="time"
                          name="DueTime"
                          placeholder="Due Time"
                          value={form.DueTime}
                          onChange={handleChange}
                          isInvalid={!!errors.DueTime}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.DueTime}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="col-6">
                      <FloatingLabel
                        className="mb-3"
                        controlId="floatingSelect"
                        label="Category"
                      >
                        <Form.Select
                          className="border-custom"
                          name="Category"
                          value={form.Category}
                          onChange={handleChange}
                          isInvalid={!!errors.Category}
                        >
                          <option disabled value="">
                            Category
                          </option>
                          {categories ? (
                            categories.map((c, i) => (
                              <option key={i} value={c.id}>
                                {c.Name}
                              </option>
                            ))
                          ) : (
                            <option>Error loading options</option>
                          )}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.Category}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                    <Col className="col-6">
                      <FloatingLabel
                        controlId="floatingSelect.status"
                        className="mb-3"
                        label="Status"
                      >
                        <Form.Select
                          className="border-custom"
                          name="Status"
                          value={form.Status}
                          onChange={handleChange}
                          isInvalid={!!errors.Status}
                        >
                          <option disabled value="">
                            Status
                          </option>
                          {statuses ? (
                            statuses.map((s, i) => (
                              <option key={i} value={s.id}>
                                {s.Name}
                              </option>
                            ))
                          ) : (
                            <option>Error loading options</option>
                          )}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.Status}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  {/* <FloatingLabel controlId="floatingInput.progress" label="Progress" className="mb-3">
                                        <Form.Control
                                            className="border-custom"
                                            type="number"
                                            name="Progress"
                                            placeholder="Progress"
                                            min={0}
                                            max={100}
                                            value={form.Progress}
                                            onChange={handleChange}
                                            isInvalid={!!errors.Progress}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.Progress}
                                        </Form.Control.Feedback>
                                    </FloatingLabel> */}

                  <Form.Group className="mb-3 progressmain">
                    <Form.Label>Progress</Form.Label>
                    <Form.Range
                      min={0}
                      max={100}
                      value={form.Progress}
                      name="Progress"
                      onChange={handleChange}
                      className={getProgressClass(form.Progress)}
                    />
                    <ProgressBar
                      id="progresslawa"
                      now={form.Progress}
                      label={`${form.Progress}%`}
                      className={getProgressClass(form.Progress)}
                    />
                  </Form.Group>

                  <FloatingLabel
                    controlId="floatingInput.desc"
                    label="Description"
                    className="mb-"
                  >
                    <Form.Control
                      className="border-custom"
                      as="textarea"
                      name="Desc"
                      placeholder="Description"
                      value={form.Desc}
                      onChange={handleChange}
                      isInvalid={!!errors.Desc}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Desc}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  {errors.form && (
                    <div className="text-danger mb-2">{errors.form}</div>
                  )}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button className="bg-danger btn-modal" onClick={handleClose}>
                  <span>Cancel</span>
                </Button>
                <Button
                  className="modalbtn2"
                  onClick={addtask}
                  disabled={
                    Object.values(errors).some(Boolean) ||
                    Object.entries(form).some(
                      ([key, v]) => v === "" || v === null || v === undefined
                    )
                  }
                >
                  <FontAwesomeIcon icon="fa fa-save" /> <span>Submit</span>
                </Button>
              </Modal.Footer>
            </Card>
          </Modal>
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
    </>
  );
}

export default ModalComp;
