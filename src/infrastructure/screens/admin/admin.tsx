import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect, useState } from "react";

export const Admin = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

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
  if (status !== "loading" && !session) {
    redirect('/403')
  }

  return (
    <>
      {session && (
        <>
          <h1>Admin Page</h1>
          <p>Welcome, {session.user.name}</p>
        </>
      )}
    </>
  );
};

