/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the login screen.
 *
 * @date February 19, 2025
 * @description This file defines the login screen used in the application.
 * @author Saul Sosa
 */

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Field, Formik } from "formik";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";

import {
  LoginContainer,
  StyledCard,
  HeaderCard,
  StyledForm,
  StyledPassword,
  StyledButton
} from "./login.style";

export const Login = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (session) {
      router.push("/admin");
    }
  }, [session, router]);

  if (loading) {
    return <ProgressSpinner />;
  }

  return (
    <LoginContainer>
      <StyledCard header={<HeaderCard>Login</HeaderCard>}>
        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const responses = await signIn("credentials", {
              redirect: false,
              username: values.username,
              password: values.password,
              callbackUrl: "/admin"
            });
            if (responses?.error) {
              setErrorMessage("Invalid credentials");
            } else {
              router.push(responses.url);
            }
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <StyledForm>
              <Field name="username">
                {({ field }) => (
                  <InputText
                    {...field}
                    placeholder="username"
                    className={errorMessage ? "p-invalid" : ""}
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
                    invalid={errorMessage}
                  />
                )}
              </Field>
              {errorMessage && (
                <small className="p-error">{errorMessage}</small>
              )}

              <StyledButton type="submit" label="Log In" rounded disabled={isSubmitting} />

            </StyledForm>
          )}
        </Formik>
      </StyledCard>
    </LoginContainer>
  );
};