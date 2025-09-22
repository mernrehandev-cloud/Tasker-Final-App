import { definition } from "@fortawesome/free-brands-svg-icons/fa11ty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
// import './toast.css';

function ToastAlert({ show, onClose, header_toast, text, bg, status }) {
    return (
        <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1055, position: "fixed" }}>
            <Toast bg={bg} onClose={onClose} show={show} delay={7000} autohide>
                <Toast.Header>
                    {status ? (
                        <FontAwesomeIcon icon={['fas', `${status}`]} beatFade className="me-2" />
                    ) : ""}
                    <strong className="me-auto">{header_toast}</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body className="text-white">{text}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default ToastAlert;
