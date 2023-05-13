import { useEffect, useContext, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchConfirmEmail } from "../../services/fetch-data.service";
import InfoContext from "../../contexts/info.context";

interface IToken {
  getToken(): string | null;
}

const ConfirmEmailComponent = () => {
  const { setModalShow, setInfoMessage, setLoading } = useContext(InfoContext);
  const navigate = useNavigate();
  const location = useLocation();

  const getToken: IToken["getToken"] = () => {
    const urlParams = new URLSearchParams(location.hash.substring(1));
    return urlParams.get("token");
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = getToken();
        const response = await fetchConfirmEmail(token);

        if (response.hasOwnProperty("errorMessage")) {
          setModalShow(true);
          setInfoMessage(response.errorMessage);
          return;
        }

        setModalShow(true);
        setInfoMessage("Email confirmed! You can log in!");

        navigate("/login");
      } catch (error) {
        setModalShow(true);
        setInfoMessage("An error occurred while confirming.");
        console.error("ConfirmEmailComponent Error: ", error);

        navigate("/");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return <Fragment />;
};

export default ConfirmEmailComponent;
