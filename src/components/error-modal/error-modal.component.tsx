import { Modal } from "react-bootstrap";
import { useContext } from "react";
import ErrorContext from "../../contexts/error.context";

import styles from "./error-modal.module.scss";

const ErrorModalComponent = () => {
  const { errorMessage, setModalShow, modalShow } = useContext(ErrorContext);
  const handleClose = () => setModalShow(false);
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
      show={modalShow}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Something went wrong!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{errorMessage}</p>
      </Modal.Body>
    </Modal>
  );
};

export default ErrorModalComponent;
