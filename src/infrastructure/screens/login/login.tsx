import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { FormEvent, useState } from "react";

import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from "primereact/card";

export const Login = () => {
    const router = useRouter();
    const [status, setStatus] = useState('');

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const USERNAME = formData.get('username');
        const PASSWORD = formData.get('password');
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
            });
            if (response.ok) {
                await router.push('/admin');
                router.refresh();
            } else {
                setStatus("INVALID_CREDENTIALS");
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus("SOMETHING_WENT_WRONG");
        }
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
                            className={classNames(
                                'w-full md:w-30rem mb-5',
                                status === "INVALID_CREDENTIALS" ? 'border-red-400' : ''
                            )}
                            style={{ padding: '1rem' }}
                        />
                        <div className="mb-5">
                            <Password
                                name="password"
                                required
                                placeholder="Password"
                                feedback={false}
                                unstyled
                                toggleMask
                                className="w-full"
                                inputClassName={classNames(
                                    'w-full p-3 md:w-30rem',
                                    status === "INVALID_CREDENTIALS" ? 'border-red-400' : ''
                                )}
                            ></Password>
                        </div>
                        {status === "INVALID_CREDENTIALS" && (
                            <div className="text-red-600 text-center mb-5">{status}</div>
                        )}
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