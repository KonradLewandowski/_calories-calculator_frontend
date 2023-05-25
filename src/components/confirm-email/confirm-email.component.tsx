import { useEffect, useContext, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchConfirmEmail } from "../../services/fetch-data.service";
import InfoContext from "../../contexts/info.context";

interface IToken {
  getToken(): string | null;
}

const ConfirmEmailComponent = () => {
  const { setModalShow, setInfoState, setLoading } = useContext(InfoContext);
  const navigate = useNavigate();
  const location = useLocation();

  const getToken: IToken["getToken"] = () => {
    const urlParams = new URLSearchParams(location.hash.substring(1));
    return urlParams.get("token");
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const token = getToken();
        const response = await fetchConfirmEmail(token);

        setInfoState(response);
      } catch (error) {
        console.log(error);
        setInfoState({
          infoMessage: "An error occurred while confirming the email!",
        });

        console.error("ConfirmEmailComponent Error: ", error);
      } finally {
        setLoading(false);
        setModalShow(true);

        navigate("/login");
      }
    })();
    // eslint-disable-next-line
  }, []);

  return <Fragment />;
};

export default ConfirmEmailComponent;
