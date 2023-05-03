import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Form, Container, Row } from "react-bootstrap";
import { fetchLoginUser } from "../../services/fetch-data.service";
import { ILoginUserCredentials } from "../../interfaces/user.interface";
import UserContext from "../../contexts/user.context";
import ErrorContext from "../../contexts/error.context";

import styles from "./login-form.module.scss";

const LogInFormComponent = () => {
  const { setModalShow, setErrorMessage } = useContext(ErrorContext);
  const { setUserData } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginUserCredentials>();

  const onSubmit = async (input: ILoginUserCredentials) => {
    try {
      const response = await fetchLoginUser(input);

      if (response.hasOwnProperty("error")) {
        setModalShow(true);
        setErrorMessage(response.error);
        return;
      }

      setUserData(response);
    } catch (error) {
      setModalShow(true);
      setErrorMessage("An error occurred while logging in.");
      console.error(error);
    }
  };

  return (
    <Container fluid="sm">
      <Row
        className={`d-flex align-items-center justify-content-center ${styles.klRow}`}
      >
        <Form
          id="loginForm"
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.klRow__loginForm} shadow-lg rounded-4 p-4`}
        >
          <Form.Group className="mb-3" controlId="formBasicLogin">
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter login"
              {...register("login", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.login?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              isInvalid={!!errors.password}
              {...register("password", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            className="mb-3"
            variant="outline-secondary"
            type="submit"
            form="loginForm"
            disabled={isSubmitting}
          >
            Log in
          </Button>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Text className="text-muted">
              You don't have an account?{" "}
              <Link to="/signup" className="p-0">
                Sign up
              </Link>
            </Form.Text>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

export default LogInFormComponent;
