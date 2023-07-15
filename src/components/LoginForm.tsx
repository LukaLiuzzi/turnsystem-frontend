"use client"

import { useUser } from "@/contexts/UserContext"
import React from "react"
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form"

type Inputs = {
  email: string
  password: string
}

const LoginError = ({ error }: { error: string | string[] | null }) => {
  if (!error) return null

  return (
    <div className="bg-red-500 text-black text-center font-bold">
      {Array.isArray(error) ? (
        error.map((err, index) => <p key={index}>{err}</p>)
      ) : (
        <p>{error}</p>
      )}
    </div>
  )
}

const FormError = ({ formErrors }: { formErrors: FieldErrors<Inputs> }) => {
  if (!formErrors) return null

  return (
    <div className="bg-red-500 text-black text-center font-bold">
      {formErrors.email && (
        <p className="bg-red-500 text-black text-center font-bold">
          El email es requerido
        </p>
      )}
      {formErrors.password && (
        <p className="bg-red-500 text-black text-center font-bold">
          La contraseña es requerida y debe tener entre 8 y 16 caracteres
        </p>
      )}
    </div>
  )
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<Inputs>()
  const { login, error } = useUser()

  const onSubmit: SubmitHandler<Inputs> = (data) => login(data)

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl my-8">
          Sistema de turnos
        </h2>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          {error && <LoginError error={error} />}
          {formErrors && <FormError formErrors={formErrors} />}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Entrar a tu cuenta
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu email
                </label>
                <input
                  {...register("email", { required: true, maxLength: 100 })}
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="nombre@gmail.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu contraseña
                </label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 16,
                  })}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button className="w-full text-white bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
