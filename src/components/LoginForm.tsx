'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormData>({
    mode: "onBlur" // Validación al perder el foco
  });

  const onSubmit = (data: LoginFormData) => {
    // manejar la lógica de autenticación
    console.log("Email:", data.email, "Password:", data.password);
    
    // Aquí normalmente implementarías la llamada a tu API de autenticación
  };

  // Función para mostrar u ocultar la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center mt-20 bg-gradient-to-r">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Iniciar Sesión
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUser className="text-gray-500" />
              </span>
              <input
                id="email"
                type="email"
                {...register("email", { 
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingresa un correo electrónico válido"
                  }
                })}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Ingresa tu correo electrónico"
                aria-invalid={errors.email ? "true" : "false"}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-500" />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { 
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres"
                  }
                })}
                className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Ingresa tu contraseña"
                aria-invalid={errors.password ? "true" : "false"}
              />
              <button 
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 px-4 rounded-lg transition duration-300 flex justify-center items-center`}
          >
            {isSubmitting ? "Procesando..." : "Iniciar Sesión"}
          </button>
        </form>
        
        <div className="mt-6 text-center space-y-3">
          <a href="#" className="text-sm text-blue-600 hover:underline block">
            ¿Olvidaste tu contraseña?
          </a>
          
          <div className="border-t pt-3">
            <p className="text-gray-600 mb-2">¿No tienes una cuenta?</p>
            <Link href="/dashboard/register-usuario">
              <span className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 w-full text-center cursor-pointer">
                Regístrate ahora
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;