import { Modal } from "react-bootstrap";
import { useContext } from "react";

import { BiErrorCircle } from "react-icons/bi";
import { MdDoneOutline } from "react-icons/md";

import InfoContext from "../../contexts/info.context";

// import styles from "./info-modal.module.scss";

const InfoModalComponent = () => {
  const {
    infoState: { status, infoMessage },
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
      className="p-0"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {!status ? (
            <BiErrorCircle color="red" size={64} />
          ) : (
            <MdDoneOutline color="darkgreen" size={64} />
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{infoMessage}</p>
      </Modal.Body>
    </Modal>
  );
};

export default InfoModalComponent;
