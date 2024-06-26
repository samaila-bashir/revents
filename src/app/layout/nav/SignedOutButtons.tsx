import { MenuItem, Button } from "semantic-ui-react";

type Props = {
  setAuth: (value: boolean) => void;
};

export default function SignedOutButtons({ setAuth }: Props) {
  return (
    <MenuItem position="right">
      <Button onClick={() => setAuth(true)} basic inverted content="Login" />
      <Button
        basic
        inverted
        content="Register"
        style={{ marginLeft: "0.5em" }}
      />
    </MenuItem>
  );
}
