

import { useApi } from "@/context/ApiContext";
import { Field, Formik } from "formik";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ButtonContainer, HeaderCard, LoginContainer, StyledCard, StyledForm, StyledPassword } from "./login.style";
import { signOut, useSession } from "next-auth/react";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'


export const Login = () => {
  const { Auth } = useApi();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);
  if (loading) {
    return <ProgressSpinner />
  }
  if (status !== "loading" && session) {
    return (<LoginContainer>
      <StyledCard header={<HeaderCard>Login</HeaderCard>}>
        <h1>Already logged in</h1>
        <ButtonContainer>
          <Button label="Go to admin page" onClick={() => { router.push("/admin") }} />
          <Button label="Log Out" onClick={() => { signOut() }} />
        </ButtonContainer>
      </StyledCard>
    </LoginContainer>);
  }
  return (
    <LoginContainer>
      <StyledCard header={<HeaderCard>Login</HeaderCard>}>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={(values) => {
            Auth.signIn(values)
          }}
        >
          {({ errors, touched }) => (
            <StyledForm>
              <Field name="username">
                {({ field }) => (
                  <InputText
                    {...field}
                    placeholder="username"
                    className={errors.username && touched.username ? 'p-invalid' : ''}
                  />
                )}
              </Field>
              {errors.username && touched.username && (
                <small className="p-error">{errors.username}</small>
              )}

              <Field name="password">
                {({ field }) => (
                  <StyledPassword
                    {...field}
                    placeholder="password"
                    toggleMask
                    feedback={false}
                    className={errors.password && touched.password ? 'p-invalid' : ''}
                  />
                )}
              </Field>
              {errors.password && touched.password && (
                <small className="p-error">{errors.password}</small>
              )}

              <Button type="submit" label="Submit" rounded />
            </StyledForm>
          )}
        </Formik>
      </StyledCard>
    </LoginContainer>
  );
};