import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Form, Container, Row } from "react-bootstrap";
import { fetchLoginUser } from "../../services/fetch-data.service";
import { ILoginUserCredentials } from "../../interfaces/user.interface";
import UserContext from "../../contexts/user.context";
import InfoContext from "../../contexts/info.context";

import styles from "./login-form.module.scss";

const LogInFormComponent = () => {
  const { setModalShow, setInfoState, setLoading } = useContext(InfoContext);
  const { setUserData, userData } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ILoginUserCredentials>();

  const handleFormSubmit = async (input: ILoginUserCredentials) => {
    try {
      console.log("input: ", input);
      setLoading(true);

      const response = await fetchLoginUser(input);

      setInfoState(response);

      if (response.status) {
        setUserData(response.body);
        navigate("/", { replace: true });
      }
    } catch (error) {
      setInfoState({ infoMessage: "An error occurred while logging in!" });

      console.error("LoginFormComponent Error: ", error);
    } finally {
      setLoading(false);
      setModalShow(true);

      reset({ password: "" });
    }
  };

  return (
    <Container fluid="lg">
      <Row
        className={` align-items-center justify-content-center ${styles.klRow} `}
      >
        <Form
          id="loginForm"
          onSubmit={handleSubmit(handleFormSubmit)}
          className={`${styles.klRow__form} shadow-lg rounded-4 p-4`}
        >
          <Form.Group className="mb-3">
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter login"
              isInvalid={!!errors.login}
              {...register("login", {
                required: "Required",
              })}
              disabled={!!userData?.username}
            />

            <Form.Control.Feedback type="invalid">
              {errors.login?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              isInvalid={!!errors.password}
              {...register("password", { required: "Required" })}
              disabled={!!userData?.username}
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
            disabled={isSubmitting || !!userData?.username}
          >
            Log in
          </Button>

          <Form.Group className="mb-3">
            <Form.Text className="text-muted">
              You don't have an account?{" "}
              <Link
                to={`${!userData?.username ? "/signup" : "/"}`}
                className="p-0"
              >
                Sign up!
              </Link>
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Text className="text-muted">
              Forgot your password, a token expired or didn't arrived? Go to the{" "}
              <Link
                to={`${!userData?.username ? "/reset-page" : "/"}`}
                className="p-0"
              >
                reset page.
              </Link>
            </Form.Text>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

export default LogInFormComponent;
