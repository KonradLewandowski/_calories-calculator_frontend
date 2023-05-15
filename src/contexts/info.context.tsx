import { createContext, useState } from "react";
import { IInfoState } from "../interfaces/info-state.interface";

// interface IInfoState {
//   errorMessage: string;
//   status: "success" | "failure";
// }
interface IValueProviderError {
  modalShow: boolean;
  setModalShow: (data: boolean) => void;
  infoState: IInfoState;
  setInfoState: (data: IInfoState) => void;
  loading: boolean;
  setLoading: (data: boolean) => void;
}

const InfoContext = createContext<IValueProviderError>({
  modalShow: false,
  setModalShow: () => {},
  infoState: { errorMessage: "", status: "failure" },
  setInfoState: () => {},
  loading: false,
  setLoading: () => {},
});

export const ErrorProvider: TProvider = ({ children }) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [infoState, setInfoState] = useState<IInfoState>({
    errorMessage: "",
    status: "failure",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const value: IValueProviderError = {
    modalShow,
    setModalShow,
    infoState,
    setInfoState,
    loading,
    setLoading,
  };

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
};

export default InfoContext;
