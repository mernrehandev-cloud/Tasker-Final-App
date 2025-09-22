import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faClipboard,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./card.css";
import {
  faArrowsRotate,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import ModalEdit from "../modal/modal_edit";
import { useEffect, useState } from "react";
import ToastAlert from "../toastalert/toast";
import Modal_del from "../modal/modal_del";

function CardItem({
  task,
  onDelete,
  FetchTasks,
  FetchonUpdate,
  BEurl,
  setmaintoast,
}) {
  const [statusm, setstatusm] = useState({ show: false });
  const [statusm2, setstatusm2] = useState({ show: false });
  const [toast, settoast] = useState({ show: false });

  async function edittask(task) {
    try {
      setstatusm({ show: true });
    } catch (error) {
      console.log(`show alert of error: ${error.message}`);
    }
  }

  async function Delhandle() {
    try {
      setstatusm2({ show: true });
    } catch (error) {
      console.log(`show alert of error: ${error.message}`);
    }
    // onDelete(task);
  }

  return (
    <>
      <Container fluid className="mt-4">
        <Card className="shadow tasks">
          <Card.Body
            className={`body-card p-lg-4 border-${task.Category.ColorCode}`}
          >
            <Card.Title className="pb-2">{task.Title}</Card.Title>
            <Row className="date-time pb-3">
              <Col lg={6} md={6} sm={6} xs={6}>
                <span className="icon-card ">
                  <FontAwesomeIcon
                    icon={"fa fa-calendar-days"}
                    className={`text-${task.Category.ColorCode}`}
                  />
                </span>

                <span className="ps-2">{task.DueDate.split("T")[0]}</span>
              </Col>

              <Col lg={6} md={6} sm={6} xs={6}>
                <span className="icon-card">
                  <FontAwesomeIcon
                    icon={"fa fa-clock"}
                    className={`text-${task.Category.ColorCode}`}
                  />
                </span>

                <span className="ps-2">{task.DueTime}</span>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col lg={12} md={12} sm={12} xs={12} className="">
                <h5 className="descmain">{task.Desc}</h5>
              </Col>
            </Row>

            <Row className="other-details mb-2 pb-lg-4">
              <Col lg={6} md={6} sm={6} xs={6}>
                <span className="icon-card">
                  <FontAwesomeIcon
                    icon={"fa fa-chart-line"}
                    className={`text-${task.Category.ColorCode}`}
                  />
                </span>

                <span className="ps-2">Progress:</span>
                <span className="ps-1 detail-card">{task.Progress}%</span>
              </Col>

              <Col lg={6} md={6} sm={6} xs={6}>
                <span className="icon-card">
                  {task.Status.Icon ? (
                    <FontAwesomeIcon
                      icon={`fa fa-${task.Status.Icon}`}
                      className={`text-${task.Category.ColorCode}`}
                    />
                  ) : (
                    ""
                  )}
                </span>

                <span className="ps-2">Status:</span>
                <span className="ps-1 detail-card">{task.Status.Name}</span>
              </Col>
            </Row>

            <Row className="pt-2 align-items-center ">
              <Col lg={6} md={6} sm={6} xs={6}>
                <span className="icon-card1">
                  <Button
                    onClick={() => edittask(task)}
                    className="bg-body text-warning"
                  >
                    <FontAwesomeIcon icon={"fa fa-edit"} />
                  </Button>
                </span>

                <span className="icon-card2 ms-lg-2 ms-1">
                  <Button onClick={Delhandle} className="bg-body text-danger">
                    <FontAwesomeIcon icon={"fa fa-trash-can"} />
                  </Button>
                </span>
              </Col>

              <Col lg={6} md={6} sm={6} xs={6} className="text-end pe-4">
                <span className="icon-card">
                  <Button className="bg-body text-custom ">
                    <FontAwesomeIcon icon={faStar} />
                  </Button>
                </span>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Modal_del
          show={statusm2.show}
          onClose={() => setstatusm2(false)}
          onDelete={onDelete}
          task={task}
          settoast={settoast}
        />

        <ModalEdit
          show={statusm.show}
          BEurl={BEurl}
          seltask={task}
          onClose={() => setstatusm(false)}
          FetchTasks={FetchTasks}
          FetchonUpdate={FetchonUpdate}
          setmaintoast={setmaintoast}
        />
        <ToastAlert
          show={toast.show}
          onClose={() => settoast({ ...toast, show: false })}
          header_toast={toast.header_toast}
          bg={toast.bg}
          status={toast.status}
          text={toast.text}
        />
      </Container>
    </>
  );
}

export default CardItem;
