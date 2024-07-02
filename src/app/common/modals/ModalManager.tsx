import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import LoginForm from "../../../features/auth/LoginForm";

export default function ModalManager() {
  const modalLookup = {
    LoginForm,
  };

  const { type, data, open } = useSelector((state: RootState) => state.modals);

  let renderedModal;

  if (open && type) {
    const ModalComponent = (modalLookup as any)[type];
    renderedModal = <ModalComponent data={data} />;
  }

  return <span>{renderedModal}</span>;
}
