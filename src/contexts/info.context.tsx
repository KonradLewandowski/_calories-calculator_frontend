import { createContext, useState } from "react";
import { IBody } from "../interfaces/body.interface";

interface IValueProviderError {
  modalShow: boolean;
  setModalShow: (data: boolean) => void;
  infoMessage: IBody["errorMessage"];
  setInfoMessage: (data: IBody["errorMessage"]) => void;
  infoStatus: IBody["status"];
  setInfoStatus: (data: IBody["status"]) => void;
  loading: boolean;
  setLoading: (data: boolean) => void;
}

const InfoContext = createContext<IValueProviderError>({
  modalShow: false,
  setModalShow: () => {},
  infoMessage: "",
  setInfoMessage: () => {},
  infoStatus: "success",
  setInfoStatus: () => {},
  loading: false,
  setLoading: () => {},
});

export const ErrorProvider: TProvider = ({ children }) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState<IBody["errorMessage"]>("");
  const [infoStatus, setInfoStatus] = useState<IBody["status"]>("success");
  const [loading, setLoading] = useState<boolean>(false);

  const value: IValueProviderError = {
    modalShow,
    setModalShow,
    infoMessage,
    setInfoMessage,
    infoStatus,
    setInfoStatus,
    loading,
    setLoading,
  };

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
};

export default InfoContext;
