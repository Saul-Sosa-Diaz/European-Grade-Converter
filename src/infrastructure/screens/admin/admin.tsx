// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { useEffect, useState } from "react";
import CountryForm from "./forms/country/CountryForm";
// TODO: UNCOMMENT THE FOLLOWING LINES
export const Admin = () => {
  // const { data: session, status } = useSession();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (status === "loading") {
  //     setLoading(true);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [status]);

  // if (loading) {
  //   return <ProgressSpinner />
  // }
  // if (status !== "loading" && !session) {
  //   redirect('/403')
  // }

  const handleSubmit = (values) => {
    console.log('Datos enviados:', values);
    // Aquí puedes realizar una petición a tu backend para guardar o actualizar el país
  };

  const initialValues = {countryName: 'Spain', countryCode: 'ES' };

  // return (
  //   <>
  //     {session && (
  //       <>
  //         <h1>Admin Page</h1>
  //         <p>Welcome, {session.user.name}</p>
  //       </>
  //     )}
  //   </>
  // );
  return (
    <>
      <h1>Admin Page</h1>
      <CountryForm initialValues={initialValues} onSubmit={handleSubmit} />
    </>
  );
};

