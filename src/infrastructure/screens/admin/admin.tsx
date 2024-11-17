import { useSession } from "next-auth/react"
import Custom403 from "../../../../app/403/page"

export const Admin = () => {

  console.log(session)


  return (
    <>
      { session ?
        <>
          <h1>Admin Page</h1>
          <p>Welcome, {session.user.name}</p>
        </> : <Custom403/>
      }

    </>
  )
}

