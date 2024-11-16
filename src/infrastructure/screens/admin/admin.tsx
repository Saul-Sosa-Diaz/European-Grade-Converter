import { useSession, signIn } from "next-auth/react"
import { CardStyled, MessageContainer } from "./dontHaveAccessScreen/dontHaveAccessScreen.styles"
import { Button } from "primereact/button"
import { useEffect, useState } from "react"

export const Admin = () => {
    const { data: session } = useSession()
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient && (
                session ? (
                    <>
                        <h1>Admin Page</h1>
                        <p>Welcome, {session.user.name}</p>
                    </>
                ) : (
                        <MessageContainer>
                            <CardStyled>
                                <h1>{"Ups... looks like you don't have access."}</h1>
                                <Button onClick={() => signIn()}>Sign in</Button>
                            </CardStyled>
                        </MessageContainer>
                    )
                )}
        </>
    )
}

