import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Container, Row } from "react-bootstrap";
import { fetchLoginUser } from "../../services/fetch-data.service";
import styles from "./login-form.module.scss";
import { ILoginUserCredentials } from "../../models/user.model";

const LoginFormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginUserCredentials>();

  const onSubmit = async (input: ILoginUserCredentials) => {
    const userResponse = await fetchLoginUser(input);

    console.log("userResponse", userResponse);
    if (!userResponse) return console.error("error");
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
            <Form.Label>Email address</Form.Label>
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
              <Button className="p-0" variant="link" size="sm">
                Sign in
              </Button>
            </Form.Text>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

export default LoginFormComponent;
