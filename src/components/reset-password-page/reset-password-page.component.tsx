import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Container, Form, Row } from "react-bootstrap";
import { INewPassword } from "../../interfaces/user.interface";
import { fetchNewPassword } from "../../services/fetch-data.service";
import InfoContext from "../../contexts/info.context";
import UserContext from "../../contexts/user.context";

import styles from "./reset-password-page.module.scss";

interface IToken {
  getToken(): string | null;
}

const ResetPasswordPageComponent = () => {
  const { setModalShow, setInfoState, setLoading } = useContext(InfoContext);
  const { userData } = useContext(UserContext);
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
    try {
      setLoading(true);
      const token = getToken();
      const response = await fetchNewPassword(token, input);

      setInfoState(response);

      response.status && navigate("/login");
    } catch (error) {
      setInfoState({
        infoMessage: "An error occurred while setting the new password.",
      });

      console.error("SingUpComponent Error: ", error);
    } finally {
      setLoading(false);
      setModalShow(true);
    }
  };

  return (
    <Container fluid="sm">
      <Row
        className={`d-flex align-items-center justify-content-center ${styles.klRow}`}
      >
        <Form
          id="resetPasswordForm"
          onSubmit={handleSubmit(handleFormSubmit)}
          className={`${styles.klRow__form} shadow-lg rounded-4 p-4`}
        >
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              isInvalid={!!errors.password}
              {...register("password", { required: "Required" })}
              disabled={!!userData?.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password again"
              isInvalid={!!errors.confirmPassword}
              {...register("confirmPassword", { required: "Required" })}
              disabled={!!userData?.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            className="mb-3"
            variant="secondary"
            type="submit"
            form="resetPasswordForm"
            disabled={isSubmitting || !!userData?.username}
          >
            Confirm
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default ResetPasswordPageComponent;
