'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaEye, FaEyeSlash, FaEnvelope, FaSignature } from "react-icons/fa";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors, isSubmitting }, 
    reset 
  } = useForm<FormData>({
    mode: "onBlur" // Validación al perder el foco
  });
  // Para comparar las contraseñas
  const password = watch("password");

  const onSubmit = (data: FormData) => {
    // Simulación de envío al servidor
    console.log("Formulario enviado:", {
      firstName: data.firstName, 
      lastName: data.lastName, 
      email: data.email, 
      password: data.password
    });
    
    // Resetear el formulario después del envío exitoso
    reset();
    setSubmitSuccess(true);
    
    // Resetear el mensaje de éxito después de 5 segundos
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };
  
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  return (
    <div className="flex items-center justify-center mt-10 bg-gradient-to-r">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Registro de Usuario
        </h2>
        
        {submitSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            ¡Registro exitoso! Por favor revisa tu correo para confirmar tu cuenta.
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSignature className="text-gray-500" />
              </span>
              <input
                id="firstName"
                {...register("firstName", { 
                  required: "El nombre es obligatorio", 
                  minLength: {
                    value: 2,
                    message: "El nombre debe tener al menos 2 caracteres"
                  }
                })}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.firstName ? "border-red-500" : ""
                }`}
                placeholder="Ingresa tu nombre"
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
              Apellido
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSignature className="text-gray-500" />
              </span>
              <input
                id="lastName"
                {...register("lastName", { 
                  required: "El apellido es obligatorio", 
                  minLength: {
                    value: 2,
                    message: "El apellido debe tener al menos 2 caracteres"
                  }
                })}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.lastName ? "border-red-500" : ""
                }`}
                placeholder="Ingresa tu apellido"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="text-gray-500" />
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
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
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
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message: "La contraseña debe tener al menos 8 caracteres, una letra, un número y un carácter especial"
                  }
                })}
                className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Ingresa tu contraseña"
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

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-500" />
              </span>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", { 
                  required: "Confirma tu contraseña", 
                  validate: value => value === password || "Las contraseñas no coinciden"
                })}
                className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                placeholder="Confirma tu contraseña"
              />
              <button 
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 px-4 rounded-lg transition duration-300 flex justify-center items-center`}
          >
            {isSubmitting ? "Procesando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;