import { createContext, useState } from "react";

interface IValueProviderError {
  modalShow: boolean;
  setModalShow: (data: boolean) => void;
  errorMessage: string;
  setErrorMessage: (data: string) => void;
  loading: boolean;
  setLoading: (data: boolean) => void;
}

const ErrorContext = createContext<IValueProviderError>({
  modalShow: false,
  setModalShow: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
  loading: false,
  setLoading: () => {},
});

export const ErrorProvider: TProvider = ({ children }) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const value: IValueProviderError = {
    modalShow,
    setModalShow,
    errorMessage,
    setErrorMessage,
    loading,
    setLoading,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export default ErrorContext;
