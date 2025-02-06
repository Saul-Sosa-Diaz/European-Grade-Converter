import { Role } from "@/domain/auth/auth";




export const Dashboard = ({ userName, role }: { userName: string, role: Role }) => {


  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {userName}</p>
      <p>Your role is: {role}</p>
    </div>
  );
};