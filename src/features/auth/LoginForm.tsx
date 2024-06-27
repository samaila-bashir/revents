import { Button, Form, Message } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/store/slices/modals";
import { signIn } from "../../app/store/slices/auth";
import { User } from "../../app/types/user";

export default function LoginForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data: FieldValues) => {
    dispatch(signIn(data as User));
    dispatch(closeModal());
  };

  return (
    <ModalWrapper header="Sign into re-event">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field error={errors.email}>
          <input
            type="email"
            placeholder="Email address"
            defaultValue=""
            {...register("email", {
              required: true,
              pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            })}
          />
          {errors.email?.type === "required" && (
            <Message negative>
              <p>Email is required</p>
            </Message>
          )}
          {errors.email?.type === "pattern" && (
            <Message negative>
              <p>Email is invalid</p>
            </Message>
          )}
        </Form.Field>
        <Form.Field error={errors.password}>
          <input
            type="password"
            placeholder="Password address"
            defaultValue=""
            {...register("password", { required: true })}
          />
          {errors.password && (
            <Message negative>
              <p>Password is required</p>
            </Message>
          )}
        </Form.Field>
        <Button
          loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          type="submit"
          fluid
          size="large"
          color="teal"
          content="Login"
        />
      </Form>
    </ModalWrapper>
  );
}
