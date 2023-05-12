import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Container, Form, Row } from "react-bootstrap";
import { INewPassword } from "../../interfaces/user.interface";
import { fetchNewPassword } from "../../services/fetch-data.service";
import InfoContext from "../../contexts/info.context";

import styles from "./reset-password-page.module.scss";

interface IToken {
  getToken(): string | null;
}

const ResetPasswordPageComponent = () => {
  const { setModalShow, setInfoMessage, setLoading } = useContext(InfoContext);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<INewPassword>();

  const getToken: IToken["getToken"] = () => {
    const urlParams = new URLSearchParams(location.hash.substring(1));
    return urlParams.get("token");
  };

  const handleFormSubmit = async (input: INewPassword) => {
    setLoading(true);
    try {
      const token = getToken();
      const response = await fetchNewPassword(token, input);

      if (response.hasOwnProperty("errorMessage")) {
        setModalShow(true);
        setInfoMessage(response.errorMessage);
        return;
      }

      setModalShow(true);
      setInfoMessage("New password has been set. Please, log in.");

      navigate("/login");
    } catch (error) {
      setModalShow(true);
      setInfoMessage("An error occurred while setting a new password.");

      console.error("SingUpComponent Error: ", error);
    }
    setLoading(false);
  };

  return (
    <Container fluid="sm">
      <Row
        className={`d-flex align-items-center justify-content-center ${styles.klRow}`}
      >
        <Form
          id="resetPasswordForm"
          onSubmit={handleSubmit(handleFormSubmit)}
          className={`${styles.klRow__resetPasswordForm} shadow-lg rounded-4 p-4`}
        >
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              isInvalid={!!errors.password}
              {...register("password", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password again"
              isInvalid={!!errors.confirmPassword}
              {...register("confirmPassword", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            className="mb-3"
            variant="outline-secondary"
            type="submit"
            form="resetPasswordForm"
            disabled={isSubmitting}
          >
            Confirm
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default ResetPasswordPageComponent;
