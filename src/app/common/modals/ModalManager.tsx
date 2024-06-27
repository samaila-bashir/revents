import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function ModalManager() {
  const modalLookup = {
    // TestModal
  };

  const { type, data, open } = useSelector((state: RootState) => state.modals);

  let renderedModal;

  if (open && type) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ModalComponent = (modalLookup as any)[type];
    renderedModal = <ModalComponent data={data} />;
  }

  return <span>{renderedModal}</span>;
}
