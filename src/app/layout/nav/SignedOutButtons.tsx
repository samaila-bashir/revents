import { useDispatch } from "react-redux";
import { MenuItem, Button } from "semantic-ui-react";
import { openModal } from "../../store/slices/modals";
export default function SignedOutButtons() {
  const dispatch = useDispatch();

  return (
    <MenuItem position="right">
      <Button
        onClick={() => dispatch(openModal({ type: "LoginForm" }))}
        basic
        inverted
        content="Login"
      />
      <Button
        basic
        inverted
        content="Register"
        style={{ marginLeft: "0.5em" }}
      />
    </MenuItem>
  );
}
