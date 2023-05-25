import { useContext, useState } from "react";
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
import UserContext from "../../contexts/user.context";

import styles from "./reset-page.module.scss";

enum ISubmitType {
  Password = "password",
  Token = "token",
}
const ResetPageComponent = () => {
  const { setModalShow, setInfoState, setLoading } = useContext(InfoContext);
  const { userData } = useContext(UserContext);
  const [submitType, setSubmitType] = useState<ISubmitType>(
    ISubmitType.Password
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IEmailCredentials>();

  const handleResetTokenSubmit = async (input: IEmailCredentials) => {
    try {
      setLoading(true);

      const response = await fetchResetToken(input);

      setInfoState(response);

      response.status && reset({ email: "" });
    } catch (error) {
      setInfoState({
        infoMessage: "An error occurred while resending the token.",
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

      response.status && reset({ email: "" });
    } catch (error) {
      setInfoState({
        infoMessage: "An error occurred while resetting password.",
      });

      console.error("LoginFormComponent Error: ", error);
    } finally {
      setLoading(false);
      setModalShow(true);
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
          className={`${styles.klRow__form} shadow-lg rounded-4 p-4`}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email address"
              isInvalid={!!errors.email}
              {...register("email", { required: "Required" })}
              disabled={!!userData?.username}
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
              disabled={isSubmitting || !!userData?.username}
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
