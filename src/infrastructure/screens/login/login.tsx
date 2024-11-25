

import { useApi } from "@/context/ApiContext";
import { Formik } from "formik";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { HeaderCard, LoginContainer, StyledCard, StyledForm, StyledPassword } from "./login.style";

export const Login = () => {
  const { Auth } = useApi();

  return (
    <LoginContainer>
      <StyledCard header={<HeaderCard>Login</HeaderCard>}>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async ({ username, password }) => {
            Auth.signIn({ username, password });
          }}
        >
          <StyledForm>
            <InputText placeholder="username" name="username" type="text" />
            <StyledPassword toggleMask feedback={false} tabIndex={1} placeholder="password" name="password" type="password" />
            <Button type="submit" label="Submit" rounded />
          </StyledForm>
        </Formik>
      </StyledCard>
    </LoginContainer>
  );
};