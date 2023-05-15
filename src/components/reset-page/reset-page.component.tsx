import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  Container,
  Row,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import {
  fetchResetToken,
  fetchResetPassword,
} from "../../services/fetch-data.service";
import { IEmailCredentials } from "../../interfaces/user.interface";
import InfoContext from "../../contexts/info.context";

import styles from "./reset-page.module.scss";

enum ISubmitType {
  Password = "password",
  Token = "token",
}
const ResetPageComponent = () => {
  const { setModalShow, setInfoState, setLoading } = useContext(InfoContext);
  const [submitType, setSubmitType] = useState<ISubmitType>(
    ISubmitType.Password
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IEmailCredentials>();

  const handleResetTokenSubmit = async (input: IEmailCredentials) => {
    try {
      setLoading(true);

      const response = await fetchResetToken(input);

      setInfoState(response);

      navigate("/login");
    } catch (error) {
      setInfoState({
        errorMessage: "An error occurred while resending the token.",
      });

      console.error("LoginFormComponent Error: ", error);
    } finally {
      setLoading(false);
      setModalShow(true);
    }
  };

  const handleResetPasswordSubmit = async (input: IEmailCredentials) => {
    try {
      setLoading(true);

      const response = await fetchResetPassword(input);

      setInfoState(response);
    } catch (error) {
      setInfoState({
        errorMessage: "An error occurred while resetting password.",
      });

      console.error("LoginFormComponent Error: ", error);
    } finally {
      setLoading(false);
      setModalShow(true);

      navigate("/login");
    }
  };

  const handleFormSubmit = (input: IEmailCredentials) => {
    submitType === ISubmitType.Token
      ? handleResetTokenSubmit(input)
      : handleResetPasswordSubmit(input);
  };

  return (
    <Container fluid="sm">
      <Row
        className={`d-flex align-items-center justify-content-center ${styles.klRow}`}
      >
        <Form
          id="resetForm"
          className={`${styles.klRow__resendForm} shadow-lg rounded-4 p-4`}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Form.Group className="mb-3" controlId="formBasicLogin">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email address"
              {...register("email", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <ToggleButtonGroup
            className="mb-3"
            type="radio"
            name="submitType"
            value={submitType}
            onChange={(value) => setSubmitType(value)}
          >
            <ToggleButton
              id="password-toggle"
              value={ISubmitType.Password}
              variant="outline-secondary"
            >
              Reset password
            </ToggleButton>
            <ToggleButton
              id="token-toggle"
              value={ISubmitType.Token}
              variant="outline-secondary"
            >
              Reset token
            </ToggleButton>
          </ToggleButtonGroup>

          <div className="text-center">
            <Button
              className="mb-3 "
              variant="outline-secondary"
              type="submit"
              form="resetForm"
              disabled={isSubmitting}
            >
              Send
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  );
};

export default ResetPageComponent;
