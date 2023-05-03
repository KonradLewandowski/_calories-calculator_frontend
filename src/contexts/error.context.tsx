import { createContext, useState } from "react";

interface IValueProviderError {
  modalShow: boolean;
  setModalShow: (data: boolean) => void;
  errorMessage: string;
  setErrorMessage: (data: string) => void;
}

const ErrorContext = createContext<IValueProviderError>({
  modalShow: false,
  setModalShow: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
});

export const ErrorProvider: TProvider = ({ children }) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const value: IValueProviderError = {
    modalShow,
    setModalShow,
    errorMessage,
    setErrorMessage,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export default ErrorContext;
