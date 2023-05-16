import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, Row } from "react-bootstrap";
import InfoContext from "../../contexts/info.context";
import {
  fetchUpdateUserData,
  fetchUploadUserImage,
} from "../../services/fetch-data.service";
import {
  IUpdateUserData,
  IUploadUserImage,
} from "../../interfaces/user.interface";

import styles from "./edit-data-page.module.scss";

const EditDataPageComponent = () => {
  const { setModalShow, setInfoState, setLoading } = useContext(InfoContext);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IUpdateUserData & IUploadUserImage>();

  const selectedImage = watch("image") as FileList | undefined;

  const handleUploadImageFormSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (selectedImage) {
        formData.append("image", selectedImage[0]);
      }

      const response = await fetchUploadUserImage(formData);

      setInfoState(response);

      // reset();
    } catch (error) {
      setInfoState({ errorMessage: "An error occurred while signing up." });

      console.error("SingUpComponent Error: ", error);
    } finally {
      setLoading(false);
      setModalShow(true);
    }
  };

  const handleUserDataFormSubmit = async (input: IUpdateUserData) => {
    try {
      setLoading(true);

      const response = await fetchUpdateUserData(input);

      setInfoState(response);
    } catch (error) {
      setInfoState({ errorMessage: "An error occurred while signing up." });

      console.error("SingUpComponent Error: ", error);
    } finally {
      setLoading(false);
      setModalShow(true);

      reset();
    }
  };

  return (
    <Container fluid="sm">
      <Row
        className={`d-flex align-items-center justify-content-center ${styles.klRow}`}
      >
        <Form
          id="uploadUserImageForm"
          className={`${styles.klRow__form} shadow-lg rounded-4 p-4 mb-5`}
          onSubmit={handleSubmit(handleUploadImageFormSubmit)}
        >
          <Form.Group className="mb-3">
            <Form.Label>Upload user image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Choose a new image"
              accept="image/*"
              {...register("image")}
              isInvalid={!!errors.image}
            />
            {/*<Form.Control.Feedback type="invalid">*/}
            {/*  {errors.image?.message}*/}
            {/*</Form.Control.Feedback>*/}
          </Form.Group>
          <Button
            variant="outline-secondary"
            type="submit"
            form="uploadUserImageForm"
            disabled={isSubmitting || !selectedImage}
          >
            Accept
          </Button>
        </Form>

        <Form
          id="updateUserDataForm"
          onSubmit={handleSubmit(handleUserDataFormSubmit)}
          className={`${styles.klRow__form} shadow-lg rounded-4 p-4`}
        >
          <Form.Group className="mb-5">
            <Form.Label>Change username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new username"
              {...register("username")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Change password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter old password"
              isInvalid={!!errors.oldPassword}
              {...register("oldPassword")}
              className="mb-3"
            />
            <Form.Control.Feedback type="invalid">
              {errors.oldPassword?.message}
            </Form.Control.Feedback>

            <Form.Label>New password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              {...register("newPassword")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.newPassword?.message}
            </Form.Control.Feedback>

            <Form.Control
              className="mt-3"
              type="password"
              placeholder="Confirm new password"
              {...register("confirmNewPassword")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmNewPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            className="mb-3"
            variant="outline-secondary"
            type="submit"
            form="updateUserDataForm"
            disabled={isSubmitting}
          >
            Change user data
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default EditDataPageComponent;
