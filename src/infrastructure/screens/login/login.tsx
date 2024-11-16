
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { FormEvent } from "react";

import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from "primereact/card";
import { useApi } from "@/context/ApiContext";

export const Login = () => {
    const { Auth } = useApi();
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const USERNAME = formData.get('username');
        const PASSWORD = formData.get('password');
        console.log('credentials   ', USERNAME as string, PASSWORD as string);
        Auth.signIn({ username: USERNAME as string, password: PASSWORD as string })
    }
    return (
        <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen">
            <Card unstyled>
                <div className="text-align vertical-align-top mb-5">
                    <h1>Sign in to continue</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <InputText
                            name="username"
                            required
                            type="text"
                            placeholder="Username"
                        />
                        <div className="mb-5">
                            <Password
                                name="password"
                                required
                                placeholder="Password"
                                feedback={false}
                                unstyled
                                toggleMask
                            ></Password>
                        </div>
                        <Button
                            label="Login"
                            type="submit"
                            className="w-full p-3 text-xl"
                        ></Button>
                    </form>
                </div>
            </Card>
        </div>
    );
};