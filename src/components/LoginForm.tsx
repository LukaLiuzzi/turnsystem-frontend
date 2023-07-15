"use client"

import { useUser } from "@/contexts/UserContext"
import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  email: string
  password: string
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const { login } = useUser()

  const onSubmit: SubmitHandler<Inputs> = (data) => login(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input
        {...register("email", {
          required: true,
        })}
        type="email"
        name="email"
        id="email"
      />

      <label htmlFor="password">Contraseña</label>
      <input
        {...register("password", {
          required: true,
          minLength: 8,
          maxLength: 16,
        })}
        type="password"
        name="password"
        id="password"
      />

      {errors.email && <span>Este campo es requerido</span>}
      {errors.password && <span>Este campo es requerido</span>}

      <input type="submit" />
    </form>
  )
}

export default LoginForm
