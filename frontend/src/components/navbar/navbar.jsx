import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Col,
  Row,
  Container,
  Navbar,
  Nav,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";
import "../navbar/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalComp from "../modal/modal_add";
import ProfileIcon from "../profile/profile";
import ModalMain from "../modal/modalmain";
import { useEffect, useState } from "react";
import Modal_logout from "../modal/modal_logout";
import LoginForm from "../login/loginform";
import SignupForm from "../signup/signupform";
import { useSelector } from "react-redux";

library.add(fas);

function Navcomp({
  srcimg,
  FetchTasks,
  users,
  FetchCategory,
  category,
  BEurl,
  // FetchUser,
}) {
  useEffect(() => {
    FetchTasks();
    // FetchUser();
    // console.log(users);
  }, []);

  const user1 = users[0];
  const [statusl, setstatusl] = useState({ show: false });
  const loginArr = useSelector((state) => state.login.token);
  const currentUser =
    loginArr.length > 0 ? loginArr[loginArr.length - 1] : null;

  const token = currentUser ? currentUser.token : null;
  const userid = currentUser ? currentUser.user_id : null;

  async function logouthandle() {
    try {
      setstatusl({ show: true });
    } catch (error) {
      console.log(`show alert of error: ${error.message}`);
    }
  }

  const [userdata, setuserdata] = useState(false);

  async function FetchUser() {
    try {
      console.log(userid);
      // const res = await fetch(`${BEurl}/users/${userid}`);
      // if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      // const data = await res.json();
      // setuserdata(data);
    } catch (error) {
      console.log("Error fetching data:");
    }
  }

  useEffect(() => {
    // FetchUser();
  }, []);

  return (
    <>
      <Navbar expand="lg" className="bg-white py-lg-2 py-1">
        <Container fluid>
          <Navbar.Brand className="ps-lg-4" href="/">
            <img className="logomain w-100" src={srcimg} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-2" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto fw-bold gap-lg-3 gap-2 navbar-main">
              <Nav.Link
                className="px-lg-3 rounded text-center"
                as={NavLink}
                to="/"
              >
                <FontAwesomeIcon icon="fa fa-list-ul" /> All Tasks
              </Nav.Link>
              <Nav.Link
                className="px-lg-3 rounded text-center"
                as={NavLink}
                to="/fav"
              >
                <FontAwesomeIcon icon="fa fa-bookmark" />
                Favourite
              </Nav.Link>
              <Nav.Link
                className="px-lg-3 rounded text-center"
                as={NavLink}
                to="/work"
              >
                <FontAwesomeIcon icon="fa fa-briefcase" />
                Work
              </Nav.Link>
              <Nav.Link
                className="px-lg-3 rounded text-center"
                as={NavLink}
                to="/personal"
              >
                <FontAwesomeIcon icon="fa fa-user" /> Personal
              </Nav.Link>
              <Nav.Link
                className="px-lg-3 rounded text-center"
                as={NavLink}
                to="/learning"
              >
                <FontAwesomeIcon icon="fa fa-graduation-cap" /> Learning
              </Nav.Link>
            </Nav>
            <div className="custom-divider d-lg-none"></div>

            {token ? (
              <Nav className="fw-bold pe-lg-4 pe-1 navbar-account mt-lg-0 mt-2 my-auto gap-1">
                {/* <Row className="d-flex flex-row"> */}
                {/* <Col lg={4} className="my-auto"> */}
                <span className="my-auto me-lg-4 d-block">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="none"
                      className=""
                      id="dropdown-basic"
                    >
                      <ProfileIcon userid={userid} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="text-center">
                      <Dropdown.Item
                        as={NavLink}
                        to="/profile"
                        className="my-auto firstitem border-bottom"
                      >
                        {userid && userid.Name ? userid.Name : ""}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={logouthandle}
                        className="my-auto seconditem"
                      >
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
                {/* </Col> */}

                {/* <Col lg={8} className="my-auto"> */}
                <ModalComp
                  FetchTasks={FetchTasks}
                  FetchCategory={FetchCategory}
                  category={category}
                  BEurl={BEurl}
                />
                {/* </Col> */}
                {/* </Row> */}
              </Nav>
            ) : (
              <Nav className="fw-bold pe-lg-4 pe-1 mt-lg-0 mt-2 my-auto gap-3">
                <LoginForm
                  FetchTasks={FetchTasks}
                  users={users}
                  BEurl={BEurl}
                />
                <SignupForm users={users} BEurl={BEurl} />
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal_logout
        show={statusl.show}
        onClose={() => setstatusl(false)}
        // onLogout={onLogout}
        // user={user1}
      />
    </>
  );
}

export default Navcomp;
