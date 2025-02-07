import { Role } from "@/domain/auth/auth";
import { signOut } from "next-auth/react";
import { Button } from "primereact/button";




export const Dashboard = ({ userName, role }: { userName: string, role: Role }) => {


  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {userName}</p>
      <p>Your role is: {role}</p>
      <Button label="Log Out" onClick={() => { signOut() }} />
    </div>
  );
};