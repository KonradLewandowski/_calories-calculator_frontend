import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchConfirmEmail } from "../../services/fetch-data.service";
import ErrorContext from "../../contexts/error.context";

interface IToken {
  getToken(): string | null;
}

const ConfirmEmailComponent = () => {
  const { setModalShow, setErrorMessage } = useContext(ErrorContext);
  const navigate = useNavigate();
  const location = useLocation();

  const getToken: IToken["getToken"] = () => {
    const urlParams = new URLSearchParams(location.hash.substring(1));
    return urlParams.get("token");
  };

  useEffect(() => {
    (async () => {
      try {
        const token = getToken();
        const response = await fetchConfirmEmail(token);

        if (response.hasOwnProperty("errorMessage")) {
          setModalShow(true);
          setErrorMessage(response.errorMessage);
          return;
        }

        setModalShow(true);
        setErrorMessage("Email confirmed! You can log in!");

        navigate("/login");
      } catch (error) {
        setModalShow(true);
        setErrorMessage("An error occurred while confirming.");
        console.error("ConfirmEmailComponent Error: ", error);

        navigate("/");
      }
    })();
    // eslint-disable-next-line
  }, []);

  return <div> Confirm email </div>;
};

export default ConfirmEmailComponent;
