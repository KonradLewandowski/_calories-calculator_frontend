import { createContext, useState } from "react";

interface IValueProviderError {
  modalShow: boolean;
  setModalShow: (data: boolean) => void;
  errorMessage: string;
  setErrorMessage: (data: string) => void;
  errorStatus: number;
  setErrorStatus: (data: number) => void;
}

const ErrorContext = createContext<IValueProviderError>({
  modalShow: false,
  setModalShow: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
  errorStatus: 418,
  setErrorStatus: () => {},
});

export const ErrorProvider: TProvider = ({ children }) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorStatus, setErrorStatus] = useState<number>(200);

  const value: IValueProviderError = {
    modalShow,
    setModalShow,
    errorMessage,
    setErrorMessage,
    errorStatus,
    setErrorStatus,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export default ErrorContext;
