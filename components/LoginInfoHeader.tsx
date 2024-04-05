import { useSession } from "next-auth/react"
import { FC } from "react"

const LoginInfoHeader: FC = () => {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <header className="text-right mx-2 my-1">Signed in as {session.user?.email || session.user?.name}</header>
  )
}

export default LoginInfoHeader