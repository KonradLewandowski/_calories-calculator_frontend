import { Modal } from "react-bootstrap";
import { useContext } from "react";
import ErrorContext from "../../contexts/error.context";

import styles from "./error-modal.module.scss";

interface IProps {
  show: boolean;
  onHide: () => void;
}

const ErrorModalComponent = (props: IProps) => {
  const { errorMessage, errorStatus } = useContext(ErrorContext);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Something went wrong!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>{errorStatus}</h3>
        <p>{errorMessage}</p>
      </Modal.Body>
    </Modal>
  );
};

export default ErrorModalComponent;
