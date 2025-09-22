import { Button, Modal } from "react-bootstrap";

import "./modal-del.css";

const Modal_del = ({ show, onClose, onDelete, task }) => {
  async function agreedel() {
    onDelete(task);
    onClose();
  }
  return (
    <Modal className="modal-del-main" show={show} onHide={onClose}>
      <Modal.Header className="modal-del py-2 mt-lg-0 mt-1 py-lg-3 ">
        <Modal.Title className="mainheader mx-auto mx-lg-0">
          Confirm Deletion
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 py-lg-1 py-0 ">
        <span className="plaintext text">
          This action cannot be undone. Are you sure you want to permanently
          delete this task from Tasker.
        </span>
      </Modal.Body>

      <Modal.Footer className="modal-del2">
        <Button
          variant="body"
          className="text-company fw-medium me-0"
          onClick={onClose}
        >
          DISAGREE
        </Button>
        <Button
          variant="body"
          className="text-company fw-medium ms-0"
          onClick={agreedel}
        >
          AGREE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modal_del;
