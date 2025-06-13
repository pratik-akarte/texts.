import { createContext, useContext } from "react";
import { useToast } from "@chakra-ui/react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toast = useToast();

  const showError = (message) =>
    toast({
      placement: "top",
      title: "Error",
      description: message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });

  const showSuccess = (message) =>
    toast({
      placement: "top",
      title: "Success",
      description: message,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

  return (
    <ToastContext.Provider value={{ showError, showSuccess }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useAppToast = () => useContext(ToastContext);
