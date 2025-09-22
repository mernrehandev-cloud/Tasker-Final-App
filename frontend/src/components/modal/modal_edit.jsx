import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form, FloatingLabel, ProgressBar } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import { Card, Col, Row } from "react-bootstrap";
import ToastAlert from "../toastalert/toast";
import { useSelector } from "react-redux";

function ModalEdit({
  show,
  seltask,
  onClose,
  FetchTasks,
  setmaintoast,
  BEurl,
}) {
  const [prgvalue, setprgvalue] = useState("");
  const statuses = useSelector((state) => state.status.list);
  const categories = useSelector((state) => state.category.list);
  const loginArr = useSelector((state) => state.login.token);
  const currentUser =
    loginArr.length > 0 ? loginArr[loginArr.length - 1] : null;

  const token = currentUser ? currentUser.token : null;
  const userid = currentUser ? currentUser.user_id : null;

  const [error, seterror] = useState(null);
  const [toast, settoast] = useState({ show: false });
  const [edittask, setedittask] = useState({});

  async function UpdateData() {
    try {
      // if (edittask.Progress == 100) {
      //   statuses.forEach((s) => {
      //     if (s.Name === "Done") setedittask.Status = s.id;
      //   });
      // }

      const res = await fetch(`${BEurl}/tasks/${edittask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": token,
        },
        body: JSON.stringify(edittask),
      });
      if (res.ok) {
        setmaintoast({
          show: true,
          header_toast: "Successfully Edited Task",
          text: `Title: ${edittask.Title}`,
          bg: "success",
          status: "circle-check",
        });
        FetchTasks();

        setTimeout(() => {
          setmaintoast({ ...toast, show: false });
          onClose();
        }, 2500);
      } else {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.log(error.message);
      seterror(error.message);
    }
  }

  function getProgressClass(progress) {
    if (progress === 100) return "done";
    if (progress === 0) return "empty";
    return "prog";
  }

  useEffect(() => {
    // FetchCategory();
    // FetchStatus();
    getProgressClass();
    setedittask({
      ...seltask,
      Status: seltask.Status?._id || seltask.Status,
    });
  }, [seltask]);

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col className="d-flex justify-content-center">
          <Modal show={show} onHide={onClose}>
            <Card className="card-add">
              <Modal.Header className="modal-header-edit bg-company m-0 mb-0">
                <Modal.Title className="text-white fs-5">
                  Update Task Details
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
                      placeholder="Title"
                      autoFocus
                      value={edittask.Title}
                      onChange={(e) =>
                        setedittask({ ...edittask, Title: e.target.value })
                      }
                    />
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
                          placeholder="Due Date"
                          value={
                            edittask.DueDate
                              ? new Date(edittask.DueDate)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            setedittask({
                              ...edittask,
                              DueDate: e.target.value,
                            })
                          }
                        />
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
                          placeholder="Due Time"
                          value={
                            edittask.DueTime
                              ? edittask.DueTime.slice(0, 5) // handles "HH:mm:ss" or "HH:mm"
                              : ""
                          }
                          onChange={(e) =>
                            setedittask({
                              ...edittask,
                              DueTime: e.target.value,
                            })
                          }
                        />
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
                          value={edittask.Category?._id}
                          onChange={(e) =>
                            setedittask({
                              ...edittask,
                              Category: e.target.value,
                            })
                          }
                        >
                          <option value={seltask.Category._id}>
                            {seltask.Category.Name}
                          </option>
                          {categories ? (
                            categories
                              .filter((c) => c.id !== seltask.Category._id)
                              .map((c) => (
                                <option key={c.id} value={c.id}>
                                  {c.Name}
                                </option>
                              ))
                          ) : (
                            <option>Error loading options</option>
                          )}
                        </Form.Select>
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
                          value={edittask.Status}
                          onChange={(e) => {
                            let value = e.target.value;
                            let newProgress = edittask.Progress;

                            if (value === "688cbba0aa8064f6e59aa7ca") {
                              newProgress = 100;
                            } else if (value === "688cbba0aa8064f6e59aa7c9") {
                              newProgress = 1;
                            } else if (value === "688cbba0aa8064f6e59aa7c8") {
                              newProgress = 0;
                            }

                            setedittask({
                              ...edittask,
                              Status: value,
                              Progress: newProgress,
                            });
                          }}
                        >
                          <option value={seltask.Status._id}>
                            {seltask.Status.Name}
                          </option>
                          {statuses ? (
                            statuses
                              .filter((s) => s.id !== seltask.Status._id)
                              .map((s) => (
                                <option key={s.id} value={s.id}>
                                  {s.Name}
                                </option>
                              ))
                          ) : (
                            <option key={0}>Error loading options</option>
                          )}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3 progressmain">
                    <Form.Label>Progress</Form.Label>
                    <Form.Range
                      min={0}
                      max={100}
                      value={edittask.Progress}
                      className={getProgressClass(edittask.Progress)}
                      onChange={(e) => {
                        let value = Number(e.target.value);
                        let newStatusId = edittask.Status;

                        if (value < 0) value = 0;
                        if (value > 100) value = 100;

                        // Sync status with progress
                        if (value === 0) {
                          const newStatus = statuses.find(
                            (s) => s.Name === "To Do"
                          );
                          newStatusId = newStatus ? newStatus._id : newStatusId;
                        } else if (value === 100) {
                          const newStatus = statuses.find(
                            (s) => s.Name === "Done"
                          );
                          newStatusId = newStatus ? newStatus._id : newStatusId;
                        } else if (value > 0 && value < 100) {
                          const newStatus = statuses.find(
                            (s) => s.Name === "In Progress"
                          );
                          newStatusId = newStatus ? newStatus._id : newStatusId;
                        }

                        setedittask({
                          ...edittask,
                          Progress: value,
                          Status: newStatusId,
                        });
                      }}
                    />
                    <ProgressBar
                      id="progresslawa"
                      now={edittask.Progress}
                      label={`${edittask.Progress}%`}
                      className={getProgressClass(edittask.Progress)}
                    />
                  </Form.Group>

                  <FloatingLabel
                    controlId="floatingInput.desc"
                    label="Description"
                    className="mb-3"
                  >
                    <Form.Control
                      className="border-custom"
                      as="textarea"
                      style={{ height: "150px" }}
                      placeholder="Description"
                      value={edittask.Desc}
                      onChange={(e) =>
                        setedittask({ ...edittask, Desc: e.target.value })
                      }
                    />
                  </FloatingLabel>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button className="bg-danger btn-modal" onClick={onClose}>
                  Cancel
                </Button>
                <Button className="modalbtn2" onClick={UpdateData}>
                  <FontAwesomeIcon icon="fa fa-save" /> Save
                </Button>
              </Modal.Footer>
            </Card>
          </Modal>
        </Col>
      </Row>
      {/* <ToastAlert
        show={toast.show}
        onClose={() => settoast({ ...toast, show: false })}
        header_toast={toast.header_toast}
        bg={toast.bg}
        status={toast.status}
        text={toast.text}
      /> */}
    </>
  );
}

export default ModalEdit;
