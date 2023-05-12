import { createContext, useState } from "react";

interface IValueProviderError {
  modalShow: boolean;
  setModalShow: (data: boolean) => void;
  infoMessage: string;
  setInfoMessage: (data: string) => void;
  loading: boolean;
  setLoading: (data: boolean) => void;
}

const InfoContext = createContext<IValueProviderError>({
  modalShow: false,
  setModalShow: () => {},
  infoMessage: "",
  setInfoMessage: () => {},
  loading: false,
  setLoading: () => {},
});

export const ErrorProvider: TProvider = ({ children }) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const value: IValueProviderError = {
    modalShow,
    setModalShow,
    infoMessage,
    setInfoMessage,
    loading,
    setLoading,
  };

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
};

export default InfoContext;
