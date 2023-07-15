"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { User } from "../types/types.d"
import { axiosInstance } from "@/libs/axios"
import { useRouter } from "next/navigation"

interface UserProviderProps {
  children: React.ReactNode
}

interface UserContextProps {
  user: User | null
  login: ({ email, password }: { email: string; password: string }) => void
}

const UserContext = createContext<UserContextProps | null>(null)

const useUser = () => {
  const user = useContext(UserContext)
  if (!user) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return user
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const login = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      const { data } = await axiosInstance.post<User>("/users/login", {
        email,
        password,
      })
      setUser(data)

      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    axiosInstance
      .get<User>("/users/user")
      .then((res) => {
        console.log(res.data)
        setUser(res.data)
      })
      .catch((err) => {
        console.error(err)
        setUser(null)
      })
  }, [])
  return (
    <UserContext.Provider
      value={{
        user,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, useUser }
