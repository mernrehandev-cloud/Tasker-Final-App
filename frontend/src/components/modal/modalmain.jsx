import { useState } from "react";
import TaskModal from "./modaltask";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './modal.css';


function ModalMain() {
    const [show, setShow] = useState(false);

    return (
        <div className="my-auto">
            <Button className="modalbtn" onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={"fa fa-square-plus"} /> Add Task
            </Button>

            <TaskModal show={show} handleClose={() => setShow(false)} />
        </div>
    );
}

export default ModalMain;
