import { Button, Modal } from "react-bootstrap";

import "./modal-del.css";
import { useDispatch } from "react-redux";
import { addlogin } from "../../reduxslices/loginslice";

const Modal_logout = ({ show, onClose, onLogout, user }) => {
  const logindispatch = useDispatch();

  async function agreelogout() {
    // onLogout(user);
    logindispatch(addlogin(""));
    onClose();
  }
  return (
    <Modal className="modal-lo-main" show={show} onHide={onClose}>
      <Modal.Header className="modal-del py-3">
        <Modal.Title className="fs-5">Confirm Logout</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 py-1">
        Are you sure you want to logout from Tasker.
      </Modal.Body>

      <Modal.Footer className="modal-del">
        <Button
          variant="body"
          className="text-company fw-medium"
          onClick={onClose}
        >
          DISAGREE
        </Button>
        <Button
          variant="body"
          className="text-company fw-medium"
          onClick={agreelogout}
        >
          AGREE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modal_logout;
