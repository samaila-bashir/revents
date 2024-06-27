import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalProps } from "semantic-ui-react";
import { RootState } from "../../store/store";
import { closeModal } from "../../store/slices/modals";

type Props = {
  children: ReactNode;
  header?: string;
} & ModalProps;

export default function ModalWrapper({ children, header, ...props }: Props) {
  const { open } = useSelector((state: RootState) => state.modals);
  const dispatch = useDispatch();

  return (
    <Modal open={open} onClose={() => dispatch(closeModal())} size={props.size}>
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}
