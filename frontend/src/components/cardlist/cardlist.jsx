import { Col, Container, Row } from "react-bootstrap";
import CardItem from "../card/card";

function CardList({
  tasks,
  onDelete,
  FetchTasks,
  FetchonUpdate,
  BEurl,
  setmaintoast,
}) {
  return (
    <>
      <Container fluid>
        <Row className="d-flex justify-content-center">
          {tasks.map((task) => (
            <Col
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={4}
              className="col-4"
              key={task._id}
            >
              <CardItem
                task={task}
                BEurl={BEurl}
                onDelete={onDelete}
                FetchTasks={FetchTasks}
                FetchonUpdate={FetchonUpdate}
                setmaintoast={setmaintoast}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default CardList;
