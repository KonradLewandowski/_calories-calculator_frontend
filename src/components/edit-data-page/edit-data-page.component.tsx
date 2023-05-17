import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, Row } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import InfoContext from "../../contexts/info.context";
import UserContext from "../../contexts/user.context";
import {
  fetchRemoveUserImage,
  fetchUpdateUserData,
  fetchUploadUserImage,
} from "../../services/fetch-data.service";
import {
  IUpdateUserData,
  IUploadUserImage,
} from "../../interfaces/user.interface";

import styles from "./edit-data-page.module.scss";

const EditDataPageComponent = () => {
  const { setInfoState, setModalShow, setLoading } = useContext(InfoContext);
  const { setUserData, userData } = useContext(UserContext);

  const [imagePreview, setImagePreview] = useState<string | undefined>(
    userData?.avatar
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IUpdateUserData & IUploadUserImage>();

  const watchImage = watch("image") as IUploadUserImage["image"] | undefined;

  const handleUploadImageFormSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (watchImage) {
        formData.append("image", watchImage[0]);
      }

      const response = await fetchUploadUserImage(formData);

      setInfoState(response);
      setUserData(response.body);
    } catch (error) {
      setInfoState({ errorMessage: "An error occurred while signing up." });

      console.error("SingUpComponent Error: ", error);
    } finally {
      setLoading(false);
      setModalShow(true);

      reset();
    }
  };

  const handleUserDataFormSubmit = async (input: IUpdateUserData) => {
    try {
      setLoading(true);

      const response = await fetchUpdateUserData(input);

      setInfoState(response);
      setUserData(response.body);
    } catch (error) {
      setInfoState({ errorMessage: "An error occurred!" });

      console.error("SingUpComponent Error: ", error);
    } finally {
      setLoading(false);
      setModalShow(true);

      reset();
    }
  };

  const handleRemoveUserImage = async () => {
    try {
      setLoading(true);

      const response = await fetchRemoveUserImage();

      setInfoState(response);
      setUserData(response.body);
    } catch (error) {
      setInfoState({ errorMessage: "An error occurred!" });

      console.error("SingUpComponent Error: ", error);
    } finally {
      setLoading(false);
      setModalShow(true);
    }
  };

  useEffect(() => {
    setImagePreview(userData?.avatar);

    if (watchImage) {
      const file = watchImage[0];

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      file && reader.readAsDataURL(file);
    }
  }, [watchImage, userData]);

  return (
    <Container fluid="lg">
      <Row
        className={`align-items-center justify-content-center gap-5 ${styles.klRow}`}
      >
        <Form
          id="uploadUserImageForm"
          className={`${styles.klRow__form} shadow-lg rounded-4 p-4`}
          onSubmit={handleSubmit(handleUploadImageFormSubmit)}
        >
          <Form.Group className="mb-3">
            <Form.Label>Upload user image</Form.Label>
            <div className={`p-4  ${styles.klRow__layout}`}>
              <img
                className={`w-100`}
                src={imagePreview}
                alt={userData?.username}
              />
              <BsTrashFill
                size={32}
                className={`p-5 ${styles.klRow__icon}`}
                onClick={handleSubmit(handleRemoveUserImage)}
              />
            </div>

            <Form.Control
              type="file"
              placeholder="Choose a new image"
              accept="image/*"
              {...register("image")}
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="outline-secondary"
            type="submit"
            form="uploadUserImageForm"
            disabled={isSubmitting || !watchImage}
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
