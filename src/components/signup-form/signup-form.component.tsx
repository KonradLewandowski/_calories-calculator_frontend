import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Container, Form, Row } from "react-bootstrap";
import ErrorContext from "../../contexts/error.context";
import UserContext from "../../contexts/user.context";
import { fetchSignupUser } from "../../services/fetch-data.service";
import { ISignupUserCredentials } from "../../interfaces/user.interface";

import styles from "./signup-form.module.scss";

const SignupFormComponent = () => {
  const { setModalShow, setErrorMessage } = useContext(ErrorContext);
  const { setUserData } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISignupUserCredentials>();

  const onSubmit = async (input: ISignupUserCredentials) => {
    try {
      const response = await fetchSignupUser(input);

      if (response.hasOwnProperty("error")) {
        setModalShow(true);
        setErrorMessage(response.error);
        return;
      }

      setUserData(response);
    } catch (error) {
      setModalShow(true);
      setErrorMessage("An error occurred while signing up.");
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
          className={`${styles.klRow__signupForm} shadow-lg rounded-4 p-4`}
        >
          <Form.Group className="mb-3" controlId="formBasicLogin">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              {...register("username", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLogin">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              {...register("email", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
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
            form="loginForm"
            disabled={isSubmitting}
          >
            Sign up
          </Button>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Text className="text-muted">
              Do you have an account?{" "}
              <Link to="/login" className="p-0">
                Log in
              </Link>
            </Form.Text>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

export default SignupFormComponent;
