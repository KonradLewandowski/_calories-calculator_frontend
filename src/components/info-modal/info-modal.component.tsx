import { Modal } from "react-bootstrap";
import { useContext } from "react";
import InfoContext from "../../contexts/info.context";

import styles from "./info-modal.module.scss";

const InfoModalComponent = () => {
  const {
    infoState: { status = "failure", errorMessage },
    setModalShow,
    modalShow,
  } = useContext(InfoContext);

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
        <Modal.Title
          id="contained-modal-title-vcenter"
          className={`${styles[status]}`}
        >
          {status}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{errorMessage}</p>
      </Modal.Body>
    </Modal>
  );
};

export default InfoModalComponent;
