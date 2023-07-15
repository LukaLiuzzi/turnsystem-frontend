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
  error: string | string[] | null
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
  const [error, setError] = useState<string | string[] | null>(null)
  const router = useRouter()

  const clearErrors = () => setError(null)

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
    } catch (error: any) {
      console.error(error)
      setError(error.response.data.error)
      setTimeout(clearErrors, 3000)
    }
  }

  useEffect(() => {
    axiosInstance
      .get<User>("/users/user")
      .then((res) => {
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
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, useUser }
