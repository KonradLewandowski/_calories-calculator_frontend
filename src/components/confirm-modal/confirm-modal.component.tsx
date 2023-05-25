import { Modal, Button } from "react-bootstrap";
interface IConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModalComponent = ({
  show,
  onClose,
  onConfirm,
}: IConfirmModalProps) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Image Removal</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to remove the image?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Remove Image
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModalComponent;
